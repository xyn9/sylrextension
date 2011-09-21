// autoexec.twitter.js
//
// ==UserScript==
// @name autoexec.twitter
// @version 0.91
// @include twitter.com
// @require ./_sylera.external.evaluateXPath.js
// @description twitter用自動実行拡張
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
try { _autoexec_twitter; } catch(_e){ _autoexec_twitter = new (function () { //
//

var _this_ = this;

//
var $ID = '_autoexec_twitter';
// ------------------------------------------------------------
function create_script(_content, _src){
	var scr = document.createElement('script');
	with( scr ){
		type = 'text/javascript';
		innerHTML = _content;
	}
	if( _src ){ scr.src = _src; }
	return scr;
}
//
function create_image(_src, _opts){
	var img = document.createElement('img');
	img.src = _src;
	if(_opts){ for(var c in _opts){ img.setAttribute(c, _opts[c]); } }
	return img;
}
//
function create_thumb(_src){
	return create_image(_src, {
		width:90, height:90
		, hspace:7, vspace:7
		, border:1
		, align:'top'
		, 'style': 'margin:7px;border:solid 1px;'
	});
}





// ------------------------------------------------------------
_this_.star = new (function (){
	//
	var $_label = $ID +'.star';
	//
	var $_load_cnt = 0;
	//
	this.entry_loader = new Function();
	//
	this.sitecfg_callback = function (_data){
		//
		var container = $ID +'hatenastar';
		//
		Hatena.Star.SiteConfig = _data['twitter.com'][0];
		//
		this.entry_loader = (function (){
			//
			$_load_cnt++;
			//
			var tl = document.getElementById('timeline');
			if(tl == null){ tl = document.getElementById('content'); }
			//
			for(
				var s=0
					, stat_list=_sylera.external.evaluateXPath(tl,'.//*[starts-with(@id,"status_") and not(./*[starts-with(@class,"'+ container +'")])]')
				; s<stat_list.length
				; s++
			){
				var cont_box = document.createElement('p');
				cont_box.className = container + $_load_cnt;
				stat_list[s].appendChild(cont_box);
			}
			//
			Hatena.Star.SiteConfig.entryNodes['.hentry']['container'] = '.'+ container + $_load_cnt;
			Hatena.Star.EntryLoader.loadNewEntries(tl);
			//
		});
		//
		this.entry_loader();
		//
	};
	//
	this.init = function (){
		with( document.getElementsByTagName('head')[0] ){
			appendChild( create_script('', 'http://s.hatena.ne.jp/js/HatenaStar.js') );
			appendChild( create_script('', ('http://s.hatena.ne.jp/siteconfig.json?host=twitter.com&callback='+ $_label +'.sitecfg_callback')) );
		}
	};
	//
});





// ------------------------------------------------------------
_this_.fix_links = new (function (_PROFILES) {
	//
	var $_label = $ID +'.fix_links';
	//
	this.$links = {};
	//
	this.$profiles = {};
	//
	for(var p in _PROFILES){
		//
		var base_prof = _PROFILES[p];
		this.$profiles[p] = {
			callback: ((typeof base_prof.callback == 'string') ? _PROFILES[base_prof.callback] : base_prof).callback
		};
		//
		if( base_prof.json ){
			this.$profiles[p].json = ((typeof base_prof.json == 'string') ? base_prof : _PROFILES[base_prof.json.shift()]).json;
		}
		//
		if( base_prof.hosts ){
			for(var h=0; h<base_prof.hosts.length; h++){
				this.$profiles[ base_prof.hosts[h] ] = this.$profiles[p];
			}
		}
	}
	// ------------------------------------------------------------
	//
	this.callback = function (__id, __data){
		//
		var link = this.$links[__id]['link'];
		if(link == 1){ return ; }
		//
		if( __data ){
			var href_prev = link.href;
			var cb_result = this.$links[__id]['callback'](link, __data);
			//
			link.title = href_prev +' → '+ link.href;
			//
			if(
				(cb_result == 1)
				|| (href_prev.toLowerCase() == link.href.toLowerCase())
			){
				this.$links[__id]['link'] = 1;
				return ;
			}
		}
		//
		var profile = this.$profiles[ link.host.replace(/^[w\d]+\./i,'') ];
		if(! profile ){
			this.$links[__id]['link'] = 1;
			return ;
		}
		//
		this.$links[__id]['callback'] = profile.callback;
		//
		return (
			profile.json
			? this.$links[__id]['link'].parentNode.appendChild( create_script('',
				profile.json
				.replace(/#url#/gi, encodeURIComponent(link.href))
				.replace(/#callback#/gi, encodeURIComponent($_label+'.$links["'+__id+'"]._callback'))
			) )
			: (this.$links[__id]['link'] = profile.callback(link, __data))
		);
	};
	// ------------------------------------------------------------
	//
	this.scan = function (){
		//
		var list = _sylera.external.evaluateXPath(
			document.getElementById('content')
			, './/*[starts-with(@id,"status_") and starts-with(@class,"hentry")]'
		);
		//
		for(
			var i=0, block, block_id
				, link_items
				, j, link, link_id, profile
			; i<list.length
			; i++
		){
			//
			block = list[i];
			label = block.id.match(/\d+$/);
			//
			if(! this.$links[(label +'-0')]){
				//
				link_items = _sylera.external.evaluateXPath(block, './/a[@class="tweet-url web" or @target="twitter_external_link"]');
				//
				for(j=0; j<link_items.length; j++){
					//
					link_id = label +'-'+ j;
					link = link_items[j];
					this.$links[link_id] = {
						'link': link
						, '_callback': (new Function('__data', ($_label +'.callback("'+ link_id +'", __data);')))
					};
				}
			}
			//
		}
		//
		for(link_id in this.$links){
			this.callback(link_id);
		}
		//
	};
	//
})({
	//
	'redirect': {
		json: 'http://webtool.es.land.to/redirect.cgi?cb=#callback#&u=#url#'
		, callback: (function (__link, __data){
			with( __link ){
				href = __data;
				replaceChild(document.createTextNode(__data), __link.firstChild);
				style.fontWeight = 'bold';
			}
			if( (/\.((jpe?|pn)g|gif)$/i).test(__link.pathname) ){
				__link.parentNode.appendChild( create_thumb(__link.href) );
				return 1;
			}
			return __link;
		})
		, hosts: ['t.co','bit.ly','j.mp','ow.ly','goo.gl','post.ly']
	}
	,
	//
	'embed.ly': {
		json: 'http://api.embed.ly/1/oembed?callback=#callback#&url=#url#'
		, callback: (function (__link, __data){
			if( __data.thumbnail_url ){
				__link.parentNode.appendChild( create_thumb(__data.thumbnail_url) );
				return 1;
			}
			if( __data.url ){
				if(__data.url.toLowerCase() == __link.href.toLowerCase()){ return 1; }
				with( __link ){
					href = __data.url;
					replaceChild(document.createTextNode(__data.url), __link.firstChild);
					style.fontWeight = 'bold';
				}
			}
			return __link;
		})
		, hosts: ['yfrog.com', 'flickr.com', 'twitpic.com', 'imgur.com', 'posterous.com', 'twitgoo.com', 'photobucket.com', 'phodroid.com', 'mobypicture.com', 'xkcd.com', 'asofterworld.com', 'qwantz.com', '23hq.com', 'dribbble.com', 'smugmug.com', 'emberapp.com', 'picasaweb.google.com', 'dailybooth.com', 'brizzly.com', 'img.ly', 'tinypic.com', 'meadd.com', 'deviantart.com', 'fotopedia.com', 'photozou.jp', 'instagr.am', 'skitch.com', 'share.ovi.com', 'questionablecontent.net', 'picplz.com', 'twitrpix.com', 'someecards.com', 'pikchur.com', 'achewood.com', 'whosay.com', 'color.com', 'bnter.com', 'mlkshk.com', 'lockerz.com', 'lightbox.com', 'soundcloud.com', 'last.fm', 'mixcloud.com', 'radionomy.com', 'hark.com', 'rdio.com', 'zero-inch.com', 'bandcamp.com', 'freemusicarchive.org', 'npr.org', 'huffduffer.com', 'audioboo.com', 'xiami.com', 'saynow.com', 'grooveshark.com', 'radioreddit.com', 'gogoyoko.com', 'amazon.com', 'shopstyle.com', 'itunes.apple.com', 'gist.github.com', 'crunchbase.com', 'slideshare.net', 'scribd.com', 'screenr.com', 'polldaddy.com', '5min.com', 'howcast.com', 'screencast.com', 'issuu.com', 'kickstarter.com', 'scrapblog.com', 'foursquare.com', 'ping.fm', 'chart.ly', 'maps.google.com', 'craigslist.org', 'my.opera.com', 'tumblr.com', 'polleverywhere.com', 'quantcast.com', 'compete.com', 'statsheet.com', 'status.net', 'indenti.ca', 'brainbird.net', 'shitmydadsays.com', 'studivz.net', 'myloc.me', 'pastebin.com', 'pastie.org', 'redux.com', 'cl.ly', 'speakerdeck.com', 'kiva.org', 'timetoast.com', 'storify.com', 'meetup.com', 'dailymile.com', 'kinomap.com', 'metacdn.com', 'prezi.com', 'uservoice.com', 'formspring.me', 'twitlonger.com', 'qwiki.com', 'crocodoc.com', 'wikipedia.org', 'wikimedia.org', 'urtak.com', 'graphicly.com', 'youtube.com','youtu.be', 'justin.tv', 'ustream.tv','ustre.am', 'qik.com', 'revision3.com', 'dailymotion.com', 'collegehumor.com', 'twitvid.com', 'break.com', 'vids.myspace.com', 'metacafe.com', 'blip.tv', 'video.google.com', 'revver.com', 'video.yahoo.com', 'viddler.com', 'liveleak.com', 'animoto.com', 'dotsub.com', 'overstream.net', 'livestream.com', 'worldstarhiphop.com', 'teachertube.com', 'bambuser.com', 'schooltube.com', 'bigthink.com', 'sendables.jibjab.com', 'xtranormal.com', 'socialcam.com', 'dipdive.com', 'youku.com', 'snotr.com', 'video.jardenberg.com', 'clipfish.de', 'myvideo.de', 'whitehouse.gov', 'hulu.com', 'crackle.com', 'fancast.com', 'funnyordie.com', 'vimeo.com', 'ted.com', 'nfb.ca', 'thedailyshow.com', 'movies.yahoo.com', 'colbertnation.com', 'comedycentral.com', 'theonion.com', 'wordpress.tv', 'traileraddict.com', 'escapistmagazine.com', 'trailerspy.com', 'atom.com', 'fora.tv', 'spike.com', 'gametrailers.com', 'koldcast.tv', 'techcrunch.tv', 'mixergy.com', 'video.pbs.org', 'zapiks.com', 'digg.com', 'trutv.com', 'nzonscreen.com', 'wistia.com', 'hungrynation.tv', 'indymogul.com', 'channelfrederator.com', 'tmiweekly.com', '99dollarmusicvideos.com', 'ultrakawaii.com', 'barelypolitical.com', 'barelydigital.com', 'threadbanger.com', 'vodcars.com', 'confreaks.net', 'allthingsd.com', 'videos.nymag.com', 'aniboom.com', 'clipshack.com', 'grindtv.com', 'ifood.tv', 'logotv.com', 'lonelyplanet.com', 'streetfire.net', 'trooptube.tv', 'sciencestage.com', 'brightcove.com', 'godtube.com', 'tangle.com', 'mediamatters.org', 'clikthrough.com', 'espn.go.com', 'abcnews.go.com', 'washingtonpost.com', 'boston.com', 'facebook.com', 'cnbc.com', 'cbsnews.com', 'google.com', 'cnn.com', 'edition.cnn.com', 'money.cnn.com', 'msnbc.com', 'globalpost.com', 'guardian.co.uk', 'bravotv.com', 'nationalgeographic.com', 'discovery.com', 'video.forbes.com']
	}
	,
	//
	'htn.to': {
		json: ['redirect']
		, callback: (function (__link, __data){
			with( __link ){
				href = ('http://b.hatena.ne.jp/entry/'+ __data);
				replaceChild(document.createTextNode(__data), __link.firstChild);
				appendChild( create_image('http://b.hatena.ne.jp/entry/image/'+ __data) );
				style.fontWeight = 'bold';
			}
			return 1;
		})
	}
	,
	//
	'f.hatena.ne.jp': {
		callback: (function (__link, __data){
			with( __link ){
				href = __link.href.replace(
					/\/images\/fotolife\/[a-z]\/([a-z][\w\-]+)\/\d{4}[01]\d[0-3]\d\/(\d{4}[01]\d[0-3]\d[0-2]\d[0-5]\d[0-5]\d)\.[a-z]+$/i
					,"/$1/$2"
				);
				parentNode.appendChild( create_thumb(
					__link.href.replace(
						/\/(([a-z])[\w\-]+)\/((\d{4}[01]\d[0-3]\d)[0-2]\d[0-5]\d[0-5]\d)$/i
						,"/images/fotolife/$2/$1/$4/$3_120.jpg"
					)
				) );
			}
			return 1;
		})
	}
	,
	//
	'movapic.com': {
		callback: (function (__link){
			__link.parentNode.appendChild( create_thumb('http://image.movapic.com/pic/t_'+ __link.pathname.match(/[^\/]+$/) +'.jpeg') );
			return 1;
		})
	}
	,
	//
	'p.twipple.jp': {
		callback: (function (__link){
			__link.parentNode.appendChild( create_thumb('http://p.twipple.jp/show/thumb/'+ __link.pathname.match(/[^\/]+$/)) );
			return 1;
		})
	}
	,
	//
	'nicovideo.jp': {
		callback: (function (__link){
			__link.parentNode.appendChild( create_thumb('http://tn-skr1.smilevideo.jp/smile?i='+ __link.pathname.match(/\d+$/)) );
			return 1;
		})
	}
	//
});
//





// ------------------------------------------------------------
//
_this_.check_relationship = new (function (){
	//
	var $_label = $ID +'_check_relationship';
	var $_user;
	// ------------------------------------------------------------
	this.check = function (_data){
		//
		if( _data.relationship.target.following ){
			with(
				document
				.getElementById($_label +'_'+ _data.relationship.target.screen_name)
				.parentNode.parentNode.parentNode
			){
				style.backgroundColor = '#'+ $_user.profile_sidebar_fill_color;
				style.borderColor = '#'+ $_user.profile_sidebar_border_color;
			}
		}
	};
	//
	this.scan = function (_user){
		//
		if(! ($_user = _user)){ return ; }
		//
		var api_url = [
			'/friendships/show.json?'
			, 'callback='+ $ID +'.check_relationship.check'
			, 'source_screen_name='+ $_user.screen_name
			, 'target_screen_name='
		].join('&');
		//
		var list = _sylera.external.evaluateXPath(
			document.getElementById('follow_grid')
			, './/*[starts-with(@id,"user_")]'
		);
		//
		for(var i=0, userblock,address; i<list.length; i++){
			//
			userblock = list[i];
			address = (_sylera.external.evaluateXPath(
				userblock
				, './*[@class="user-detail"]/address/span[@class="label screenname"]'
			))[0];
			//
			address.id = $_label +'_'+ address.textContent;
			document.body.appendChild(
				create_script('', api_url + address.textContent)
			);
			//
		}
		//
	};
	//
	this.init = function (){
		//
		try {
			document.body.appendChild(
				create_script('', '/users/show.json?'
					+'callback='+ $ID +'.check_relationship.scan'
					+ '&screen_name='+ (_sylera.external.evaluateXPath(
						(document.getElementsByTagName('head'))[0]
						, '//meta[@name="session-user-screen_name"]'
					))[0].getAttribute('content')
				)
			);
		}
		catch(_e){
			alert($_label +'\n[include error]'+ _e.message);
			return ;
		}
	};
	//
})();
//





// ------------------------------------------------------------
//
_this_.refresh = function (){
	//
	_this_.fix_links.scan();
	//
	_this_.star.entry_loader();
	//
};


//
_this_.init = function (_id){
	//
	$ID = _id;
	//
	try {
		_sylera.include(_sylera.__EXTENSION_DIR__ +'/_sylera.external.evaluateXPath.js');
	}
	catch(_e){
		alert($ID +'\n[include error]'+ _e.message);
		return ;
	}
	//
	if( (/^\/following/i).test(location.pathname) ){
		return _this_.check_relationship.init();
	}
	//
	if( (/^\/\w+(\/(favorites(\?[^\?]+)?|status(es)?\/\d+)?)?$/i).test(location.pathname) ){
		//
		try {
			_this_.onPageChange = window.onPageChange;
			window.onPageChange = function (){
				with( _this_ ){
					onPageChange();
					refresh();
				}
			};
			_this_.summizeRefresh = window.summizeRefresh;
			window.summizeRefresh = function (){
				with( _this_ ){
					summizeRefresh();
					refresh();
				}
			};
		}
		catch(_e){}
		//
		_this_.star.init();
		//
		_this_.refresh();
		//
	}
	//
};





//
	})(); } // _autoexec_twitter
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
		if(
			(document.getElementById('timeline') != null)
			|| (/^\/(home|((\w+\/)?(favorites|follow(ing|ers)|status(es)?\/\d+))?|public_timeline)$/i)
			.test(location.pathname)
		){
			//
			_autoexec_twitter.init(_label);
			//
		}
		//
	}
	//
})( '_autoexec_twitter' );
//





//
