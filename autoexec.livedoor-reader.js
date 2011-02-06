// autoexec.livedoor-reader.js
//
// ==UserScript==
// @name autoexec.livedoor-reader
// @version 0.93
// @include reader.livedoor.com
// @require ./_sylera.external.element.js
// @require ./_sylera.external.evaluateXPath.js
// @description livedoor Reader を使いやすく変える自動実行拡張
// @homepage http://xyn9.github.com/sylrextension
//
// @author xyn9 <xyn9.mail@gmail.com>
// @license (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/2.1/jp
// ==UserScript==
//
// ------------------------------------------------------------
// Built-in greasemonkey script
//
// * Utilities for livedoor Reader (http://d.hatena.ne.jp/antipop/20060430/1146343265)
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
//
// ------------------------------------------------------------
//
	try { _autoexec_livedoor_reader; } catch(_e){ _autoexec_livedoor_reader = new (function () { //
//

//
var _this_ = this;

//
var $ID = '_autoexec_';
//
// ------------------------------------------------------------





// key config
// ------------------------------------------------------------
_this_.key_config = function (_tab_index){
	//
	try { Keybind; } catch(_e){ return ; }
	//
	var $_tab_index = _tab_index;
	//
	with( Keybind ){
		//
/*
		remove('ctrl+shift'); remove('shift+ctrl');
		remove('enter'); remove('ctrl+enter'); remove('shift+enter');
		//remove('space'); remove('ctrl+space'); remove('shift+space');
		remove('pageup');
		remove('pagedown');
		remove('up'); remove('shift+up');
		remove('down'); remove('shift+down');
 */
		// ------------------------------------------------------------
		add('j', function (){
			var container = $("right_container");
			var old = container.scrollTop;
			Control.scroll_next_item();
			$('head_'+ get_active_item(true).id).getElementsByTagName('a')[0].focus();
			if(old == container.scrollTop){ Control.feed_next(); }
		});
		//
		add('k', function (){
			var container = $("right_container");
			var old = container.scrollTop;
			Control.scroll_prev_item();
			$('head_'+ get_active_item(true).id).getElementsByTagName('a')[0].focus();
			if(old == container.scrollTop){ Control.feed_prev(); }
		});
		// ------------------------------------------------------------
		add('A', Control.toggle_show_all);
		add('R', Control.mark_all_read);
		add('P', function (){
			var pin_view = document.createElement('ol');
			with( pin_view ){
				tabIndex = ++$_tab_index;
				className = 'FlatMenu';
			}
			var pin_list = pin.pins;
			for(var i=0, pin_item=pin_list[i]; pin_item; i++){
				pin_view.innerHTML += ('<li class="button flat_menu pin_item pin-target"><a href="'+ pin_item.url +'">'+ pin_item.title +'</a></li>');
				pin_item = pin_list[i];
			}
			var r_view = $('right_body');
			r_view.insertBefore(pin_view, r_view.firstChild);
			pin_view.focus();
		});
		add('T', function (){
			$('subs_container').focus();
			var item_list = $('subs_body').childNodes;
			for(var i=0; i<item_list.length; i++){
				if( (/^(treeview_\d+)$/i).test(item_list[i].id) ){
					TreeView.instance[RegExp.$1].toggle();
				}
			}
			//TreeView.instance["treeview_" + id].toggle();
		});
		//
	}
	//
};





// hatena_bookmark
// ------------------------------------------------------------
_this_.hatena_bookmark = function (_tab_index){
	//
	var $_label = $ID +'_hatena_bookmark';
	var $_tab_index = _tab_index;
	// ------------------------------------------------------------
	function create_comment_view(__item){
		//
		var counter = $($_label +'_counter_'+ __item.id);
		with( counter ){
			default_src = counter.src;
			src = 'data:image/gif;base64,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';
		}
		//
		var comment_view = _sylera.external.element('div', {
			'id': ($_label +'_comment_'+ __item.id)
			, tabIndex: ++$_tab_index
		}, [
			BookmarkCommentViewer.asyncCommnetView(
				__item.link.replace(/#(.+)$/,"%23$1")
				, function (){ counter.src = counter.default_src;}
			)
		]);
		//
		$('item_'+ __item.id).appendChild( comment_view );
		//
		comment_view.focus();
	}
	// ------------------------------------------------------------
	//
	with( document ){
		//
		body.appendChild( _sylera.external.element('script', {
			type: 'text/javascript'
			, src: 'http://b.hatena.ne.jp/js/BookmarkCommentViewerAllInOne.1.2.js'
		}));
		//
		getElementsByTagName('head')[0].appendChild( _sylera.external.element('style', {
			innerHTML: [
				'.hatena-bcomment-view {'
				, '  background-color:#fff;'
				, '  border-top:1px solid #CCC;'
				, '  border-left:1px solid #CCC;'
				, '  border-right: solid 1px #999;'
				, '  border-bottom: solid 1px #999;'
				, '  display: none;'
				, '  word-break  : break-all ;'
				, '  word-wrap	 : break-word ;'
				, '  text-align:left;'
				, '  margin:0 !important;'
				, '  padding:0 !important;'
				, '  font-weight:normal !important;'
				, '  font-size:90%;'
				, '  z-index:100;'
				, '  color:#000 !important;'
				, '}'
				, '.hatena-bcomment-title {'
				, '  margin:0 !important;'
				, '  padding:3px 5px	!important;'
				, '  text-indent:0 !important;'
				, '}'
				, '.hatena-bcomment-title img {'
				, '  vertical-align: middle !important;'
				, '  margin: 2px 2px 2px 4px !important;'
				, '}'
				, '.hatena-bcomment-view ul {'
				, '  width: auto;'
				, '  overflow: auto;'
				, '  border-top: 1px solid #5279E7;'
				, '  background-color: #edf1fd;'
				, '  list-style-type: none;'
				, '  padding: 5px 8px !important;'
				, '  margin: 0px !important;'
				, '  line-height: 150%;'
				, '}'
				, '.hatena-bcomment-view ul li{'
				, '  text-indent:0 !important;'
				, '  margin:0 !important;'
				, '  padding:0 0 2px 0 !important;'
				, '  font-size:90%;'
				, '  background:trasparent !important;'
				, '}'
				, '.hatena-bcomment-view ul li span.hatena-bcomment-tag a{'
				, '  color:#6365CE; '
				, '  font-family:"Arial",sans-serif;'
				, '  margin:0 3px;'
				, '}'
				, '.hatena-bcomment-view ul li img{'
				, '  vertical-align:middle !important;'
				, '  margin:0 2px !important;'
				, '}'
				, '.hatena-bcomment-view ul li span.hatena-bcomment-date {'
				, '}'
				, '.hatena-bcomment-view-icon {'
				, '  cursor: pointer;'
				, '}'
			].join('\n')
		}) );
		//
	}
	// ------------------------------------------------------------
	//
	entry_widgets.add(($_label +'_counter'), function(__feed, __item){
		//
		var item_link = __item.link.replace(/#(.+)$/,"%2523$1");
		return _sylera.external.element('nobr', {}, [
			_sylera.external.element('a', {
				href: 'http://b.hatena.ne.jp/entry/'+ item_link
				, id: ($_label +'_counter_'+ __item.id)
				, target: '_blank'
			}, [
				_sylera.external.element('img', {
					src: 'data:image/gif;base64,R0lGODlhEAAQAKIFAOnp6YKCgllZWRhBzv///////wAAAAAAACH5BAEAAAUALAAAAAAQABAAAAM/WLHcrSTKKYEINEeLNeXZIIrbFQ0SSZDgeKIryo0kzZprCsdg/uo9l4qHm9hkRU+po1wCntBoVFAQWK9YbCEBADs='
					, id: ($_label +'_icon_'+ __item.id)
					, border: 0
				})
				, _sylera.external.element('img', {
					src: ('http://b.hatena.ne.jp/entry/image/'+ item_link)
					, border: 0
					, hspace: 1
					, align: 'middle'
				})
			])
			//
		])
		.innerHTML;
		//
	}, 'hatena bookmark users');
	// ------------------------------------------------------------
	with( window.Keybind ){
		//
		add('B', function (){
			window.open($($_label +'_counter_'+ get_active_item(true).id).href);
		});
		//
		add('b', function (){
			//
			var current_item = get_active_item(true);
			var comment_view = $($_label +'_comment_'+ current_item.id);
			//
			if(comment_view == null){
				create_comment_view(current_item);
				return;
			}
			//
			comment_view.style.display = (comment_view.style.display == 'none')
			? 'block' : 'none'
			;
		});
	}
	//
};





// twitter_url
// ------------------------------------------------------------
_this_.twitter_url = function (_tab_index){
	//
	var $_label = $ID +'_twitter_url';
	var $_tab_index = _tab_index;
	// ------------------------------------------------------------
	function create_comment_view(__item){
		//
		var comment_view = _sylera.external.element('iframe', {
			id: ($_label +'_comment_'+ __item.id)
			, className: $_label
			, tabIndex: ++$_tab_index
			,
			style: {
				width:'99%', height:'19em'
				, border: 'gray 1px dotted'
			}
			,
			src: ('data:text/html;charset=utf-8,'+ encodeURIComponent([
				'<html>'
				, '<head>'
				, '<title> '+ __item.title +' </title>'
				, '<style>'
					, 'h3{ display:none; }'
					, 'li{ font-size:x-small; }'
				, '</style>'
				, '</head>'
				, '<body>'
				, '<script type="text/javascript" src="http://l.yimg.com/a/i/us/pps/listbadge_1.4.js">'
				, '{_btype:"list", pipe_id:"caf00625d6255d7c35219d9d2d329a71",pipe_params:{q:"'+ __item.link +'"}, width:"99%",height:"99%"}'
				, '</script>'
				, '</body>'
				, '</html>'
			].join('\n')))
		});
		//
		$('item_'+ __item.id).appendChild(comment_view);
		//
		comment_view.focus();
	}
	// ------------------------------------------------------------
	//
	entry_widgets.add(($_label +'_icon'), function(__feed, __item){
		//
		var item_link = __item.link.replace(/[&#]/g, encodeURIComponent);
		return _sylera.external.element('nobr', {}, [
			_sylera.external.element('a', {
				href: ('http://pipes.yahoo.com/xyn9/twitter_url?q='+ encodeURIComponent(item_link))
				, id: ($_label +'_icon'+ __item.id)
				, target: '_blank'
			}, [
				_sylera.external.element('img', {
					src: 'data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A/v7+D/7+/j/+/v5g/v7+YP7+/mD+/v5I/v7+KP///wD///8A////AP///wD///8A////AP///wD+/v4H/v7+UPbv4pHgx47B1K9Y3tWwWN7Ur1je3sKCx+rbuKj+/v5n/v7+GP///wD///8A////AP///wD+/v4Y+fbweM2ycMe2iB7/vI0f/8STIf/KlyL/zJki/8yZIv/LmCL/0ahK5/Hp1JH+/v4Y////AP///wD///8A7OTTaquHN+CujkXPs5ZTv6N6G/+2iB7/xpUh/8yZIv/MmSL/zJki/8yZIv/Kmy738OjUi////wD///8A////AMKtfY7w6+Ef////AP///wD///8A3sqbp8iWIf/MmSL/zJki/8yZIv/MmSL/y5gi/8mePO7+/v4w////AP///wD///8A////AP///wD+/v4H/v7+V9CtWN3KmCL/zJki/8yZIv/MmSL/zJki/8yZIv/JlyH/5tSqp/7+/mD+/v4/////AP///wD///8A+PXvJtGyZdXNnS/3y5gi/8qYIv/LmCL/zJki/8yZIv/MmSL/y5gi/82iPO7LqVfe0byMmf///wD///8A/v7+D/Do1JHKmy73ypci/8KSIP+/jyD/xpQh/8uYIv/MmSL/zJki/8qYIv+/jyD/rIEd/9nKqH7///8A////APPu4TzAlSz3wZEg/7mLH/+sgR3/uZdGz7mLH//JlyH/zJki/8yZIv/GlSH/to0r9eXbxD/Vx6dg////AP7+/h/p38WhtIsq9al/HP+kfyjuybaKgf///wCzjzjlwJAg/8qYIv/JlyH/u4wf/8CkYrn///8A////AP///wDj2sRMnHUa/7meYa7Vx6dg////AP///wD///8A2MmnYK6DHf++jiD/vo4g/62CHf/k2sQ/////AP///wD///8A8OvhH/f07w////8A////AP///wD///8A////AP///wC/p3Cfpnwc/66GKvPg1LZ8////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ANXHp2DJtoqByLWKgf///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A//8AAP//AADgPwAAwA8AAIAHAAB4BwAA+AMAAPAAAADgAQAA4AMAAMEDAADPhwAA/48AAP/nAAD//wAA//8AAA=='
					, id: ($_label +'_icon_'+ __item.id)
					, border: 0
				})
			])
			//
		])
		.innerHTML;
		//
	}, 'twitter url');
	// ------------------------------------------------------------
	with( window.Keybind ){
		//
		add('t', function (){
			//
			var current_item = get_active_item(true);
			var comment_view = $($_label +'_comment_'+ current_item.id);
			//
			if(comment_view == null){
				create_comment_view(current_item);
				return;
			}
			//
			comment_view.style.display = (comment_view.style.display == 'none')
			? 'block' : 'none'
			;
		});
	}
	//
};





// player
// ------------------------------------------------------------
_this_.player = function (_tab_index){
	//
	var $_label = $ID +'_player';
	var $_tab_index = _tab_index;
	// ------------------------------------------------------------
	function create_player(__item){
		//
		var current_item = $('item_'+ __item.id);
		var media_link = (/^http:\/\/(www\.)?youtube\.com\//i).test(__item.link)
		? __item.link
		: (_sylera.external.evaluateXPath(current_item, './/*[@class="enclosure"]/a'))[0]
		;
		//
		if( media_link ){
			//
			var player_view = _sylera.external.element('iframe', {
				'id': ($_label + __item.id)
				, className: $_label
				, src: (
					'http://w.longtailvideo.com/players/player.swf?'
					+ 'file='+ encodeURIComponent(media_link)
					+ '&autostart=1&bufferlength=9'
				)
				,
				style: {
					'tabIndex': ++$_tab_index
				}
				, onclick: (function (){ this.parentNode.removeChild(this); })
			}, []);
			//
			$('item_body_'+ __item.id).appendChild(player_view);
			//
			player_view.focus();
		}
	}
	// ------------------------------------------------------------
	document.getElementsByTagName('head')[0]
	.appendChild( _sylera.external.element('style', {
		innerHTML: [
			''
			, '.'+ $_label +'{'
				, 'zIndex: -1;'
				, 'width:330px; height: 250px;'
				, 'padding: 1em;'
				, 'cursor: pointer;'
				, 'border: gray 1px dotted;'
				, 'background-color: black;'
			, '}'
		].join('\n')
	}) );
	// ------------------------------------------------------------
	with( window.Keybind ){
		//
		add('l', function (){
			//
			var current_item = get_active_item(true);
			var player_view = $($_label + current_item.id);
			//
			if(player_view == null){
				create_player(current_item);
				return;
			}
			//
			player_view.style.display = (player_view.style.display == 'none')
			? 'block' : 'none'
			;
		});
	}
	//
};





// hatena_star
// ------------------------------------------------------------
_this_.hatena_star = function (_tab_index){
	//
	var $_label_s = '_hatena_star';
	var $_label = $ID + $_label_s;
	var $_tab_index = _tab_index;
	// ------------------------------------------------------------
	document.getElementsByTagName('head')[0]
	.appendChild( _sylera.external.element('style', {
		innerHTML: [
			''
			, 'input.'+ $_label +'_on'
			, ', input.'+ $_label +'_off'
			, '{'
				, 'cursor: pointer;'
				, 'width: 2.5ex; height: 16px;'
				, 'margin: 2px 1px -1px 1px;'
				, 'border: none 1px;'
				, 'background-color: transparent;'
				, 'background-repeat: no-repeat;'
				, 'font-size: 13px;'
				, 'font-weight: bold;'
				, 'text-align: center;'
			, '}'
			,
			'input.'+ $_label +'_off{'
				, 'color: #666666;'
				, 'background-image: URL(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIxSURBVHjaYnz9/D4DLrBkxYYoAQG+pR8+fIqOiQhYhk0N079//xiwYaBmCQ4O9qWmRnogdZm41DH9//+fARsGgnB5WWkGEWFBBh5uLptlqzYpYlOH0wVAECUnIwlmy8tJg/ix2NSxrFy7lRkoaQD1EhsQ64IYQFvNgP4HK5IFGnT1+u0ooNoXQKnvQHwNqv4LCyMj4x8Bfl5IgDAxMfDx8YDZosJCMJcwcHNxMqirKqr/+v175t+//xg+f/4CFv/z5y8DC9Af/sDA2mhsoMPAysqCEsIwA0BAS0MFRe7jp88MJ89cYmCeNqnr5tnzVzmePHtpIwh0MjsbKwOugIXhR4+fMZw6e4nh589f6Yy3r58Hm7hlx4FkZmamOdpAm+RkpbCmC5Dzr1y7xfD46YsFQO50Hw+HU4w3r56FK9i26xAoMOdYWxgZ80PDAhncufeI4dadB31ebnbFMDGWv3//Iqt5BAwHY24uDgY0cTCABrYZshwTWtx7CAsJgP0J4v/69ZsBGDZweT5ebgY2VlabnXuPimJNiUDgLQI14M3b9wzHTl0Axv+dBWfOX2X49v0H2EYxUSEQFYKREvccOMEMTBNRoHRw7eY9hvOXbuwAhrK/k51Z4vsPn8pOnL7E8OTpCwZhIX6wRfCUCLUZBKRBUXju4nWGHz9+VjramnaABEHyQHb3/sOnd9+4/SATGA5poBiA6WO8cOYIPECAiuSAFDNQA848DlRjD5Q/COMDBBgA5+mEjLsOAgUAAAAASUVORK5CYII=);'
			, '}'
			,
			'input.'+ $_label +'_on{'
				, 'color: #666600;'
				, 'background-image: URL(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIiSURBVHjahFM9aBRREP7m7d5uDhM2OfVyQe9AG5uLP0RTSCDYKSFeIwgnFqIodkJAooWtoiiCRVSuSBMFG/8QREQMgkUQQYxaBoNK4g8YNO7/e87u/Xhn9nRgeDPv+2Z25s0sKXsU7cQZf1GmXHpKLdgHOs5tv5HEEZASScrBOepKTaX25iPe8XY8ThAiUYH9omhBFNKgHmPIOf1yQxLvXwnKWr8V29qW7sg/mMTTnTOzGoNbay0ZrP2RQRljUPSlgDCAVuxE8PRzmbkLDNmsb2v8nzoIgciZVVcjUNaoPg6XHgXHyboF9J09m5QTXoOvoL568b3yFHQolNCp3TVG1wCmaH3iWoJI9GGrBZKLHvzbX0Dy4w645z+cJUsfT5UyoJyB/0k4u4zg0XcgUMdIzlfbdy8uHoZOFX1XF7TN6eTIQCF4/APhG3uSvQlzrHeG5FyxgbuXv0XZKkbZGqCsvvLLMzaC578umSdWjzVaa+6TZR4dNECZ1v7rQn0UHYPNmIidugK7RZ6nKmu+7XO5TgMXWU6SpiH3ytLaxt1fyzOiFSi25Xsf3k0u+Yk76d+xoZY4QPHmbYwntW/FJrpXHY13oky9/FDTPKIH3kO1rErm0dQh+Ume9G65XI0PkY/bGGlKUPsxgHW0CvDvBwjfyVPmEW0P670I4/MCfGwLnoXXw1dxpRP1OJKv1/+ZQiUsRPvIAXPtdoA5w4xP1/3fAgwAwNYtf4JjIOIAAAAASUVORK5CYII=);'
			, '}'
			,
			'iframe.'+ $_label +'{'
				, 'width:99%; height:19em;'
				, 'border:dotted 1px gray;'
			, '}'

		].join('\n')
	}) );
	//
	// ------------------------------------------------------------
	_this_[$_label_s +'_create_comment_view'] = function (__id, __link){
		//
		var comment_view = $($_label +'_comment_'+ __id);
		if(comment_view != null){
			comment_view.style.display = (comment_view.style.display == 'none')
			? 'block' : 'none'
			;
			return;
		}
		comment_view = _sylera.external.element('iframe', {
			src: ('http://s.hatena.ne.jp/mobile/entry?uri='+ encodeURIComponent(__link))
			, id: ($_label +'_comment_'+ __id)
			, className: $_label
			, tabIndex: ++$_tab_index
		});
		//
		$('item_'+ __id).appendChild(comment_view);
		//
		comment_view.focus();
	};
	// ------------------------------------------------------------
	//
	register_hook('AFTER_PRINTFEED', function (__feed){
		//
		for(var i=0, item; i<__feed.items.length; i++){
			item = __feed.items[i];
			$('right_body').appendChild( _sylera.external.element('script', {
				type: 'text/javascript'
				, src: 'http://s.hatena.ne.jp/entry.simple.json?timestamp=1&callback='+ $ID +'.'+ ($_label_s +'_counter_cb_'+ item.id) +'&uri='+ encodeURI(item.link)
			}) );
		}
		//
	});
	//
	entry_widgets.add($_label, function(__feed, __item){
		//
		var btn_id = $_label +'_icon_'+ __item.id;
		//
		_this_[($_label_s +'_counter_cb_'+ __item.id)] = (function (___data){
			var btn = $(btn_id);
			if( Math.abs(btn.value = (___data.entries[0] || {stars:[]}).stars.length) ){
				btn.className = $_label +'_on';
			}
		});
		//
		return ([
			'<input'
			, 'type="button"'
			, 'id="'+ btn_id +'"'
			, 'class="'+ $_label +'_off"'
			, 'value="-"'
			, 'title=" ★ "'
			, 'onclick="'+ $ID +'.'+ $_label_s +'_create_comment_view(\''+ __item.id +'\',\''+ __item.link +'\');"'
			, '/>'
		].join(' '));
		//
	}, 'hatena star');
	//
};





// ------------------------------------------------------------
_this_.another_useful = new (function (){
	/*
		another useful greasemonkey scripts
	*/
	// ------------------------------------------------------------
	// ==UserScript==
	// @name					Utilities for livedoor Reader
	// @description 	Make livedoor Reader more convenient.
	// @namespace 		http://antipop.gs/ns/greasemonkey/ldr_utils
	// @include 			http://reader.livedoor.com/reader/*
	// ==/UserScript==
	//
	// original: http://d.hatena.ne.jp/antipop/20060430/1146343265
	//
	this.Utilities_for_livedoor_Reader = function (){
		// hide ads
		['ads_top', 'ads_bottom'].forEach(function(v){DOM.hide(v);});
		// move total-unread-count into the control box
		var total_unread_count = DOM.clone($('total_unread_count'));
		setStyle(total_unread_count, {
									'position' : 'absolute',
									'right' 	 : '150px',
									'top' 		 : '5px',
									'font-size': '12px'
							});
		DOM.remove('total_unread_count');
		DOM.insert($('control'), total_unread_count, $('fontpad'));
		// replace Control.toggle_fullscreen with custom function
		var toggle_fullscreen_with_control = function(){
				var fs = [];
				var elements = ['header', 'menu', 'control', 'footer'];
				fs[0] = ['header', 'menu', 'control', 'footer'];
				fs[1] = ['menu', 'control'];
				fs[2] = ['control'];
				fs[3] = [];
				if (!State.fullscreen) {
						State.fullscreen = 1;
				} else if (State.fullscreen == fs.length-1){
						State.fullscreen = 0;
				} else {
						State.fullscreen++
				}
				Element.hide(elements);
				Element.show(fs[State.fullscreen]);
				fit_screen()
		};
		Keybind.add('Z', toggle_fullscreen_with_control);
		// make the view-area wide on the page loaded
		for(var i=1/* 2 */; i>0; i--){
			toggle_fullscreen_with_control();
		}
		//
	};


//
})();





// ------------------------------------------------------------
_this_.init = function (_id){
	//
	$ID = _id;
	//
	try {
		_sylera.include(_sylera.__EXTENSION_DIR__ +'/_sylera.external.element.js');
		_sylera.include(_sylera.__EXTENSION_DIR__ +'/_sylera.external.evaluateXPath.js');
	}
	catch(_e){
		alert($ID +'\n[include error]'+ _e.message);
		return ;
	}
	// ------------------------------------------------------------
	//
	var $tab_index = 0x7FFF;
	var $load = function (_label){ _this_[_label]($tab_index -= 1000); };
	//
	$load('key_config');
	$load('player');
	$load('hatena_bookmark');
	$load('twitter_url');
	$load('hatena_star');
	//
	if( (/livedoor/i).test(location.domain) ){
		//
		_this_.another_useful.Utilities_for_livedoor_Reader();
		//
	}
	//
};





//
	})(); } // _autoexec_livedoor_reader
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
		if( (/\/reader\/$/i).test(location.pathname) ){
			//
			var default_onload = onload;
			onload = function (){
				default_onload();
				_autoexec_livedoor_reader.init(_label);
			};
			//
		}
	}
	//
})( '_autoexec_livedoor_reader' );
//





//
