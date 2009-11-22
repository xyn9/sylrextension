// autoexec.nhk_news.js
//
// ==UserScript==
// @name autoexec.nhk_news
// @version 0.9
// @include nhk.or.jp
// @description NHKニュースの本文を自動で展開させる
// @homepage http://xyn9.github.com/sylrextension
//
// @author xyn9 <xyn9.mail@gmail.com>
// @license (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/2.1/jp
// ==UserScript==
//




//
(function (){
	//
	if( (/\/news\/[^\/]+$/i).test(location.pathname) ){
		//
		newsOpen();
		//
	}
	//
})();





//
