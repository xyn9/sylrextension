// command.webtool.js
//
// ==UserScript==
// @name command.webtool
// @version 0.94
// @require ./_sylera.external.element.js
// @require ./_sylera.external.selection.js
// @require ./_sylera.external.charconv.js
// @require ./_sylera.external.localfile.js
// @description ページにツールバー的なものを組み込むコマンド
// @homepage http://xyn9.github.com/sylrextension
//
// @author xyn9 <xyn9.mail@gmail.com>
// @license (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/2.1/jp
// ==UserScript==
//


// command





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
	try { _command_webtool; } catch(_e){ _command_webtool = new (function (_TOOL_ORDER) { //
//

var _this_ = this;

//
var $ID, $ID_SUB;
//
var $Z_INDEX = 19000;
//
var $bar, $bar_sub;
//
// ------------------------------------------------------------
function assign_tool(_id, _button){
	//
	$Z_INDEX += 10;
	//
	with( _button ){
		_button.id = $ID +'_tool_'+ _id;
		style.zIndex = $Z_INDEX++;
	}
	//
	$bar.insertBefore(_button, $bar_sub);
	//
	return _button.id;
};





// ------------------------------------------------------------
//
_this_.BTN_X = function (){
	return _sylera.external.element('img', {
		alt: ' × '
		, src: 'data:image/gif;base64,R0lGODlhDAAMAMQAAOTk5L29vbq6uunp6d7e3ra2turq6sLCwrOzs+Xl5ejo6OHh4efn57S0tLm5ucHBwbu7u/b29vr6+v///7KysgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAMAAwAAAVBoBFQZEkGhmOulEoVw0M+TGEmk/Q80gSYkEiuF4GsgpNJkXXo5WSmplKoMwGUEOTC1CAYKRACgiRgmQQDF8uhCAEAOw=='
		,
		border: 0
		, className: 'btn_x'
		,
		onclick: (function (){
			this.parentNode.parentNode.removeChild(this.parentNode);
		})
	});
};





// ------------------------------------------------------------
_this_.add_frame = function (_frame){
	//
	$Z_INDEX += 100;
	//
	_frame.style.zIndex = $Z_INDEX++;
	//
	$bar_sub.insertBefore(
		_sylera.external.element('nobr', {
			id: ($ID +'_frame_'+ $Z_INDEX)
			, className: 'toolframe'
			, style: {
				display: 'block'
				, height: _frame.style.height
			}
			, resize: 1
		}, [
			_this_.BTN_X()
			, _frame
		])
		, $bar_sub.firstChild
	);
	//
	_this_.expand(true);
	//
};


//
_this_.expand = function (_stat){
	//
	$bar.style.opacity = _stat ? '0.91' : '0.67';
	//
	with( $bar_sub ){
		style.display = _stat ? 'block' : 'none';
		focus();
	}
	//
};
//
_this_.expand_toggle = function (){
	_this_.expand( (/^none$/i).test($bar_sub.style.display ) );
};





// ------------------------------------------------------------
_this_.init = function (_id){
	//
	$ID = _id;
	$ID_SUB = $ID +'_sub';
	//
	try {
		with( _sylera ){
			include(_sylera.__EXTENSION_DIR__ +'/_sylera.external.element.js');
			include(_sylera.__EXTENSION_DIR__ +'/_sylera.external.selection.js');
			include(_sylera.__EXTENSION_DIR__ +'/_sylera.external.charconv.js');
			include(_sylera.__EXTENSION_DIR__ +'/_sylera.external.localfile.js');
		}
	}
	catch(_e){
		alert($ID +'\n[include error]'+ _e.message);
		return ;
	}
	// ------------------------------------------------------------
	//
	if(document.getElementById($ID +'_css') == null){
		//
		(document.getElementsByTagName('head'))[0]
		.appendChild( _sylera.external.element('style', {
			//
			id: $ID +'_css'
			, type: 'text/css'
			, innerHTML: [
				'#'+ $ID +'{'
					, 'top:0;left:0;'
					, 'width:100%;'
					, 'margin:0;padding:1px;'
					, 'border:dashed 1px black;'
					, 'background-color:#f9f9f9;'
					, 'font-size:13px;'
					, 'text-align:right;'
					, 'vertical-align:middle;'
				, '}'
				,
				'#'+ $ID +' nobr{'
					, 'font-size:small;'
					, 'vertical-align:middle;'
				, '}'
				,
				'#'+ $ID +' img{'
					, 'padding:0 1px 0 2px;'
					, 'align:center;'
					, 'vertical-align:middle;'
					, 'cursor:pointer;'
				, '}'
				,
				'#'+ $ID +' img.btn_x{'
					, 'float:right;'
					, 'vertical-align:middle;'
				, '}'
				,
				'#'+ $ID_SUB +'{'
					, 'display:none;'
					, 'direction:rtl;'
					, 'overflow:scroll;'
				, '}'
				,
				'#'+ $ID_SUB +' .toolframe{'
					, 'direction:ltr;'
					, 'width:99%; height:99%;'
					, 'margin:1%;'
				, '}'
				,
				'#'+ $ID_SUB +' .toolframe img.btn_x{'
					, 'float:none;'
					, 'padding:3px;'
					, 'vertical-align:top;'
				, '}'
				,
				'#'+ $ID_SUB +' .toolframe iframe{'
					, 'display:inline;'
					, 'position:relative;'
					, 'direction:rtl;'
					, 'width:97%; height:99%;'
					, 'border:dashed 1px black;'
				, '}'
			//
			].join('\n')
			//
		}) );
		//
	}
	// ------------------------------------------------------------
	//
	$bar_sub = _sylera.external.element('center', {
		id: $ID_SUB
		, style: {
			zIndex: ($Z_INDEX +1)
			, width: '100%', height: (parseInt(window.innerHeight *0.67) +'px')
			, clear: 'both'
			, cursor: 'auto'
		}
		,
		onmousedown: (function (_ev){ if(_ev.target.id == this.id){ this.style.cursor = 'n-resize'; } })
		, onmouseup: (function (_ev){ if(_ev.target.id == this.id){ this.style.cursor = 'auto'; } })
		, onmousemove: (function (_ev){
			if((/size$/i).test(this.style.cursor) && (_ev.button == 0)){
				this.style.height = (_ev.clientY +'px');
			}
		})
	}, [
	]);
	//
	$bar = _sylera.external.element('div', {
		id: $ID
		,
		style: {
			position: 'fixed'
			, zIndex: $Z_INDEX
		}
		,
		ondblclick: (function (){ _command_webtool.expand_toggle(); })
		//
	}, [
		_this_.BTN_X()
		,
		$bar_sub
		,
		_sylera.external.element('br', {clear:'all'})
	]);
	//
	_TOOL_ORDER.replace(/\w+/g, function (_$0){
		try {
			assign_tool(_$0, _this_.$TOOL[_$0]());
		}
		catch(_e){}
	});
	//
	document.body.insertBefore($bar, document.body.firstChild);
	//
	_command_webtool.expand(false);
	//
};





//
	})([
	'subscribe'
	, 'sendmail', 'atode'
	, 'del_icio_us', 'i_know'
	, 'hatena_bm'
	, 'star'
	, 'twitter', 'backtweets', 'twib', 'tweetbuzz'
	, 'haiku'
	, 'tumblr'
	, 'kwout'
	, 'gyotaku', 'web_archive'
	].join('|')); } // _command_webtool
//





// ------------------------------------------------------------
//
_command_webtool.$TOOL = { //
//
	// ------------------------------------------------------------
	hatena_bm:
	//
	(function (){
		//
		return _sylera.external.element('nobr', false, [
			//
			_sylera.external.element('img', {
				alt: '[B!]'
				, src: 'data:image/gif;base64,R0lGODlhEAAMAJECAP///xhBzv///wAAACH5BAEAAAIALAAAAAAQAAwAAAIjVI6ZBu3/TlNOAovD1JfnDXZJ+IGl1UFlelLpC8WXodSHUAAAOw=='
				, border:0
				,
				onclick: (function (){
					var sel = _sylera.external.selection();
					_command_webtool.add_frame(_sylera.external.element('iframe', {
						src: (
							'http://b.hatena.ne.jp/add?'
							+ 'mode=confirm'
							+ '&url='+ encodeURIComponent(location.href.replace(/#/,'%23'))
							+ '&title='+ encodeURIComponent(
								document.title + (
									sel.childNodes.length
									? (' - ' + sel.textContent.replace(/\r?\n/g,' '))
									: ''
								)
							)
						)
					}));
					//
				})
			})
			,
			//
			_sylera.external.element('img', {
				alt: 'はてブ'
				, src: ('http://b.hatena.ne.jp/entry/image/'+ location.href.replace(/#/,'%23'))
				, border: 0
				,
				onclick: (function (){
					_command_webtool.add_frame(_sylera.external.element('iframe', {
						src: ('http://b.hatena.ne.jp/entry/'+ location.href.replace(/#/,'%23'))
					}));
				})
			})
			//
		]);
		//
	})


	// ------------------------------------------------------------
	,
	gyotaku:
	//
	(function (){
		//
		var link = _sylera.external.element('a', {
			title: '魚拓'
			,
			href: ('http://megalodon.jp/?url='+ encodeURIComponent(location.href.replace(/#.*$/,'')))
			, style: {
				display: 'inline'
				, padding: '3px'
				, background: '#6699cc none'
				, color: 'black'
				, font: 'bold 15px fantasy'
				, textDecoration: 'none'
			}
		}, [ document.createTextNode('魚') ]);
		//
		link.addEventListener('click', (function (_event){
			_event.preventDefault();
			_command_webtool.add_frame( _sylera.external.element('iframe', {
				src: link.href
			}) );
		}), false);
		//
		return link;
		//
	})


	// ------------------------------------------------------------
	,
	web_archive:
	//
	(function (){
		//
		return _sylera.external.element('img', {
			alt:'Internet Archive'
			,
			src: 'data:image/gif;base64,R0lGODlhEAAQAPEDAAAAAKkqMKstMv%2F%2F%2FyH5BAAAAAAALAAAAAAQABAAAAI3nI9pEdMNojzMWTnXuwN0r1lQ91Hb6EWmSKagc7ZluKUzzNoqzblr3XpVgL6QoHdjKFE3hdNQAAA7'
			, border:0
			,
			onclick: (function (){
				_command_webtool.add_frame( _sylera.external.element('iframe', {
					src: ('http://web.archive.org/web/*/'+ location.href.replace(/#.*$/,''))
				}) );
			})
		});
		//
	})


	// ------------------------------------------------------------
	,
	subscribe:
	//
	(function (){
		//
		return _sylera.external.element('img', {
			alt: '[購読]'
			,
			src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJFSURBVBgZBcHda5V1AADg5/d733Oc7tjOaNs5GC6KdrEwmpPRxG7spoKghOim7oK8y0MIEQRL+geGEIQ3UXQvSJ8IafZxUbjQhRDZoU60iYsSc9t5v87b84TsVe3mrBWpHoCICIAIACixYTUfOJM2Z62YO97TOULSIKaEQAyESAzEgISAgLpi48de87MLUqmezhGyhO4SCW7f4O81YiSJiCQIkbqmNcXMIjMXeilIGsQxDp8AnKDY5teL3PyU6h4CdY3Av7cYu58R0QghZWeT9fP0v2V7i8Y4j77As2c5sAwIFAXDgjInJxURAzub/PwxMZBGphZYeIWJWZ44xdo5bl4kK8kzioohUUREd4kXP+Kpd3nkee72+epNBleAxdfoLJBlDEuKkpxoBAkBjXGm53n8ZZ45S/shrr7P75eBo6eo9zAsKCqGRBEB/1zj89e5eo7tLRr7ePJtWg9wZZV7t2i2OPQcw5JiRE4UESN1ZPc2g0tceos/LtPYx9HTaPDNe8Dhl9gtyStyUiMIJDXLp2m0GHzN2gdMzdPq0F3k+pcc/4+x/UwepKzIiSDWTB/iwBLT8xw8xt07rJ8HHj7GbkX/B+DBxyhrciIQ2N2i2AG2fiPL+OsXoNVlWPDnDaC5l6qiJJWjLlHxxRs0JhhcIyvp/8SHJylKdiu++4Tr31NW7B8nkrwzp627d9nkHM0Wsea+GSY6tDvESEyY6TIxyZ4GSUp/nTubqyF7WrvZtaKrZ4QSQ+TIMUSJHCVypGhaHW448z+h1tLAgvKk7gAAAABJRU5ErkJggg=='
			, border: 0
			,
			onclick: (function (){
				//
				var url = location.href.replace(/#.*$/,'');
				var subscr_list = [
					/* 'https://www.bloglines.com/sub/'+ url
					, */ 'http://reader.livedoor.com/subscribe/'+ url
					, 'http://google.com/reader/preview/*/feed/' + (location.host +'/'+ location.pathname)
				];
				//
				var block = _sylera.external.element('div', {style: {display:'inline'}});
				for(
					var i=0, split_size=Math.round(97/subscr_list.length)
					; i<subscr_list.length
					; i++
				){
					block.appendChild( _sylera.external.element('iframe', {
						src: subscr_list[i]
						, style: {
							float: 'right'
							, display: 'inline'
							, width: split_size +'%'
						}
					}) );
				}
				//
				_command_webtool.add_frame(block);
			})
			//
		});
		//
	})


	// ------------------------------------------------------------
	,
	del_icio_us:
	//
	(function (){
		//
		return _sylera.external.element('img', {
			alt: 'del.icio.us'
			,
			src: 'data:image/gif;base64,R0lGODlhCgAKAPcAAAAAAAAA/93d3f///wAAgIAAgACAgICAgMDAwP8AAAD/AP//AAAA//8A/wD//////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMwAAZgAAmQAAzAAA/wAzAAAzMwAzZgAzmQAzzAAz/wBmAABmMwBmZgBmmQBmzABm/wCZAACZMwCZZgCZmQCZzACZ/wDMAADMMwDMZgDMmQDMzADM/wD/AAD/MwD/ZgD/mQD/zAD//zMAADMAMzMAZjMAmTMAzDMA/zMzADMzMzMzZjMzmTMzzDMz/zNmADNmMzNmZjNmmTNmzDNm/zOZADOZMzOZZjOZmTOZzDOZ/zPMADPMMzPMZjPMmTPMzDPM/zP/ADP/MzP/ZjP/mTP/zDP//2YAAGYAM2YAZmYAmWYAzGYA/2YzAGYzM2YzZmYzmWYzzGYz/2ZmAGZmM2ZmZmZmmWZmzGZm/2aZAGaZM2aZZmaZmWaZzGaZ/2bMAGbMM2bMZmbMmWbMzGbM/2b/AGb/M2b/Zmb/mWb/zGb//5kAAJkAM5kAZpkAmZkAzJkA/5kzAJkzM5kzZpkzmZkzzJkz/5lmAJlmM5lmZplmmZlmzJlm/5mZAJmZM5mZZpmZmZmZzJmZ/5nMAJnMM5nMZpnMmZnMzJnM/5n/AJn/M5n/Zpn/mZn/zJn//8wAAMwAM8wAZswAmcwAzMwA/8wzAMwzM8wzZswzmcwzzMwz/8xmAMxmM8xmZsxmmcxmzMxm/8yZAMyZM8yZZsyZmcyZzMyZ/8zMAMzMM8zMZszMmczMzMzM/8z/AMz/M8z/Zsz/mcz/zMz///8AAP8AM/8AZv8Amf8AzP8A//8zAP8zM/8zZv8zmf8zzP8z//9mAP9mM/9mZv9mmf9mzP9m//+ZAP+ZM/+ZZv+Zmf+ZzP+Z///MAP/MM//MZv/Mmf/MzP/M////AP//M///Zv//mf//zAAAACH5BAEAABAALAAAAAAKAAoAAAgrAAcIFBigYMGBBA0GQDhA4UKEDhk6BECRooCLFytaxChAIwCOHTWC9AgyIAA7'
			, border: 0
			,
			onclick: (function (){
				var sel = _sylera.external.selection();
				_command_webtool.add_frame( _sylera.external.element('iframe', {
					src: (
						'http://del.icio.us/post?v=4'
						+ ';url='+ encodeURIComponent(location.href)
						+ ';title='+ encodeURIComponent(
							document.title + (
								sel.childNodes.length
								? (' - ' + sel.textContent.replace(/\r?\n/g,' '))
								: ''
							)
						)
					)
				}) );
			})
			//
		});
		//
	})
	,
	// ------------------------------------------------------------
	tumblr: (function (){
		//
		return _sylera.external.element('img', {
			alt: '[T]'
			,
			src: 'data:image/gif;base64,R0lGODlhEAAQAPcAAE5SVv///xkbHx8iJx0gJA0OEB0gJSsvNS0xOC4zOg4QEicrMQkKDENERERERAsMDRUXGgcICgcJCkxPUxseIRsdIhESFURISzA1Ow4QEw8QEgwOECUpLhsdISotM0hMTxETFQsMDh8iJhMUFycrMDA0Ow8REwYGBzM4PxocISQnK8bHyCktM1lcXx0fIQ0ODxEUFgwNDy0wOE1RVV5hZVxfY3V2dnR1dhESFEZJTgkJC1xeYiAjKWZnZyYmJxMVFgYGCBcZHTA1PGFkaTE2PSktNKanqCQoLTY7QyYpLiMmLAwMDx0fJR0fJAQEBCYoLiEkKRcYHBIUFwwNEHJzdgoKC2Vna4WFhg0OESElKTY6QTQ5QCUpLyElKqOkpDQ5QSIkKQoLCywxOExQVImKiyMnLAMEBC4zOTc4ORseIjE2PjU6QisvNhcZHAcICRYYG9DQ0BocHQsLDiIkKgoLDVpcYAUFBhASFUNDRCEjJhUWGcnKywQFBnp7gEpOUtTU1EVGR4GBgUZKTfDw8BASFDI2Pi8zOSMnK4GBggICAzI4PyEkKkdKThwfIyQnLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAQABAAAAj/AJFo+YKiUIkzCA6wIPHEUZcBBtYAmEixYkUKWwCowZAAARsPCzgcWiSiCQABigBgMDSkT40ddVpYoZImBYAoRAB03BOgp89Bed4A0CMEgJgcAYzE6QnIRoAeFiaMSADgAI0VLkz0bBDCy40NHyzIAFCESyMIAno60ABiCpYPGg4AWHCEBwEDahX8AJFhTAEPADiUASOCwNYCMO4oABBiAQAlcyB26IlnCaEMGwBUSQIgC8QKf3rCQVPgxQMAblQAGECggwAyVxAF8kHnQRgAJ6AAYEJBQJARMXREkMCAQQQAfAZYnMDowgVBfmZMNEOggoA2EKTgUFBADgMJQOw4A0kUEAA7'
			, border: 0
			,
			onclick: (function (){
				//
				var sel = _sylera.external.selection();
				var sel_text
				= sel.childNodes.length
				? (confirm('HTML') ? sel.innerHTML : sel.textContent)
					.replace(/\r\n/g,'\n').replace(/\n{2,}/g,'\n')
				: ""
				;
				//
				var block_height = parseInt(window.innerHeight *0.67);
				//
				_command_webtool
				.add_frame( _sylera.external.element('div', {style: {display:'inline'}}, [
					//
					_sylera.external.element('iframe', {
						src: (
							'http://www.tumblr.com/share?'
							+ 'v=3'
							+ '&u='+ encodeURIComponent(location.href.replace(/%23/,'#'))
							+ '&t='+ encodeURIComponent(document.title)
							+ '&s='+ encodeURIComponent(sel_text)
						)
						,
						style: {
							display: 'inline'
							, float: 'left'
							, width: '60%'
							, height: block_height +'px'
						}
					})
					,
					//
					_sylera.external.element('textarea', {
						innerHTML: sel_text
						, style: {
							display: 'inline'
							, width: '37%', height: block_height +'px'
							, backgroundColor: '#1f1f1f'
							, color: '#00ff00'
						}
						, onfocus: (function (){ this.select(); })
					})
					//
				]) );
				//
			})
			//
		});
		//
	})


	// ------------------------------------------------------------
	,
	kwout:
	//
	(function (){
		//
		return _sylera.external.element('img', {
			alt: 'kwout'
			,
			src: 'data:image/x-icon;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAB8AvwAyJP8APDZ/ACmQ/wA1qz8AP///wC1ZPwAkB38AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiIiIJnSIiIiIiIhgABiIiIiBMmdnFDSIiGAAEoJgAEiIYHAYiDBwGIhEhCiIJIQogTYoiIiIIzSAADiIiIJwAIdnaIiIiDc3goIoiIiIKIKIJnEoiCZxiIhgABiIYAAYiGdnRDJnNxiIgoJgABKCiIiIiGAwSIiIiIiIiIiIiIj8PwAA/B8AAOADAADAgQAAwcEAAMnJAACH8AAAh+AAAIfwAACn9gAAwcMAAMHBAADAAQAA6AsAAPwfAAD//wAA'
			, border: 0, alt: '[K]'
			,
			onclick: (function (){
				//
				if( confirm('inline ?') ){
					//
					document.body.appendChild( _sylera.external.element('script', {
						language: 'javascript'
						, src: ('http://kwout.com/javascripts/everywhere.en.js?t='+(new Date()).getTime())
						, type: 'text/javascript'
						, charset: 'UTF-8'
					}) );
					//
					return 1;
				}
				//
				var b=document.body, e=document.documentElement, h=100, s=self, y=0, w=window;
				y = s.pageYOffset
				? s.pageYOffset
				: ((e && e.scrollTop) ? e.scrollTop : b.scrollTop)
				;
				//
				h = (w.innerHeight && w.scrollMaxY)
				? (w.innerHeight + w.scrollMaxY)
				: ((b.scrollHeight > b.offsetHeight) ? b.scrollHeight : b.offsetHeight)
				;
				//
				_command_webtool.add_frame( _sylera.external.element('iframe', {
					src: (
						'http://kwout.com/grab?'
						+ 'address='+ encodeURIComponent(location.href)
						+ '&scroll='+ (y / h)
					)
				}) );
				//
			})
			//
		});
		//
	})


	// ------------------------------------------------------------
	,
	sendmail:
	//
	(function (){
		//
		return _sylera.external.element('img', {
			alt: '[@]'
			,
			src: 'data:image/gif;base64,R0lGODlhEAAQALMAAATy1IO0YR98Bi5VkJGx4s/h+1eKyWShO+vy/KTIjUBzuv///3qc0kWPF7DL75S+9CH5BAEAAAAALAAAAAAQABAAAARrEMhJq72UacO7N8pAIMhiniipMMhIvjBRGKzjwiTxIBxS2LjWw8Ez+H6uBeJwKBSKpJ/tSTgEmjyFz+FkMgOJQyOL4JIOiXQCLDYMcOiAXB4WDBR4PFrNtlsagA1oBwICGBMChIaHEoWLABEAOw=='
			, border: 0
			, width: 16, height: 16
			,
			//
			onclick: (function (){
				window.open(
					'mailto:?'
					+ 'Subject='+ escape( _sylera.external.charconv(
						prompt('subject:', document.title),'Shift_JIS'
					) )
					+ '&Body='+ escape(
						location.href.replace(/\+/g,'%20')
						+ '\r\n-----\r\n'
						+ _sylera.external.charconv(_sylera.external.selection().textContent, 'Shift_JIS')
					)
					,
					'_mail'
				);
			})
			//
		});
		//
	})


	// ------------------------------------------------------------
	,
	i_know:
	//
	(function (){
		//
		return _sylera.external.element('img', {
			alt: 'i-know'
			,
			src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAMCAMAAABcOc2zAAAABGdBTUEAANbY1E9YMgAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAMUExURf///39/fxkZGf///9xAtRAAAAAEdFJOU////wBAKqn0AAAAZklEQVR42mJgZkQBzAABxMDIgAIYAQKIgZEJAmACAAEEFGBggCCIAEAAAbUwgSEIAElGgAACmQHWwAQVAAggsKEQDtgoRoAAggowwVUABBCGAEAAoQiAbAEIIAyHAQQQA7rTAQIMADfUAIeR/mmoAAAAAElFTkSuQmCC'
			, border: 0
			,
			onclick: (function (){
				_command_webtool.add_frame( _sylera.external.element('iframe', {
					src: ('http://i-know.jp/add.cgi?bookmarklet=1&url='+ escape(location.href))
				}) );
			})
			//
		});
		//
	})


	// ------------------------------------------------------------
	,
	twib:
	//
	(function (){
		//
		return _sylera.external.element('img', {
			alt: 'Twib'
			, src: ('http://image.twib.jp/counter/'+ location.href.replace(/#/,'%23'))
			, border: 0
			,
			onclick: (function (){
				_command_webtool.add_frame(_sylera.external.element('iframe', {
					src: ('http://twib.jp/url/'+ location.href.replace(/#/,'%23'))
				}));
			})
		});
		//
	})


	// ------------------------------------------------------------
	,
	tweetbuzz:
	//
	(function (){
		//
		return _sylera.external.element('img', {
			alt: 'tweetbuzz'
			, src: ('http://tools.tweetbuzz.jp/imgcount?url='+ location.href.replace(/[&#]/g, encodeURIComponent))
			, border: 0
			,
			onclick: (function (){
				_command_webtool.add_frame(_sylera.external.element('iframe', {
					src: ('http://tweetbuzz.jp/redirect?url='+ location.href.replace(/[&#]/g, encodeURIComponent))
				}));
			})
		});
		//
	})


	// ------------------------------------------------------------
	,
	//
	twitter:
	//
	(function (){
		//
		_command_webtool._tool_twitter_counter_id = '_command_webtool_tool_twitter_counter';
		_command_webtool._tool_twitter_counter_cb = function (_data){
			document.getElementById(_command_webtool._tool_twitter_counter_id)
			.innerHTML = _data.count
			;
		};
		_command_webtool._tool_twitter_via = function (_host){
			return (
				({
					'nhk.or.jp': 'nhk_news'
					, 'afpbb.com': 'afpbbcom'
					, 'youtube.com': 'youtube'
					, 'slashdot.jp': 'slashdotjp'
					, 'www.swissinfo.ch': 'swissinfo_jp'
				})[_host]
				|| _host
			);
		};
		//
		return _sylera.external.element('tt', {
			style: {
				display: 'inline'
				, padding: '2px'
				, background: '#cfcfcf none'
				, align: 'center'
			}
		}, [
			_sylera.external.element('img', {
				alt: 'ヒ'
				, src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK8AAACvABQqw0mAAAABZ0RVh0Q3JlYXRpb24gVGltZQAxMS8xNC8wOb/e6gkAAAAcdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzQGstOgAAABPUlEQVQ4jZWSsU7DMBCGvyQuGcKAhJAsKkYEU1+gQ16hYusb8ALsrDxHB8b2FRi6dWJiQWKpFKkj2JC4thlKSdJEjXKSpdP5/z/dnR2sVqszYAGk9IsXYCKAhZQyHQ6Hvdzr9TrNsmwhgFRKibW2F0BKSZZlqQBq5twFGL/LBwHEoT8KagAMgsnbAIDZteEisgRdAOfcf8GHoP547z8Bp4koxd4ivG0CavOHZfrwUZqTCOa3nmBbdAAGR/o91LYBqvPeS8vd+W68LwuYohsgKpfK1tfnnMd1AcKtYZQIXlXAbBMy2+yWkkQwv/EY/VkDhHvA/phvxePVllHSfH9/oG3twGqFcI6ny4ToJC7N3mG0at9B9R8AFFpRaNXooC0EsNRaj+M47hRXI89zgKUApnmePxdFMe4D8N4vgekve0CpPyHgmZ4AAAAASUVORK5CYII='
				, border: 0
				, align: 'middle'
				,
				style: {padding: '2px'}
				,
				onclick: (function (){
					_command_webtool.add_frame(_sylera.external.element('iframe', {
						src: (
							'https://twitter.com/share?' +[
								'url='+ encodeURIComponent(location.href)
								, 'text='+ encodeURIComponent(document.getSelection() +'\n/\n'+ document.title)
								, 'via='+ _command_webtool._tool_twitter_via(location.host.replace(/^w{3}\d*\./g,''))
							].join('&')
						)
						, style: {height: '275px'}
					}));
				})
			})
			,
			//
			_sylera.external.element('a', {
				'id': _command_webtool._tool_twitter_counter_id
				, title: 'twitter'
				, href: 'https://search.twitter.com/search?q='+ encodeURIComponent(location.href.replace(/#/,'%23') +' filter:links')
				, target: 'twitter'
				, style: {
					color: '#101010'
					, font: 'bold 11px monospace'
					, textDecoration: 'none'
				}
			}, [ document.createTextNode('0') ])
			,
			//
			_sylera.external.element('script', {
				'type': 'text/javascript'
				, 'src': 'http://urls.api.twitter.com/1/urls/count.json?'
					+'url='+ encodeURI(location.href)
					+'&callback=_command_webtool._tool_twitter_counter_cb'

			}, [])
		]);
		//
	})


	// ------------------------------------------------------------
	,
	backtweets:
	//
	(function (){
		//
		return _sylera.external.element('img', {
			alt: 'backtweets'
			, src: 'data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAD///8A2dnZ/9nZ2f/Z2dn/2dnZ/9nZ2f/Z2dn/2dnZ/9nZ2f/Z2dn/2dnZ/9nZ2f/Z2dn/2dnZ/9nZ2f////8A2dnZ/9nZ2f/Z2dn/2dnZ/9nZ2f/Z2dn/2dnZ/9nZ2f/Z2dn/2dnZ/9nZ2f/Z2dn/2dnZ/9nZ2f/Z2dn/2dnZ/9nZ2f/b29v/29vb/9vb2//c3Nz/3t7e/+Dg4P/g4OD/39/f/93d3f/b29v/29vb/9vb2//b29v/29vb/9nZ2f/Z2dn/3t7e/97e3v/e3t7/5OTk/9LS0v/X19f/19fX/9XV1f/n5+f/5OTk/9/f3//e3t7/3t7e/97e3v/Z2dn/2dnZ/+Li4v/i4uL/4uLi/+7u7v93d3f/d3d3/3d3d/93d3f/f39//9zc3P/l5eX/4uLi/+Li4v/i4uL/2dnZ/9nZ2f/m5ub/5ubm/+bm5v/y8vL/d3d3/7u7u///////5eXl/3d3d/+5ubn/6+vr/+bm5v/m5ub/5ubm/9nZ2f/Z2dn/6urq/+rq6v/q6ur/9PT0/3d3d/+ZmZn/u7u7/5mZmf93d3f/0dHR/+3t7f/q6ur/6urq/+rq6v/Z2dn/2dnZ/+7u7v/u7u7/7u7u//b29v93d3f/iIiI/5mZmf+IiIj/iIiI//Hx8f/v7+//7u7u/+7u7v/u7u7/2dnZ/9nZ2f/y8vL/8vLy//Ly8v/4+Pj/d3d3/7u7u//u7u7/w8PD/3d3d//Z2dn/8/Pz//Ly8v/y8vL/8vLy/9nZ2f/Z2dn/9vb2//b29v/29vb/+vr6/3d3d/93d3f/d3d3/3d3d/+QkJD/8vLy//b29v/29vb/9vb2//b29v/Z2dn/2dnZ//r6+v/6+vr/+vr6//v7+//b29v/3Nzc/9zc3P/19fX//Pz8//v7+//6+vr/+vr6//r6+v/6+vr/2dnZ/9nZ2f/9/f3//f39//39/f/9/f3//f39//39/f/9/f3//f39//39/f/9/f3//f39//39/f/9/f3//f39/9nZ2f/Z2dn////////////////////////////////////////////////////////////////////////////Z2dn/2dnZ////////////////////////////////////////////////////////////////////////////2dnZ/9nZ2f///////////////////////////////////////////////////////////////////////////9nZ2f////8A2dnZ/9nZ2f/Z2dn/2dnZ/9nZ2f/Z2dn/2dnZ/9nZ2f/Z2dn/2dnZ/9nZ2f/Z2dn/2dnZ/9nZ2f////8AgAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAEAAA=='
			, border: 0
			,
			onclick: (function (){
				_command_webtool.add_frame(_sylera.external.element('iframe', {
					src: ('http://backtweets.com/search?q='+ encodeURIComponent(location.href))
				}));
			})
		});
		//
	})


	// ------------------------------------------------------------
	,
	haiku:
	//
	(function (){
		//
		return _sylera.external.element('img', {
			alt: "['-']"
			, src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAAAQAAAAEABcxq3DAAABeUlEQVQ4y72SSy8DURTHf3dmtEKFkHrVIzYSYSVGYlU26lOYryBiK7FGxE4ssfXYCJ8Ai9auEuPdKCURIeqZmbkWmJrREpE4q3vPuf9fzvmfC38MAWBOT8nfClOmSf/MrNA+JwqGlDhSIoRACAHAZToNgJLvsZTehpRAEH14hLL6CPhrfnEo0kBLbADHstxcYzRKZWsr7YaBY9seifb54jg2HYZBWWMTN0eH3BwcgBDcnhy/GfbefkGAQPCSvQegNFz9BgCud3fZX1nhaieJoqrfABSFvaVFmnr7yCQSuTk1jaO1Vfdc2AMhyJ6lSS7M4bw8e7yp7dLpnZjKeZMXAEjHoaqtDTUQyHljWdR0dhKsKP9hC4BaXELX0DA9o2MEQiGsxwea+2PU6t0cr68hfCNofoD99MDO/BztgwbR8Uk3f7GdwFxeQi0q+h4gVJWzzQ0y8Th1uk5JOEwmHucuffpFnBfwsQ1pW5xvbbrm+t33AFKm6f7tf49X1xOJ5323Hq4AAAAldEVYdGNyZWF0ZS1kYXRlADIwMDgtMTEtMDJUMjA6MTk6NDkrMDk6MDC+eCKnAAAAJXRFWHRtb2RpZnktZGF0ZQAyMDA4LTExLTAyVDIwOjE5OjQ5KzA5OjAw4clUkwAAAABJRU5ErkJggg=='
			, border: 0
			,
			onclick: (function (){
				//
				_command_webtool.add_frame(_sylera.external.element('iframe', {
					src: ('http://h1beta.hatena.ne.jp/?body='+ encodeURIComponent(document.getSelection() +'\n['+ location.href +':title='+ document.title +']\n'))
				}));
			})
			//
		});
		//
	})





	// ------------------------------------------------------------
	,
	star:
	//
	(function (){
		//
		var $_star_btn = _sylera.external.element('input', {
			type: 'button'
			, value: '-'
			, title: ' ★ '
			,
			style: {
				cursor: 'pointer'
				, width: '3.5ex', height: '16px'
				, margin: '2px 1px -1px 1px'
				, border: 'none 1px'
				, backgroundColor: 'transparent'
				, backgroundRepeat: 'no-repeat'
				, backgroundImage: 'URL(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIxSURBVHjaYnz9/D4DLrBkxYYoAQG+pR8+fIqOiQhYhk0N079//xiwYaBmCQ4O9qWmRnogdZm41DH9//+fARsGgnB5WWkGEWFBBh5uLptlqzYpYlOH0wVAECUnIwlmy8tJg/ix2NSxrFy7lRkoaQD1EhsQ64IYQFvNgP4HK5IFGnT1+u0ooNoXQKnvQHwNqv4LCyMj4x8Bfl5IgDAxMfDx8YDZosJCMJcwcHNxMqirKqr/+v175t+//xg+f/4CFv/z5y8DC9Af/sDA2mhsoMPAysqCEsIwA0BAS0MFRe7jp88MJ89cYmCeNqnr5tnzVzmePHtpIwh0MjsbKwOugIXhR4+fMZw6e4nh589f6Yy3r58Hm7hlx4FkZmamOdpAm+RkpbCmC5Dzr1y7xfD46YsFQO50Hw+HU4w3r56FK9i26xAoMOdYWxgZ80PDAhncufeI4dadB31ebnbFMDGWv3//Iqt5BAwHY24uDgY0cTCABrYZshwTWtx7CAsJgP0J4v/69ZsBGDZweT5ebgY2VlabnXuPimJNiUDgLQI14M3b9wzHTl0Axv+dBWfOX2X49v0H2EYxUSEQFYKREvccOMEMTBNRoHRw7eY9hvOXbuwAhrK/k51Z4vsPn8pOnL7E8OTpCwZhIX6wRfCUCLUZBKRBUXju4nWGHz9+VjramnaABEHyQHb3/sOnd9+4/SATGA5poBiA6WO8cOYIPECAiuSAFDNQA848DlRjD5Q/COMDBBgA5+mEjLsOAgUAAAAASUVORK5CYII=)'
				, color: '#666666'
				, fontSize: '13px'
				, fontWeight: 'bold'
				, textAlign: 'center'
			}
			,
			onclick: (function (){
				_command_webtool.add_frame(_sylera.external.element('iframe', {
					src: ('http://s.hatena.ne.jp/mobile/entry?uri='+ encodeURIComponent(location.href))
					, style: {height: '200px'}
				}));
			})
		});
		//
		_command_webtool._tool_star_counter_cb = function (_data){
			if( Math.abs($_star_btn.value = (_data.entries[0] || {stars:[]}).stars.length) ){
				with( $_star_btn ){
					style.color = '#666600';
					style.backgroundImage = 'URL(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIiSURBVHjahFM9aBRREP7m7d5uDhM2OfVyQe9AG5uLP0RTSCDYKSFeIwgnFqIodkJAooWtoiiCRVSuSBMFG/8QREQMgkUQQYxaBoNK4g8YNO7/e87u/Xhn9nRgeDPv+2Z25s0sKXsU7cQZf1GmXHpKLdgHOs5tv5HEEZASScrBOepKTaX25iPe8XY8ThAiUYH9omhBFNKgHmPIOf1yQxLvXwnKWr8V29qW7sg/mMTTnTOzGoNbay0ZrP2RQRljUPSlgDCAVuxE8PRzmbkLDNmsb2v8nzoIgciZVVcjUNaoPg6XHgXHyboF9J09m5QTXoOvoL568b3yFHQolNCp3TVG1wCmaH3iWoJI9GGrBZKLHvzbX0Dy4w645z+cJUsfT5UyoJyB/0k4u4zg0XcgUMdIzlfbdy8uHoZOFX1XF7TN6eTIQCF4/APhG3uSvQlzrHeG5FyxgbuXv0XZKkbZGqCsvvLLMzaC578umSdWjzVaa+6TZR4dNECZ1v7rQn0UHYPNmIidugK7RZ6nKmu+7XO5TgMXWU6SpiH3ytLaxt1fyzOiFSi25Xsf3k0u+Yk76d+xoZY4QPHmbYwntW/FJrpXHY13oky9/FDTPKIH3kO1rErm0dQh+Ume9G65XI0PkY/bGGlKUPsxgHW0CvDvBwjfyVPmEW0P670I4/MCfGwLnoXXw1dxpRP1OJKv1/+ZQiUsRPvIAXPtdoA5w4xP1/3fAgwAwNYtf4JjIOIAAAAASUVORK5CYII=)';
				}
			}
		};
		//
		return _sylera.external.element('nobr', false, [
			//
			$_star_btn
			,
			//
			_sylera.external.element('script', {
				'type': 'text/javascript'
				, 'src': ('http://s.hatena.ne.jp/entry.simple.json?timestamp=1&callback=_command_webtool._tool_star_counter_cb&uri='+ encodeURI(location.href))
			})
		]);
		//
	})




//
};
//





// ------------------------------------------------------------
(function (_label){
	//
	if(! document.body){ return; }
	//
	try {
		//
		document.body.removeChild( document.getElementById(_label) );
		//
	}
	catch(_e){
		//
		_command_webtool.init(_label);
		//
	}
	//
})( '_command_webtool' );





//
