// autoexec.youtube.js
//
// ==UserScript==
// @name autoexec.youtube
// @version 0.94
// @include youtube.com
// @require ./_sylera.external.element.js
// @description YouTube用自動実行拡張
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
	try { _autoexec_youtube; } catch(_e){ _autoexec_youtube = new (function () { //
//

//
var _this_ = this;

//
var $ID = '_autoexec_';
// ------------------------------------------------------------
//
_this_.add_link_fmt = function (){
	//
	var $_label = $ID +'_fmt';
	//
	var $_v_fmt_current = (/&fmt=([^&]+)/i).test(location.search) ? RegExp.$1 : 34;
	//
	var $_v_fmt_list = {
		5: {label:'flv', color:'black', info:{}}
		, 6: {label:'flv2', color:'gray', info:{}}
		, 34: {label:'flv-low', color:'gray', info:{}}
		, 35: {label:'flv-high', color:'gray', info:{}}
		, 18: {label:'mp4', color:'red', info:{}}
		, 22: {label:'HD', color:'blue', info:{}}
		, 37: {label:'HD-full', color:'blue', info:{}}
	};
	//
	try {
		//
		var $_v_id = yt.config_['VIDEO_ID'];
/*
		var $_v_token = yt.config_['XSRF_TOKEN'];
 */
		var $_v_url = ((yt.preload.start +'').match(/http[^'\"]+/) +'')
		.replace(/\/[^\?\/]+\?/,'/videoplayback?');
		//
	} catch(_e){ return; }
	//
	// ------------------------------------------------------------
	function _T(_text){ return document.createTextNode(_text); }
	//
	function dl_list(_target){
		var fmt, f, v;
		for(f in $_v_fmt_list){
			v = $_v_fmt_list[f];
			if( v.info.url ){
				with( _target ){
					appendChild(
						_sylera.external.element('a', {
							href: v.info.url
							, style: {
								margin:'auto 0.33em auto 0.33em'
								, color:v.color
								, fontWeight:'bold'
							}
							, title: (v.info.type + '('+ v.info.quality +')')
						}, [ _T(v.label) ])
					);
					appendChild( _T('|') );
				}
			}
		}
		//
		return _target;
	}
	//
	function fmt_list(_target){
		var fmt, f, v, anchor;
		for(f in $_v_fmt_list){
			v = $_v_fmt_list[f];
			anchor = (f == $_v_fmt_current)
			? _sylera.external.element('a', {
				name: 'current'
				, style: {fontWeight:'bold', backgroundColor:v.color, color:'white'}
			})
			: _sylera.external.element('a', {
				href: (location.pathname + location.search.replace(/&?fmt=[^&]+/i,'') +'&fmt='+ f)
				, style: {fontWeight:'bold', color:v.color}
				, title: (v.info.type + '('+ v.info.quality +')')
			})
			;
			anchor.appendChild( _T(v.label) );
			with( _target ){
				appendChild( anchor );
				appendChild( _T(' | ') );
			}
		}
		//
		return _target;
	}
	// ------------------------------------------------------------
	//
	var $_title = (document.getElementsByTagName('h1'))[0];
	if((document.getElementById($_label) != null) || ($_title == null)){ return ;}
	//
	document.body.appendChild( _sylera.external.element('div', {id:$_label}) );
	//
	var $_http = new XMLHttpRequest();
	with( $_http ){
		// ref: http://nondelion.com/archives/2009/04/08/2255
		open('GET', ('/get_video_info?video_id='+ $_v_id), true);
		//
		onload = function (){
			//
			var v_info = (/&?url_encoded_fmt_stream_map=url%3D([^=&]+)/i).test($_http.responseText)
			? decodeURIComponent(RegExp.$1).split(/,url=/i)
			: []
			;
			for(var p=0,param; p<v_info.length; p++){
				param = {};
				('&url='+ v_info[p]).replace(/&([^&=]+)=([^&]+)/g, function (_$0, _$1,_$2){
					param[decodeURIComponent(_$1)] = decodeURIComponent(_$2);
				});
				try {
					if(! $_v_fmt_list[param.itag]){
						$_v_fmt_list[param.itag] = {label: param.quality, color: 'lightgray'};
					}
					$_v_fmt_list[param.itag].info = param;
				} catch(_e){ }
			}
			//
			$_title.style.cssText = 'height:auto; max-height:2.5em; padding:auto;';
			$_title.appendChild( fmt_list(
				_sylera.external.element('p', {
					id: ($_label +'_fmt_link')
					, style: {
						fontSize:'15px'
						, fontWeight:'normal'
						, color: 'darkgray'
					}
				})
			) );
			//
			var v_default = $_v_fmt_list[$_v_fmt_current];
			//
			document.getElementById('watch-video').appendChild( dl_list(
				_sylera.external.element('p', {
					id: ($_label +'_dl_link')
					, style: {
						margin:'1em 0 1.5em 7px'
						, color:'darkgray'
						, fontSize:'12px'
						, fontWeight:'normal'
					}
				}, [
					_sylera.external.element('b', {style: {color:'black'}}, [
						_T('Download: ')
						, _sylera.external.element('a', {
							href: $_v_url
							, style: {color:'black'}
						}, [ _T($_v_id) ])
					])
				])
			) );
		};
		//
		send(null);
	}
	//
};


// ------------------------------------------------------------
_this_.add_link_popup = function (){
	//
	var $_label = $ID +'_popup';
	//
	try { var $_v_id = yt.config_['VIDEO_ID']; } catch(_e){ return ; }
	//
	var $_title = (document.getElementsByTagName('h1'))[0];
	//
	if((document.getElementById($_label) == null) && ($_title != null)){
		//
		$_title.appendChild(_sylera.external.element('a', {
			href: ('/embed/'+ $_v_id)
			, 'id': $_label
			, className: 'yt-uix-button'
			,
			style: {
				marginLeft: '0.5em', padding: '5px'
				, textAlign: 'center', verticalAlign: 'center'
			}
		}, [
			_sylera.external.element('span', {
				style: {
					paddingLeft: '15px'
					, backgroundRepeat: 'no-repeat', backgroundImage: 'URL(data:image/gif;base64,R0lGODlhDAAMAJEAAGZmZv///////wAAACH5BAEHAAIALAAAAAAMAAwAAAIalA+ph5rMnDQSwLWaFZm/2FAIJJbXSG5epRYAOw==)'
					, color:'gray'
					, textDecoration: 'none'
				}
			}, [document.createTextNode('popup')])
		]) );
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
_this_.show_description = function (){
	//
	try {
		document.getElementById('watch-description').className
		= 'watch-expander yt-uix-expander';
	}
	catch(_e){
		alert(_e.message);
	}
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
	if( (/\/watch/i).test(location.pathname) ){
		//
		_this_.add_link_popup();
		_this_.add_link_fmt();
		_this_.show_description();
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
	_autoexec_youtube.suspend();
	//
})( '_autoexec_youtube' );
//





//
