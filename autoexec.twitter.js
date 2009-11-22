// autoexec.twitter.js
//
// ==UserScript==
// @name autoexec.twitter
// @version 0.9
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
		, 'style': 'display:block;margin:7px;border:solid 1px;'
	});
}





// ------------------------------------------------------------
_this_.fix_links = new (function (_PROFILES, _APPLY_REGEX) {
	//
	var $_label = $ID +'_fix_links';
	//
	this._list_ = {};
	// ------------------------------------------------------------
	_PROFILES['default'] = {
		api: (function (_l, _cb){ return ('http://api.longurl.org/v2/expand?format=json&url='+ _l.href +'&callback='+ _cb); })
		, parse: function (_l, _data){ _l.href = _data['long-url']; }
		, inline: (function (_l){
			if( (/\.((jpe?|pn)g|gif)$/i).test(_l.pathname) ){
				_l.appendChild( create_thumb(_l.href) );
			}
		})
	};
	// ------------------------------------------------------------
	function expander (__LINK, __ID) {
		//
		var $__profile;
		//
		this.expand = function (___data){
			//
			if(!
				(
					___data
					&& (
						(typeof ___data == 'object')
						|| ((typeof ___data == 'string') && ___data.length)
					)
				)
			){
				with( __LINK ){
					title = 'return blank';
					style.textDecoration = 'strike';
				}
				return;
			}
			//
			with( __LINK ){
				title += ' * '+ __LINK.href;
				style.fontWeight = 'bold';
			}
			//
			var prev_host = __LINK.host.toLowerCase();
			if( $__profile.parse ){ $__profile.parse(__LINK, ___data); }
			var new_host = __LINK.host.toLowerCase();
			//
			__LINK.innerHTML = __LINK.href;
			//
			if((prev_host != new_host) && _PROFILES[new_host]){
				document.getElementById(__ID.match(/status_\d+/))
				.appendChild( this.init(_PROFILES[new_host]) );
				return ;
			}
			//
			if( $__profile.inline ){ $__profile.inline(__LINK, ___data); }
			//
		};
		//
		this.init = function (___profile){
			//
			$__profile = ___profile;
			//
			var e_scr = $__profile.api
			? create_script('', $__profile.api(__LINK, ($ID +'.fix_links._list_.'+ __ID +'.expand')))
			: create_script($ID +'.fix_links._list_.'+ __ID +'.expand("'+ __LINK.href +'");')
			;
			var e_id = $_label +'_expander_'+ __ID;
			while(document.getElementById(e_id) != null){ e_id += '_0'; }
			e_scr.id = e_id;
			//
			return e_scr;
		};
		//
	}
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
			var i=0, block, link_items
				, j, link, profile, label, e_scr
			; i<list.length
			; i++
		){
			//
			block = list[i];
			link_items = _sylera.external.evaluateXPath(block, './/a[@class="tweet-url web"]');
			//
			for(j=0; j<link_items.length; j++){
				//
				link = link_items[j];
				label = block.id +'_a'+ j;
				//
				if(
					(! (profile = _PROFILES[link.host.toLowerCase()]))
					&& _APPLY_REGEX.test(link.host)
				){
					profile = _PROFILES['default'];
				}
				//
				if(profile && (! this._list_[label])){
					this._list_[label] = new expander(link, label);
					block.appendChild(this._list_[label].init(profile));
				}
				//
			}
			//
		}
		//
	};
	//
})(
	// ------------------------------------------------------------
	{
		//
		'f.hatena.ne.jp': {
			parse: (function (_l){
				_l.href = _l.href.replace(
					/\/images\/fotolife\/[a-z]\/([a-z][\w\-]+)\/\d{4}[01]\d[0-3]\d\/(\d{4}[01]\d[0-3]\d[0-2]\d[0-5]\d[0-5]\d)\.[a-z]+$/i
					,"/$1/$2"
				);
			})
			, inline: (function (_l){
				_l.appendChild(create_thumb(
					_l.href.replace(
						/\/(([a-z])[\w\-]+)\/((\d{4}[01]\d[0-3]\d)[0-2]\d[0-5]\d[0-5]\d)$/i
						,"/images/fotolife/$2/$1/$4/$3_120.jpg"
					)
				));
			})
		}
		//
		, 'movapic.com': {
			inline: (function (_l){
				_l.appendChild(create_thumb('http://image.movapic.com/pic/t_'+ _l.pathname.match(/[^\/]+$/) +'.jpeg'));
			})
		}
		//
		, 'twitpic.com': {
			inline: (function (_l){
				_l.appendChild(create_thumb(_l.href.replace(/([^\/]+)$/, "show/thumb/$1")));
			})
		}
		//
		, 'tweetphoto.com': {
			inline: (function (_l){
				_l.appendChild(create_thumb(_l.href.replace(/([^\/]+)$/, "show/thumb/$1")));
			})
		}
		//
		, 'flic.kr': {
			api: (function (_l, _cb){ return ('http://webtool.es.land.to/redirect.cgi?u=http://www.flickr.com'+ _l.pathname +'&cb='+ _cb); })
			, parse: (function (_l, _data){ _l.href = _data; })
		}
		, 'www.flickr.com': {
			api: (function (_l, _cb){ return ('http://www.flickr.com/services/rest/?method=flickr.photos.getSizes&format=json&api_key=cc793769935d6b3b2c5ec1998227a773&photo_id='+ (_l.pathname.match(/\/(\d+)\//))[1] +'&jsoncallback='+ _cb); })
			, inline: (function (_l, _data){
				var d = _data.sizes.size[1];
				_l.appendChild(
					(d.media == 'photo')
					? create_thumb(d.source)
					: document.createTextNode(' ['+ d.media +']')
				);
			})
		}
		//
		, 'typograffit.com': {
			inline: (function (_l){
				return _l.appendChild(create_thumb(
					_l.href.replace(
						/\/compose\/([^\/]+)/
						, "/getImage/$1/resizeByWidth:100/resizeByHeight:100"
					)
				));
			})
		}
		//
	}
	,
	// ------------------------------------------------------------
	// /^[a-z\d\-]{1,9}\.[a-z]{2,5}$/i
	// http://longurl.org/services
	//
	/^(0rz\.tw|2tu\.us|307\.to|6url\.com|a\.gg|a\.nf|a2n\.eu|ad\.vu|adf\.ly|adjix\.com|alturl\.com|atu\.ca|azqq\.com|b23\.ru|b65\.com|bacn\.me|bit\.ly|bloat\.me|budurl\.com|buk\.me|canurl\.com|chilp\.it|clck\.ru|cli\.gs|cliccami\.info|clipurl\.us|clop\.in|cort\.as|cuturls\.com|decenturl\.com|digg\.com|doiop\.com|dwarfurl\.com|easyurl\.net|eepurl\.com|ewerl\.com|ff\.im|fff\.to|fhurl\.com|flingk\.com|flq\.us|fly2\.ws|fwd4\.me|fwdurl\.net|g8l\.us|gl\.am|go\.9nl\.com|goshrink\.com|hex\.io|href\.in|htxt\.it|hugeurl\.com|hurl\.ws|icanhaz\.com|idek\.net|is\.gd|jijr\.com|kissa\.be|kl\.am|klck\.me|korta\.nu|l9k\.net|liip\.to|liltext\.com|lin\.cr|linkgap\.com|liurl\.cn|ln-s\.net|ln-s\.ru|lnkurl\.com|lru\.jp|lu\.to|lurl\.no|memurl\.com|merky\.de|migre\.me|minilien\.com|moourl\.com|myurl\.in|nanoref\.com|nanourl\.se|netnet\.me|ni\.to|nn\.nf|notlong\.com|nutshellurl\.com|o-x\.fr|offur\.com|omf\.gd|onsaas\.info|ow\.ly|parv\.us|peaurl\.com|ping\.fm|piurl\.com|plumurl\.com|plurl\.me|pnt\.me|poprl\.com|post\.ly|ptiturl\.com|qlnk\.net|qurlyq\.com|r\.im|rb6\.me|rde\.me|reallytinyurl\.com|redir\.ec|redirects\.ca|redirx\.com|ri\.ms|rickroll\.it|rubyurl\.com|s3nt\.com|s7y\.us|shink\.de|short\.ie|short\.to|shortenurl\.com|shorterlink\.com|shortlinks\.co\.uk|shoturl\.us|shredurl\.com|shrinkify\.com|shrinkr\.com|shrinkurl\.us|shrtnd\.com|shurl\.net|shw\.me|smallr\.com|smurl\.com|sn\.im|sn\.vc|snadr\.it|snipr\.com|snipurl\.com|snurl\.com|sp2\.ro|spedr\.com|srnk\.net|srs\.li|starturl\.com|surl\.co\.uk|ta\.gd|tcrn\.ch|tgr\.me|tighturl\.com|tiny\.cc|tiny\.pl|tinylink\.com|tinyurl\.com|to\.ly|togoto\.us|tr\.im|tra\.kz|trunc\.it|tubeurl\.com|twitclicks\.com|twitterurl\.net|twiturl\.de|twurl\.cc|twurl\.nl|u\.mavrev\.com|u\.nu|u76\.org|ub0\.cc|ulu\.lu|updating\.me|ur1\.ca|url\.az|url\.co\.uk|url\.ie|urlborg\.com|urlbrief\.com|urlcut\.com|urlcutter\.com|urlhawk\.com|urlkiss\.com|urlpire\.com|urlvi\.be|urlx\.ie|virl\.com|wapurl\.co\.uk|wipi\.es|x\.se|xil\.in|xrl\.in|xrl\.us|xurl\.jp|xzb\.cc|yatuc\.com|yep\.it|yfrog\.com|zi\.ma|zurl\.ws|zz\.gd|zzang\.kr|j\.mp)$/i
	//
);
//





// ------------------------------------------------------------
//
_this_.refresh = function (){
	//
	_this_.fix_links.scan();
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
	try {
		//
		_this_.onPageChange = window.onPageChange;
		window.onPageChange = function (){
			with( _this_ ){
				onPageChange();
				refresh();
			}
		};
		//
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
	_this_.refresh();
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
			|| (/\/status(es)?\/\d+$/i).test(location.pathname)
		){
			//
			_autoexec_twitter.init(_label);
		}
	}
	//
})( '_autoexec_twitter' );
//





//

