// context.get_raw_url.js
//
// ==UserScript==
// @name context.get_raw_url
// @version 0.9
// @description 選択アンカーのリンク先を元(リダイレクト先)のURLに変換する
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





// ------------------------------------------------------------
(function (){
	//
	try {
		_sylera.include('C:/scripts/lib/xml_http.js');
	}
	catch(_e){
		alert('[include error]'+ _e.message);
		return ;
	}
	//
	var $active = _sylera.API.getActiveDOMNode();
	var link, tag;
	//
	do {
		//
		try {
			if((tag = $active.tagName.toLowerCase()) == 'a'){
				link = $active;
				break;
			}
		}
		catch(_e){}
		//
		$active = $active.parentNode;
		//
	} while(tag != 'body');
	// ------------------------------------------------------------
	if( link ){
		//
		var $http = new XMLHttpRequest();
		with( $http ){
			open('GET', 'http://api.longurl.org/v2/expand?format=json&url='+ encodeURI(link.href), true);
			//
			onreadystatechange = function (){
				var stat = $http.readyState;
				if(stat < 4/*LOADED*/){
					with( link ){
						title = ' ... ';
						style.backgroundColor = 'orange';
						style.color = 'black';
					}
				}
			};
			//
			onload = function (){
				if( /\{\s*"long\-url"\s*:\s*"([^"]+)"\s*\}/.test($http.responseText) ){
					var res = (RegExp.$1 +"").replace(/\\\//g,'/');
					with( link ){
						innerHTML = link.innerHTML.replace(link.href, res);
						href = res;
						title = res;
					}
				}
				with( link ){
					style.backgroundColor = 'darkgreen';
					style.color = 'white';
				}
			};
			//
			onerror = function (){
				with( link ){
					title = '*** MISS! ***';
					style.backgroundColor = 'red';
					style.color = 'white';
				}
			};
			//
			send(null);
		}
		//
	}
	//
})();





//

