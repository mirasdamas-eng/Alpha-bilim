
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
const alpha3dTourUrl='https://www.thinglink.com/scene/2170526099316933094';
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
const extraTopics=[["§17–18. Виртуалды және кеңейтілген шындық",[["Оқу мақсаты","VR мен AR ұғымдары, айырмашылығы және қолданылуы"],["Негізгі түсінік","VR пайдаланушыны жасанды ортаға енгізеді; AR нақты ортаға цифрлық объектілер қосады."],["Түсіндіру","VR көзілдірігі, AR камерасы және қозғалыс сенсорларының рөлі"],["Қолдану","Қауіпсіздік: үзіліс жасау, айналаны бос ұстау, жеке деректерді қорғау"],["Тапсырма","Тапсырма: VR және AR қолданылатын үш жағдайды салыстыр"]]],["§19–20. Виртуалды шындықтағы адам",[["Оқу мақсаты","Иммерсия, қатысу әсері және интерактивті әрекет"],["Негізгі түсінік","Адам виртуалды ортамен контроллер, қол қимылы және көзқарас арқылы байланысады."],["Түсіндіру","VR ортасындағы бағдарлану мен интерфейс түсінікті болуы керек."],["Қолдану","Қауіпсіздік: жайсыздық сезілсе тоқтату, шынайы кедергілерді ескеру"],["Тапсырма","Тапсырма: VR сабақтың қолданушы сценарийін сыз"]]],["§21–22. 3D панорама және виртуалды тур",[["Оқу мақсаты","360° панорама — барлық бағытты қамтитын көрініс; виртуалды тур бірнеше панораманы байланыстырады."],["Негізгі түсінік","Тур құрылымы: бастапқы сахна → өту нүктелері → ақпараттық белгілер."],["Түсіндіру","Камера деңгейі, жарық және көріністердің бірізділігі маңызды."],["Қолдану","Мектеп кітапханасына виртуалды турдың маршрут жоспарын құрастыр."],["Тапсырма","Тапсырма: үш локация мен екі өту нүктесін белгіле"]]],["§23–24. 3D панорама (виртуалды тур) жасау. Практикум",[["Оқу мақсаты","Мақсат: бірнеше 360° көріністі біріктіріп, қарапайым виртуалды тур құру."],["Негізгі түсінік","1-қадам: локацияларды таңда. 2-қадам: панорамаларды дайында."],["Түсіндіру","3-қадам: өту нүктелерін байланыстыр. 4-қадам: атаулар мен сипаттама қос."],["Қолдану","5-қадам: турды компьютер мен телефонда тексер."],["Тапсырма","Практикум: мектеп бойынша үш сахналы турдың прототипін жаса"]]],["§25–26. 3D панорама жасау. Практикум",[["Оқу мақсаты","Панорама сапасы: көкжиек түзу, кадрлар сәйкес, жарық біркелкі."],["Негізгі түсінік","Жобаны жақсарту: навигация белгілері, ақпарат терезелері және бастапқы көрініс."],["Түсіндіру","Турды тексеру: барлық өту нүктелері дұрыс жұмыс істей ме?"],["Қолдану","Жобаға қысқа нұсқаулық пен авторлық дереккөздер тізімін қос."],["Тапсырма","Практикум: дайын турды жетілдіріп, сыныпта көрсет"]]],["§27–28. Виртуалды машиналар",[["Оқу мақсаты","Виртуалды машина — негізгі компьютер ішінде бағдарламалық түрде жұмыс істейтін бөлек компьютерлік орта."],["Негізгі түсінік","Гипервизор процессор, жедел жад және сақтау ресурстарын бөледі."],["Түсіндіру","Қолданылуы: бағдарламаны сынау, түрлі операциялық жүйелерді үйрену."],["Қолдану","Артықшылықтары: оқшаулау, икемділік; шектеуі: ресурстарды тұтыну."],["Тапсырма","Тапсырма: виртуалды және физикалық компьютерді салыстыр"]]],["§29–30. Мобильді құрылғылар сипаттамасы",[["Оқу мақсаты","Смартфон мен планшеттің негізгі бөліктері: процессор, RAM, жады, экран, батарея, сенсорлар."],["Негізгі түсінік","Процессор өнімділікке, RAM көптапсырмалылыққа, батарея автономдылыққа әсер етеді."],["Түсіндіру","Экранның ажыратымдылығы мен жаңарту жиілігі кескін сапасына ықпал етеді."],["Қолдану","Сипаттамаларды қажеттілікке қарай салыстыру керек."],["Тапсырма","Тапсырма: екі құрылғының бес параметрін кестеге түсір"]]],["§31–32. Виртуалды машина құру. Практикум",[["Оқу мақсаты","Мақсат: оқу мақсатында виртуалды машинаның конфигурациясын жоспарлау."],["Негізгі түсінік","1-қадам: гипервизорды және орнатылатын жүйенің талаптарын анықта."],["Түсіндіру","2-қадам: RAM, процессор ядролары және виртуалды диск көлемін жоспарла."],["Қолдану","3-қадам: қауіпсіз оқу ортасында жүйені іске қосып, жұмысын тексер."],["Тапсырма","Практикум: VM параметрлерін негіздеп, конфигурация кестесін жаса"]]],["§33–34. Заттар интернеті деген не?",[["Оқу мақсаты","IoT — сенсорлар, желі және бағдарламалар арқылы өзара байланысатын құрылғылар жүйесі."],["Негізгі түсінік","Негізгі тізбек: сенсор → байланыс → өңдеу → әрекет."],["Түсіндіру","Мысалдар: ақылды үй, ауа райын бақылау, өндіріс датчиктері."],["Қолдану","Қауіпсіздік: жаңарту, сенімді құпиясөз, деректерді шектеу."],["Тапсырма","Тапсырма: үйдегі үш IoT құрылғысын ата"]]],["§35–36. Заттар интернетінің перспективалары",[["Оқу мақсаты","IoT медицинада, көлікте, ауыл шаруашылығында және энергетикада қолданылады."],["Негізгі түсінік","Датчиктер нақты уақыттағы деректерді жинап, шешім қабылдауға көмектеседі."],["Түсіндіру","Болашағы: ақылды инфрақұрылым және ресурстарды үнемдеу."],["Қолдану","Қиындықтары: киберқауіпсіздік, құпиялылық, үйлесімділік."],["Тапсырма","Тапсырма: мектепке пайдалы IoT жобасын ұсын"]]],["§37–38. Мобильді қосымшаны құру",[["Оқу мақсаты","Мобильді қосымша интерфейс, логика және деректерден тұрады."],["Негізгі түсінік","Жобалау кезеңдері: мәселе → экран эскизі → компоненттер → әрекеттер → тест."],["Түсіндіру","Қолданушыға түсінікті навигация мен қолжетімді дизайн маңызды."],["Қолдану","Тапсырма: сенсор көрсеткішін көрсететін экран макетін жаса."],["Тапсырма","Практикум: екі экран мен бір батырма әрекетін жоспарла"]]],["Мобильді қосымша интерфейсін жасау",[["Оқу мақсаты","Интерфейс компоненттері: батырма, мәтін, сурет, енгізу өрісі және тізім."],["Негізгі түсінік","Экрандарды бірізді стильде жобала: түстер, аралық, қаріп."],["Түсіндіру","Пайдаланушының негізгі әрекетіне қысқа жол жаса."],["Қолдану","Тексеру: мәтін оқыла ма, батырмалар басыла ма?"],["Тапсырма","Тапсырма: ақылды үй қолданбасының басты экранын сыз"]]],["§39–40. Мобильді қосымшаны жасау",[["Оқу мақсаты","Мақсат: мобильді қосымшаның қарапайым жұмыс нұсқасын құрастыру."],["Негізгі түсінік","Экрандағы компоненттерді қосып, оқиғаға жауап беретін әрекет жаз."],["Түсіндіру","Енгізілген деректі тексеріп, қате хабарламасын көрсет."],["Қолдану","Қолданбаны түрлі экран өлшемінде тексер."],["Тапсырма","Практикум: бөлме температурасын көрсететін үлгі құрастыр"]]],["§41–42. Мобильді қосымшаны орнату",[["Оқу мақсаты","Қосымшаны орнату алдында жүйе талаптары мен рұқсаттарын тексер."],["Негізгі түсінік","Орнату файлы мен ресми дүкен нұсқасының айырмашылығын біл."],["Түсіндіру","Қолданбаны іске қосып, интерфейс пен негізгі әрекеттерін тексер."],["Қолдану","Құпиялылық: қажетсіз рұқсаттарды берме."],["Тапсырма","Тапсырма: орнатуды тексеру парағын жаса"]]],["§43–44. «Суретті бояу» қосымшасы. Практикум",[["Оқу мақсаты","Мақсат: экрандағы суретке түс таңдайтын қарапайым қосымша жобалау."],["Негізгі түсінік","Компоненттер: сурет аймағы, түс батырмалары, тазалау батырмасы."],["Түсіндіру","Түс таңдағанда сурет аймағының қасиетін өзгерту логикасын құр."],["Қолдану","Тексеру: әр түс пен тазалау әрекеті дұрыс орындала ма?"],["Тапсырма","Практикум: үш түсті бояу интерфейсін жаса"]]],["§45–46. «Ұлттық аспаптар» қосымшасы. Практикум",[["Оқу мақсаты","Мақсат: ұлттық аспаптар туралы ақпарат беретін оқу қосымшасын жобалау."],["Негізгі түсінік","Экранда аспап суреті, атауы және қысқа сипаттамасы көрсетіледі."],["Түсіндіру","Батырмалар арқылы келесі аспапқа ауысу логикасын жаса."],["Қолдану","Сурет пен дыбысты қолданғанда авторлық құқықты ескер."],["Тапсырма","Практикум: домбыра, қобыз және жетіген карточкаларын әзірле"]]],["§47–48. Ақылды үй",[["Оқу мақсаты","Ақылды үйде жарық, температура және қауіпсіздік жүйелері автоматтандырылады."],["Негізгі түсінік","Датчик ақпарат жинайды, контроллер ереже бойынша шешім қабылдайды."],["Түсіндіру","Мысал: температура жоғарыласа, желдеткішті қосу."],["Қолдану","Қашықтан басқаруда желі мен аккаунт қауіпсіздігі маңызды."],["Тапсырма","Тапсырма: ақылды үйдің блок-схемасын құрастыр"]]],["§49–50. Ақылды үй жобасын әзірлеу. Практикум",[["Оқу мақсаты","Мақсат: сенсор мен басқару әрекеті бар ақылды үй жобасын жоспарлау."],["Негізгі түсінік","Жоба элементтері: датчик, контроллер, атқарушы құрылғы, интерфейс."],["Түсіндіру","Алгоритм: мәнді оқу → шартты тексеру → құрылғыны басқару."],["Қолдану","Тестілеу: қалыпты, жоғары және төмен мәндерді жеке тексер."],["Тапсырма","Практикум: жоба схемасын, алгоритмін және нәтижесін таныстыр"]]]];
topics.push(...extraTopics);
topics.push(...[["§51. Startup түсінігі. Startup-ты іске қалай қосады?",[["Оқу мақсаты","Startup — жаңа мәселені шешуге бағытталған, өсуге қабілетті бизнес-жоба."],["Негізгі ұғым","Бастапқы қадам: мәселені анықтау, аудиторияны зерттеу, шешім идеясын ұсыну."],["Түсіндіру","MVP — идеяны тексеруге арналған өнімнің ең қарапайым жұмыс нұсқасы."],["Қолдану","Сұхбат пен тестілеу арқылы пайдаланушылардың кері байланысын жина."],["Практикалық тапсырма","Тапсырма: мектептегі бір мәселені шешетін startup идеясын сипатта."]]],["§52. Crowdfunding платформаларының жұмыс істеу қағидалары",[["Оқу мақсаты","Crowdfunding — жобаны көп адамның шағын үлесі арқылы қаржыландыру тәсілі."],["Негізгі ұғым","Платформада жоба мақсаты, қажетті қаражат, мерзім және қолдау шарттары көрсетіледі."],["Түсіндіру","Модельдер: сыйақыға негізделген, қайырымдылық және инвестициялық қолдау."],["Қолдану","Қаржыландыруға дейін платформаның ережелері мен тәуекелдерін тексеру маңызды."],["Практикалық тапсырма","Тапсырма: оқу жобасына арналған crowdfunding таныстырылымын жоспарла."]]],["§53–54. Жобаны алға жылжыту",[["Оқу мақсаты","Жобаны алға жылжыту — мақсатты аудиторияға өнімнің құндылығын түсіндіру."],["Негізгі ұғым","Негізгі құралдар: әлеуметтік желі, демонстрация, сайт, кері байланыс."],["Түсіндіру","Мақсатты аудиторияның қажеттілігі мен хабарламаның түсініктілігін ескер."],["Қолдану","Нәтижені қаралым, қызығушылық және тіркелу сияқты көрсеткіштермен бағала."],["Практикалық тапсырма","Тапсырма: IT жобаға арналған үш арналы жарнама жоспарын жаса."]]],["§55. IT Startup және жарнама",[["Оқу мақсаты","Startup жарнамасы өнімнің қандай мәселені шешетінін нақты көрсетуі керек."],["Негізгі ұғым","Қысқа хабарлама: мәселе → шешім → артықшылық → әрекетке шақыру."],["Түсіндіру","Мысал: оқуға көмектесетін қосымша үшін 20 секундтық бейнеролик идеясы."],["Қолдану","Жарнамада жалған уәде берме және авторлық құқықты сақта."],["Практикалық тапсырма","Тапсырма: startup үшін ұран мен жарнама мәтінін жаз."]]],["§56. Маркетингтік жарнама жасау (инфографика). Практикум",[["Оқу мақсаты","Инфографика ақпаратты мәтін, белгіше, диаграмма арқылы көрнекі ұсынады."],["Негізгі ұғым","Құрылымы: тақырып, мәселе, шешім, үш артықшылық және әрекетке шақыру."],["Түсіндіру","Түс, қаріп және бос кеңістік оқылымдылыққа әсер етеді."],["Қолдану","Сандық деректерді пайдалансаң, олардың дереккөзін көрсет."],["Практикалық тапсырма","Практикум: startup жарнамасына арналған бір беттік инфографика жаса."]]],["§57–58. Қазақстандағы цифрландыру",[["Оқу мақсаты","Цифрландыру — қызметтер мен үдерістерді цифрлық технологиялар арқылы жетілдіру."],["Негізгі ұғым","Қазақстанда цифрлық қызметтер мемлекеттік басқаруда, білімде және бизнесте қолданылады."],["Түсіндіру","Мысал: электрондық өтініш беру және онлайн анықтама алу."],["Қолдану","Цифрлық қолжетімділік пен жеке деректерді қорғау маңызды."],["Практикалық тапсырма","Тапсырма: цифрландырудың үш пайдасы мен екі тәуекелін жаз."]]],["§59–60. Blockchain технологиясы",[["Оқу мақсаты","Blockchain — жазбалар блоктарға топтастырылып, өзара байланысқан таратылған тізбек."],["Негізгі ұғым","Әр блок алдыңғы блокпен криптографиялық байланысады."],["Түсіндіру","Таратылған көшірмелер өзгерістерді тексеруге көмектеседі."],["Қолдану","Қолданылуы: жазбаларды тексеру, жеткізу тізбегін бақылау және басқа жүйелер."],["Практикалық тапсырма","Тапсырма: блоктар тізбегінің қарапайым схемасын сыз."]]],["§61–62. Ақпараттарды құқықтық қорғау",[["Оқу мақсаты","Ақпаратты құқықтық қорғау авторлық құқықты, дербес деректерді және лицензияларды қамтиды."],["Негізгі ұғым","Өзгенің суретін, мәтінін немесе бағдарламасын пайдаланарда рұқсат шарттарын тексер."],["Түсіндіру","Ашық лицензиялар қолдану және атрибуция талаптарын анықтайды."],["Қолдану","Жеке ақпаратты келісімсіз жарияламау керек."],["Практикалық тапсырма","Тапсырма: үш түрлі цифрлық материалға қолдану шарттарын салыстыр."]]],["§63–64. Электронды цифрлық қолтаңба және сертификат",[["Оқу мақсаты","ЭЦҚ электрондық құжаттың қол қоюшысын және тұтастығын растауға көмектеседі."],["Негізгі ұғым","Жабық кілт қол қоюға, ашық кілт қолтаңбаны тексеруге қолданылады."],["Түсіндіру","Сертификат ашық кілтті иесімен байланыстырады."],["Қолдану","Жабық кілт пен құпиясөзді ешкімге беруге болмайды."],["Практикалық тапсырма","Тапсырма: ЭЦҚ тексеру кезеңдерін блок-схема түрінде көрсет."]]],["§65–66. Электронды цифрлық қолтаңба және сертификатты қолдану. Практикум",[["Оқу мақсаты","Мақсат: ЭЦҚ қолдану логикасын және қауіпсіздік ережелерін түсіну."],["Негізгі ұғым","Құжат → қол қою → сертификатты тексеру → нәтижені растау."],["Түсіндіру","Оқу барысында нақты жеке кілттерді жарияламай, үлгілік деректерді пайдалан."],["Қолдану","Қате сертификат немесе өзгертілген құжат тексеруден өтпеуі мүмкін."],["Практикалық тапсырма","Практикум: қолтаңбаны тексерудің қадамдық нұсқаулығын жаса."]]],["§67–68. Электронды үкімет",[["Оқу мақсаты","Электронды үкімет азаматтарға мемлекеттік қызметтерді онлайн алуға мүмкіндік береді."],["Негізгі ұғым","Қызметті таңдау, сәйкестендіру, өтінім беру және нәтижені алу кезеңдері бар."],["Түсіндіру","Ресми портал мен қолданбаны пайдаланғанда сайт мекенжайын тексер."],["Қолдану","Құпия деректер мен растау кодтарын бөтен адамға берме."],["Практикалық тапсырма","Тапсырма: электрондық қызмет алудың жалпы алгоритмін құрастыр."]]]]);
const curriculumSections=[{"title":"1-бөлім. Жасанды интеллект","start":0,"end":8},{"title":"2-бөлім. 3D жобалау","start":8,"end":13},{"title":"3-бөлім. Аппараттық жасақтама","start":13,"end":16},{"title":"4-бөлім. Заттар интернеті","start":16,"end":26},{"title":"5-бөлім. IT Startup","start":26,"end":31},{"title":"6-бөлім. Цифрлық сауаттылық","start":31,"end":37}];
let sectionIndex=0;
let subject=null,section=false,lesson=-1,slide=0;
const root=()=>document.getElementById('alphaCurriculum');
const grade=()=>{let v='';try{v=localStorage.getItem('alphaGrade')||''}catch(_){}const m=v.match(/^(7|8|9|10|11)(?:-сынып)?$/);return m?Number(m[1]):null};
const el=(tag,cls,txt)=>{const x=document.createElement(tag);if(cls)x.className=cls;if(txt!==undefined)x.textContent=txt;return x};
const btn=(txt,cb,disabled=false)=>{const b=el('button','btn btn-primary',txt);b.type='button';b.disabled=disabled;if(cb)b.onclick=cb;return b};
const card=(title,description)=>{const x=el('article','alpha-edu-card');x.append(el('h3','',title));if(description)x.append(el('p','alpha-edu-muted',description));return x};
function show(){
if(typeof refreshAlphaEntitlement==='function'&&typeof getStudentTariff==='function'){refreshAlphaEntitlement().then(()=>{document.querySelectorAll('#alphaCurriculum .alpha-edu-card').forEach(card=>{const buttons=card.querySelectorAll('button');buttons.forEach(button=>{const text=button.textContent.replace(/^🔒\s*/, '');if(text==='Интерактивті тапсырма'||text==='Видеосабақ'){const firstVideo=text==='Видеосабақ'&&[topics[0][0],topics[1][0],topics[2][0]].includes(card.querySelector('h3')?.textContent);button.textContent=(getStudentTariff()==='free'&&!firstVideo?'🔒 ':'')+text}})})}).catch(console.error)}
const r=root();if(!r)return;r.replaceChildren();const g=grade();r.append(el('h2','',g?g+'-сынып · Менің сабақтарым':'Менің сабақтарым'));
if(!g){r.append(el('p','alpha-edu-muted','Сынып анықталмады. Профильдегі сыныпты тексеріңіз.'));return}
if(subject)r.append(btn('← Пәндер',()=>{subject=null;section=false;lesson=-1;show()}));
if(section)r.append(btn('← Бөлім',()=>{section=false;lesson=-1;show()}));
if(lesson>=0)r.append(btn('← Параграфтар',()=>{lesson=-1;slide=0;show()}));
const grid=el('div','alpha-edu-grid');
if(!subject){
grid.classList.add('alpha-subject-grid');
[['informatics','Информатика'],['math','Математика']].forEach(([k,t])=>{
 const c=card(t,'');
 c.classList.add('alpha-subject-card',k==='informatics'?'alpha-subject-info':'alpha-subject-math');
 const decor=el('div','alpha-subject-decor');
 decor.setAttribute('aria-hidden','true');
 const emblem=el('div','alpha-subject-emblem',k==='informatics'?'⌘':'∑');
 decor.append(emblem);
 c.prepend(decor);
 const eyebrow=el('div','alpha-subject-eyebrow',k==='informatics'?'НЕГІЗГІ БАҒЫТ':'ҚОСЫМША БАҒЫТ');
 c.insertBefore(eyebrow,c.querySelector('h3'));
 c.append(el('p','alpha-subject-desc',k==='informatics'?'Жасанды интеллект, 3D жобалау, аппараттық жасақтама, заттар интернеті, IT Startup және цифрлық сауаттылық.':'Алгебра, геометрия және есептерді шешу дағдылары.'));
 c.append(el('div','alpha-subject-grade',g+'-сынып · Сабақтар'));
 const open=btn('Сабақтарға өту  →',()=>{subject=k;show()});
 open.classList.add('alpha-subject-open');
 c.append(open);
 grid.append(c);
});
}else if(!section){
if(subject==='informatics'&&g===11){curriculumSections.forEach((group,idx)=>{const c=card(group.title,(group.end-group.start)+' сабақ');c.classList.add('alpha-section-card');c.style.setProperty('--alpha-card-index',idx);const open=btn('Бөлімді ашу →',()=>{sectionIndex=idx;section=true;lesson=-1;show()});open.classList.add('alpha-lesson-action','alpha-lesson-primary');c.append(open);grid.append(c)})}
else{grid.append(card('Материалдар дайындалуда',g+'-сынып · '+(subject==='math'?'Математика':'Информатика')))}
}else if(lesson<0){
topics.forEach(([t],i)=>{if(i<curriculumSections[sectionIndex].start||i>=curriculumSections[sectionIndex].end)return;const c=card(t,'');c.classList.add('alpha-topic-card');const presentation=btn('Презентацияны қарау →',()=>{lesson=i;slide=0;show()});presentation.classList.add('alpha-lesson-action','alpha-lesson-primary');c.append(presentation);const taskButton=btn('Интерактивті тапсырма',async()=>{if(!await requirePaidLesson())return;lesson=i;slide=0;quiz()});const videoButton=btn('Видеосабақ',async()=>{if(i===0||i===1||i===2){lesson=i;slide=0;show();setTimeout(()=>document.querySelector('#alphaCurriculum .alpha-lesson-video-card')?.scrollIntoView({behavior:'smooth',block:'center'}),80);return}if(!await requirePaidLesson())return;alert('Бұл тақырыпқа видеосабақ әлі жүктелмеген.')});const updateLocks=()=>{const paid=typeof getStudentTariff==='function'&&getStudentTariff()!=='free';taskButton.textContent=(paid?'':'🔒 ')+'Интерактивті тапсырма';videoButton.textContent=(paid||i===0||i===1||i===2?'':'🔒 ')+'Видеосабақ'};updateLocks();taskButton.classList.add('alpha-lesson-action','alpha-lesson-task');videoButton.classList.add('alpha-lesson-action','alpha-lesson-video');c.append(taskButton,videoButton);const game=btn('🎮 Геймификация',()=>{lesson=i;slide=0;openGamification()});game.classList.add('alpha-lesson-action','alpha-lesson-game');c.append(game);if(i===10){const tourButton=btn('🌐 3D турды ашу',()=>{lesson=i;slide=0;show();setTimeout(()=>document.querySelector('#alphaCurriculum .alpha-3d-tour')?.scrollIntoView({behavior:'smooth',block:'center'}),80)});tourButton.classList.add('alpha-lesson-action','alpha-lesson-tour');c.append(tourButton)}grid.append(c)});
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
  const holder=el('div','alpha-presentation-holder');
  holder.style.cssText='width:100%;position:relative';
  frame.style.margin='12px 0';
  holder.append(frame);
  c.append(holder);
  const enlarge=btn('⛶ Сайт ішінде үлкейту',()=>{
    const overlay=el('div','alpha-presentation-overlay');
    overlay.style.cssText='position:fixed;inset:0;z-index:2147483646;background:#07152e;display:flex;flex-direction:column;padding:12px;gap:10px';
    const toolbar=el('div','');
    toolbar.style.cssText='display:flex;align-items:center;justify-content:space-between;gap:12px;color:#fff;font:700 16px Sylfaen,serif';
    toolbar.append(el('span','','§1–2. Жасанды интеллект · Презентация'));
    const close=btn('✕ Жабу',()=>finish());
    toolbar.append(close);
    overlay.append(toolbar);
    const previous=frame.style.cssText;
    frame.style.cssText='display:block;width:100%;height:calc(100% - 52px);flex:1;min-height:0;border:0;border-radius:12px;background:#101a2c';
    overlay.append(frame);
    document.body.append(overlay);
    const priorOverflow=document.body.style.overflow;
    document.body.style.overflow='hidden';
    function onKey(e){if(e.key==='Escape')finish()}
    function finish(){
      document.removeEventListener('keydown',onKey);
      holder.append(frame);
      frame.style.cssText=previous;
      overlay.remove();
      document.body.style.overflow=priorOverflow;
    }
    document.addEventListener('keydown',onKey);
  });
  c.append(enlarge);
  const videoCard=el('div','alpha-lesson-video-card');
  videoCard.append(el('h3','','🎬 Видеосабақ · Жасанды интеллект'));
  const videoFrame=document.createElement('iframe');
  videoFrame.src='https://www.youtube-nocookie.com/embed/XnrFgaf_os0';
  videoFrame.title='Жасанды интеллект · 1-сабақ · Видеосабақ';
  videoFrame.loading='lazy';
  videoFrame.allowFullscreen=true;
  videoFrame.referrerPolicy='strict-origin-when-cross-origin';
  videoFrame.setAttribute('allow','accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
  videoFrame.style.cssText='display:block;width:100%;aspect-ratio:16/9;border:0;border-radius:16px;background:#0b1935';
  videoCard.append(videoFrame);
  c.append(videoCard);
  c.append(btn('🎮 Геймификация',()=>openGamification()));
  grid.append(c);
  r.append(grid);
  return;
}
if(lesson===1){
 const videoCard=el('section','alpha-lesson-video-card');
 videoCard.append(el('h3','','🎬 Видеосабақ · Қарапайым нейрон моделін құру'));
 const videoFrame=document.createElement('iframe');
 videoFrame.src='https://www.youtube-nocookie.com/embed/4uRsz1D5wis';
 videoFrame.title='§3–4. Қарапайым нейрон моделін құру · Видеосабақ';
 videoFrame.loading='lazy';videoFrame.allowFullscreen=true;
 videoFrame.referrerPolicy='strict-origin-when-cross-origin';
 videoFrame.setAttribute('allow','accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
 videoFrame.style.cssText='display:block;width:100%;aspect-ratio:16/9;border:0;border-radius:16px;background:#0b1935';
 videoCard.append(videoFrame);
 const link=document.createElement('a');link.href='https://youtu.be/4uRsz1D5wis';link.target='_blank';link.rel='noopener noreferrer';link.className='alpha-tour-external';link.textContent='↗ YouTube-та ашу';videoCard.append(link);
 c.append(videoCard);
}
if(lesson===2){
 const videoCard=el('section','alpha-lesson-video-card');
 videoCard.append(el('h3','','🎬 Видеосабақ · Жасанды интеллектіні қолдану саласы'));
 const videoFrame=document.createElement('iframe');
 videoFrame.src='https://www.youtube-nocookie.com/embed/Ix6c4on1cOo';
 videoFrame.title='§5–6. Жасанды интеллектіні қолдану саласы · Видеосабақ';
 videoFrame.loading='lazy';videoFrame.allowFullscreen=true;
 videoFrame.referrerPolicy='strict-origin-when-cross-origin';
 videoFrame.setAttribute('allow','accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
 videoFrame.style.cssText='display:block;width:100%;aspect-ratio:16/9;border:0;border-radius:16px;background:#0b1935';
 videoCard.append(videoFrame);
 const link=document.createElement('a');link.href='https://youtu.be/Ix6c4on1cOo';link.target='_blank';link.rel='noopener noreferrer';link.className='alpha-tour-external';link.textContent='↗ YouTube-та ашу';videoCard.append(link);
 c.append(videoCard);
}
if(lesson===10){
 const tour=el('section','alpha-3d-tour');
 tour.append(el('h3','','🌐 Интерактивті 3D виртуалды тур'));
 tour.append(el('p','alpha-edu-muted','Дайын 3D турды осы бетте зерттеп көріңіз: көріністі бұрып, белгіленген нүктелерді басыңыз.'));
 const frame=document.createElement('iframe');
 frame.src=alpha3dTourUrl;
 frame.title='§21–22. 3D панорама және виртуалды тур — ThingLink';
 frame.loading='lazy';frame.allowFullscreen=true;
 frame.setAttribute('allow','fullscreen; accelerometer; gyroscope; xr-spatial-tracking');
 frame.referrerPolicy='strict-origin-when-cross-origin';
 frame.style.cssText='display:block;width:100%;height:clamp(340px,65vh,700px);border:0;border-radius:15px;background:#08182f';
 tour.append(frame);
 const fallback=document.createElement('a');fallback.href=alpha3dTourUrl;fallback.target='_blank';fallback.rel='noopener noreferrer';fallback.className='alpha-tour-external';fallback.textContent='↗ 3D турды ThingLink сайтында ашу';
 tour.append(fallback);c.append(tour);
}
const panel=el('div','alpha-slide');const title=slide===0?name:slides[slide-1][0];const body=slide===0?'ИНФОРМАТИКА ЖӘНЕ ЖАСАНДЫ ИНТЕЛЛЕКТ · 11-СЫНЫП':slides[slide-1][1];panel.append(el('div','alpha-slide-count',(slide+1)+' / '+(slides.length+1)),el('h2','',title),el('p','',body));c.append(panel);
c.append(btn('← Алдыңғы',()=>{slide=Math.max(0,slide-1);show()},slide===0));
c.append(btn('Келесі →',()=>{slide=Math.min(slides.length,slide+1);show()},slide===slides.length));
c.append(btn('Толық экран',()=>{if(panel.requestFullscreen)panel.requestFullscreen()}));
c.append(btn('🎮 Геймификация',()=>openGamification()));
c.append(el('p','alpha-edu-muted','PowerPoint файлын жүктеу кейін қосылады. Қазір слайд мазмұнын сайттан қарауға болады.'));
c.append(btn('🎮 Геймификация',()=>openGamification()));

grid.append(c);
}r.append(grid);
}
function openGamification(){
const r=root();if(!r)return;
r.replaceChildren();
r.append(btn('← Сабаққа қайту',()=>show()));
r.append(el('h2','','🎮 Геймификация · '+(topics[lesson]?.[0]||'AI QUEST')));
const frame=document.createElement('iframe');
frame.src='ai-pixel-quest.html?v=23';
frame.addEventListener('load',()=>{
 frame.contentWindow?.postMessage({type:'alpha-game-topic',title:topics[lesson][0],slides:topics[lesson][1]},window.location.origin);
});
frame.title='AI QUEST — '+topics[lesson][0];
frame.setAttribute('allowfullscreen','');
frame.style.cssText='display:block;width:100%;height:min(78vh,850px);min-height:540px;border:0;border-radius:16px;background:#101a2c;';
r.append(frame);
const link=document.createElement('a');
link.href='ai-pixel-quest.html?v=23';link.target='_blank';link.rel='noopener noreferrer';
link.textContent='Ойынды бөлек терезеде ашу ↗';
r.append(link);
}
function quiz(){
const r=root();r.replaceChildren();r.append(btn('← Сабаққа қайту',()=>show()),el('h2','','Интерактивті тапсырма · '+topics[lesson][0]));
if(lesson>=8){
 const content=topics[lesson][1];
 const questions=[
  {q:'Бұл сабақтың негізгі тақырыбы қандай?',choices:[topics[lesson][0],topics[0][0],topics[1][0]],correct:0},
  {q:'Осы тақырып бойынша дұрыс тұжырымды таңдаңыз.',choices:[content[1][1], 'Бұл тақырып тек компьютерді өшіруге арналған.', 'Тақырыпты тәжірибеде қолдануға болмайды.'],correct:0},
  {q:'Практикалық жұмыста не істеу керек?',choices:[content[4][1], 'Ештеңе тексермеу.', 'Барлық деректерді жою.'],correct:0}
 ];
 const grid=el('div','alpha-edu-grid');
 questions.forEach((item,i)=>{const cardEl=card((i+1)+'. '+item.q);const select=el('select');const placeholder=el('option','','Жауапты таңдаңыз');placeholder.value='';select.append(placeholder);item.choices.forEach((answer,j)=>{const opt=el('option','',answer);opt.value=String(j);select.append(opt)});select.value='';select.dataset.correct=String(item.correct);cardEl.append(select);grid.append(cardEl)});
 r.append(grid);
 const result=el('p','alpha-edu-muted','');r.append(btn('Жауаптарды тексеру',()=>{let score=0;grid.querySelectorAll('select').forEach(sel=>{if(sel.value!==''&&sel.value===sel.dataset.correct)score++});result.textContent='Нәтиже: '+score+' / '+questions.length;}));r.append(result);
 return;
}

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