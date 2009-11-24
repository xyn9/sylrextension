// context.link2m3u.js
//
// ==UserScript==
// @name context.link2m3u
// @version 0.9
// @require ./_sylera.external.charconv.js
// @require ./_sylera.external.localfile.js
// @require ./_sylera.external.evaluateXPath.js
// @description ページ内のメディアらしきリンクを拾ってm3uプレイリストを作成する
// @homepage http://xyn9.github.com/sylrextension
//
// @author xyn9 <xyn9.mail@gmail.com>
// @license (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/2.1/jp
// ==UserScript==
//


//
	try { _sylera._sylera.__EXTENSION_DIR__; } catch(_e){ //
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





// ------------------------------------------------------------
(function (){
	//
	try {
		_sylera.include(_sylera.__EXTENSION_DIR__ +'/_sylera.external.charconv.js');
		_sylera.include(_sylera.__EXTENSION_DIR__ +'/_sylera.external.localfile.js');
		_sylera.include(_sylera.__EXTENSION_DIR__ +'/_sylera.external.evaluateXPath.js');
	}
	catch(_e){
		alert('[include error]'+ _e.description);
		return ;
	}
	// ------------------------------------------------------------
	//
	var file_types = 'mp3|mp2|mp1|aac|m4a|mp4|nsa|flac|ogg|wma|mid|midi|rmi|kar|miz|mod|mdz|nst|stm|stz|s3m|s3z|it|itz|xm|xmz|mtm|ult|669|far|amf|okt|ptm|wav|voc|au|snd|aif|aiff|avi|mpg|mpeg|m2v|avi|asf|wmv|nsv|flv|swf|m3u|m3u8|pls|b4s|asx|wpl';
	var file_types_xpath = file_types
	.replace(/(\w+)(\|?)/g, function (_$0, _$1, _$2){
		return (
			'contains(@href,".'+ _$1 +'") or contains(@href,".'+ _$1.toUpperCase() +'")'
			+ (_$2 ? ' or ' : '')
		);
	})
	;
	//
	var audio_links
	= _sylera.external.evaluateXPath(document.body, '//a['+ file_types_xpath +']')
	.concat(
		_sylera.external.evaluateXPath(document.body, '//embed['+ file_types_xpath +']')
	)
//	.concat( _sylera.external.evaluateXPath(document.body, '//a[starts-with(@href,"peercast://pls/")]') )
	//
	;
	//
	if(! audio_links.length){
		alert('- no links -');
		return;
	}
	// ------------------------------------------------------------
	var $m3u = {
		path: Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("TmpD", Components.interfaces.nsIFile).path
		+'\\'+ location.pathname.replace(/\W/g,'_') +'.m3u'
		, body: ['#EXTM3U']
	};
	//
	var dict = {};
	for(
		var i=0
			, ext_regex=(new RegExp(('\\.('+ file_types +')$'),'i'))
			, audio="", title
		; i<audio_links.length
		; i++
	){
		//
		audio = audio_links[i];
		if(
			(
				(! dict[audio.href])
				|| ((typeof dict[audio.href] == 'string') && /^[\s\-]+$/.test(dict[audio.href]))
			)
			&& ext_regex.test(audio.href)
		){
			title = audio.textContent +"";
			dict[audio.href] = title.length
			? title.replace(/\r\n/g,'\n').replace(/\n/g,' ').replace(/(^\s+|\s+$)/,'')
			: ' - '
			;
		}
	}
	//
	for(var u in dict){
		if(u && (/^[a-z]+:/i).test(u)){
			$m3u.body.push('#EXTINF:-1,'+ dict[u]);
			$m3u.body.push(u);
		}
	}
	//
	if(
		_sylera.external.localfile.fileout(
			$m3u.path
			, _sylera.external.charconv($m3u.body.join('\r\n'), 'Shift_JIS')
		)
	){
		//
		location = 'file:///'+ $m3u.path;
	}else{
		alert('fail@save');
	}
	//
})();
//





//

