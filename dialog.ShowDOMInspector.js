// dialog.ShowDOMInspector.js
//
// ==UserScript==
// @name dialog.ShowDOMInspector
// @description 開いているページに対するDOMインスペクタを呼び出す
// ==UserScript==
//


openDialog('chrome://inspector/content/', 'DOMInspector', 'chrome,all,dialog=yes', document);

