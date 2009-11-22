// autoexec.youtube.js
//
// ==UserScript==
// @name autoexec.youtube
// @version 0.9
// @include youtube.com
// @require ./lib/_sylera.external.element.js
// @description YouTube用自動実行拡張
// @homepage http://xyn9.github.com/sylrextension
//
// @author xyn9 <xyn9.mail@gmail.com>
// @license (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/2.1/jp
// ==UserScript==
//


// autoexec





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
	try { _autoexec_youtube; } catch(_e){ _autoexec_youtube = new (function () { //
//

//
var _this_ = this;

//
var $ID = '_autoexec_';
// ------------------------------------------------------------
//
_this_.create_dl_links = function (){
	//
	var $_label = $ID +'_dl';
	//
	try {
		var $_v_id =
		yt.config_.SWF_ARGS['video_id'] +'&t='+ yt.config_.SWF_ARGS['t']
		;
	} catch(_e){ return; }
	var $_title = document.getElementById('watch-vid-title');
	//
	if(
		(document.getElementById($_label) == null)
		&& (
			($_title != null)
			|| (($_title = document.getElementById('vidTitle')) != null)
		)
	){
		//
		function dl_link(_fmt, _color, _label){
			return _sylera.external.element('a', {
				href: '/get_video?video_id=' + $_v_id +'&fmt='+ _fmt
				, style: {
					margin:'auto 0.33em auto 0.33em'
					, color:_color
					, fontWeight:'bold'
				}
			}, [ document.createTextNode(_label) ]);
		}
		//
		function fmt_link(_fmt, _color, _label){
			return _sylera.external.element('a', {
				href: (
					location.pathname
					+ location.search.replace(/&?fmt=\d+/i,'') +'&fmt='+ _fmt
				)
				, style: {fontWeight:'bold', color:_color}
			}, [ document.createTextNode(_label) ]);
		}
		//
		function _T(_text){ return document.createTextNode(_text); }
		// ------------------------------------------------------------
		//
		document.body.appendChild(
			_sylera.external.element('div',{id:$_label})
		);
		//
		$_title.appendChild(_sylera.external.element('p', {
			id: $_label+ '_fmt_link'
			, style: {
				fontSize:'15px', fontWeight:'normal'
				, color: 'darkgray'
			}
		}, [
			document.createTextNode(' ')
			, fmt_link(1, 'black', 'flv'), _T(' | ')
			, fmt_link(6, 'gray', 'flv2'), _T(' | ')
			, fmt_link(34, 'gray', 'flv-low'), _T(' | ')
			, fmt_link(35, 'gray', 'flv-high'), _T(' | ')
			, fmt_link(18, 'red', 'mp4'), _T(' | ')
			, fmt_link(22, 'blue', 'HD')
		]) );
		//
		document.getElementById('watch-player-div')
		.appendChild(_sylera.external.element('p', {
			id: $_label +'_dl_link'
			, style: {
				margin:'1em 0 1.5em 7px'
				, color:'darkgray'
				, fontSize:'12px', fontWeight:'normal'
			}
			, align:'right'
		}, [
			_sylera.external.element('b', {
				style: {color:'black'}
			}, [_T('Download: ')])
			, dl_link('', 'black', 'flv'), _T(' | ')
			, dl_link(6, 'gray', 'flv2'), _T(' | ')
			, dl_link(34, 'gray', 'flv-low'), _T(' | ')
			, dl_link(35, 'gray', 'flv-high'), _T(' | ')
			, dl_link(18, 'red', 'mp4'), _T(' | ')
			, dl_link(22, 'blue', 'HD')
		]) );
		//
	}
	//
};





// ------------------------------------------------------------
/*
_this_.suspend = function (){
	//
	try {
		with( document.getElementById('movie_player') ){
			setAttribute('swLiveConnect', 'true');
			Stop();
			stopVideo();
		}
	}
	catch(_e){ }
	//
};
 */





// ------------------------------------------------------------
_this_.init = function (_id){
	//
	$ID = _id;
	//
	try {
		_sylera.include(_sylera.__EXTENSION_DIR__ +'/lib/_sylera.external.element.js');
	}
	catch(_e){
		alert($ID +'\n[include error]'+ _e.message);
		return ;
	}
	//
	if( (/\/watch/i).test(location.pathname) ){
		//
		_this_.create_dl_links();
		//
	}
	//
};





//
	})(); } // _autoexec_youtube
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
		_autoexec_youtube.init(_label);
	}
	//
	// _autoexec_youtube.suspend();
	//
})( '_autoexec_youtube' );
//





//

