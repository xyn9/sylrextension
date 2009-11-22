// command.toggle_css.js
//
// ==UserScript==
// @name command.toggle_css
// @version 0.9
// @include
// @require ./lib/_sylera.external.evaluateXPath.js
// @description スタイルシートの有効・無効を切り替えるコマンド
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
	try { _command_toggle_css; } catch(_e){ _command_toggle_css = new (function () { //
//

var _this_ = this;

//
var $ID = '_command_';

//
_this_.$STAT = false;
//
// ------------------------------------------------------------





// ------------------------------------------------------------
_this_.toggle = function (){
	//
	_this_.$STAT = (! _this_.$STAT);
	//
	var style_items
	= _sylera.external.evaluateXPath(document.documentElement, '//style')
	.concat(
		_sylera.external.evaluateXPath(
			document.documentElement
			, '//link[contains(@href,".css") or @type="text/css"]'
		)
	);
	//
	for(var i=0; i<style_items.length; i++){
		style_items[i].disabled = _this_.$STAT;
	}
	//
};





// ------------------------------------------------------------
_this_.init = function (_id){
	//
	$ID = _id;
	//
	try {
		_sylera.include(_sylera.__EXTENSION_DIR__ +'/lib/_sylera.external.evaluateXPath.js');
	}
	catch(_e){
		alert($ID +'\n[include error]'+ _e.message);
		return ;
	}
	//
};





//
	})(); } // _command_toggle_css
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
		_command_toggle_css.init(_label);
	}
	//
	_command_toggle_css.toggle();
	//
})( '_command_toggle_css' );
//





//
