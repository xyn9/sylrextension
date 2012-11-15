// dialog.ShowDOMInspector.js
//
// ==UserScript==
// @name dialog.ShowDOMInspector
// @version 0.9
// @description DOMインスペクタを呼び出す
// @homepage http://xyn9.github.com/sylrextension
//
// @author xyn9 <xyn9.mail@gmail.com>
// @license (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/2.1/jp
// ==UserScript==
//


//
	try { _sylera.__EXTENSION_DIR__; } catch(_e){ //
//
_sylera = {
	//
	API: Components.classes["@mozilla.org/sylera-api;1"].getService(Components.interfaces.nsISyleraAPI)
	,
	//
	__EXTENSION_DIR__: Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsIFile).path +'/sylrextension'
	,
	//
	external: {}
	//
};
//
	} // catch
/*
//
if(! _sylera.include){
	_sylera.include = function (_path){
		return Components.classes['@mozilla.org/moz/jssubscript-loader;1'].getService(Components.interfaces.mozIJSSubScriptLoader).loadSubScript('file:///' + _path)
	};
}
 */
//
// ------------------------------------------------------------





// ------------------------------------------------------------
(function (){
	//
	var $active = _sylera.API.getActiveDOMNode();
	window.openDialog('chrome://inspector/content/', 'DOMInspector', 'chrome,all,dialog=yes', ($active ? $active : document));
	//
})();





//
