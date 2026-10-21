// Supabase Edge Function: alpha-admin
// Secrets required: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_ANON_KEY
// Keep JWT verification enabled. Never expose the service-role key to the browser.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
const cors = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type", "Access-Control-Allow-Methods": "POST, OPTIONS" };
function response(body: unknown, status = 200) { return new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } }); }
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return response({ error: "Method not allowed" }, 405);
  const url = Deno.env.get("SUPABASE_URL"), serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"), anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  if (!url || !serviceKey || !anonKey) return response({ error: "Server is not configured" }, 500);
  const token = (req.headers.get("Authorization") || "").replace(/^Bearer\\s+/i, "");
  if (!token) return response({ error: "Authentication required" }, 401);
  const adminClient = createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });
  const { data: { user }, error: userError } = await adminClient.auth.getUser(token);
  if (userError || !user) return response({ error: "Invalid session" }, 401);
  const { data: adminRow, error: adminCheckError } = await adminClient.from("alpha_admins").select("user_id").eq("user_id", user.id).maybeSingle();
  if (adminCheckError || !adminRow) return response({ error: "Administrator access required" }, 403);
  let payload: { action?: string; userId?: string; email?: string; reason?: string };
  try { payload = await req.json(); } catch { return response({ error: "Invalid JSON" }, 400); }
  const action = payload.action, targetId = payload.userId;
  async function logAction(actionName: string, targetUserId: string | null, targetEmail: string | null, details: Record<string, unknown>) {
    const { error } = await adminClient.from("alpha_admin_audit").insert({ actor_user_id: user.id, action: actionName, target_user_id: targetUserId, target_email: targetEmail, details });
    if (error) console.error("Audit log write failed", error.message);
  }
  try {
    if (action === "list-users") {
      const { data, error } = await adminClient.auth.admin.listUsers({ page: 1, perPage: 1000 });
      if (error) throw error;
      const users = (data.users || []).map((u) => ({ id:u.id,email:u.email??"",created_at:u.created_at,last_sign_in_at:u.last_sign_in_at??null,email_confirmed_at:u.email_confirmed_at??null,banned_until:u.banned_until??null,phone:u.phone??null,app_metadata:u.app_metadata??{},user_metadata:u.user_metadata??{} }));
      await logAction("list-users", null, null, { count: users.length });
      return response({ users });
    }
    if (action === "list-audit") {
      const { data, error } = await adminClient.from("alpha_admin_audit").select("id,actor_user_id,action,target_user_id,target_email,details,created_at").order("created_at", { ascending: false }).limit(200);
      if (error) throw error;
      return response({ logs: data ?? [] });
    }
    const allowed = ["ban-user","unban-user","signout-user","delete-user","send-password-reset"];
    if (!allowed.includes(action || "")) return response({ error: "Unknown action" }, 400);
    if (!targetId && action !== "send-password-reset") return response({ error: "userId is required" }, 400);
    if (targetId === user.id && ["ban-user","delete-user","signout-user"].includes(action || "")) return response({ error: "Өз әкімші аккаунтыңа бұл әрекетті жасауға болмайды." }, 400);
    let targetEmail: string | null = null;
    if (targetId) {
      const { data: target, error } = await adminClient.auth.admin.getUserById(targetId);
      if (error || !target.user) return response({ error: "User not found" }, 404);
      targetEmail = target.user.email ?? null;
    }
    if (action === "ban-user") { const { error } = await adminClient.auth.admin.updateUserById(targetId!, { ban_duration: "876000h" }); if (error) throw error; }
    else if (action === "unban-user") { const { error } = await adminClient.auth.admin.updateUserById(targetId!, { ban_duration: "none" }); if (error) throw error; }
    else if (action === "signout-user") { const { error } = await adminClient.rpc("alpha_revoke_sessions", { target_user_id: targetId! }); if (error) throw error; }
    else if (action === "delete-user") { const { error } = await adminClient.auth.admin.deleteUser(targetId!, false); if (error) throw error; }
    else if (action === "send-password-reset") {
      const email = payload.email?.trim().toLowerCase();
      if (!email) return response({ error: "email is required" }, 400);
      const mailRes = await fetch(`${url}/auth/v1/recover`, { method:"POST", headers:{"Content-Type":"application/json","apikey":anonKey}, body:JSON.stringify({email}) });
      if (!mailRes.ok) throw new Error("Password reset email request failed; check Supabase email settings.");
      targetEmail = email;
    }
    await logAction(action!, targetId ?? null, targetEmail, { reason: payload.reason ?? null });
    return response({ ok: true, action });
  } catch (err) {
    console.error("alpha-admin action failed", action, err instanceof Error ? err.message : "unknown");
    return response({ error: "Әрекет орындалмады. Supabase функция журналын тексер." }, 500);
  }
});
