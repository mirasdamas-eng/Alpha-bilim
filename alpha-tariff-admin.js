(()=>{
const $=id=>document.getElementById(id);
const paid=()=>typeof getStudentTariff==='function'&&getStudentTariff()!=='free';
const locked=()=>{alert('🔒 Бұл материал ақылы тарифте қолжетімді. Тарифтер бөлімінен жоспарды таңдаңыз.');};
function lockLegacyVideo(){
 const view=$('lessonsView');if(!view)return;
 const old=$('freeSubjects');if(old)old.style.display='none';
}
function attachAdmin(){
 if($('alphaAdminTariffs'))return;
 const panel=document.createElement('section');panel.id='alphaAdminTariffs';panel.className='alpha-edu-card';panel.style.margin='24px auto';panel.style.maxWidth='750px';panel.style.display='none';
 panel.innerHTML='<h2>🔐 ALPHA · Тарифтерді басқару</h2><p>Оқушыны аты немесе телефон нөмірі арқылы іздеңіз.</p><input id="alphaAdminSearch" placeholder="Аты немесе телефон (кемінде 3 таңба)" style="padding:12px;width:100%;border:1px solid #ddd;border-radius:10px"><button id="alphaAdminFind" class="btn btn-primary" style="margin:12px 0">Оқушыны іздеу</button><div id="alphaAdminResults"></div><p id="alphaAdminStatus"></p>';
 const app=$('app')||document.body;app.append(panel);
 $('alphaAdminFind').onclick=async()=>{
 const q=$('alphaAdminSearch').value.trim(),output=$('alphaAdminResults');output.replaceChildren();
 if(q.length<3){$('alphaAdminStatus').textContent='Кемінде 3 таңба енгізіңіз';return}
 const {data,error}=await alphaSupabase.rpc('alpha_admin_find_students',{p_search:q});
 if(error){$('alphaAdminStatus').textContent=error.message;return}
 if(!data?.length){$('alphaAdminStatus').textContent='Оқушы табылмады';return}
 $('alphaAdminStatus').textContent='';
 data.forEach(user=>{
 const row=document.createElement('div');row.className='alpha-admin-row';
 const name=document.createElement('strong');name.textContent=[user.full_name,user.grade,user.phone].filter(Boolean).join(' · ');
 const select=document.createElement('select');
 [['free','Free'],['start','Online Start'],['plus','Online Plus']].forEach(([v,t])=>{const o=document.createElement('option');o.value=v;o.textContent=t;select.append(o)});
 const days=document.createElement('input');days.type='number';days.min=1;days.max=365;days.value=30;days.title='Күн саны';days.style.width='85px';
 const save=document.createElement('button');save.className='btn btn-primary';save.textContent='Қосу';save.onclick=async()=>{
 if(!confirm('Осы оқушыға '+select.options[select.selectedIndex].text+' тарифін тағайындау керек пе?'))return;
 save.disabled=true;
 const {error:e}=await alphaSupabase.rpc('alpha_admin_set_plan',{p_user_id:user.id,p_plan_key:select.value,p_days:Number(days.value)});
 $('alphaAdminStatus').textContent=e?e.message:'Тариф сақталды ✓';save.disabled=false;
 };
 row.append(name,select,days,save);output.append(row);
 });
 };
}
async function init(){
 lockLegacyVideo();attachAdmin();
 if(typeof alphaSupabase==='undefined'||!alphaSupabase)return;
 const {data}=await alphaSupabase.auth.getUser();
 if(!data?.user)return;
 const {data:isAdmin,error}=await alphaSupabase.rpc('is_alpha_admin');
 if(!error&&isAdmin){
  $('alphaAdminTariffs').style.display='block';
  const link=document.createElement('button');link.textContent='🔐 Тарифтерді басқару';link.className='btn btn-light';link.onclick=()=>$('alphaAdminTariffs').scrollIntoView({behavior:'smooth'});
  const menu=$('studentMenu');if(menu)menu.append(link);
 }
}
window.alphaPaidAccess=paid;window.alphaPaidLocked=locked;
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();