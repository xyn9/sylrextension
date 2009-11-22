// autoexec.livedoor-reader.js
//
// ==UserScript==
// @name autoexec.livedoor-reader
// @version 0.9
// @include reader.livedoor.com
// @require ./_sylera.external.element.js
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
_this_.key_config = function (){
/*
	//
	try { Keybind; } catch(_e){ return ; }
	//
	with( Keybind ){
		//
		remove('ctrl+shift'); remove('shift+ctrl');
		remove('enter'); remove('ctrl+enter'); remove('shift+enter');
		remove('space'); remove('ctrl+space'); remove('shift+space');
		remove('pageup');
		remove('pagedown');
		remove('up'); remove('shift+up');
		remove('down'); remove('shift+down');
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
		add('P', Control.pin_click);
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
 */
};





// hatena_bookmark
// ------------------------------------------------------------
_this_.hatena_bookmark = function (){
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
		//			, '  position: absolute !important;'
				, '  display: none;'
				, '  word-break  : break-all ;'
				, '  word-wrap	 : break-word ;'
		//			, '  width: 400px;'
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
		//			, '  overflow-y:auto;'
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
	function create_comment_view(_item){
		//
		var counter = $('hatena_bm_icon_'+ _item.id);
		with( counter ){
			//
			default_src = counter.src;
			// src = BookmarkCommentViewer.LOADING_ICONURL;
			src = 'data:image/gif;base64,'
			+'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'
			+ 'BsCwEGVBGBIYBe4AY8YCEQMe4urFGBAAOw=='
			;
		}
		//
		var comment_view = document.createElement('div');
		with( comment_view ){
			id = 'hatena_bm_comment_'+_item.id;
			tabIndex = 9000;
			appendChild( BookmarkCommentViewer.asyncCommnetView(
				_item.link.replace(/#(.+)$/,"%23$1")
				, function (){ counter.src = counter.default_src;}
			));
		}
		//
		$('item_'+ _item.id).appendChild( comment_view );
		//
		comment_view.focus();
	}
	// ------------------------------------------------------------
	//
	entry_widgets.add('hatena_bm_counter', function(_feed, _item){
		//
		var item_link = _item.link.replace(/#(.+)$/,"%2523$1");
		return [
			_sylera.external.element('a', {
				href: 'http://b.hatena.ne.jp/entry/'+ item_link
				, id: 'hatena_bm_counter_'+ _item.id
				, target: '_blank'
			}, [
				_sylera.external.element('img', {
					// src: BookmarkCommentViewer.B_ENTRY_ICONURL
					src: 'data:image/gif;base64,R0lGODlhEAAQAKIFAOnp6YKCgllZWRhBzv///////wAAAAAAACH5BAEAAAUALAAAAAAQABAAAAM/WLHcrSTKKYEINEeLNeXZIIrbFQ0SSZDgeKIryo0kzZprCsdg/uo9l4qHm9hkRU+po1wCntBoVFAQWK9YbCEBADs='
					, id: 'hatena_bm_icon_'+ _item.id
					, border: 0
				})
				, _sylera.external.element('img', {
					src: 'http://b.hatena.ne.jp/entry/image/'+ item_link
					, border: 0
					, hspace: 1
					, align: 'middle'
				})
			]).innerHTML
		].join('\n');
		//
	}, 'hatena bookmark users');
	// ------------------------------------------------------------
	with( window.Keybind ){
		//
		add('B', function (){
			window.open($('hatena_bm_counter_'+ get_active_item(true).id).href);
		});
		//
		add('b', function (){
			//
			var current_item = get_active_item(true);
			var comment_view = $('hatena_bm_comment_'+current_item.id);
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
	}
	catch(_e){
		alert($ID +'\n[include error]'+ _e.message);
		return ;
	}
	//
	_this_.key_config();
	_this_.hatena_bookmark();
	//
	with( _this_.another_useful ){
		Utilities_for_livedoor_Reader();
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
