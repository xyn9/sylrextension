// autoexec.nicovideo.js
//
// ==UserScript==
// @name autoexec.nicovideo
// @version 0.9
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
var $v_id = video_id;//location.pathname.match(/[a-z\d]+$/i);
//
// ------------------------------------------------------------
_this_.add_old_player_link = function (){
	try {
		var old = document.createElement('span');
		with( old ){
			id = $ID +'_add_old_player_link';
			innerHTML = '&nbsp;['+ '新/旧'.link(
				location.pathname + (
					(/oldplayer/i).test(location.search) ? '' : '?oldplayer=1'
				)
			) +']';
		}
		document.getElementsByTagName('h1')[0].appendChild(old);
	}
	catch(_e){}
};




// ------------------------------------------------------------
_this_.create_dl_links = function (){
	//
	var $_label = $ID +'_create_dl_links';
	//
	var block = document.getElementById($_label);
	var $_box = document.getElementById('video_controls');
	//
	if((block != null) || ($_box == null)){ return ; }
	//
	block = document.createElement('div');
	with( block ){
		id = $_label;
		style.fontSize = '12px';
		style.fontWeight = 'bold';
		style.paddingBottom = '7px';
		//
		appendChild( document.createTextNode('ダウンロード： ') );
	}
	//
	$_box.insertBefore(block, $_box.firstChild);
	// ------------------------------------------------------------
	//
	var $_http = new XMLHttpRequest();
	with( $_http ){
		//
		open('GET', 'http://www.nicovideo.jp/api/getflv?v=' + $v_id, true);
		//
		onload = function (){
			//
			function create_link(_inner, _href, _color){
				var link = document.createElement('a');
				with( link ){
					href = _href;
					style.color = _color;
					//
					appendChild( document.createTextNode(_inner) );
				}
				return link;
			}
			//
			var src_text = $_http.responseText;
			var v_url = decodeURIComponent( src_text.replace(/.+&url=([^&]+)&.+/i, '$1') );
			//
			with( document.getElementById($_label) ){
				appendChild( document.createTextNode($v_id + ' / ') );
				appendChild( create_link('high', v_url.replace(/low$/i,''), 'red') );
				appendChild( document.createTextNode(' ') );
				appendChild( create_link('low', v_url.replace(/(low)?$/i,'low'), 'gray') );
			}
		};
		//
		send(null);
	}
	//
};





// ------------------------------------------------------------
_this_.init = function (_id){
	//
	$ID = _id;
	//
	if( (/\/watch\//i).test(location.pathname) ){
		//
		_this_.create_dl_links();
		_this_.add_old_player_link();
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

