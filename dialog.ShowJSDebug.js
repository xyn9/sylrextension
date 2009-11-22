// dialog.ShowJSDebug.js
//
// ==UserScript==
// @name dialog.ShowJSDebug
// @description JavaScriptデバッガなるツールを呼び出す
// ==UserScript==
//


openDialog('chrome://venkman/content/', 'JSDebug', 'chrome,all,dialog=yes', document);

