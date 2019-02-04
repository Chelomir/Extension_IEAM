# Extension_IEAM
Google Chrome Extension for Infor EAM

TODO:

	* Поиск и подсветка полей по коду
	* Просмотр значений скрытых полей (класс, тип ПЛ/НК)

Делать приходится в Devtools

https://developer.chrome.com/extensions/devtools
https://developer.chrome.com/extensions/devtools_panels#method-create
https://developer.chrome.com/extensions/devtools_inspectedWindow
https://developer.chrome.com/extensions/samples#search:devtool
https://github.com/facebook/react-devtools/blob/master/shells/webextension/src/panel.js
http://devdoc.net/web/developer.mozilla.org/en-US/Mozilla/Add-ons/WebExtensions/API/devtools.panels/create.html
https://github.com/Chelomir/polymer-devtools-extension


Как отлаживать расширение, которое создает вкладки в devtools chrome.devtools.panels.create()?
Мое расширение создает вкладку 
chrome.devtools.panels.create("Имя вкладки", "", "index.html");
И как мне отладить эту вкладку? Куда направляются, к пример, вывод console.log? Где посмотреть DOM? и прочее..

РЕШЕНИЯ ВОПРОСА
1. Открепите DevTools от веб-страницы.
2. Внутри окна DevTools нажмите Ctrl+Shift+I 
3. ???
4. PROFIT!