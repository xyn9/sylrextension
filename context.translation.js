// context.translation.js
//
// ==UserScript==
// @name context.translation
// @version 0.9
// @require ./lib/_sylera.external.element.js
// @description 選択範囲またはページ全体を和英翻訳する
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
// ------------------------------------------------------------
//
	try { _context_translation; } catch(_e){ _context_translation = new (function () { //
//

var _this_ = this;

//
var $ID = '_context';
// ------------------------------------------------------------





// ------------------------------------------------------------
//
_this_.text_trans_cb = {};
//
_this_.text_trans = function (_selection){
	//
	var $_label = $ID +'_text_trans';
	// ------------------------------------------------------------
	var sel_block = _sylera.external.element('strong', {
		id: $_label + (new Date()).getTime()
		, className: $_label +'_selected'
	});
	sel_block.setAttribute('style', [
		'display:inline;'
		, 'background-color:silver;'
		, 'color:black;'
	].join(' '));
	//
	_selection.getRangeAt(0).surroundContents(sel_block);
	//
	var sel_length = _selection.toString().length;
	//
	var result_block = _sylera.external.element('textarea', {
		id: sel_block.id +'_result'
		, className: $_label +'_result'
		, onclick: (function (){ this.parentNode.removeChild(this); })
	}, [
		document.createTextNode(_selection.toString())
	]);
	result_block.setAttribute('style', [
		'cursor:pointer;'
		, 'position:absolute;'
		, 'top:'+ (sel_block.offsetTop +10) +'px;'
		, 'left:'+ (sel_block.offsetLeft +10) +'px;'
		, 'width:'+ (((sel_length > 60) ? 60 : sel_length) +1) +'.75ex;'
		, 'height:'+ (parseInt(sel_length/60) +2) +'.75em;'
		, 'padding:3px;'
		, 'border-style:outset; border-color:auto; border-width:1px 3px 3px 1px;'
		, 'background-color:black;'
		, 'color:white;'
		, 'font-size:medium;'
		, 'opacity:0.33;'
	].join(''));
	//
	sel_block.parentNode.insertBefore(result_block, sel_block.nextSibling);
	//
	// ------------------------------------------------------------
	_this_.text_trans_cb[sel_block.id] = function (_data){
		var result = _data.count
		? _data.value.items.shift().description : 'no results'
		;
		sel_block.title = result;
		with( result_block ){
			value = result;
			style.opacity = '0.77';
		}
	};
	//
	document.body.appendChild( _sylera.external.element('script', {
		type: 'text/javascript'
		, src: (
			'http://pipes.yahoo.com/pipes/pipe.run?_id=16d83292b9ecd548a43ee078a1b3e8d2&_render=json'
			+ '&_callback='+ $ID +'.text_trans_cb.'+ sel_block.id
			+ '&s='+ encodeURIComponent(result_block.value).replace(/%20/g,'+')
		)
	}) );
	//
};





// ------------------------------------------------------------
_this_.page_trans = function (){
	//
	location = 'http://www.microsofttranslator.com/BV.aspx?lo=SP&a='+ encodeURIComponent(location.href);
	//
};





// ------------------------------------------------------------
_this_.init = function (_id){
	//
	$ID = _id;
	//
	try {
		with( _sylera ){
			include(_sylera.__EXTENSION_DIR__ +'/lib/_sylera.external.element.js');
		}
	}
	catch(_e){
		alert($ID +'\n[include error]'+ _e.message);
		return ;
	}
	//
};





//
	})(); } // _context_translation
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
		_context_translation.init(_label);
	}
	//
	var sel = window.getSelection();
	_context_translation[(sel.rangeCount ? 'text_trans' : 'page_trans')](sel);
	//
})( '_context_translation' );
//





//

