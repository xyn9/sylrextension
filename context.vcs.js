// context.vcs.js
//
// ==UserScript==
// @name context.vcs
// @version 0.9
// @require ./lib/wx320k_vcs.js
// @require ./lib/printf.js
// @require ./_sylera.external.selection.js
// @require ./_sylera.external.charconv.js
// @require ./_sylera.external.localfile.js
// @description 選択範囲の内容からVCS形式のスケジュール登録ファイルを作成する
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
function _vcs_parse_selection(_sel){
	//
	function zn2hn(_str){
		return _str.replace(/[０-９]/g, function (__n){
			return ({'１':1,'２':2,'３':3,'４':4,'５':5,'６':6,'７':7,'８':8,'９':9,'０':0})[__n];
		});
	}
	// ------------------------------------------------------------
	//
	var $vcs = {
		SUMMARY: prompt('caption:', _sel.textContent)
	};
	//
	if(typeof $vcs.SUMMARY != 'string'){ $vcs.SUMMARY = document.title; }
	//
	var sel_text = _sel.textContent.replace(/\r\n/g,'\n');
	var now = new Date();
	//
	var dates = [];
	zn2hn(sel_text)
	.replace(/平成(\d+)/g, function (_s,_y){ return (1988 + Math.abs(_y)); })
	.replace(
		/((\d{4})[年／\/\-\.]+)?([01]?\d)[月／\/\-\.]+([0-3]?\d)日?/g
		, function (_str,_y0, _y,_m,_d){
			dates.push([
				(_y.length ? _y : now.getFullYear())
				, (_m.length ? _m : now.getMonth()+1)
				, (_d.length ? _d : now.getDate())
			].join('/'));
		}
	);
	if(! dates.length){
		dates.push(
			[now.getFullYear(), (now.getMonth()+1), now.getDate()].join('/')
		);
	}
	//
	var times = [];
	zn2hn(sel_text).replace(
		/((午後|ＰＭ|PM)\D*)?([0-2]?\d)[:：時](([0-5]?\d)([:：分]([0-5]?\d)秒?)?)?/gi
		, function (_str, _n0,_n, _h, _m0,_m,_s0,_s){
			_h = Math.abs(_h);
			if(_n.length){ _h += 12; }
			if(! _m0.length){ _m = _s = 0; }
			times.push([_h, Math.abs(_m), Math.abs(_s)].join(':'));
		}
	);
	if(! times.length){ times.push('00:00:00'); }
	//
	$vcs.DTSTART = new Date( Date.parse(prompt('start:', dates.concat(times).join(' '))) );
	//
	$vcs.DTEND = (
		(dates.length > 1)
		? prompt('end:', dates.concat(times).join(' '))
		: ((times.length > 1) ? prompt('end:', dates[0]+' '+times[1]) : 0)
	);
	if( $vcs.DTEND ){ $vcs.DTEND = new Date( Date.parse($vcs.DTEND) ); }
	//
	$vcs.DESCRIPTION = ''+ prompt('description:', sel_text);
	//
	if(
		(/((場所.+)|((NHK|ＮＨＫ)(総合|教育)?)|テレビ\S+|\S+(テレビ|ラジオ|放送))/)
		.test(document.title + sel_text)
	){
		$vcs.LOCATION = ''+ prompt('場所: ', RegExp.$1);
	}
	//
	$vcs.URL = ''+ prompt('URL: ', location.href);
	//
	return $vcs;
	//
}
//





// ------------------------------------------------------------
(function (){
	//
	try {
		with( _sylera ){
			include(_sylera.__EXTENSION_DIR__ +'/lib/printf.js');
			include(_sylera.__EXTENSION_DIR__ +'/lib/wx320k_vcs.js');
			include(_sylera.__EXTENSION_DIR__ +'/_sylera.external.selection.js');
			include(_sylera.__EXTENSION_DIR__ +'/_sylera.external.charconv.js');
			include(_sylera.__EXTENSION_DIR__ +'/_sylera.external.localfile.js');
		}
		//
	}
	catch(_e){
		alert('[include error]'+ _e.message);
		return ;
	}
	//
	try {
		//
		var $outpath = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("TmpD", Components.interfaces.nsIFile).path
		+'\\'+ location.pathname.replace(/\W/g,'_') + '.vcs'
		;
		//
		var $vcs = _vcs_parse_selection( _sylera.external.selection() );
		if(! $vcs.SUMMARY){ throw {message: '$vcs - no data'}; }
		if(! _sylera.external.localfile.fileout(
			$outpath
			, _sylera.external.charconv(create_vcs($vcs), 'Shift_JIS')
		) ){
			throw {message: 'data save failed'};
		}
		//
		location.href = 'mailto:?' + [
			'Attach='+ $outpath
			, 'Subject='+ escape( _sylera.external.charconv($vcs.SUMMARY,'Shift_JIS') )
			, 'Body='+ escape(
				($vcs.DESCRIPTION ? _sylera.external.charconv($vcs.DESCRIPTION,'Shift_JIS') : '-vcs-')
				+ '\r\n'
			)
		].join('&');
		//
	}
	catch(_e){
		//
		alert(_e.message);
	}
	//
})();





//

