// context.fget.js
//
// ==UserScript==
// @name context.fget
// @version 0.9
// @require ./_sylera.external.charconv.js
// @require ./_sylera.external.localfile.js
// @description FlashGetでダウンロードするための補助スクリプト
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
	try { _context_fget; } catch(_e){ _context_fget = new (function () { //
//

var _this_ = this;

//
var $ID = '_context';
//
var $outpath;
//
// ------------------------------------------------------------
_this_.get = function (_itemlist){
	//
	var xml_body = new Array();
	var add_text;
	try {
		add_text = (document.getSelection() +'').replace(/^\s+/g,'').replace(/\s+$/g,'');
	}
	catch(_e){
		add_text = '';
	}
	//
	for(var i=0; i<_itemlist.length; i++){
		//
		var item = _itemlist[i];
		//
		xml_body.push([
			'<f_item>'
			, '<url><![CDATA['+ item.href +']]></url>'
			, '<comment><![CDATA['
				+ _sylera.external.charconv(
					(item.textContent +'\n\n'+ (add_text.length ? add_text : document.title))
					, 'UTF-8'
				) //.replace(/\]\]\>/g,']] >')
				+ ']]></comment>'
			, '</f_item>'
		].join('\n'));
	}
	//
	try{
		//
		_sylera.external.localfile.fileout($outpath, [
			'<?xml version="1.0"?>'
			, '<fget>'
			, '<ref><![CDATA['+ location.href +']]></ref>'
			, xml_body.join('\n')
			, '</fget>'
		].join('\n'))
	}
	catch(_e){
		alert('[error] save xml : '+ _e.message);
		return false;
	}
	//
	return _sylera.external.localfile.run(
		'C:\\WINDOWS\\SYSTEM32\\wscript.exe'
		, [
			'C:\\Program Files\\FlashGet\\flashget.wsf'
			, '//job:fget_xml'
			, $outpath
		]
		, true
	);
	//
};





// ------------------------------------------------------------
_this_.init = function (_id){
	//
	$ID = _id;
	//
	$outpath = (_sylera.__EXTENSION_DIR__ +'/'+ $ID +'.xml')
	.replace(/\//g,'\\')
	;
	//
	try {
		_sylera.include(_sylera.__EXTENSION_DIR__ +'/_sylera.external.charconv.js');
		_sylera.include(_sylera.__EXTENSION_DIR__ +'/_sylera.external.localfile.js');
	}
	catch(_e){
		alert('[include error]'+ _e.message);
		return ;
	}
	//
};





//
	})(); } // _context_fget
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
		_context_fget.init(_label);
	}
	// ------------------------------------------------------------
	//
	var $active = _sylera.API.getActiveDOMNode();
	var link, tag;
	//
	try {
		//
		do {
			//
			try {
				if((tag = $active.tagName.toLowerCase()) == 'a'){
					link = $active;
					break;
				}
			} catch(__e){}
			//
			$active = $active.parentNode;
			//
		} while(tag != 'body');
		//
	}
	catch(_e){}
	//
	_context_fget.get((link ? [link] : document.links));
	//
})( '_context_fget' );





//

