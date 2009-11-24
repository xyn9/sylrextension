// command.autocomplete_on.js
//
// ==UserScript==
// @name command.autocomplete_on
// @version 0.9
// @require ./_sylera.external.evaluateXPath.js
// @description サイトのログイン情報を記憶できるようにするコマンド
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
//
if(! _sylera.include){
	_sylera.include = function (_path){
		return Components.classes['@mozilla.org/moz/jssubscript-loader;1'].getService(Components.interfaces.mozIJSSubScriptLoader).loadSubScript('file:///' + _path)
	};
}
//
// ------------------------------------------------------------
//
	try { _command_autocomplete_on; } catch(_e){ _command_autocomplete_on = new (function () { //
//

var _this_ = this;

//
var $ID = '_command_';
// ------------------------------------------------------------





// ------------------------------------------------------------
_this_.init = function (_id){
	//
	$ID = _id;
	//
	try {
		_sylera.include(_sylera.__EXTENSION_DIR__ +'/_sylera.external.evaluateXPath.js');
	}
	catch(_e){
		alert($ID +'\n[include error]'+ _e.message);
		return ;
	}
	//
};





//
	})(); } // _command_autocomplete_on
//





// ------------------------------------------------------------
(function (_label){
	//
	try {
		document.getElementById(_label).tagName;
	}
	catch(_e){
		//
		var marker = document.createElement('script');
		marker.id = _label;
		(document.getElementsByTagName('head'))[0].appendChild(marker);
		//
		_command_autocomplete_on.init(_label);
	}
	//
	var ac_forms = _sylera.external.evaluateXPath(document.body, '//form[@autocomplete]');
	for(var i=0; i<ac_forms.length; i++){
		ac_forms[i].setAttribute('autocomplete', 'on');
	}
	alert(' -DONE- ');
	//
})( '_command_' );
//





//
