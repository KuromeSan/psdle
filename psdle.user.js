/*! psdle 3.1.3 (c) RePod, MIT https://github.com/RePod/psdle/blob/master/LICENSE - user+base - compiled 2017-11-21 */
// ==UserScript==
// @author		RePod
// @name		PSDLE for Greasemonkey
// @description	Improving everyone's favorite online download list, one loop at a time.
// @namespace	https://github.com/RePod/psdle
// @homepage	https://repod.github.io/psdle/
// @version		3.1.3
// @include		/https://store.playstation.com/*/
// @exclude		/https://store.playstation.com/(cam|liquid)/*/
// @updateURL	https://repod.github.io/psdle/psdle.user.js
// @downloadURL	https://repod.github.io/psdle/psdle.user.js
// @icon		https://repod.github.io/psdle/logo/6_psdle_64px.png
// @grant		none
// @noframes
// ==/UserScript==

/*

To keep this from updating remove the @updateURL (for automatic updates) and @downloadURL (for manual updates) above.
Alternatively, reconfigure the updating settings in your Userscript manager.

*/


/*! psdle 3.1.3 (c) RePod, MIT https://github.com/RePod/psdle/blob/master/LICENSE - base - compiled 2017-11-21 */
var repod = {};
repod.psdle = {
    version            : "3.1.3",
    autocomplete_cache : [],
    gamelist           : [],
    gamelist_cur       : [],
    e_inject_cache     : [],
    id_cache           : {},
    lang               : {},
    pid_cache          : {},
    sys_cache          : {},
    type_cache         : {},
    prop_cache         : [],
    lang_cache         : {"en":{"def":"us","us":{"local":"English","startup":{"apis":"Select which store features you would like to use, hover for more details.<br>Certain store features may not be disabled.","wait":"Please wait.","start":"Start"},"columns":{"icon":"Icon","name":"Name","platform":"Platform","size":"Size","date":"Date"},"labels":{"exportView":"Export View","page":"Page"},"categories":{"downloadable_game":"Games","demo":"Demos","add_on":"Add-ons","unlock":"Unlocks","unlock_key":"Unlock Keys","avatar":"Avatars","theme":"Themes","other":"other","other_game_related":"other_game_related","game_content":"game_content","tumbler_index":"tumbler_index","home":"home","ungrouped_game":"ungrouped_game","promo_content":"promo_content","beta":"Betas","application":"Applications","extras":"Extras","unknown":"Unknown"},"strings":{"delimiter":"Enter separator:","yes":"Yes","no":"No","search":"Search","dlQueue":"Queue","dlList":"List","plus":"Toggle visibility of PS+ titles.","queueAll":"All","queueTo":"Download to $SYS$","noTarget":"There is no available target console to send to.","exportColumnName":"Column Name","exportProperty":"Property"},"apis":[{"internalID":"api_entitle","name":"Purchase History","desc":"Cannot be disabled. Uses your purchase history to create the download list and determine PlayStation Plus status."},{"internalID":"api_game","name":"Catalog","desc":"Enable for additional game information, including categories. Increases time needed to create the download list."},{"internalID":"api_queue","name":"Download Queue","desc":"Allows adding and removing items from the download queue. Reads download queue information and console activation status."},{"internalID":"api_pstv","name":"PS TV","desc":"Detect PS TV compatible titles. Only supported on \"en-us\" web store (not PSDLE language).","disabled":true}]}},"es":{"def":"es","es":{"author":"Positronic-Brain (#18)","local":"Español","startup":{"apis":"Elija APIs a utilizar. Coloque el puntero sobre el API para visualizar detalles.<br>Algunos APIs no pueden ser deshabilitados.","wait":"Por favor espere...","start":"Inicio"},"columns":{"icon":"Ícono","name":"Nombre","platform":"Plataforma","size":"Tamaño","date":"Fecha"},"labels":{"exportView":"Exportar vista","page":"Página"},"categories":{"downloadable_game":"Juegos","demo":"Demos","add_on":"Complementos","unlock":"Desbloqueables","unlock_key":"Llaves","avatar":"Avatares","theme":"Temas","other":"Otros","other_game_related":"Otros","game_content":"Contenidos","tumbler_index":"tumbler_index","home":"Home","ungrouped_game":"No Clasificados","promo_content":"Promociones","beta":"Betas","application":"Aplicaciones","extras":"Extras","unknown":"Desconocido"},"strings":{"delimiter":"Ingrese delimitador:","yes":"Sí","no":"No","search":"Búsqueda","dlQueue":"Cola de Descargas","dlList":"Lista de Descargas","plus":"Alterna la visibilidad de los títulos de PS Plus.","queueAll":"Todos","queueTo":"Descargar a $SYS$"},"apis":[{"internalID":"api_entitle","name":"Licencias","desc":"No puede ser deshabilitado. Accede a la información de las compras y se utiliza para construir la lista de descargas, determinar el estado de PS Plus y otras cosas."},{"internalID":"api_game","name":"Catálogo","desc":"Accede a información adicional para determinar la consola adecuada, reparar imágenes rotas, y más."},{"internalID":"api_queue","name":"Cola de Descargas","desc":"Permite añadir y remover entradas a la cola de descargas. Lee la información de la cola de descargas y el número de consolas activadas en la cuenta."},{"internalID":"api_pstv","name":"PS TV","desc":"Detecta títulos compatibles con PS TV. Sólo soportado en la tienda de la región \"en-us\" (región, no idioma de PSDLE).","disabled":true}]}},"pt":{"def":"br","br":{"author":"msvalle (#33)","local":"Português (Brasil)","startup":{"apis":"Selecione quais APIs você gostaria de usar, passe o mouse por cima para mais detalhes.<br>Algumas APIs não podem ser desabilitadas.","wait":"Por favor aguarde.","start":"Iniciar"},"columns":{"icon":"Ícone","name":"Nome","platform":"Platforma","size":"Tamanho","date":"Data"},"labels":{"exportView":"Exportar Visualização","page":"Página"},"categories":{"downloadable_game":"Jogos","demo":"Demos","add_on":"Expansões","unlock":"Desbloqueáveis","unlock_key":"Chaves","avatar":"Avatarws","theme":"Temas","other":"Outros","other_game_related":"Outros","game_content":"Conteúdo","tumbler_index":"tumbler_index","home":"Home","ungrouped_game":"Não classificado","promo_content":"Promoções","beta":"Betas","application":"Aplicações","extras":"Extras","unknown":"Desconhecido"},"strings":{"delimiter":"Entre delimitador:","stringify_error":"Erro: Navegador não possui JSON.stringify.","yes":"Sim","no":"Não","search":"Buscar por título do jogo","dlQueue":"Fila de downlaod","dlList":"Lista de download","plus":"Alterna ver títulos PS+.","queueAll":"Todos","queueTo":"Download para $SYS$"},"apis":[{"internalID":"api_entitle","name":"Licenças","desc":"Não pode ser desabilitado. Acessa informção de compra usada para criar a lista de download, determinar o status da PS+, e outras coisas."},{"internalID":"api_game","name":"Catálogo","desc":"Acessa informação adicional do jogo para determinar o console certo, corrigir imagens quebradas, e mais."},{"internalID":"api_queue","name":"Fila de download","desc":"Permite adicionar e remover itens da lista de download. Lê informação da lista de download e quantidade de consoles ativos na conta."},{"internalID":"api_pstv","name":"PS TV","desc":"Detecta títulos compatíveis com a PS TV. Somente suportado na web store \"en-us\" (não o idioma do PSDLE).","disabled":true}]}},"de":{"def":"de","de":{"author":"/u/_MrBubbles","local":"Deutsch","startup":{"wait":"Seite wird geladen, bitte warten."},"columns":{"icon":"Symbol","name":"Name","platform":"Plattform","size":"Größe","date":"Datum"},"labels":{"exportView":"Exportiere Ansicht","page":"Seite"},"categories":{"downloadable_game":"Spiele","demo":"Demos","add_on":"Erweiterungen","unlock":"Freischaltbares","avatar":"Spielerbilder","theme":"Themen","application":"Anwendungen","unknown":"Unbekannt"},"strings":{"delimiter":"Geben sie ein Trennzeichen ein","yes":"Ja","no":"Nein","search":"Suche"}}},"fr":{"def":"fr","fr":{"author":"cramoisan (#9)","local":"Français","startup":{"apis":"Sélectionner l'API à utiliser; Survoler pour plus de détails.<br>Certaines APIs ne peuvent pas être désactivées.","wait":"Merci de patienter.","start":"Commencer"},"columns":{"icon":"Icône","name":"Nom","platform":"Plate-forme","size":"Taille","date":"Date"},"labels":{"exportView":"Exporter la vue","page":"Page"},"categories":{"downloadable_game":"Jeux","demo":"Démos","add_on":"DLCs","unlock":"Codes de déverouillage","avatar":"Avatars","theme":"Thèmes","application":"Applications","unknown":"Inconnu"},"strings":{"delimiter":"Entrer le délimiteur:","yes":"Oui","no":"Non","search":"Rechercher","dlQueue":"Queue","dlList":"Liste","plus":"Afficher/cacher les titres PS+.","queueAll":"Tous","queueTo":"Télécharger sur $SYS$"},"apis":[{"internalID":"api_entitle","name":"Droits","desc":"Ne peut pas être désactivée. Accède aux informations d'achat afin de créer la liste de téléchargement, et déterminer le statut PS+, ainsi que d'autres choses."},{"internalID":"api_game","name":"Catalogue","desc":"Accède aux informations supplémentaires des jeux pour déterminer la plate-forme, corriger les liens d'images cassés, et plus."},{"internalID":"api_queue","name":"Liste de téléchargement","desc":"Permet d'ajouter ou de retirer des articles de la liste de téléchargement. Lit les informations de la liste de téléchargement et le nombre de consoles activées sur le compte."},{"internalID":"api_pstv","name":"PS TV","desc":"Détecte les titres compatibles PS TV. Ne marche que sur le store \"en-us\" (différent de la langue choisie pour PSDLE).","disabled":true}]}},"ru":{"def":"ru","ru":{"author":"GenosseArroganz","local":"Русский","startup":{"apis":"Выберите необходимые компоненты (для описания наведите на них указатель мыши).<br>Некоторые компоненты обязательны и не могут быть отключены.","wait":"Подождите…","start":"Начать!"},"columns":{"icon":"Иконка","name":"Название","platform":"Платформа","size":"Размер","date":"Дата"},"labels":{"exportView":"Экспорт списка","page":"Страница"},"categories":{"downloadable_game":"Игры","demo":"Демо","add_on":"Дополнения","unlock":"Разблокировки","unlock_key":"Ключи разблокировки","avatar":"Аватары","theme":"Темы","other":"Другое","other_game_related":"Другой связанный контент","game_content":"Игровой контент","tumbler_index":"tumbler_index","home":"PlayStation Home","ungrouped_game":"Без категории","promo_content":"Промо-материалы","beta":"Бета","application":"Приложения","extras":"Дополнительно","unknown":"Неизвестно"},"strings":{"delimiter":"Введите разделитель:","yes":"Да","no":"Нет","search":"Поиск","dlQueue":"Очередь загрузок","dlList":"Список загрузок","plus":"Скрыть/показать игры PS+","queueAll":"Все","queueTo":"Загрузить на $SYS$","noTarget":"Не обнаружено подходящего устройства","exportColumnName":"Название столбца","exportProperty":"Свойство"},"apis":[{"internalID":"api_entitle","name":"История покупок","desc":"Нельзя отключить. История ваших покупок используется для создания списка загрузок и определения статуса PlayStation Plus."},{"internalID":"api_game","name":"Каталог","desc":"Больше опций отображения списка, включая категории. Увеличивает время, необходимое для подготовки списка загрузок."},{"internalID":"api_queue","name":"Очередь загрузок","desc":"Возможность формировать очередь загрузок. Доступ к информации об очереди загрузок и активированных консолях на аккаунте."},{"internalID":"api_pstv","name":"PS TV","desc":"Определяет совместимые с PS TV игры и приложения. Только для американского магазина.","disabled":true}]}},"ja":{"def":"jp","jp":{"author":"k0ta0uchi (#36)","local":"日本語","startup":{"apis":"使用したいAPIを選択してください。ホバーすることによって詳細を確認することができます。<br>特定のAPIは無効化することが出来ない可能性があります。","wait":"お待ちください。","start":"開始"},"columns":{"icon":"アイコン","name":"ゲーム名","platform":"プラットフォーム","size":"サイズ","date":"日付"},"labels":{"exportView":"ビューをエクスポート","page":"ページ"},"categories":{"downloadable_game":"ゲーム","demo":"デモ","add_on":"アドオン","unlock":"アンロック","unlock_key":"アンロックキー","avatar":"アバター","theme":"テーマ","other":"その他","other_game_related":"その他ゲーム関連","game_content":"ゲームコンテンツ","tumbler_index":"タンブラーインデックス","home":"ホーム","ungrouped_game":"未分類のゲーム","promo_content":"プロモコンテンツ","beta":"ベータ","application":"アプリケーション","extras":"エキストラ","unknown":"不明"},"strings":{"delimiter":"区切り文字を入力してください:","yes":"はい","no":"いいえ","search":"検索","dlQueue":"待機リスト","dlList":"リスト","plus":"PS＋タイトルの表示を切り替える。","queueAll":"全て","queueTo":"$SYS$にダウンロード","noTarget":"送信可能なコンソールが存在しません。","exportColumnName":"カラム名","exportProperty":"プロパティ"},"apis":[{"internalID":"api_entitle","name":"エンタイトルメント","desc":"無効化することは出来ません。購入情報にアクセスし、ダウンロードリストを作成、PS+の状態を確認、その他を行います。"},{"internalID":"api_game","name":"カタログ","desc":"ゲームの追加情報にアクセスし、正確なコンソールの把握、壊れたイメージの修正、その他を行います。"},{"internalID":"api_queue","name":"ダウンロード待機リスト","desc":"ダウンロード待機リストからアイテムの追加や削除の許可します。ダウンロード待機リスト情報とアカウントで有効化されたコンソールの数を読み込みます。"},{"internalID":"api_pstv","name":"PS TV","desc":"PS TV互換タイトルを検知します。\"en-us\"ウェブストアでのみサポートされます。（PSDLEの言語設定ではありません）","disabled":true}]}},"nl":{"def":"nl","nl":{"author":"Tricksy","local":"Nederlands","startup":{"apis":"Selecteer welke APIs je wilt gebruiken, hover voor meer details.<br>Sommige APIs kunnen niet gedeselecteerd worden.","wait":"Even geduld alstublieft.","start":"Start"},"columns":{"icon":"Icoon","name":"Naam","platform":"Platform","size":"Grootte","date":"Datum"},"labels":{"exportView":"Exporteer View","page":"Pagina"},"categories":{"downloadable_game":"Spellen","demo":"Demos","add_on":"Add-ons","unlock":"Ontgrendelingen","unlock_key":"Ontgrendelings Sleutels","avatar":"Avatars","theme":"Themas","other":"anders","other_game_related":"ander_spel_gerelateerd","game_content":"spel_inhoud","tumbler_index":"tumbler_index","home":"begin","ungrouped_game":"ongegroepeerd_spel","promo_content":"promo_inhoud","beta":"Betas","application":"Applicaties","extras":"Extras","unknown":"Onbekend"},"strings":{"delimiter":"Voer delimiter in:","yes":"Ja","no":"Nee","search":"Zoeken","dlQueue":"Wachtrij","dlList":"Lijst","plus":"Laat PS+ titels zien.","queueAll":"Alles","queueTo":"Download naar $SYS$","noTarget":"Er is geen beschikbare console om naar toe te sturen","exportColumnName":"Kolom Naam","exportProperty":"Inhoud"},"apis":[{"internalID":"api_recht","name":"Rechten","desc":"Kan niet uitgeschakeld worden. Geeft toegang tot betalings informatie om te gebruiken voor de download lijst, bepaald PS+ status, en meer."},{"internalID":"api_spel","name":"Catalogus","desc":"Geeft toegang tot extra spel informatie om de goede console te bepalen, kapotte images te fixen, en meer."},{"internalID":"api_wachtrij","name":"Download Wachtrij","desc":"Geeft toegang tot het toevoegen en verwijderen van spellen op de download wachtrij. Leest de download wachtrij informatie en het aantal geactiveerde consoles op het account."},{"internalID":"api_pstv","name":"PS TV","desc":"Detecteert titels die met PS TV werken. Werkt alleen op de \"en-us\" web store (niet PSDLE taal).","disabled":true}]}},"ar":{"def":"ae","ae":{"author":"Oakkom","rtl":true,"local":"العربية","startup":{"apis":"أختار الميزات التي تود استخدامها حرك المؤشر فوقها للمزيد من المعاومات<br>بعض الميزات لا يمكن ابطالها","wait":"...جار التحميل","start":"ابدأ"},"columns":{"icon":"الأيقونة","name":"الأسم","platform":"نوع الجهاز","size":"الحجم","date":"التاريخ"},"labels":{"exportView":"أحفظ الائحة","page":"الصفحة"},"categories":{"downloadable_game":"الألعاب","demo":"الإصدارات التجريبية","add_on":"العناصر الأضافية","unlock":"Unlocks","unlock_key":"Unlock Keys","avatar":"صٌور رمزية","theme":"السمات","other":"اخرى","other_game_related":"other_game_related","game_content":"محتويات اللعبة","tumbler_index":"tumbler_index","home":"المنزل","ungrouped_game":"ungrouped_game","promo_content":"محتويات ترويجية","beta":"اصدار تجريبي","application":"التطبيقات","extras":"إضافات","unknown":"مجهول"},"strings":{"delimiter":":أدخل الفواصل","yes":"نعم","no":"لا","search":"أبحث","dlQueue":"لائحة التنزيل","dlList":"لائحة الألعاب","plus":"ضبط ظاهرية العاب PlayStation Plus","queueAll":"الكل","queueTo":"$SYS$ حَمل الى","noTarget":"لا يوجد جهاز للتحميل اليه","exportColumnName":"أسم العمود","exportProperty":"الخصائص"},"apis":[{"internalID":"api_entitle","name":"تاريخ الشراء","desc":"لا يمكن عدم التفعيل تستعمل بيانات شىرائك ليتم تشكيل الائحة و تحديد وضع PlayStation Plus"},{"internalID":"api_game","name":"الفهرس","desc":".فعل للحصول على معاومات اضافية عن الألعاب, منها الأنواع. تزيد الوقت اللازم لتحميل اللائحة"},{"internalID":"api_queue","name":"لائحة التنزيل","desc":".تسمح بزيادة أو حذف العناصر من لائحة التنزيل, تحصل على معلومات لائحة التنزيل و عدد الأجهزة المفعلة على الحساب"},{"internalID":"api_pstv","name":"PS TV","desc":"الكشف عن الألعاب لجهاز PS TV متوافر فقط لمتجر  en-us","disabled":true}]}},"zh":{"def":"tw","tw":{"author":"Alexsh","local":"中文 (繁體)","startup":{"apis":"請選擇要使用的PS Store功能，滑鼠游標停留以取得項目的詳細資訊<br>部份功能可能無法關閉","wait":"請稍候...","start":"開始"},"columns":{"icon":"圖示","name":"名稱","platform":"平台","size":"容量","date":"購買日期"},"labels":{"exportView":"匯出","page":"Page"},"categories":{"downloadable_game":"遊戲","demo":"體驗版","add_on":"追加內容","unlock":"關卡","unlock_key":"解鎖","avatar":"個人造型","theme":"主題","other":"other","other_game_related":"other_game_related","game_content":"game_content","tumbler_index":"tumbler_index","home":"home","ungrouped_game":"ungrouped_game","promo_content":"promo_content","beta":"Betas","application":"應用程式","extras":"Extras","unknown":"Unknown"},"strings":{"delimiter":"分隔字元:","yes":"是","no":"否","search":"搜尋","dlQueue":"佇列","dlList":"清單","plus":"選擇顯示PS+遊戲","queueAll":"全部","queueTo":"下載到$SYS$","noTarget":"沒有可傳送的主機。","exportColumnName":"欄位名稱","exportProperty":"屬性"},"apis":[{"internalID":"api_entitle","name":"購買記錄","desc":"此項不可關閉，將使用購買記錄來建立下載清單及確認PlayStation Plus狀態。"},{"internalID":"api_game","name":"類別","desc":"開啟以取得更多遊戲資訊，包括類別及購買時間來建立下載清單。"},{"internalID":"api_queue","name":"下載佇列","desc":"允許從下載佇列增加/移除項目。"},{"internalID":"api_pstv","name":"PS TV","desc":"偵測Playstation Vita TV相容遊戲。目前只支援en-us區域","disabled":true}]},"cn":{"author":"Alexsh","local":"中文 (简体)","startup":{"apis":"请选择要使用的PS Store功能，鼠标光标停留以取得项目的详细信息<br>部份功能可能无法关闭","wait":"请稍候...","start":"开始"},"columns":{"icon":"图示","name":"名称","platform":"平台","size":"容量","date":"购买日期"},"labels":{"exportView":"汇出","page":"Page"},"categories":{"downloadable_game":"游戏","demo":"体验版","add_on":"追加内容","unlock":"关卡","unlock_key":"解锁","avatar":"个人造型","theme":"主题","other":"other","other_game_related":"other_game_related","game_content":"game_content","tumbler_index":"tumbler_index","home":"home","ungrouped_game":"ungrouped_game","promo_content":"promo_content","beta":"Betas","application":"应用程序","extras":"Extras","unknown":"Unknown"},"strings":{"delimiter":"分隔字符:","yes":"是","no":"否","search":"搜寻","dlQueue":"队列","dlList":"清单","plus":"选择显示PS+游戏","queueAll":"全部","queueTo":"下载到$SYS$","noTarget":"没有可传送的主机。","exportColumnName":"域名","exportProperty":"属性"},"apis":[{"internalID":"api_entitle","name":"购买记录","desc":"此项不可关闭，将使用购买记录来建立下载列表及确认PlayStation Plus状态。"},{"internalID":"api_game","name":"类别","desc":"开启以取得更多游戏信息，包括类别及购买时间来建立下载清单。"},{"internalID":"api_queue","name":"下载队列","desc":"允许从下载队列增加/移除项目。"},{"internalID":"api_pstv","name":"PS TV","desc":"侦测Playstation Vita TV兼容游戏。目前只支持en-us区域","disabled":true}]}}},
    determineLanguage: function(e,f) {
        e = (e) ? e.split("-") : this.config.language.split("-");
        if (f === true) { this.lang = {}; this.lang = $.extend(true,{},this.lang_cache.en.us); }
        if (e[0] in this.lang_cache) {
            if (e.slice(-1) in this.lang_cache[e[0]]) {
                if (f === true) { $.extend(true,this.lang,this.lang_cache[e[0]][e.slice(-1)]); this.sanitizeLanguage(); }
                e = e[0]+"-"+e.slice(-1);
            } else {
                if (f === true) { $.extend(true,this.lang,this.lang_cache[e[0]][this.lang_cache[e[0]].def]); this.sanitizeLanguage(); }
                e = e[0]+"-"+this.lang_cache[e[0]].def;
            }
        } else {
            e = "en-us";
        }

        if (!!this.lang.rtl && this.lang.rtl == true) {
            $("#muh_games_container").addClass("rtl");
        } else {
            $("#muh_games_container").removeClass("rtl");
        }

        return e;
    },
    sanitizeLanguage: function() {
        //Send help.
        var a = JSON.stringify(this.lang, function(key, value) { if(typeof value === "string") { return value.replace(/'/g, "&apos;"); } return value; });
        this.lang = JSON.parse(a);
    },
    generateLangBox: function(e) {
        var temp = "<select id='lang_select'>";
        e = (e) ? this.determineLanguage(e) : this.determineLanguage();
        for (var i in this.lang_cache) {
            for (var h in this.lang_cache[i]) {
                if (!!this.lang_cache[i][h].local) {
                    var a = (e == i+"-"+h) ? "selected='selected'" : "";
                    temp += "<option "+a+" value='"+i+"-"+h+"'>"+this.lang_cache[i][h].local+" ["+i+"-"+h+"]</option>";
                }
            }
        }
        temp += "</select>";
        return temp;
    },
    init: function() {
        console.log("PSDLE | Init.");

        var that = this,
            match = window.location.pathname.match(/^\/([a-z\-]+)\//i),
            l = (match !== null && match.length > 1 ? match.pop() : "en-us").toLowerCase(),
            l2 = l.split("-"),
            valkAPI = (typeof window.valkyrie == "object");

        this.config = {
            valkyrie        : valkAPI,
            valkyrieInstance: Ember.Application.NAMESPACES_BY_ID["valkyrie-storefront"].__container__
        }

        //valkAPI && alert("PSDLE detected the new Valkyrie store API.\nSupport for this is currently experimental!\nAny issues should be reported here, along with region:\nhttps://github.com/RePod/psdle/issues/40")

        this.config = $.extend(this.config,{
            logoBase64      : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAAAfCAYAAAEO89r4AAABaUlEQVRoge2XS27CQAyGPSVSUVErdqzpMqveiRvALnu67Gl6D+gFuAKIPgQrs0o1TJSJJ7aJBvnbRXE8f357XoCIGyTiEBFf33+BwgMpyg/eVRNSsENEpAQWMa27agL1e7JWcmCSVSG+tF6jp1D4o/qkqN8un+Bl7JpJUxP5vH38XT2T655CtEf6olKoaFLq3ElK2heRlgq//U/KKVj4rcrvs+Y+h7Z1ow2Vv9eg6A5p53MxhnI2an0vWSmW0HI2EhUTI5vSN4T2Xem0ycZRh4h7AJgOLaQLlf1ega2br3/IQlMW6TA2dYEPc2XToyZUGtbOdMs1lyX0lqeubEpvQqVp9GhsghxPOpvY8yPA1yo+MRtCh7iWfJ/j49rOpEE2QnM55h1U7/Wcox0nb+y9lqY6dzYtmgtmqDBmqDBmqDCDGcq5Ew5xCqViHSqMGSqMGSqMGSpMp6H3unloYR0qjBkqjBkqjBkqzAUtBKxj5lT3GAAAAABJRU5ErkJggg==",
            game_page       : window.location.origin + "/" +(valkAPI ? l+"/product/" : "#!/" + l + "/cid="),
            game_api        : "https://store.playstation.com/store/api/chihiro/00_09_000/container/"+l2.slice(-1)+"/"+l2[0]+"/999/",
            lastsort        : "",
            lastsort_r      : false,
            language        : l,
            deep_search     : false,
            deep_waiting    : 0,
            deep_current    : 0,
            last_search     : "",
            dlQueue         :
            {
                base: "/kamaji/api/chihiro/00_09_000/user/notification/download",
                ps4: "/kamaji/api/chihiro/00_09_000/gateway/store/v1/users/me/notification/download",
                status: "/kamaji/api/chihiro/00_09_000/user/notification/download/status",
                status2: "/kamaji/api/chihiro/00_09_000/gateway/store/v1/users/me/notification/download/status"
            },
            use_queue       : false,
            active_consoles : {},
            tag_line        : "<div class='psdle tagline'><span id='psdle_night'>Night Mode</span><br><a href='//repod.github.io/psdle#support' target='_blank'>Support PSDLE</a> | <a href='//github.com/RePod/psdle/wiki/Submit-a-Bug-or-Translation' target='_blank'>Submit Bug/Translation</a></div>",
            has_plus        : false,
            check_tv        : false,
            tv_url          : {
                "en-us": atob("L2NoaWhpcm8tYXBpL3ZpZXdmaW5kZXIvVVMvZW4vMTkvU1RPUkUtTVNGNzcwMDgtUFNUVlZJVEFHQU1FUz9zaXplPTMwJnN0YXJ0PTA=")
            },
            iconSize        : 42,
            mobile          : false
        });

        console.log("PSDLE | Config set.");

        if (this.config.tv_url[this.config.language]) {
            this.config.tv_url = this.config.tv_url[this.config.language];
        }

        this.determineLanguage(this.config.language,true);
        this.injectCSS();

        //to-do re-implement this
        if (!this.config.valkyrie) { SonyChi_SessionManagerSingleton.getUserDevices() }

        this.genStartup();
        //this.genDisplay("progress",false);
    },
    genStartup: function() {
        if ($("#psdle_start").length == 0) {
            var that = this;

            if (window.psdleSkip && window.psdleSkip == true) {
                that.genDisplay();
            } else {
                var startup = $("<div/>",{id:"psdle_start"}).css({'background-image':'url('+repod.psdle.config.logoBase64+')'});
                //startup.append("<div style='position:absolute;line-height:11px;text-shadow:-1px -1px #000,1px -1px #000,-1px 1px #000,1px 1px #000;bottom:39px;width:180px;font-size:11px'>Please leave a review<br>for the Chrome extension!<br>It's very much appreciated.</div>");
                startup.appendTo("body");

                $(document).one("click","#psdle_start",function() {
                    $(this).remove();
                    that.genDisplay();
                });
            }
        }
    },
    genDisplay: function(mode,fake_list) {
        var that = this;

        $(document).one("change", "#sub_container > select#lang_select", function() {
            that.config.language = $(this).val();
            that.determineLanguage($(this).val(),true);
            that.genDisplay("nobind");
        });

        if (!$("#muh_games_container").length) {
            $("body").append($("<div />",{id:"muh_games_container",class:(this.config.valkyrie?"valkyrie":"")}));
        }

        $("#muh_games_container").slideUp("slow", function() {
            var a = "<div id='sub_container'><a href='//repod.github.io/psdle/' target='_blank'><img src='"+repod.psdle.config.logoBase64+"' style='display:inline-block;font-size:200%;font-weight:bold' alt='psdle' /><br><small>v"+repod.psdle.version+"</small></a></span>";

            if (mode == "progress") {
                that.config.active_consoles = {vita: 1, ps3: 1, ps4: 1}; //to-do: re-implement
                a += "<br><div id='psdle_progressbar'><div id='psdle_bar'>&nbsp;</div></div><br><span id='psdle_status'>"+that.lang.startup.wait+"</span>";
            } else {
                a += "<br><br>"+that.lang.startup.apis+"<br><br><span class='psdle_fancy_bar'>";
                $.each(that.lang.apis, function(key,con) {
                    if (con.internalID == "api_pstv" && that.config.language !== "en-us") { return 0; }
                    var off = (con.internalID == "api_game" || con.disabled) ? "toggled_off" : "";
                    a += "<span id='"+con.internalID+"' data-tooltip='"+con.desc.replace(/'/g, "&apos;")+"' class='"+off+"'>"+con.name.replace(/'/g, "&apos;")+"</span>";
                });
                a += "</span><br><br><span id='psdle_go' class='psdle_btn'>"+that.lang.startup.start+"</span><br>"+that.generateLangBox()+"<br><br>";
                //Great use of appends! Not sarcasm!
                a += $(that.config.tag_line)
                .append(" | ")
                .append($("<span />", {id: "inject_lang", text: "Inject Language"}))
                [0].outerHTML;
                a +="</div>";

                if (mode !== "nobind") {
                    $(document).on("click","#psdle_night",function() { that.darkCSS(); });
                    $(document).on("click","[id^=api_]",function() { if ($(this).attr("id") !== "api_entitle") { $(this).toggleClass("toggled_off"); } });
                    $(document).on("click","#inject_lang",function() { that.debug.inject_lang(); });
                    $(document).on("click","#psdle_go, #gen_fake", function() {
                        that.config.deep_search = !$("#api_game").hasClass("toggled_off");
                        that.config.use_queue = !$("#api_queue").hasClass("toggled_off");
                        that.config.check_tv = ($("#api_pstv").length) ? !$("#api_pstv").hasClass("toggled_off") : false;
                        that.genDisplay("progress",($(this).attr("id") == "gen_fake")?true:false);
                    });
                }
            }
            $("#muh_games_container").html(a).slideDown("slow",function() {
                if (mode == "progress") { if (fake_list) { that.debug.fake_list() } else { that.generateList(); }
                } else {
                    $("[id^=api_]").promise().done(function() {
                        if (!that.config.valkyrie) $("[id^=api_]").tooltip({position: {my: "center top", at: "center bottom"}})
                    });
                }
            });
        });
    },
    generateList: function() {
        console.log("PSDLE | Generating download list.");

        this.gamelist = [];
        var that = this;
        var i18n = this.config.valkyrieInstance.lookup('service:i18n');

        //Currently a BAD way to grab this, but the only way until big brother sorts out fighting with localStorage
        //Even when that is fixed, use s:mb.entitlements
        var entitlements = this.config.valkyrieInstance.lookup("service:macross-brain").macrossBrainInstance._entitlementStore._storage._entitlementMapCache;
        //.concat(this.e_inject_cache);

        $.each(entitlements, function(index,obj) {
            if (that.isValidContent(obj)) { //Determine if game content.
                var temp = {};

                //Constants/pre-determined.
                if (that.config.deep_search) { temp.category = "unknown"; }
                temp.productID = obj.product_id;
                temp.id        = obj.id;
                if (!that.pid_cache[temp.productID]) { that.pid_cache[temp.productID] = 1; } else { that.pid_cache[temp.productID]++; }

                if (obj.entitlement_attributes) {
                    //PS4
                    if (obj.game_meta) {
                        temp.name     = obj.game_meta.name;
                        temp.api_icon = obj.game_meta.icon_url;
                    }
                    temp.size        = obj.entitlement_attributes[0].package_file_size;
                    temp.platform    = ["PS4"];
                    temp.pkg         = obj.entitlement_attributes[0].reference_package_url
                } else if (obj.drm_def) {
                    //PS3, PSP, or Vita
                    temp.name        = (obj.drm_def.contentName) ? obj.drm_def.contentName : (obj.drm_def.drmContents[0].titleName) ? obj.drm_def.drmContents[0].titleName : "Unknown! - Submit a bug report!";
                    temp.api_icon    = obj.drm_def.image_url;
                    temp.size        = obj.drm_def.drmContents[0].contentSize;
                    temp.platform    = [];
                    temp.baseGame    = obj.drm_def.drmContents[0].titleName; //Apparently PS4 entitlements don't have this.
                    temp.publisher   = obj.drm_def.drmContents[0].spName; //Or this.
                    temp.pkg         = obj.drm_def.drmContents[0].contentUrl

                    temp.platform = that.determineSystem(obj.drm_def.drmContents[0].platformIds);
                }

                //Post-processing.
                temp.icons          = [
                    that.config.game_api+temp.id+"/image",
                    that.config.game_api+temp.productID+"/image",
                    temp.api_icon
                ];

                temp.date           = obj.active_date;
                var tempDate = new Date(temp.date);
                var toPrettyDate = {mm:tempDate.getMonth()+1, dd:tempDate.getDate(), yyyy:tempDate.getFullYear()};
                temp.prettyDate     = i18n.t("c.format.numericDateSlashes",toPrettyDate).string

                var tempSize        = require("valkyrie-storefront/utils/download").default.getFormattedFileSize(temp.size);
                temp.prettySize     = (temp.size === 0) ? "N/A" : i18n.t("c.page.details.drmDetails."+tempSize.unit,{val: tempSize.value}).string;
                temp.url            = repod.psdle.config.game_page + temp.productID;
                temp.platformUsable = temp.platform.slice(0);

                //Get Plus status
                if (!obj.drm_def && !!obj.inactive_date)    { temp.plus = true; } //PS4, Vita, PSP
                if (obj.license && obj.license.expiration)  { temp.plus = true; } //PS3
                if (temp.plus)                              { that.config.has_plus = true; }

                that.gamelist.push(temp);
            }
        });
        this.gamelist.sort(function(a,b) { return (a.date > b.date)?-1:(a.date < b.date)?1:0 });

        $.each(this.pid_cache, function (i,v) {
            if (v > 1) {
                //that.game_api.queue("pid_cache",i)
            } else {
                delete that.pid_cache[i]
            }
        })

        $.each(this.gamelist,function(a,b) {
            that.gamelist[a].index = a+1;

            if (that.config.deep_search) {
                that.game_api.queue(a+1,((that.pid_cache[b.productID] > 1)?b.id:b.productID));
            }
        });

        console.log("PSDLE | Finished generating download list. End result is "+this.gamelist.length+" item(s).");
        this.postList();
    },
    determineSystem: function(HASH) {
        var that = this,
            sys = [],
            K = require("valkyrie-storefront/utils/const").default.KamajiPlatformFlags,
            K2 = require("valkyrie-storefront/utils/const").default.KamajiPlatforms,
            _K = K

        $.each(_K, function (t,u) {
            var target = K2[t];
            0 !== ((t == "1") ? (HASH >>> 1 & u >>> 1) : (HASH & u)) && sys.push(target);
        });

        return sys;
    },
    postList: function() {
        var safe = !0;

        if (repod.psdle.config.check_tv)    { safe = !1; repod.psdle.tv.init(); }
        if (repod.psdle.config.deep_search) { safe = !1; this.game_api.run(); }
        if (safe)                           { this.table.gen(); }
    },
    isValidContent: function(obj) {
        var exp = (obj.license) ? obj.license.expiration : obj.inactive_date,
            inf = (obj.license) ? obj.license.infinite_duration : false;

        //if (obj.entitlement_type == 1 || obj.entitlement_type == 4) //Services = Ignored
        if (!this.config.includeVideo && (obj.VUData || (obj.drm_def && obj.drm_def.contentType == "TV"))) { return 0; }
        else if (!this.config.includeExpired && new Date(exp) < new Date() && !inf) { return 0; }
        else if (obj.drm_def || obj.entitlement_attributes) { return 1; }
        else { return 0; }
    },
    genSysCache: function() {
        var that = this;

        $.each(this.gamelist,function (i,v) {
            var name = that.safeGuessSystem(v.platform),
                key  = name.toLowerCase().replace("ps ","");

            that.sys_cache[key] = name;
        });
    },
    genPropCache: function() {
        //Cache the properties to prop_cache to use for exporting. Move later.
        //Also potentially just continuously extend a cache object then iterate over that.
        var that = this,
            bad = ["metadata"]; //Stuff we don't handle yet or want being exported.

        this.prop_cache = [];

        $.each(this.gamelist, function(i,c) {
            $.each(c, function(key) {
                if ($.inArray(key,bad) == -1 && $.inArray(key,that.prop_cache) == -1) {
                    that.prop_cache.push(key);
                }
            });
        });
        //Custom properties (since they're not actually stored in an entry), sloppy.
        this.prop_cache.push("vitaCompat");
        if (this.config.check_tv) { this.prop_cache.push("vitatvCompat"); }

        this.prop_cache.sort();
    },
    table: {
        bindSearch: function() {
            //Unbind for safety.
            $(document).off("click",".psdle_table tbody > tr, span[id^=system_], span[id^=filter_], span[id^=dl_], th[id^=sort_], #export_view, #export_csv").off("blur","#psdle_search_text");
            //Bind.
            $(document).keypress(function(e) { if (e.which == 13 && $("#psdle_search_text").is(":focus")) { repod.psdle.table.regen(true); } });
            $("#psdle_search_select").off("change").change(function() { repod.psdle.table.regen(true); });
            $("span[id^=system_], span[id^=filter_]").off("click").on("click", function() { $(this).toggleClass("toggled_off"); repod.psdle.table.regen(true); });
            $("th[id^=sort_]").off("click").on("click", function() { repod.psdle.sortGamelist($(this)); });
            $("#export_view").off("click").on("click", function() { repod.psdle.exportList.configure(); });
            $("#psdle_search_text").off("blur").on("blur", function() { repod.psdle.table.regen(true); });
            $("#dl_queue").one("click", function() { repod.psdle.dlQueue.generate.display(); });
            $(document).off("click", "[id^=psdle_index_]").on("click", "[id^=psdle_index_]", function(e) {
                e.preventDefault();
                if (e.shiftKey) {
                    repod.psdle.dlQueue.batch.add.auto(this);
                } else {
                    repod.psdle.dlQueue.batch.add.ask(this);
                }
            });
        },
        gen: function() {
            var that = this;

            repod.psdle.genSysCache();
            repod.psdle.genPropCache();
            repod.psdle.config.lastsort = "";
            repod.psdle.config.lastsort_r = false;

            $("#muh_games_container").css({"position":"absolute"});
            $("#sub_container").html("")
            .append(this.header.gen())
            .append("<div class='psdle_table'><table><thead><tr><th>"+repod.psdle.lang.columns.icon+"</th><th id='sort_name'>"+repod.psdle.lang.columns.name+"</th><th title='Approximate, check store page for all supported platforms.'>"+repod.psdle.lang.columns.platform+"</th><th id='sort_size'>"+repod.psdle.lang.columns.size+"</th><th id='sort_date'>"+repod.psdle.lang.columns.date+"</th></tr></thead><tbody></tbody></table></div><br>"+repod.psdle.config.tag_line);

            this.regen(true);
            this.bindSearch();

            console.log("PSDLE | Table generated.");

            $("#muh_games_container").slideDown("slow").promise().done(function() {
                that.margin();
            });
        },
        header: {
            gen: function() {
                return $("<div />", {class: "search main container"})
                    .append(this.searchOptions())
                    .append(this.stats())
            },
            searchOptions: function(dlQueue) {
                var r = $("<div />", {class: "search options container"}),
                    lang = repod.psdle.lang;

                if (!dlQueue) {
                    r.append($("<span />", {class: "psdle_fancy_bar"})
                        .append($("<span />", {id: "export_view", text: lang.labels.exportView}))
                    )
                }

                var systems = $("<span />", {class: "psdle_fancy_bar search options system"}),
                    order = ["ps1","ps2","ps3","ps4","psp","vita"];
                $.each(order, function (i,v) {
                    if (repod.psdle.sys_cache.hasOwnProperty(v)) {
                        $("<span />", {id: "system_"+v, text: repod.psdle.sys_cache[v]}).appendTo(systems);
                    }
                });
                systems.appendTo(r);

                if (repod.psdle.config.use_queue) {
                    var nid = (dlQueue) ? "dl_list" : "dl_queue",
                        tr = lang.strings[(dlQueue) ? "dlList" : "dlQueue"];

                    $("<span />", {class: "psdle_fancy_but", id: nid, text: tr}).appendTo(r);
                }

                if (!dlQueue && repod.psdle.config.deep_search) {
                    var categories = $("<div />", {class: "psdle_fancy_bar search options categories"}),
                        order = ["downloadable_game","demo","add_on","avatar","application","theme","unknown"];

                    //TO-DO: sort by order
                    $.each(repod.psdle.type_cache, function (key) {
                        var i = $("<span />", {id: "filter_"+key, text: (lang.categories[key] || key)})
                        if (order.indexOf(key) >= 0) {
                            order[order.indexOf(key)] = i;
                        } else {
                            order.push(i);
                        }
                    });
                    $.each(order, function (i,v) {
                       v.appendTo(categories);
                    });

                    categories.appendTo(r);
                }

                if (!dlQueue) {
                    var textSearch = $("<div />");
                    var sel = $("<select />", {id: "psdle_search_select", class: "search input select"});
                    var keys = {
                            "name": lang.columns.name,
                            "base": "Base Game",
                            "publisher": "Publisher",
                            "id": "Item ID",
                            "pid": "Product ID"
                        };

                    //Scope select
                    if (repod.psdle.config.deep_search) {
                        keys["genre"] = "Genre";
                        // + Metadata, description
                    }
                    $.each(keys, function (i, v) {
                        $("<option />", {value: i, text: v}).appendTo(sel);
                    })
                    sel.appendTo(textSearch);

                    //Autocomplete
                    $("<input />", {
                        id: "psdle_search_text",
                        class: "search input text",
                        type: "text",
                        list: "searchAutocomplete",
                        placeholder: lang.strings.search
                    }).appendTo(textSearch);
                    $("<datalist />", {id: "searchAutocomplete"}).appendTo(textSearch);

                    textSearch.appendTo(r);
                }

                return r;
            },
            stats: function() {
                var current = $("<span />", {class: "search stats all current"}),
                    total = $("<span />", {class: 'search stats all total'});

                var psswitch = $("<input />", {
                    type: "checkbox",
                    class: "search input plus",
                    readonly: true
                })
                .prop({"indeterminate": true})
                .click(function() {
                    if (this.readOnly) this.checked=this.readOnly=false;
                    else if (!this.checked) this.readOnly=this.indeterminate=true;

                    repod.psdle.table.regen(true);
                });

                var switchContainer =
                    $("<span />", {
                        class: "search stats plus",
                        "data-tooltip": repod.psdle.lang.strings.plus
                    })
                    .append("(")
                    .append(psswitch)
                    .append(" ")
                    .append($("<span />", {class: "search stats plus total"}))
                    .append(")");

                var out = $("<div />", {class: "psdleSearchStats"})
                            .append(current)
                            .append(" ")
                            .append(switchContainer)
                            .append(" / ")
                            .append(total);

                return out;
            }
        },
        regen: function(a) {
            if (a == true) {
                repod.psdle.determineGames();
            } else {
                var that = this,
                    temp = "",
                    plus = 0;

                repod.psdle.exportList.delimited.destroy();
                //repod.psdle.autocomplete.bind();//TO-DO

                $.each(repod.psdle.gamelist_cur,function (a,val) {
                    if (val.plus) {
                        plus++;
                    }
                    temp += repod.psdle.table_utils.gen.row(val);
                });
                temp += repod.psdle.table_utils.gen.totals();

                $(".search.stats.all.current").text(repod.psdle.gamelist_cur.length)
                $(".search.stats.all.total").text(repod.psdle.gamelist.length)
                $(".search.stats.plus.total").text(plus)

                //Generate autocomplete datalist
                $("datalist#searchAutocomplete").empty()
                $.each(repod.psdle.autocomplete_cache, function (i,v) {
                    $("<option />", {
                        value: v
                    })
                    .appendTo("datalist#searchAutocomplete")
                });

                /*TO-DO
                if (repod.psdle.config.mobile) {
                    $("#psdleplus").html("<img class='psPlusIcon' src='mobile/img/furniture/psplusicon-small.a2ec8f23.png'>");
                } else {
                    $("#psdleplus").css($(".headerUserInfo.cart").css(["background-image","background-repeat"])).css({"height":"14px","width":"14px","background-position":"left -5px"});
                }*/
                $(".psdle_table tbody").html(temp);

                this.icons.select();
            }
        },
        plus_switch: function() {
            this.regen(true);
        },
        margin: function() {
            $(".psdle_table").animate({"margin-top": $(".search.main.container").outerHeight() - $("#sub_container").css("padding-top").replace("px","")+"px"});
            this.icons.smartScroll();
        },
        icons: {
            select: function(type) {
                var that = this;

                $(document).off("scroll").on("scroll",function() {
                    that.smartScroll();
                });
                this.smartScroll();
            },
            toSize: function(url,size) {
                size = (size || repod.psdle.config.iconSize || 42);
                var suf = /\?w=\d+&h=\d+$/.test(url) ? "" : "?w=" + size + "&h=" + size
                return url + suf;
            },
            validate: function(index) {
                var that = this,
                    index = Number(index),
                    temp  = repod.psdle.gamelist[index];

                if (!temp.safe_icon) {
                    var i = repod.psdle.config.iconSize,
                        u = temp.icons.shift(),
                        url = this.toSize(u);

                    if (u == undefined) {
                        temp.safe_icon = true;
                        temp.icon = temp.api_icon;
                        that.setIcon(index);
                        return 0;
                    }

                    $.get(url)
                    .success(function() {
                        $.extend(repod.psdle.gamelist[index],{safe_icon: true, icon: u});
                        that.setIcon(index);
                    })
                    .fail(function(e) {
                        that.validate(index);
                    });
                } else {
                    that.setIcon(index);
                }
            },
            setIcon: function(index) {
                $("#psdle_index_"+index+" .psdle_game_icon").attr("src",this.toSize(repod.psdle.gamelist[index].icon));
            },
            smartScroll: function() {
                var padding = 5,
                    low     = window.scrollY,
                    high    = low + window.innerHeight,
                    that    = this,
                    t       = $("[id^=psdle_index_]").filter(function(a) { var pos = $(this).offset().top; if (pos >= low && pos <= high) { return 1; } }).filter(":first, :last"),
                    first   = ($(t[0]).index() - padding <= 0) ? 0 : $(t[0]).index() - padding,
                    last    = $(t[1]).index() + padding;

                $("[id^=psdle_index_]").slice(first,last).not(".go_icon").each(function(a) {
                    $(this).addClass("go_icon");
                    var b = this;
                    setTimeout(function() {
                        that.validate($(b).attr("id").split("_").pop());
                    }, a*50);
                });
            }
        }
    },
    determineGames: function() {
        this.exportList.delimited.destroy();
        this.gamelist_cur = [];
        this.autocomplete_cache = [];

        var that    = this,
            temp    = "",
            safesys = this.safeSystemCheck(),
            search  = (!!$("#psdle_search_text")) ? $("#psdle_search_text").val() : this.config.last_search,
            cache   = [];

        //Determine filters.
        var filters = {};

        $.each($("[id^=filter_]"), function() {
            var n = $(this).attr("id").split("_").splice(1).join("_");
            filters[n] = $(this).hasClass("toggled_off");
        });

        $("#psdle_search_text").removeClass("negate_regex");

        $.each(this.gamelist,function(index,val) {
            var sys = that.safeGuessSystem(val.platform),
                a   = true,
                t   = "";

            switch ($("#psdle_search_select").val()) {
                default:
                case "name":
                    t = val.name;
                    break;
                case "id":
                    t = val.id;
                    break;
                case "pid":
                    t = val.productID;
                    break;
                case "date":
                    t = val.date;
                    break;
                case "publisher":
                    t = val.publisher;
                    break;
                //Catalog results
                case "desc":
                    if (!!val.description) {
                        t = val.description;
                    } else { a = false; }
                    break;
                case "genre":
                    if (val.metadata && val.metadata.genre) {
                        t = val.metadata.genre.values.join(",");
                    } else { a = false; }
                    break;
                case "base":
                    if (val.baseGame) {
                        t = val.baseGame;
                    } else { a = false; }
                    break;
            }

            if ($.inArray(sys,safesys) > -1) {
                if (that.config.deep_search) {
                    if (filters[val.category]) { a = false; }
                }
                if (a == true && search !== "") {
                    var regex = search.match(/^\/(.+?)\/([imgdp]+)?$/i);

                    a = (!!regex && !!regex[2] && regex[2].toLowerCase().indexOf("d") >= 0) ? true : false;

                    if (a) {
                        $("#psdle_search_text").addClass("negate_regex"); regex[2] = regex[2].replace("d","");
                    }
                    if (!!regex) {
                        if (RegExp((regex[1])?regex[1]:search,(regex[2])?regex[2]:"").test(t)) { a = !a; }
                    }
                    else if (t && t.toLowerCase().indexOf(search.toLowerCase()) >= 0) {
                        a = !a;
                    }
                }

                if ($(".search.input.plus").prop("checked")) {
                    a = val.plus == true;
                } else if ($(".search.input.plus").prop("indeterminate")) {
                } else if (!$(".search.input.plus").prop("checked")) {
                    a = !(val.plus == true);
                }

                if (a == true) {
                    that.gamelist_cur.push(val);

                    //Prevent duplicates from filling the autocomplete.
                    if ($.inArray(t,cache) == -1) {
                        cache.push(t);
                        that.autocomplete_cache.push(t);
                    }
                }
            }
        });
        that.config.last_search = search;
        this.sortGamelist("noreverse");
    },
    sortGamelist: function(sort_method) {
        var that = this,
            rev  = true;

        if (sort_method == "noreverse") {
            rev = false; sort_method = (this.config.lastsort) ? this.config.lastsort : "sort_date"
        } else {
            sort_method = (sort_method) ? $(sort_method).attr("id") : (this.config.lastsort) ? this.config.lastsort : "sort_date";
        }
        switch (sort_method) {
            default:
            case "sort_date":
                this.gamelist_cur.sort(function (a, b) { return (a.date > b.date)?-1:(a.date < b.date)?1:0 });
                break;
            case "sort_name":
                this.gamelist_cur.sort(function (a, b) { return (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase())?1:(a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase())?-1:0 });
                break;
            case "sort_size":
                this.gamelist_cur.sort(function (a, b) { return (a.size > b.size)?1:(a.size < b.size)?-1:0 });
                break;
        }
        if (rev == true) {
            if (sort_method == this.config.lastsort) {
                if (!this.config.lastsort_r) {
                    this.gamelist_cur.reverse();
                }
                this.config.lastsort_r = !this.config.lastsort_r;
            } else {
                this.config.lastsort_r = false;
            }
        } else {
            if (this.config.lastsort_r) { this.gamelist_cur.reverse(); }
        }
        $("#psdle_sort_display").remove();
        $("#"+sort_method).append("<span id='psdle_sort_display' class='psdle_sort_"+((this.config.lastsort_r)?"asc":"desc")+"' />");
        this.config.lastsort = sort_method;
        this.table.regen();
    },
    safeSystemCheck: function() {
        var temp = [];
        $("span[id^=system_]:not('.toggled_off')").each(function() { temp.push($(this).text()); });
        return temp;
    },
    safeGuessSystem: function(sys_in) {
        //Quick, dirty, and easy. Rewrite.
        var sys = (typeof(sys_in) == "object") ? sys_in.join(" ") : sys_in;

        sys = sys.replace(/[^\w\d ]/g,"");

        if (sys == "PS3 PSP PS Vita" || sys == "PS3 PSP" || sys == "PS Vita PSP" || sys.indexOf("PSP") > -1) { sys = "PSP"; }
        else if (sys == "PS3 PS Vita" || sys.indexOf("PS Vita") > -1) { sys = "PS Vita"; }
        else if (sys == "PS3" || sys.indexOf("PS3") > -1) { sys = "PS3"; } //The exception nobody expected, for games that return "PS3 PS4"
        else if (sys == "PS4" || sys.indexOf("PS4") > -1) { sys = "PS4"; } //What could this possibly break?

        return sys;
    },
    injectCSS: function() {
        //CSS prefers " over ' to avoid string literal issues.
        var temp = '.valkyrie #export_table input,.valkyrie #export_table select,.valkyrie #lang_select{height:unset;padding:unset;margin:unset;width:unset;display:unset}#psdle_start{z-index:9001;width:84px;height:31px;position:fixed;bottom:10px;left:10px;cursor:pointer;box-shadow:0 0 10px #fff}#muh_games_container{display:none;position:absolute;top:0;right:0;left:0;color:#000;z-index:9001;text-align:center}#sub_container{padding:20px;background-color:#fff}#psdle_bar,.psdle_btn{background-color:#2185f4}#psdle_progressbar{overflow:hidden;display:inline-block;width:400px;height:16px;border:1px solid #999;margin:10px;border-radius:10px}#psdle_bar{width:0;height:100%;border-radius:10px}.psdle_btn{cursor:pointer;border-radius:13px;color:#fff;padding:1px 15px;display:inline-block;margin:5px auto}.psdle.tagline{font-size:small}.psdle.tagline>a,.psdle.tagline>span{line-height:0;cursor:pointer;color:#7f6d75!important}.psdle.tagline>a:hover,.psdle.tagline>span:hover{color:inherit!important;text-decoration:underline}.search.main.container{position:fixed;left:0;top:0;width:100%;padding:15px 0;background-color:rgba(255,255,255,.8);z-index:9001}.search.input.plus{cursor:pointer!important}.search.export{display:inline;width:95%;max-width:600px}.psdle_table,table{text-align:left;display:inline-block;border-collapse:initial}th[id^=sort]{cursor:pointer}th[id^=sort]:hover{background-color:#62a5f0}th{padding:5px!important;background-color:#2185f4;color:#fff;border:none;transition:background-color .3s}tr:hover{background-color:rgba(33,133,244,.7)!important}.valkyrie td{padding:0;border:none}td a.psdle_game_link{display:block;width:100%;height:100%;color:#000;padding:8px!important}.psdle_game_icon.is_plus{background-color:#ffd10d}tr[id^=psdle_index_].is_plus td:last-child{border-right:#ffd10d 3px solid}tr:nth-child(2n){background-color:#eee}td:nth-child(n+3):nth-child(-n+7),th:nth-child(n+3):nth-child(-n+7){text-align:center;padding:0 5px!important;position:relative}td:first-child{text-align:center;position:relative}#psdle_search_select,#psdle_search_text{font-size:large;padding:5px 10px;border:1px solid #f0f0f0;display:inline-block;width:auto}#psdle_search_select{background-color:#f0f0f0;text-align:center}#psdle_search_text{font-size:large;max-width:480px;width:100%}.negate_regex{background-color:#ff8080!important;color:#fff}.psdle_fancy_bar>span,span#export_view,span[id^=dl_],span[id^=filter_],span[id^=system_]{font-weight:700;font-size:.9em;color:#fff;background-color:#2185f4;display:inline-block;margin-right:2px;margin-bottom:5px;padding:1px 10px;cursor:pointer}.psdle_fancy_but{border-radius:12px}#muh_games_container:not(.rtl) .psdle_fancy_bar>span:first-of-type{border-top-left-radius:12px;border-bottom-left-radius:12px}#muh_games_container:not(.rtl) .psdle_fancy_bar>span:last-of-type{border-top-right-radius:12px;border-bottom-right-radius:12px}.toggled_off{background-color:rgba(33,133,244,.4)!important}#muh_games_container:not(.rtl) #psdle_search_select{border-radius:90px 0 0 90px}#psdle_search_text{border-radius:0 90px 90px 0}.psdle_game_icon{max-width:100%;vertical-align:middle;padding:3px;min-width:42px;min-height:42px}.psdle_sort_asc,.psdle_sort_desc{float:right;width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent}.psdle_sort_asc{border-bottom:5px solid #fff}.psdle_sort_desc{border-top:5px solid #fff}#dlQARating,#dlQAStat{color:#fff;background-color:rgba(33,133,244,.8);font-size:small}#dlQueueAsk{width:400px;height:400px}#dlQAN{background-color:rgba(33,133,244,.8);padding:7px 15px;color:#fff;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}#dlQASys{position:absolute;bottom:0;padding:7px 0;color:#fff;display:table;width:100%;table-layout:fixed}#dlQASys>div{display:table-cell}#dlQASys>div>div{cursor:pointer;background-color:rgba(33,133,244,.8);border-radius:10px;padding:2px;margin:0 10px;box-shadow:0 0 30px #000;transition:background-color .5s,box-shadow .5s}#dlQASys>div>div:hover{background-color:rgba(33,133,244,1);box-shadow:0 0 30px rgba(33,133,244,1)}#dlQAStat{border-bottom-left-radius:20px;padding:0 10px 0 15px;float:right}#dlQARating{border-bottom-right-radius:20px;padding:0 15px 0 10px;float:left}.success{background-color:#237423!important}.failure{background-color:#a43636!important}#dlQueueExt{overflow:hidden;position:absolute;left:10px;right:10px;bottom:40px;font-size:.8em;background-color:rgba(33,133,244,.8);padding:10px;border-radius:9px;top:66px;text-align:left}.cover,.cover>div>div{background-size:cover}.cover{z-index:9001;position:fixed;top:0;left:0;width:100%;height:100%;display:table;background-color:rgba(0,0,0,.25);background-position:center}.cover>div{display:table-cell;vertical-align:middle;height:inherit;text-align:center}.cover>div>div{box-shadow:0 0 30px #000;display:inline-block;background-color:#fff;border-radius:20px;overflow:hidden;position:relative}#export_select{padding:10px;background-color:#fff;color:#000}#export_select>div{border-top-left-radius:10px;border-top-right-radius:10px;overflow-y:auto;overflow-x:hidden;max-height:490px}#export_table{width:100%}#slider,.handle{display:inline-block}#slider{vertical-align:bottom;cursor:pointer;width:30px;height:12px;border-radius:10px;border:2px solid #f0f0f0}.handle_container{text-align:center;width:100%;height:100%}.handle{width:10px;height:10px;border-radius:100%;margin:0 2px 6px;border:1px solid #fff;background-color:#85c107}[data-tooltip]{position:relative;z-index:2;cursor:pointer}[data-tooltip]:after,[data-tooltip]:before{visibility:hidden;opacity:0;pointer-events:none}[data-tooltip]:before{--width:300px;position:absolute;top:150%;left:50%;margin-left:calc(var(--width)/2*-1);padding:7px;width:var(--width);border-radius:3px;background-color:rgba(33,133,244,.9);color:#fff;content:attr(data-tooltip);text-align:center;font-size:.9em;line-height:1.2;box-shadow:0 0 10px #fff}[data-tooltip]:after{position:absolute;top:calc(150% - 5px);left:50%;margin-left:-5px;width:0;border-bottom:5px solid rgba(33,133,244,.9);border-right:5px solid transparent;border-left:5px solid transparent;content:" ";font-size:0;line-height:0}[data-tooltip]:hover:after,[data-tooltip]:hover:before{visibility:visible;opacity:1}.ui-autocomplete{z-index:9002;max-width:590px;max-height:200px;overflow-y:auto;overflow-x:hidden}.ui-menu{position:fixed;border:2px solid #f0f0f0;border-top:none;background-color:#fff}.ui-menu>.ui-menu-item *{color:#000;text-decoration:none;white-space:nowrap;text-overflow:ellipsis;cursor:pointer}.ui-menu>.ui-menu-item:nth-child(even){background-color:#e6e6e6}.ui-menu-item .ui-state-focus{display:inline-block;width:100%;color:#000;background-color:rgba(33,133,244,.7)}.psdletv{font-style:italic;font-weight:700;font-size:.6em;vertical-align:text-top;position:absolute;top:4px}.psp3{border-left:2px solid #2185f4;border-right:2px solid #2185f4}.psp2{background-color:rgba(33,133,244,.15)!important}#muh_games_container.rtl{direction:rtl}.rtl #psdle_search_select{border-radius:0 90px 90px 0}.rtl #psdle_search_text{border-radius:90px 0 0 90px}.rtl .psdle_fancy_bar span:last-of-type{border-top-left-radius:12px;border-bottom-left-radius:12px}.rtl .psdle_fancy_bar span:first-of-type{border-top-right-radius:12px;border-bottom-right-radius:12px}.rtl #muh_table{text-align:right!important}.rtl tr.is_plus[id^=psdle_index_] td:last-child{border-right:none;border-left:#ffd10d 3px solid}.psdledark #sub_container{background-color:#222;color:#e7e7e7}.psdledark a.psdle_game_link{color:#e7e7e7}.psdledark .search.main.container{background-color:rgba(34,34,34,.7)}.psdledark tr{background-color:#222}.psdledark tr:nth-child(2n){background-color:#393939}';
        $("head").append('<style type="text/css">'+temp+'</style>');
    },
    darkCSS: function() {
        $("#muh_games_container").toggleClass("psdledark");
    },
    exportList: {
        config: [], //Default export template.
        configure: function() {
            //TO-DO: window max-height: 80%;
            if (this.config.length == 0) { //If export template is empty, set translated defaults.
                this.config = [
                    {name: repod.psdle.lang.columns.name, target: "name"},
                    {name: repod.psdle.lang.columns.platform, target: "platform"},
                    {name: repod.psdle.lang.columns.size, target: "prettySize"},
                    {name: repod.psdle.lang.columns.date, target: "prettyDate"}
                ];
            }

            var that = this;

            //Gen input
            var w = "<div id='export_select'><div>" + this.genTable() + "</div>";

            //Gen output
            w += "<br><span class='psdle_fancy_bar'><span id='export_row_del'>-</span><span id='export_row_add'>+</span></span><br><span class='psdle_fancy_bar'><span id='sel_export_view'>"+repod.psdle.lang.labels.exportView+"</span><span id='sel_export_json'>JSON</span><span id='sel_export_csv'>CSV</span>"

            //Generate window.
            $("<div />",{id:"export_configure",class:"cover"}).append($("<div />").append(w)).appendTo("#muh_games_container");

            //Bind
            $("#export_row_add").off("click").on("click", function(event) { $("#export_table tbody").append(that.genRow()); }); //Add row.
            $("#export_row_del").off("click").on("click", function(event) { $("#export_table tr:gt(1)").last().remove(); }); //Remove row.
            $("#sel_export_view").off("click").on("click", function () { that.saveConfig(); that.delimited.handle(); $("#export_configure").remove(); });
            $("#sel_export_csv").off("click").on("click", function () { that.saveConfig(); that.csv.handle(); $("#export_configure").remove(); });
            $("#sel_export_json").off("click").on("click", function () { that.saveConfig(); that.json.handle(); $("#export_configure").remove(); });
            $("#export_configure").off("click").one("click", function() { $(this).remove(); repod.psdle.newbox.bind("off"); });
            $("#export_select").off("click").on("click", function(event) { event.stopPropagation(); });
        },
        genTable: function() {
            var table = "",
                select = this.genSelect(),
                max = (this.config.length || 5);

            table += "<table id='export_table'><tr><th>"+repod.psdle.lang.strings.exportColumnName+"</th><th>"+repod.psdle.lang.strings.exportProperty+"</th></tr>";
            for (i=0; i<max; i++) {
                var text = (this.config[i]) ? this.config[i].name : "",
                    select2 = select.clone();

                if (this.config[i]) {
                    select2.find("[value="+this.config[i].target+"]").attr("selected","selected");
                }

                select2 = select2[0].outerHTML;
                table += this.genRow(text,select2);
            }
            table += "</table>";

            return table;
        },
        genRow: function(text,select) {
            text = (text) ? text : "";
            select = (select) ? select : this.genSelect()[0].outerHTML;
            return "<tr><td><input placeholder='...?' value='"+text+"'></td><td>"+select+"</td></tr>";
        },
        genSelect: function() {
            var select = $("<select />");

            $.each(repod.psdle.prop_cache, function(i, name) {
                select.append($("<option />", {text: name, value: name}));
            });

            return select;
        },
        saveConfig: function() {
            var config = $("#export_select").find("table tr:gt(0)"),
                columns = [];

            config.each(function() {
                columns.push({
                    name: $(this).find("input").val(),
                    target: $(this).find("select option:selected").val(),
                });
            });

            this.config = columns;
        },
        delimited: {
            gen: function(sep) {
                var sep = (sep) ? sep : "\t",
                    t   = repod.psdle.exportList.formatRow(sep);

                $(repod.psdle.gamelist_cur).each(function(i) { t += repod.psdle.exportList.formatRow(sep,i); });
                t += repod.psdle.exportList.formatRow(sep,-1);
                return t;
            },
            handle: function() {
                this.destroy();

                $("<textarea />", {
                    class: "search export",
                    text: this.gen(prompt(repod.psdle.lang.strings.delimiter,"\t"))
                })
                .insertAfter(".psdleSearchStats");

                repod.psdle.table.margin();
            },
            destroy: function () { $(".search.export").remove(); repod.psdle.table.margin(); }
        },
        //json: function() { return (!!JSON.stringify) ? JSON.stringify(repod.psdle.gamelist_cur) : "Browser does not have JSON.stringify()!"; },
        json: {
            gen: function() {
                var tempjson = {"columns":{},"items":[]};
                var config = repod.psdle.exportList.config;

                $.each(config, function(key,val) {
                    tempjson.columns[val.target] = val.name
                });

                $.each(repod.psdle.gamelist_cur, function(i) {
                    var tempprop = {}, item = repod.psdle.gamelist_cur[i];

                    $.each(config, function(key,val) {
                        tempprop[val.target] = repod.psdle.exportList.format(i,val.target,"JSONExp")
                    });

                    tempjson.items.push(tempprop);
                });

                return tempjson;
            },
            handle: function() {
                $("<a>",{
                  "download" : "psdle_"+(new Date().toLocaleString().replace(/[:\/]/g,"-"))+".json",
                  "href" : "data:text/csv;charset=utf-8,"+encodeURIComponent(JSON.stringify(this.gen()))
                })[0].dispatchEvent(new MouseEvent("click"));
            }
        },
        csv: {
            gen: function(sep) {
                var sep  = (sep) ? sep : ",",
                    csv  = repod.psdle.exportList.formatRow(sep);

                $.each(repod.psdle.gamelist_cur,function(i) {
                    csv += repod.psdle.exportList.formatRow(sep,i);
                });

                csv += repod.psdle.exportList.formatRow(sep,-1);

                return csv;
            },
            handle: function() {
                var that = this;

                $("<a>",{
                  "download" : "psdle_"+(new Date().toLocaleString().replace(/[:\/]/g,"-"))+".csv",
                  "href" : "data:text/csv;charset=utf-8,"+encodeURIComponent(this.gen())
                })[0].dispatchEvent(new MouseEvent("click"));
            }
        },
        format: function(index,target,sep) {
            var item = repod.psdle.gamelist_cur[index],
                toJSON = (sep == "JSONExp"),
                yes = (toJSON) ? true : repod.psdle.lang.strings.yes,
                no = (toJSON) ? false : repod.psdle.lang.strings.no;

            switch (target) {
                //Exceptions.
                case "category": return (repod.psdle.lang.categories[item.category] || item.category); break;
                case "platform": return repod.psdle.safeGuessSystem(item.platform); break;
                case "vitaCompat": return ($.inArray("PS Vita",item.platformUsable) > -1) ? yes : no; break;
                case "vitatvCompat": return (repod.psdle.config.check_tv && repod.psdle.id_cache[item.productID].tvcompat && repod.psdle.safeGuessSystem(item.platform) == "PS Vita") ? yes : no; break;
                default: //Generics
                    var temp = item[target];
                    if (!temp) break;
                    if (typeof temp == "boolean") { temp = (temp) ? yes : no }
                    if (typeof temp == "object") { temp = (toJSON) ? temp : JSON.stringify(temp).replace(/"/g,"'"); }
                    if (typeof temp == "string") { temp = temp.replace(/([\r\n]+?)/gm," "); }
                    return (typeof temp == "string" && temp.indexOf(sep) > -1) ? "\""+temp+"\"" : temp;
                    break;
            }

            return (toJSON) ? undefined : "";
        },
        formatRow: function(sep,index) {
            //Use this.config{} and this.tl{}.
            var that = this,
                out  = "",
                sep  = (sep) ? sep : ",";

            if (index >= 0) {
                var b = repod.psdle.gamelist_cur[index],
                    yes = repod.psdle.lang.strings.yes,
                    no = repod.psdle.lang.strings.no;

                $.each(this.config, function(key,val) {
                    if (val) {
                        out += that.format(index,val.target,sep) + sep;
                    }
                });

                out += "\n";
            } else if (index == -1) {
                //Footer.
                //To-do: Reimplement totals based on selected columns.
                $.each(this.config, function(index,val) { out += val.target+sep; }); //Align to columns.
                out += "\""+JSON.stringify(this.config).replace(/"/g,"'")+"\""; //JSON in extra column.
            } else {
                //Generally the first row, but more so a catch-all that spits out column names.
                $.each(this.config, function(index,val) {
                    out += val.name+sep;
                });

                out += "\n";
            }

            return out;
        }
    },
    game_api: {
        batch: [],
        queue: function(index,pid) {
            var that = this,
                a    = {pid:pid,index:index};

            //Do some queue/delay magic here.
            if (index == "pid_cache") {
                this.batch.push(a)
            } else {
                this.batch.unshift(a);
            }
        },
        ran: false,
        run: function() {
            var that = this,
                catalog = repod.psdle.config.valkyrieInstance.lookup('service:susuwatari');

            if (this.batch.length == 0) {
                /*console.log('run called!',repod.psdle.type_cache);
                if (!this.ran) {
                    this.ran = true;
                    console.log('table gen!', repod.psdle.type_cache);
                    repod.psdle.table.gen();
                }*/
                return 0;
            }

            this.batch.splice(0,1).forEach(function(i, e) {
                catalog.resolve(i.pid)
                .then(function (data) {
                    if (data.response && data.response.status == 404) return 0;

                    var parse = that.parse(data),
                        cached = repod.psdle.pid_cache.hasOwnProperty(data.id);
                    repod.psdle.type_cache[parse.category] = true;

                    if (cached) {
                        repod.psdle.pid_cache[data.id] = parse;
                    }

                    //BAD WITH PROMISES 101, this is probably a huge performance hit
                    var target = repod.psdle.gamelist.find(function (i) { return i.id == data.id });

                    if (target.hasOwnProperty("index")) {
                        $.extend(repod.psdle.gamelist[target.index-1], parse);
                    }

                    that.called++;
                })
                .catch(function(e){ that.called++; repod.psdle.type_cache["unknown"] = true; })
                .then(function() { that.run(); that.updateBar(); });
            });
        },
        called: 0,
        updateBar: function() {
            var that  = this,
                l     = this.called, //Math.abs(repod.psdle.gamelist.length - this.batch.length),
                r     = repod.psdle.gamelist.length,
                w     = $('#psdle_bar').width(),
                pW    = $('#psdle_bar').parent().width(),
                p     = Math.round(100*w/pW),
                q     = Math.round(100*l/r);

            if (100*l/r == 100) { repod.psdle.table.gen(); } //Ultimate in promise abuse technology.

            if (q > p) { $("#psdle_progressbar > #psdle_bar").stop().animate({"width":q+"%"}); }
            $("#psdle_status").text(l+" / "+r).click(that.run());
        },
        parse: function(data) {
            var extend = {},
                regexClassic = /^(PS\d+)_\w+\+?$/i;

            $.each([data.secondaryClassification, data.primaryClassification], function (i,v) {
                if (regexClassic.test(v)) {
                    extend.platform = repod.psdle.safeGuessSystem(v.match(regexClassic).pop());
                    return false;
                }
            });

            if (data.mediaList) {
                extend.images = [];
                extend.videos = [];

                var regexImg = new RegExp('\\.(png|jpg)$','i'),
                    regexVid = new RegExp('\\.mp4$','i'),
                    media = []
                    .concat(data.mediaList.screenshots)
                    .concat(data.mediaList.promo.images)
                    .concat(data.mediaList.promo.videos);

                $.each(media, function(i,v) {
                    if (regexImg.test(v.url)) { extend.images.push(v.url); }
                    else if (regexVid.test(v.url.split("?")[0])) { extend.videos.push(v.url); }
                });

            }

            extend.baseGame = (data.name || undefined)
            extend.category = (data.topCategory || "unknown");
            extend.description = (data.longDescription || undefined)
            extend.displayPrice = ((data.mbSkus && data.mbSkus[0] && data.mbSkus[0].display_price) || undefined)
            //extend.metadata = (data.metadata || undefined)
            extend.publisher = (data.providerName || undefined)
            extend.rating = ((data.starRating && data.starRating.score) || undefined)
            extend.releaseDate = (data.releaseDate || undefined) //TO-DO: prettify?
            //if (data.age_limit && data.content_rating) { extend.ageLimit = data.content_rating.rating_system + " " + data.age_limit; }

            return extend;
        }
    },
    dlQueue: {
        batch: {
            cache: {},
            get: function(prev_sys) {
                if (!prev_sys) { this.cache = {"ps3":[], "ps4":[], "vita":[]} }

                var that = this,
                    base_url = repod.psdle.config.dlQueue.status+"/?status=notstarted&status=stopped&status=waitfordownload&platformString=$$1&size=100",
                    consoles = [];

                for (var i in repod.psdle.config.active_consoles) {
                    consoles.push(i)
                }

                var index = $.inArray(prev_sys,consoles) + 1,
                    n = consoles[index];

                if (n) {
                    $.getJSON(base_url.replace("$$1",n))
                    .fail(function() {
                        console.error("PSDLE | DL Queue parse error for \""+n+"\". Is it activated on the account?");
                    })
                    .success(function(data) {
                        that.cache[n] = data.data.notifications;
                    })
                    .complete(function() {
                        that.get(n);
                    });
                } else {
                    repod.psdle.dlQueue.generate.table();
                }
            },
            send: function(index,sys) {
                var that = this,
                    Kamaji = repod.psdle.config.valkyrieInstance.lookup('service:kamaji/downloads'),
                    KPlatforms = require("valkyrie-storefront/utils/const").default.KamajiPlatforms,
                    id = repod.psdle.gamelist[index].id;

                this.recordQueue.push({"sys":sys, "id":id})

                switch (sys) {
                    case 'ps4':
                        Kamaji.startPS4Download(id)
                        break;
                    case 'ps3':
                    case 'vita':
                    case 'psvita':
                        sys = ((sys == "vita") ? "psvita" : sys).toUpperCase();
                        Kamaji.startDRMDownload(KPlatforms[sys], id).then(function(a) {
                            that.recordProcess()
                        })
                        break;
                    default:
                        break;
                }
            },
            recordQueue: [],
            recordProcess: function() {
                //TO-DO: Lookup download record, close but not quite Valkyrie accurate (bogus promise?)
                var Kamaji = repod.psdle.config.valkyrieInstance.lookup('service:kamaji/downloads'),
                    record = this.recordQueue.splice(0,1)[0];

                if (Kamaji.waitingDownloads[(record.sys+"Downloads")].find(function (a) { return a == record.id }) !== undefined) {
                    this.good($("[id^=dla_"+record.sys+"]"));
                } else {
                    this.bad($("[id^=dla_"+record.sys+"]"));
                }
            },
            good: function(target) { $(target).addClass('success'); },
            bad: function(target) { $(target).addClass('failure'); },
            add: {
                ask: function(e) {
                    //Ask which system to queue for. (cannot validate outside of this.go() response, if we care)
                    //See notes for determining active consoles, probably the way to go.
                    repod.psdle.newbox.open($(e).attr("id").split("_").pop());
                },
                auto: function(e) {
                    var index = (isNaN(e)) ? Number($(e).attr("id").split("_").pop()) : Number(e), //Target index to read from.
                        active = repod.psdle.config.active_consoles,
                        item = repod.psdle.gamelist[index];

                    //Determine target queue based on assumed intent and priority. For instance: PSP/Vita to Vita. If no Vita, to PS3. Otherwise give up.
                    var sys = item.platformUsable;
                    if ($.inArray("PS Vita", sys) >= 0) { sys = (active.vita) ? "vita" : (active.ps3) ? "ps3" : false; }
                    else if ($.inArray("PS3", sys) >= 0 || $.inArray("PSP", sys) >= 0) { sys = (active.ps3) ? "ps3" : false; }
                    else if ($.inArray("PS4", sys) >= 0) { sys = (active.ps4) ? "ps4" : false; }

                    if (sys == false) {
                        alert(repod.psdle.lang.strings.noTarget);
                    } else {
                        if ($(e).data("queued")) {
                            $(e).removeData("queued").animate({"background-color":""});
                            repod.psdle.dlQueue.batch.remove.go(sys,item.id,true);
                        } else {
                            $(e).data("queued", true);
                            this.parse(index,sys,e);
                        }
                    }
                }
            },
            remove: {
                parse: function(e) {
                    this.go($(e).children("td:eq(3)").text().replace("PS ","").toLowerCase(),repod.psdle.gamelist[Number($(e).attr("id").split("_").pop())].id);
                },
                go: function(sys,id,auto) {
                    //Remove game from batch.
                    repod.psdle.dlQueue.batch.send(sys,id,true,(auto)?undefined:repod.psdle.dlQueue.batch.get())
                }
            }
        },
        generate: {
            bindings: function () {
                repod.psdle.newbox.bind("off");
                //$(document).on("click","span[id^=system_], span[id^=filter_]", function() { $(this).toggleClass("toggled_off"); repod.psdle.table.regen(); });
                //$(document).on("click","th[id^=sort_]", function() { repod.psdle.sortGamelist($(this)); });
                $(document).one("click","#dl_list", function() { repod.psdle.table.gen(); });
                $(document).off("click","[id^=psdle_index_]").on("click","[id^=psdle_index_]", function(e) { e.preventDefault(); repod.psdle.dlQueue.batch.remove.parse(this); });
            },
            table: function() {
                var temp = "";

                $(".psdle_table").remove();
                $("#sub_container").append("<div class='psdle_table'><table style='display:inline-block;text-align:left'><thead><tr><th>"+repod.psdle.lang.columns.icon+"</th><th id='sort_name'>"+repod.psdle.lang.columns.name+"</th><th>"+repod.psdle.lang.columns.platform+"</th><th> > </th><th id='sort_size'>"+repod.psdle.lang.columns.size+"</th><th id='sort_date'>"+repod.psdle.lang.columns.date+"</th></tr></thead><tbody></tbody></table></div>");

                $.each(repod.psdle.dlQueue.batch.cache, function(key,value) {
                    if (value.length) {
                        $.each(value, function(index,val) {
                            $.each(repod.psdle.gamelist, function(a,b) {
                                if (b.id == val.contentId) {
                                    var c = val; c.to_sys = key;
                                    temp += repod.psdle.table_utils.gen.row(b,c);
                                }
                            });
                        });
                    }
                });

                $(".psdle_table tbody").html(temp);
                repod.psdle.table.margin();
            },
            display: function() {
                this.bindings();
                $("#sub_container").html("").append(repod.psdle.genSearchOptions(true));
                repod.psdle.dlQueue.batch.get();
            },
            destroy: function() {
                $("#sub_container").html("");
            }
        }
    },
    table_utils: {
        random: function() {
            var r = repod.psdle.gamelist_cur[Math.floor((Math.random() * repod.psdle.gamelist_cur.length))].index - 1;
            repod.psdle.newbox.open(r);
            return r;
        },
        gen: {
            row: function(val,dlQueue) {
                var u = repod.psdle.config.game_page+val.id,
                    pg = 50, //(page sizes between desktop/mobile, mobile can't hover anyway)
                    icon = (val.safe_icon) ? val.icon : "",
                    is_plus = (val.plus) ? "is_plus" : "",
                    sys = repod.psdle.safeGuessSystem(val.platform),
                    //style='background-image:url(\""+bg+"\")' bg = (val.images && val.images.length > 0) ? val.images[0] : "",
                    iS = repod.psdle.config.iconSize+"px",
                    temp = "<tr id='psdle_index_"+(val.index -1)+"' class='"+is_plus+"'><td style='max-width:"+iS+";max-height:"+iS+";'><a target='_blank' href='"+val.url+"'><img title='"+repod.psdle.lang.labels.page+" #"+Math.ceil(val.index/pg)+"' class='psdle_game_icon "+is_plus+"' /></a>"+"</td><td><a class='psdle_game_link' target='_blank' href='"+u+"'>"+val.name+"</a></td>";

                var can_vita = (sys == "PS Vita") ? false : ($.inArray("PS Vita",val.platformUsable) > -1) ? true : false;
                can_vita = (can_vita) ? "class='psp2'" : "";

                if (dlQueue) {
                    temp += "<td>"+sys+"</td><td>"+dlQueue.to_sys.toUpperCase().replace("VITA","PS Vita")+"</td><td>"+val.prettySize+"</td><td>"+dlQueue.createdTime+"</td>"//convertToNumericDateSlashes(convertStrToDateObj())
                } else {
                    temp += "<td "+can_vita+">"+sys+((repod.psdle.config.check_tv && repod.psdle.id_cache[val.productID].tvcompat && sys == "PS Vita")?"<span class='psdletv'>TV</span>":"")+"</td><td>"+val.prettySize+"</td><td>"+val.prettyDate+"</td>";
                }
                temp += "</tr>";

                return temp;
            },
            totals: function() {
                var a = 0;
                var out_size = "";
                var i18n = repod.psdle.config.valkyrieInstance.lookup('service:i18n');

                $.each(repod.psdle.gamelist_cur, function(b,c) { a += c.size; });
                var tempSize = require("valkyrie-storefront/utils/download").default.getFormattedFileSize(a);
                out_size = (a > 0) ? i18n.t("c.page.details.drmDetails."+tempSize.unit,{val: tempSize.value}) : "";

                return "<tr id='psdle_totals'><td /><td /><td /><td>"+out_size+"</td><td /></tr>";
            }
        }
    },
    newbox: {
        generate: function(index) {
            var plus = "",
                game = repod.psdle.gamelist[index],
                id   = (game.index -1),
                icon = game.icon;
                dialog = $("<div>", {
                            id: "dlQueueAsk",
                            style: "background-image:url(\""+repod.psdle.table.icons.toSize(icon,400)+"\");"
                         });

            try { if (game.plus) { plus = $("#psdleplus").clone()[0].outerHTML+" "; } } catch(e) {}
            dialog.append($("<div>", {id:"dlQAN"} ).append(plus+game.name));

            if (repod.psdle.config.use_queue) {
                var temp = $.grep(game.platformUsable.slice(0), function(V) { return V !== "PSP" }), //Make sure we don't have PSP
                    t    = $("<div>", {id:"dlQASys"} );

                if (temp.length > 1) {
                    //t.append($("<div>").append($("<div>", {id:"dla_all_"+id,text:repod.psdle.lang.strings.queueAll} ))); //TO-DO: #bringback

                    $.each(temp,function(a,b) {
                        var c = b.replace(/ps /i,"").toLowerCase(), d = (repod.psdle.config.active_consoles.hasOwnProperty(c)) ? "" : "toggled_off";
                        t.append($("<div>").append($("<div>", {id:"dla_"+c+"_"+id,class:d,text:b} )))
                    });
                } else {
                    var c = temp[0].slice(0).replace(/ps /i,"").toLowerCase(), d = (repod.psdle.config.active_consoles.hasOwnProperty(c)) ? "" : "toggled_off";
                    t.html($("<div>").append($("<div>",{id:"dla_"+c+"_"+id,class:d,text:repod.psdle.lang.strings.queueTo.replace("$SYS$",game.platformUsable[0].slice(0))})))
                }
                dialog.append(t);
            }

            try { if (game.rating) { var star = $("<div>", {class:"star-rating rater-0 ratingStarGeneric star-rating-applied star-rating-readonly star-rating-on",style:"display:inline-block !important;float:none !important;vertical-align:text-top"} ).append($("<a>",{text:""}))[0].outerHTML; dialog.append($("<div>", {id:"dlQARating"} ).append(star+" "+game.rating+" / 5")); } } catch (e) { }

            dialog.append($("<div>", {id:"dlQAStat",html:repod.psdle.safeGuessSystem(game.platform)+" | <div style='display:inline'>"+game.prettySize+"</div> | "+game.prettyDate} ));

            dialog = $("<div>", {id:"dlQueue_newbox",class:"cover"} ).append($("<div>").append(dialog[0].outerHTML));

            //Combine videos (if not mobile) and images into a single array.
            var media = [];
            //if (repod.psdle.config.mobile && game.videos) { $.each(game.videos, function(a,b) { media.push({"type":"video","url":b}); }); }
            if (game.images) { $.each(game.images, function(a,b) { media.push({"type":"image","url":b}); }); }
            if (media.length > 0) {
                //Pick a random media item and set it as the background.
                var media = media[Math.floor(Math.random() * media.length)];
                if (media.type == "video") {
                    //Set the video as the background.
                    $(dialog).prepend('<div style="z-index:-1;position:absolute;top:0px;left:0px;right:0px;bottom:0px;background-color:#000"><video style="min-height:100%;" autoplay loop muted><source src="'+game.videos[0]+'" type="video/mp4"></video></div>');
                }
                if (media.type == "image") {
                    //Set the image as the background
                    $(dialog).css("background-image","url('"+game.images[Math.floor(Math.random() * game.images.length)]+"')");
                }
            } else {
                //Set the original icon (at maximum possible resolution) as the background.
                //$(dialog).children("div").css("background","transparent url('"+icon.replace(/(w|h)=\d+/g,"")+"') no-repeat scroll center center / cover");
            }

            return dialog[0].outerHTML;
        },
        bind: function(e) {
            var that = this;

            switch (e) {
                case "on":
                default:
                    //$("#dlQueueAsk").draggable({handle:"#dlQAN",containment:"parent"});

                    $("#dlQueue_newbox").one("click", function() {
                        that.close();
                    });

                    $("#dlQueueAsk").on("click", function(event) {
                        event.stopPropagation();
                    });

                    $("div[id^=dla_]:not('.toggled_off')").on("click", function() {
                        repod.psdle.dlQueue.batch.send($(this).attr("id").split("_")[2],$(this).attr("id").split("_")[1]);
                    });
                    break;

                case "off":
                    $("div[id^=dla_]").off("click");
                    $("#dlQueueAsk").off("click");
                    break;
            }
        },
        open: function(index) {
            repod.psdle.table.icons.validate(index,-1);

            if ($("#dlQueue_newbox").length) this.close();

            $("#muh_games_container").append(this.generate(index)).promise().done(function() { repod.psdle.newbox.bind(); });
        },
        close: function() {
            $("#dlQueue_newbox").remove();
            this.bind("off");
        }
    },
    tv: {
        url_cache: [],
        init: function() {
            console.log("PSDLE | Starting PS TV checks.");
            $.each(repod.psdle.gamelist, function(index,val) {
                repod.psdle.id_cache[val.productID] = {"tvcompat": false};
            });

            this.fetchList();
        },
        fetchList: function() {
            var that = this;

            $.getJSON(repod.psdle.config.tv_url,function(a) {
                $.each(a.links,function(c,b) {
                    that.url_cache.push(b.url/*+"?size=30&start=0"*/);
                });
            }).done(function() { that.run(); });
        },
        run: function() {
            var that = this,
                url  = this.url_cache.pop();

            if (url) {
                $.getJSON(url)
                .success(function(a) {
                    that.parse(url,a);
                })
                .fail(function() {
                    that.run();
                });
            } else {
                if (!repod.psdle.config.deep_search) { repod.psdle.table.gen(); }
            }
        },
        parse: function(url,a) {
            var next = url.replace(/start=\d+/,"start="+(Number(url.match(/start=(\d+)/).pop()) + Number(url.match(/size=(\d+)/).pop())));

            if (a.total_results && a.start + a.size < a.total_results) {
                this.url_cache.push(next);
            }

            $.each(a.links, function(index,val) {
                if (repod.psdle.id_cache[val.id]) {
                    repod.psdle.id_cache[val.id].tvcompat = true;
                }
            });

            this.run();
        }
    },
    debug: {
        die: function() {
            /* Obviously.   */ $("#muh_games_container").remove();
            /* CSS          */ $("#psdle_css").remove();
            /* Just 'psdle' */ delete repod.psdle;
        },
        inject_lang: function() {
            var lang = prompt("Insert JSON formatted language: (current below)",JSON.stringify(repod.psdle.lang));

            try {
                lang = JSON.parse(lang);
                repod.psdle.lang = {};
                repod.psdle.lang = repod.psdle.lang_cache.en.us;
                $.extend(true,repod.psdle.lang,lang);
                repod.psdle.genDisplay("nobind");
            } catch (e) {
                alert(e);
            }
        },
        fake_list: function() {
            //Generate a fake download list based on currently viewable items.
            //Dates are generated randomly.
            //Best used on a page showing only game content.
            if ($(".cellGridGameStandard").length > 0) {
                $.each($(".cellGridGameStandard"), function(index) {
                    var temp = {};

                    temp.category = "unknown";
                    temp.productID = $(this).find(".permalink").attr("href").split("cid=").pop();
                    temp.id = temp.productID;
                    temp.index = repod.psdle.gamelist.length + 1;
                    temp.name = $(this).find(".cellTitle").text();
                    temp.platform = [ $(this).find(".pforms").text().split("|").pop() ];

                    //Random values
                    temp.size = Math.floor(Math.random() * 19999994000); //Size, in bytes.
                    temp.plus = (Math.random() < 0.5);
                    if (temp.plus) { repod.psdle.config.has_plus = true; } //PS+
                    min = new Date(); min.setDate(min.getDate() - 365*4); min = min.getTime(); temp.date = new Date(min + Math.random() * (Date.now() - min)).toISOString(); //Date

                    temp.icon = SonyChi_SessionManagerSingleton.buildBaseImageURLForProductId(temp.productID)+"&w=42&h=42";

                    temp.prettySize = formatFileSizeDisplayStr(temp.size);
                    temp.url = repod.psdle.config.game_page+temp.productID;
                    temp.platformUsable = temp.platform.slice(0);
                    temp.prettyDate = convertToNumericDateSlashes(convertStrToDateObj(temp.date));

                    repod.psdle.gamelist.push(temp);
                    if (repod.psdle.config.deep_search) { repod.psdle.game_api.queue(temp.index,temp.productID); }
                });
                repod.psdle.postList();
            } else {
                alert("Not on a valid page.");
            }
        },
        checkParse: function(pid) {
            pid = (pid) ? pid : prompt("Enter (product) ID:");

            $.getJSON(repod.psdle.config.game_api+pid)
            .success(function(data) {
                console.log(repod.psdle.game_api.parse(data));
            })
            .fail(function(data) {
                console.log(data);
            });
        },
        difference: function(regen) {
            repod.psdle.gamelist_cur = $.grep(repod.psdle.gamelist,function(x) {return $.inArray(x, repod.psdle.gamelist_cur) < 0});
            if (regen) {
                repod.psdle.table.regen();
            }
        },
        entitlement: function(input,type) {
            //Probably want to have this store results in an array and return that instead, eventually.

            input = (input) ? input : prompt("Search for:");
            input = input.toLowerCase();
            type = (type) ? type : "name";

            $.each(gEntitlementManager.getAllEntitlements(),function(index,obj) {
                if (repod.psdle.isValidContent(obj)) {
                    var match = false;

                    switch (type) {
                        case "id":
                            match = !!~obj.id.toLowerCase().indexOf(input);
                            break;
                        case "name":
                        default:
                            var name = (obj.drm_def) ? obj.drm_def.contentName : obj.game_meta.name;
                            match = !!~name.toLowerCase().indexOf(input);
                            break;
                    }

                    if (match) {
                        var platform,
                            pids = 0;

                        if (obj.game_meta) {
                            platform = ["PS4"]
                        } else {
                            pids = obj.drm_def.drmContents[0].platformIds;
                            platform = repod.psdle.determineSystem(pids);
                        }

                        //Remove personal information (such as dates) and extraneous URLs.
                        var safe = JSON.stringify(obj, function(k,v) { if(/[\d\-]+T.+Z$/.test(v) || /^http/.test(v)) { return "~" } return v; });
                        console.log(index,platform,pids,safe)
                    }
                }
            });
        },
        injectEntitlement: function(ENTITLEMENT) {
            //ENTITLEMENT should be valid Entitlement data or an array containing multiple.
            //This should be called before generating the list as it is appended to the end of the original Entitlements list.

            ENTITLEMENT = ENTITLEMENT || prompt("Enter valid Entitlement data:");

            if (typeof ENTITLEMENT == "object") {
                $.each(ENTITLEMENT, function(index,value) {
                    repod.psdle.e_inject_cache.push(value);
                });
            } else {
                repod.psdle.e_inject_cache.push(JSON.parse(ENTITLEMENT));
            }

            //if (ENTITLEMENT !== null && typeof ENTITLEMENT !== "array") { this.injectEntitlement(); }

            return repod.psdle.e_inject_cache.length;
        }
    },
    grid: {
        generate: {
            cell: function(index) {
                var item = repod.psdle.gamelist[index],
                    out  = $("<div>",{class:"cell"})

                .append($("<img>",{class:"cell_icon",src:item.icon.replace(/(w|h)=\d+/g,"$1=124")}))
                .append($("<div>",{class:"title psdle_blue",text:item.name}))
                .append($("<div>",{class:"top"}).append(
                    $("<div>",{class:"psdle_blue",text:repod.psdle.safeGuessSystem(item.platform)+" | "+item.prettySize})
                ))
                .append($("<div>",{class:"date psdle_blue",text:item.prettyDate}))

                return out[0].outerHTML;
            }
        }
    }
};

var a = setInterval(function(a){
    if ((typeof chihiro !== "undefined" && chihiro.appReady === true) || (typeof Ember !== "undefined" && Ember.BOOTED))
    {
        clearInterval(repod.psdle.config.timerID);
        repod.psdle.init();
    }

},500);
repod.psdle.config = {"timerID":a};
console.log("%cPSDLE has started!", "color:#2185f4;font-size:x-large;font-weight:bold;")
console.log("PSDLE | Ready.");