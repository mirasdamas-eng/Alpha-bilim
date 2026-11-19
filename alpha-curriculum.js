
(()=>{
// Paid lesson access is checked against the verified Supabase entitlement.
// This module must not depend on the separate administrator page.
async function requirePaidLesson(){
  if(typeof refreshAlphaEntitlement!=='function'||typeof getStudentTariff!=='function'){
    alert('Тарифті тексеру мүмкін емес. Бетті жаңартыңыз.');return false;
  }
  await refreshAlphaEntitlement();
  if(getStudentTariff()==='free'){
    alert('🔒 Интерактивті тапсырмалар тек ақылы тарифте ашылады. Тарифті әкімші арқылы қосыңыз.');
    return false;
  }
  return true;
}
const topics=[
["§1–2. Жасанды интеллект",[["Жасанды интеллект деген не?","ЖИ — деректерден үйреніп, белгілі міндеттерді орындайтын технология."],["ЖИ қалай жұмыс істейді?","Деректер → модельді оқыту → болжау → тексеру."],["ЖИ түрлері","Ережеге негізделген жүйелер. Машиналық оқыту және терең оқыту."],["Күнделікті өмірдегі ЖИ","Іздеу жүйесі, аударма, навигация және білім беру."],["ЖИ мүмкіндіктері","Ақпаратты жылдам өңдейді және қайталанатын жұмысты жеңілдетеді."],["ЖИ шектеулері","Қате жауап беруі мүмкін. Жеке деректерді қорғау маңызды."],["Тапсырма","Калькулятор, сөйлеуді тану, таймер: қайсысы ЖИ? Неліктен?"],["Қорытынды","ЖИ — көмекші құрал, адам тексеруі қажет."]]],
["§3–4. Қарапайым нейрон моделін құру. Практикум",[["Жасанды нейрон","Нейрон кіріс мәндерін қабылдап, нәтижені есептейді."],["Нейронның құрамдастары","x — кіріс; w — салмақ; b — ығысу; y — нәтиже."],["Негізгі формула","z = x₁w₁ + x₂w₂ + b"],["Қарапайым есеп","x₁=2, x₂=3, w₁=1, w₂=2, b=0. Нәтиже: 8."],["Python: нейрон есебі","x1, x2 = 2, 3\nw1, w2, b = 1, 2, 0\nprint(x1*w1 + x2*w2 + b)"],["Практикум","Кірістерді 4 және 5 деп өзгертіңдер. Нәтижені салыстырыңдар."],["Өзіндік жұмыс","x₁=1, x₂=4, w₁=3, w₂=2, b=1. z мәнін есепте."],["Жауап","z = 12. Нейрон — нейрондық желінің негізгі бөлігі."]]],
["§5–6. Жасанды интеллектіні қолдану саласы",[["ЖИ қайда қолданылады?","Медицина, білім, көлік, ауыл шаруашылығы."],["Білім беруде","Оқу материалын ұсыну және жаттығуды тексеруге көмектесу."],["Медицинада","Медициналық кескіндерді талдауға жәрдемдесу."],["Көлікте","Маршрутты жоспарлау және жол жағдайын болжау."],["Ауыл шаруашылығында","Өсімдік жағдайын бақылау, суару мен өнімділікті болжау."],["Артықшылық және қауіп","Уақыт үнемдеу, деректерге тәуелділік және құпиялылық."],["Тапсырма","Мектепке ЖИ қолданудың бір идеясын ұсын."],["Қорытынды","ЖИ тиімділігі мақсатқа және бақылауға байланысты."]]],
["§7–8. Жасанды интеллектіні жобалау. Практикум",[["Жоба неден басталады?","Мәселені анықтау және күтілетін нәтижені белгілеу."],["Жобалау кезеңдері","Мәселе → дерек → модель → тексеру."],["Деректерді дайындау","Қате деректерді түзету; оқыту мен тексеру жиынын бөлу."],["Модель таңдау","Жіктеу ме, болжау ма? Қарапайым әдістен баста."],["Нәтижені бағалау","Дәлдік пен қателерді салыстыру."],["Практикум","Хабарламаны тақырыпқа бөлетін жүйе ойластыр."],["Топтық тапсырма","Жобаның 4 кезеңін сызба түрінде көрсет."],["Қорытынды","Сапалы ЖИ жобасы тексеруден өтеді."]]],
["§9–10. Жасанды интеллектіні жобалау",[["Жобаны нақтылау","Мақсат, пайдаланушы және шектеулерді жаз."],["Мәселені тұжырымдау","Оқу тақырыптарын ұсынатын жүйеге қандай дерек керек?"],["Дерек сапасы","Толықтық, өзектілік, теңгерім және құпиялылық."],["Модель нәтижесі","Нәтижені нақты мысалдармен тексер."],["Жобаны жетілдіру","Кері байланыс жинап, қателерді талда."],["Жоба үлгісі","Оқушыға тақырып ұсынатын жүйе."],["Тапсырма","Жобаға атау, мақсат және 3 кезең жаз."],["Қорытынды","Жақсы жоба — түсінікті, тексерілетін, пайдалы."]]],
["§11–12. Жасанды интеллектіні жобалау. Жобалық жұмыс",[["Жобаның мақсаты","Идеяны прототипке айналдыру, міндеттерді бөлу."],["Прототип","Алдымен бір негізгі функцияны іске асыру."],["Жобаны көрсету","Мәселе → шешім → демонстрация."],["Қателерді табу","Шеткі жағдайларды тексеріп, қателерді тіркеу."],["Жобаны бағалау","Пайдалылық, дәлдік, қауіпсіздік."],["Топтық практикум","Прототипке 3 тест жағдайын құрастыр."],["Рефлексия","Не сәтті болды? Нені өзгерту керек?"],["Қорытынды","Прототипті тексеру — міндетті кезең."]]],
["§13–14. Мұғаліммен оқыту әдісі",[["Мұғаліммен оқыту","Модель дұрыс жауаптары белгілі мысалдармен үйренеді."],["Белгіленген деректер","Кіріс: белгілер. Мақсат: санат немесе сандық мән."],["Жіктеу","Хабарлама — спам / спам емес."],["Регрессия","Температураны санмен болжау."],["Оқыту және тексеру","Бөлек деректермен тексеріп, артық үйренуден сақтан."],["Бағалау","Дұрыс және қате болжамдарды сана."],["Тапсырма","Бағаны болжау және хатты сұрыптау: айырмашылығы қандай?"],["Жауап","Бағаны санмен болжау — регрессия; хатты бөлу — жіктеу."]]],
["§15–16. Мұғаліммен оқыту. Практикум",[["Практикум мақсаты","Белгіленген мысалдар арқылы жіктеу."],["Дерек үлгісі","0–4 балл → Қайталау; 5–10 балл → Жақсы."],["Алгоритм","Балды қабылдау және шекпен салыстыру."],["Python коды",'score = 7\nlabel = "Жақсы" if score >= 5 else "Қайталау"\nprint(label)'],["Тексеру","0, 4, 5, 10 мәндерін тексер."],["Нақты ML-ден айырмасы","Бұл — қолмен жазылған ереже. ML ережені деректен үйренеді."],["Практикалық тапсырма","3 санатқа бөлетін ереже құр."],["Қорытынды","Белгіленген дерек — мұғаліммен оқытудың негізі."]]]
];
let subject=null,section=false,lesson=-1,slide=0;
const root=()=>document.getElementById('alphaCurriculum');
const grade=()=>{let v='';try{v=localStorage.getItem('alphaGrade')||''}catch(_){}const m=v.match(/^(7|8|9|10|11)(?:-сынып)?$/);return m?Number(m[1]):null};
const el=(tag,cls,txt)=>{const x=document.createElement(tag);if(cls)x.className=cls;if(txt!==undefined)x.textContent=txt;return x};
const btn=(txt,cb,disabled=false)=>{const b=el('button','btn btn-primary',txt);b.type='button';b.disabled=disabled;if(cb)b.onclick=cb;return b};
const card=(title,description)=>{const x=el('article','alpha-edu-card');x.append(el('h3','',title));if(description)x.append(el('p','alpha-edu-muted',description));return x};
function show(){
if(typeof refreshAlphaEntitlement==='function'&&typeof getStudentTariff==='function'){refreshAlphaEntitlement().then(()=>{document.querySelectorAll('#alphaCurriculum .alpha-edu-card').forEach(card=>{const buttons=card.querySelectorAll('button');buttons.forEach(button=>{const text=button.textContent.replace(/^🔒\s*/, '');if(text==='Интерактивті тапсырма'||text==='Видеосабақ')button.textContent=(getStudentTariff()==='free'?'🔒 ':'')+text})})}).catch(console.error)}
const r=root();if(!r)return;r.replaceChildren();const g=grade();r.append(el('h2','',g?g+'-сынып · Менің сабақтарым':'Менің сабақтарым'));
if(!g){r.append(el('p','alpha-edu-muted','Сынып анықталмады. Профильдегі сыныпты тексеріңіз.'));return}
if(subject)r.append(btn('← Пәндер',()=>{subject=null;section=false;lesson=-1;show()}));
if(section)r.append(btn('← Бөлім',()=>{section=false;lesson=-1;show()}));
if(lesson>=0)r.append(btn('← Параграфтар',()=>{lesson=-1;slide=0;show()}));
const grid=el('div','alpha-edu-grid');
if(!subject){
[['informatics','💻 Информатика'],['math','➗ Математика']].forEach(([k,t])=>{const c=card(t,g+'-сынып');c.append(btn('Пәнге кіру →',()=>{subject=k;show()}));grid.append(c)});
}else if(!section){
if(subject==='informatics'&&g===11){const c=card('1-бөлім. Жасанды интеллект','§1–16 · 8 сабақ');c.append(btn('Бөлімді ашу →',()=>{section=true;show()}));grid.append(c)}
else{grid.append(card('Материалдар дайындалуда',g+'-сынып · '+(subject==='math'?'Математика':'Информатика')))}
}else if(lesson<0){
topics.forEach(([t],i)=>{const c=card(t,'');c.append(btn('Презентацияны қарау →',()=>{lesson=i;slide=0;show()}));const taskButton=btn('Интерактивті тапсырма',async()=>{if(!await requirePaidLesson())return;lesson=i;slide=0;quiz()});const videoButton=btn('Видеосабақ',async()=>{if(!await requirePaidLesson())return;alert('Бұл тақырыпқа видеосабақ әлі жүктелмеген.')});const updateLocks=()=>{const paid=typeof getStudentTariff==='function'&&getStudentTariff()!=='free';taskButton.textContent=(paid?'':'🔒 ')+'Интерактивті тапсырма';videoButton.textContent=(paid?'':'🔒 ')+'Видеосабақ'};updateLocks();c.append(taskButton,videoButton);c.append(btn('🎮 Геймификациялық ойын',()=>{lesson=i;slide=0;openGamification()}));grid.append(c)});
}else{
const [name,slides]=topics[lesson];const c=card(name,'Презентация · '+(lesson===0?'10':slides.length+1)+' слайд');
if(lesson===0){
  const pptxUrl=new URL('ALPHA_ZHASANDY_INTELLEKT_ZHEKE_SURETTER.pptx',document.baseURI).href;
  const viewer='https://view.officeapps.live.com/op/embed.aspx?src='+encodeURIComponent(pptxUrl);
  const frame=document.createElement('iframe');
  frame.src=viewer;
  frame.title='Жасанды интеллект — 11-сынып, 1-сабақ, 10 слайд';
  frame.loading='lazy';
  frame.allowFullscreen=true;
  frame.style.cssText='display:block;width:100%;aspect-ratio:16/9;min-height:360px;border:0;border-radius:16px;background:#101a2c;margin:16px 0';
  c.append(frame);
  grid.append(c);
  r.append(grid);
  return;
}
const panel=el('div','alpha-slide');const title=slide===0?name:slides[slide-1][0];const body=slide===0?'ИНФОРМАТИКА ЖӘНЕ ЖАСАНДЫ ИНТЕЛЛЕКТ · 11-СЫНЫП':slides[slide-1][1];panel.append(el('div','alpha-slide-count',(slide+1)+' / '+(slides.length+1)),el('h2','',title),el('p','',body));c.append(panel);
c.append(btn('← Алдыңғы',()=>{slide=Math.max(0,slide-1);show()},slide===0));
c.append(btn('Келесі →',()=>{slide=Math.min(slides.length,slide+1);show()},slide===slides.length));
c.append(btn('Толық экран',()=>{if(panel.requestFullscreen)panel.requestFullscreen()}));
c.append(el('p','alpha-edu-muted','PowerPoint файлын жүктеу кейін қосылады. Қазір слайд мазмұнын сайттан қарауға болады.'));
c.append(btn('🎮 Геймификациялық ойын',()=>openGamification()));

grid.append(c);
}r.append(grid);
}
function openGamification(){
const r=root();if(!r)return;
r.replaceChildren();
r.append(btn('← Сабаққа қайту',()=>show()));
r.append(el('h2','','🎮 Геймификациялық ойын · '+(topics[lesson]?.[0]||'AI QUEST')));
const frame=document.createElement('iframe');
frame.src='ai-pixel-quest.html';
frame.title='AI QUEST — Жасанды интеллект әлемі';
frame.setAttribute('allowfullscreen','');
frame.style.cssText='display:block;width:100%;height:min(78vh,850px);min-height:540px;border:0;border-radius:16px;background:#101a2c;';
r.append(frame);
const link=document.createElement('a');
link.href='ai-pixel-quest.html';link.target='_blank';link.rel='noopener noreferrer';
link.textContent='Ойынды бөлек терезеде ашу ↗';
r.append(link);
}
function quiz(){
const r=root();r.replaceChildren();r.append(btn('← Сабаққа қайту',()=>show()),el('h2','','Интерактивті тапсырма · '+topics[lesson][0]));
if(lesson===0){
  const panel=card('Wordwall · Жасанды интеллект','Интерактивті ойынды төменде орындаңыз.');
  const frame=document.createElement('iframe');
  frame.src='https://wordwall.net/kk/embed/c3cf79c78d414ffaba1df25942284649?themeId=50&templateId=30&fontStackId=0';
  frame.title='Wordwall — 1-сабақ интерактивті ойыны';
  frame.width='500';frame.height='380';
  frame.style.cssText='display:block;width:100%;max-width:900px;min-height:380px;border:0;border-radius:12px;background:#fff;';
  frame.setAttribute('allowfullscreen','');
  frame.setAttribute('loading','lazy');
  panel.append(frame);
  const fallback=el('p','alpha-edu-muted','Ойын ашылмаса, ');
  const link=document.createElement('a');link.href='https://wordwall.net/ru/resource/106422584?wwmethod=link';link.target='_blank';link.rel='noopener noreferrer';link.textContent='Wordwall сайтында ашу';
  fallback.append(link);panel.append(fallback);r.append(panel);
  return;
}

const questions=[['Жасанды интеллект қандай міндет атқара алады?',['Деректерден үйрену','Тек уақыт көрсету','Тек экран жарығын өзгерту'],0],['Модель нәтижесін не үшін тексереді?',['Қателерді анықтау','Файлды жою','Компьютерді өшіру'],0],['Деректермен жұмыс кезінде не маңызды?',['Жеке деректерді қорғау','Барлық құпиясөзді жариялау','Деректерді тексермеу'],0]];
let score=0;const grid=el('div','alpha-edu-grid');
questions.forEach(([q,options,correct],i)=>{const c=card((i+1)+'. '+q);const select=el('select');options.forEach((t,j)=>{const o=el('option','',t);o.value=j;select.append(o)});select.value='';const placeholder=el('option','','Жауапты таңдаңыз');placeholder.value='';placeholder.selected=true;select.prepend(placeholder);select.dataset.answer=correct;c.append(select);grid.append(c)});r.append(grid);
r.append(btn('Жауаптарды тексеру',()=>{score=0;grid.querySelectorAll('select').forEach(s=>{if(s.value!==''&&Number(s.value)===Number(s.dataset.answer))score++});const result=document.getElementById('alphaQuizResult');result.textContent='Нәтиже: '+score+' / '+questions.length;}));
r.append(el('h3','', ''));r.lastChild.id='alphaQuizResult';
}
function init(){
const view=document.getElementById('lessonsView');if(!view)return;
let holder=root();if(!holder){holder=el('div');holder.id='alphaCurriculum';view.insertBefore(holder,view.firstChild)}
const legacy=[...view.children].filter(x=>x!==holder&&x.tagName!=='STYLE');legacy.forEach(x=>x.style.display='none');
document.querySelectorAll('[data-view="lessonsView"]').forEach(b=>b.addEventListener('click',()=>{legacy.forEach(x=>x.style.display='none');subject=null;section=false;lesson=-1;show()}));
show();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();