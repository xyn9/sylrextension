// autoexec.nhk_news.js
//
// ==UserScript==
// @name autoexec.nhk_news
// @version 0.91
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
	var $ID = '_autoexec_nhk_news';
	//
	if( (/\/news\/html\/\d+\/[a-z]\d+\.html$/i).test(location.pathname) ){
		//
		if(document.getElementById($ID) == null){
			document.getElementById('news_left').innerHTML += (
				'<form id="'+ $ID +'">'
				+ ('video id: <input type="text" name="video id:" value="' + document.getElementById('news_video').innerHTML + '" onclick="this.select()" /><br />')
				+ ('short url: <input type="text" name="short url:" value="' + encodeShorturlNews(location.href) + '" onclick="this.select()" />')
				+ '</form>'
			)
			;
		}
		//
	}
})();





//
