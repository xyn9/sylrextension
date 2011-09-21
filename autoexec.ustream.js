// autoexec.ustream.js
//
// ==UserScript==
// @name autoexec.ustream
// @version 0.9
// @include www.ustream.tv
// @require ./_sylera.external.element.js
// @description ustream用自動実行拡張
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
	try { _autoexec_ustream; } catch(_e){ _autoexec_ustream = new (function () { //
//

var _this_ = this;

//
var $ID = '_autoexec_';
// ------------------------------------------------------------
_this_.add_popup = function (){
	//
	document.getElementById('EventHeader')
	.appendChild( _sylera.external.element('a', {
		'id': 'PopoutChannelVideo'
		, 'className': 'popout'
		, target: ('ustream'+ document.getElementById('videoId').value)
		, href: ('data:text/html;charset=utf-8,'+ encodeURIComponent([
			, '<html>'
			, '<head>'
			, ('<title>'+ document.title +'</title>')
			, '<style type="text/css">'
			, 'body{margin:0; padding:3px; background-color:black; text-align:center;}'
			, 'object, embed{width:99%; height:99%;}'
			, '</style>'
			, '</head>'
			, '<body>'
			, document.getElementById('VideoEmbedCode').getElementsByTagName('input')[0].value
			, '</body>'
			, '</html>'
		].join('\n')))
	}, [
		_sylera.external.element('b', 0, [])
		, _sylera.external.element('span', 0, [ document.createTextNode('popout') ])
	]) );
	//
};





// ------------------------------------------------------------
_this_.add_dl = function (){
	//
	document.getElementById('TabShowInfo').parentNode
	.appendChild( _sylera.external.element('li', {'id': ($ID +'_dl')}, [
		_sylera.external.element('b', 0, [
			_sylera.external.element('a', {
				href: window.Ustream.Vars.liveHttpUrl
			}, [ document.createTextNode('download') ])
		])
		, _sylera.external.element('span', {'className':'arrow'}, [])
	]) );
	//;
	//
};





// ------------------------------------------------------------
_this_.init = function (_id){
	//
	$ID = _id;
	//
	try {
		_sylera.include(_sylera.__EXTENSION_DIR__ +'/_sylera.external.element.js');
	}
	catch(_e){
		alert($ID +'\n[include error]'+ _e.message);
		return ;
	}
	//
	if( (/^\/recorded\//i).test(location.pathname) ){
		_this_.add_popup();
		_this_.add_dl();
	}
	//
};





//
	})(); } // _autoexec_ustream
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
		_autoexec_ustream.init(_label);
	}
	//
})( '_autoexec_ustream' );
//





//
