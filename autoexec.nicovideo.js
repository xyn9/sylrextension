// autoexec.nicovideo.js
//
// ==UserScript==
// @name autoexec.nicovideo
// @version 0.93
// @include nicovideo.jp
// @description ニコニコ動画用自動実行拡張
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
	try { _autoexec_nicovideo; } catch(_e){ _autoexec_nicovideo = new (function () { //
//

var _this_ = this;

//
var $ID = '_autoexec_';
//
var $V_ID, $V_LABEL;
//
// ------------------------------------------------------------
_this_.player_links = function (){
	//
	function create_link(__opt, __style){
		return _sylera.external.element('a', {
			href: __opt.href
			, style: __style
		}, [ document.createTextNode(__opt.text) ]);
	}
	//
	var $_header = document.getElementsByTagName('h1');
	$_header = $_header.length
	? $_header[0].parentNode
	: document.getElementById('WATCHHEADER')
	;
	$_header.insertBefore(
		//
		_sylera.external.element('div', {
			id:($ID +'_player_links')
			, style: {
				padding: '1em'
				, fontSize:'80%'
				, fontWeight:'bold'
			}
		}, [
			//
			create_link(
				(
					(/eco=1/i).test(location.search)
					? {href:location.pathname, text:'ﾉｰﾏﾙ'}
					: {href:location.pathname +'?eco=1', text:'ｴｺﾉﾐｰ'}
				)
				, {
					padding: '0.25em'
					, backgroundColor: 'rgb(102,111,111)'
					, color:'white'
					, textDecoration: 'none'
				}
			)
			,
			//
			create_link(
				(
					(/oldplayer=1/i).test(location.search)
					? {href:location.pathname, text:'現'}
					: {href:location.pathname +'?oldplayer=1', text:'旧'}
				)
				, {
					padding: '0.25em'
					, backgroundColor: 'black'
					, color:'white'
					, textDecoration: 'none'
				}
			)
		])
	//
	, $_header.firstChild);
	//
};





// ------------------------------------------------------------
_this_.dl_links = function (){
	//
	var $_label = $ID +'_dl_links';
	//
	var block = document.getElementById($_label);
	var $_box = document.getElementsByTagName('h1');
	$_box = $_box.length
	? $_box[0].parentNode
	: document.getElementById('WATCHHEADER')
	;
	//
	if((block != null) || ($_box == null)){ return ; }
	//
	block = _sylera.external.element('div', {
		id: $_label
		, style: {
			padding: '0.5em'
			, fontSize: '90%', fontWeight: 'bold'
		}
	}, [
		document.createTextNode('ダウンロード： ')
		,
		_sylera.external.element('a', {
			href: ('http://www.nicozon.net/flv/'+ $V_ID)
			, target: 'nicovideo_dl'
			, style: {color:'red'}
		}, [ document.createTextNode($V_ID) ])
	]);
	//
	$_box.appendChild(block);
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
	try {
		$V_ID = Video.v;
		$V_LABEL = Video.id;
	}
	catch(_e){
		$V_ID = $V_LABEL = location.pathname.match(/[^\/]+$/);
	}
	//
	if( (/\/watch\//i).test(location.pathname) ){
		//
		try {
			hideOBJ('des_short'); showOBJ('des_full');
		}
		catch(_e){
			try {
				hideOBJs('des_short'); showOBJs('des_full');
			} catch(__e){}
		}
		//
		_this_.player_links();
		_this_.dl_links();
		//
	}
	//
};





//
	})(); } // _autoexec_nicovideo
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
		_autoexec_nicovideo.init(_label);
	}
	//
})( '_autoexec_nicovideo' );
//





//
