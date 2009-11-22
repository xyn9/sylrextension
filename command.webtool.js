// command.webtool.js
//
// ==UserScript==
// @name command.webtool
// @version 0.9
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
	try { _command_webtool; } catch(_e){ _command_webtool = new (function (_TOOL_SORT) { //
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
// 汎用 [x] ボタン
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

//
_this_._E = new Function();





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
			, style: {display: 'block'}
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





// ------------------------------------------------------------
_this_.expand = function (_stat){
	//
	$bar.style.opacity = _stat ? '0.91' : '0.67';
	//
	with( $bar_sub ){
		style.display = _stat ? 'block' : 'none';
		firstChild.lastChild.focus();
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
					, 'width:100%; height:'+ parseInt(window.innerHeight *0.75) +'px;'
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
					, 'width:97%; height:98%;'
					, 'border:dashed 1px black;'
				, '}'
			//
			].join('\n')
			//
		}) );
		//
	}
	//
	// ------------------------------------------------------------
	_this_._E = _sylera.external.element;

	// ------------------------------------------------------------
	//
	$bar_sub
	= _sylera.external.element('center', { id: $ID_SUB, style: {zIndex: ($Z_INDEX +1)} })
	;
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
		, $bar_sub
		, _sylera.external.element('br', {clear:'all'})
	]);
	//
	_TOOL_SORT.replace(/\w+/g, function (_$0){
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





// アイコンの並び順を指定
//
	})('subscribe | sendmail | atode | del_icio_us | i_know | hatena_bm | twib | tumblr | kwout | gyotaku | web_archive'); } // _command_webtool
//





// ------------------------------------------------------------
// ツールの本体(ラベル名は半角英数とアンダーバーのみ)
//
_command_webtool.$TOOL = { //
//
	// ------------------------------------------------------------
	hatena_bm:
	//
	(function (){
		//
		return _command_webtool._E('nobr', false, [
			//
			_command_webtool._E('img', {
				alt: '[B!]'
				, src: 'data:image/gif;base64,R0lGODlhEAAMAJECAP///xhBzv///wAAACH5BAEAAAIALAAAAAAQAAwAAAIjVI6ZBu3/TlNOAovD1JfnDXZJ+IGl1UFlelLpC8WXodSHUAAAOw=='
				, border:0
				,
				onclick: (function (){
					var sel = _sylera.external.selection();
					_command_webtool.add_frame(_command_webtool._E('iframe', {
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
			_command_webtool._E('img', {
				alt: 'はてブ'
				, src: ('http://b.hatena.ne.jp/entry/image/'+ location.href.replace(/#/,'%23'))
				, border: 0
				,
				onclick: (function (){
					_command_webtool.add_frame(_command_webtool._E('iframe', {
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
		var link = _command_webtool._E('a', {
			title: '魚拓'
			,
			href: ('http://megalodon.jp/?url='+ encodeURIComponent(location.href.replace(/#.*$/,'')))
			, style: {
				backgroundColor: 'whitesmoke'
				, color: 'blue'
				, fontWeight: 'bold'
				, textDecoration: 'none'
			}
		}, [ document.createTextNode(' 魚 ') ]);
		//
		link.addEventListener('click', (function (_event){
			_event.preventDefault();
			_command_webtool.add_frame( _command_webtool._E('iframe', {
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
		return _command_webtool._E('img', {
			alt:'Internet Archive'
			,
			src: 'data:image/gif;base64,R0lGODlhEAAQAPEDAAAAAKkqMKstMv%2F%2F%2FyH5BAAAAAAALAAAAAAQABAAAAI3nI9pEdMNojzMWTnXuwN0r1lQ91Hb6EWmSKagc7ZluKUzzNoqzblr3XpVgL6QoHdjKFE3hdNQAAA7'
			, border:0
			,
			onclick: (function (){
				_command_webtool.add_frame( _command_webtool._E('iframe', {
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
		return _command_webtool._E('img', {
			alt: '[購読]'
			,
			src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJFSURBVBgZBcHda5V1AADg5/d733Oc7tjOaNs5GC6KdrEwmpPRxG7spoKghOim7oK8y0MIEQRL+geGEIQ3UXQvSJ8IafZxUbjQhRDZoU60iYsSc9t5v87b84TsVe3mrBWpHoCICIAIACixYTUfOJM2Z62YO97TOULSIKaEQAyESAzEgISAgLpi48de87MLUqmezhGyhO4SCW7f4O81YiSJiCQIkbqmNcXMIjMXeilIGsQxDp8AnKDY5teL3PyU6h4CdY3Av7cYu58R0QghZWeT9fP0v2V7i8Y4j77As2c5sAwIFAXDgjInJxURAzub/PwxMZBGphZYeIWJWZ44xdo5bl4kK8kzioohUUREd4kXP+Kpd3nkee72+epNBleAxdfoLJBlDEuKkpxoBAkBjXGm53n8ZZ45S/shrr7P75eBo6eo9zAsKCqGRBEB/1zj89e5eo7tLRr7ePJtWg9wZZV7t2i2OPQcw5JiRE4UESN1ZPc2g0tceos/LtPYx9HTaPDNe8Dhl9gtyStyUiMIJDXLp2m0GHzN2gdMzdPq0F3k+pcc/4+x/UwepKzIiSDWTB/iwBLT8xw8xt07rJ8HHj7GbkX/B+DBxyhrciIQ2N2i2AG2fiPL+OsXoNVlWPDnDaC5l6qiJJWjLlHxxRs0JhhcIyvp/8SHJylKdiu++4Tr31NW7B8nkrwzp627d9nkHM0Wsea+GSY6tDvESEyY6TIxyZ4GSUp/nTubqyF7WrvZtaKrZ4QSQ+TIMUSJHCVypGhaHW448z+h1tLAgvKk7gAAAABJRU5ErkJggg=='
			, border: 0
			,
			onclick: (function (){
				//
				var url = location.href.replace(/#.*$/,'');
				var subscr_list = [
					'http://r.hatena.ne.jp/append/'+ encodeURIComponent(url)
					, 'http://reader.livedoor.com/subscribe/'+ url
				];
				//
				var block = _command_webtool._E('div', {style: {display:'inline'}});
				for(
					var i=0, split_size=Math.round(97/subscr_list.length)
					; i<subscr_list.length
					; i++
				){
					block.appendChild( _command_webtool._E('iframe', {
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
		return _command_webtool._E('img', {
			alt: 'del.icio.us'
			,
			src: 'data:image/gif;base64,R0lGODlhCgAKAPcAAAAAAAAA/93d3f///wAAgIAAgACAgICAgMDAwP8AAAD/AP//AAAA//8A/wD//////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMwAAZgAAmQAAzAAA/wAzAAAzMwAzZgAzmQAzzAAz/wBmAABmMwBmZgBmmQBmzABm/wCZAACZMwCZZgCZmQCZzACZ/wDMAADMMwDMZgDMmQDMzADM/wD/AAD/MwD/ZgD/mQD/zAD//zMAADMAMzMAZjMAmTMAzDMA/zMzADMzMzMzZjMzmTMzzDMz/zNmADNmMzNmZjNmmTNmzDNm/zOZADOZMzOZZjOZmTOZzDOZ/zPMADPMMzPMZjPMmTPMzDPM/zP/ADP/MzP/ZjP/mTP/zDP//2YAAGYAM2YAZmYAmWYAzGYA/2YzAGYzM2YzZmYzmWYzzGYz/2ZmAGZmM2ZmZmZmmWZmzGZm/2aZAGaZM2aZZmaZmWaZzGaZ/2bMAGbMM2bMZmbMmWbMzGbM/2b/AGb/M2b/Zmb/mWb/zGb//5kAAJkAM5kAZpkAmZkAzJkA/5kzAJkzM5kzZpkzmZkzzJkz/5lmAJlmM5lmZplmmZlmzJlm/5mZAJmZM5mZZpmZmZmZzJmZ/5nMAJnMM5nMZpnMmZnMzJnM/5n/AJn/M5n/Zpn/mZn/zJn//8wAAMwAM8wAZswAmcwAzMwA/8wzAMwzM8wzZswzmcwzzMwz/8xmAMxmM8xmZsxmmcxmzMxm/8yZAMyZM8yZZsyZmcyZzMyZ/8zMAMzMM8zMZszMmczMzMzM/8z/AMz/M8z/Zsz/mcz/zMz///8AAP8AM/8AZv8Amf8AzP8A//8zAP8zM/8zZv8zmf8zzP8z//9mAP9mM/9mZv9mmf9mzP9m//+ZAP+ZM/+ZZv+Zmf+ZzP+Z///MAP/MM//MZv/Mmf/MzP/M////AP//M///Zv//mf//zAAAACH5BAEAABAALAAAAAAKAAoAAAgrAAcIFBigYMGBBA0GQDhA4UKEDhk6BECRooCLFytaxChAIwCOHTWC9AgyIAA7'
			, border: 0
			,
			onclick: (function (){
				var sel = _sylera.external.selection();
				_command_webtool.add_frame( _command_webtool._E('iframe', {
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
		return _command_webtool._E('img', {
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
				.add_frame( _command_webtool._E('div', {style: {display:'inline'}}, [
					//
					_command_webtool._E('iframe', {
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
					_command_webtool._E('textarea', {
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
		return _command_webtool._E('img', {
			alt: 'kwout'
			,
			src: 'data:image/x-icon;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAB8AvwAyJP8APDZ/ACmQ/wA1qz8AP///wC1ZPwAkB38AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiIiIJnSIiIiIiIhgABiIiIiBMmdnFDSIiGAAEoJgAEiIYHAYiDBwGIhEhCiIJIQogTYoiIiIIzSAADiIiIJwAIdnaIiIiDc3goIoiIiIKIKIJnEoiCZxiIhgABiIYAAYiGdnRDJnNxiIgoJgABKCiIiIiGAwSIiIiIiIiIiIiIj8PwAA/B8AAOADAADAgQAAwcEAAMnJAACH8AAAh+AAAIfwAACn9gAAwcMAAMHBAADAAQAA6AsAAPwfAAD//wAA'
			, border: 0, alt: '[K]'
			,
			onclick: (function (){
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
				_command_webtool.add_frame( _command_webtool._E('iframe', {
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
	atode:
	//
	(function (){
		//
		return _command_webtool._E('img', {
			alt: ' あとで読む '
			,
			src: 'data:image/gif;base64,R0lGODlhQgAUAOYAAP////7+/v39/fz8/Pv7+/r6+vn5+fj4+Pn59fj49vj49Pf39/f38/X19fb28vX18/X18fT09PT08PPz7/Ly7vHx7fDw7vDw7O/v7+/v6+7u7u/v7e7u6u3t6ezs7Ozs6evr6+zs6uvr6Ovr6erq6Orq5+np5ufn5Obm4+Xl5ebm5OPj3+Li3uHh4eLi3+Hh3uHh3eDg3N/f293d293d2t3d2dzc3Nvb19ra1tjY2NnZ1djY1NfX09bW0tbW09XV0dPT09TU0NPT0tPTz87OzsrKysrKycXFxcHBwMDAwLu7u7e3t7i4t7Kysq+vrq6urqioqKWlpaampZ+fn5ycnJWVlZOTk4yMjIqKioKCgoGBgXh4eG9vb29vbmZmZgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUUAAAALAAAAABCABQAAAf/gAAAK4QrLIeIiYqLjI2Oj4iCgwGUlZaXmJmam5yZMpOdoaKjoQU0K6SpqqMEBDWoq7GylgUFNy6bRzmaEbJElERNAb2jBgY4LJtEXi0RxJQRVVuYzyBEUFlZvSA5UCABTdpXxNFVmwcNOsmYTU1VXlde5pZNXsNKxDlT0l5eW02/AuTIoaSJviw5iPRqAW4LlCOZ0O1Yh0lfFSK7Lh2xp4TLNEpcsijJcaQXwQAt9A1sMkUJFEogpniEQqQFPksLIkzcNOVKFi5VGFYC4e/ft0tTKOW4UoXYkRYGSWqjBIVLwCZKsuCMwIPFgq9gF9jAouWJlRRUuGj4qkELFSBh/8MWeQJ2yVcgQJJgefIkSZQia5MkoWJ3AZUnXMBGwOCha9yvWpIgjrIAiBe4C7AkeRz2CeW4e7UUWYJlL1gsRbik+IpltWLGXRPIni3EixEtXWQ78aJCthchs2f0np0AiRcmG4hjcYJFCBUpy43IRlJ6NhYmxB9YCOGDBXHZKrpsYWJkg5MuSGYj6dKvfXLiVPppsU5FC5ItKkprmTHdS2ksXliR3QYjdPfdgUYAd+AMQjQ43HczOIGdbkJE2JsRTjjxXgIqNCjEg7I9sAEJPbCAwIkopqjiiiy26OKLK0rAQQlBmKjAjQzk6MCOPPbo449ABimkkBeUcEIQMNyoAEsETFJQwZNQRinllFRWaWWVHZSAAgo/ABDDjhSEmcGYHZRp5plopqnmmmymaYIJKAwhCQ104oADD3j6oOeefPbp55+ABvrnEHICEAgAOw=='
			, border: 0
			,
			onclick: (function (){
				//
				with( document.body ){
					removeChild( document.getElementById('_command_webtool') );
					appendChild( _command_webtool._E('script', {
						charset: 'UTF-8'
						, type: 'text/javascript'
						, src: (
							'http://atode.cc/'+ (confirm('HTML ?') ? '' : 'm')+ 'bjs.php?'
							+ 'c=1'
							+ '&s='+ '(id)' // http://atode.cc/bjs.php?s=(id)
							+ '&d='+ (new Date()).getMilliseconds()
						)
					}) );
					//
				}
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
		return _command_webtool._E('img', {
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
		return _command_webtool._E('img', {
			alt: 'i-know'
			,
			src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAMCAMAAABcOc2zAAAABGdBTUEAANbY1E9YMgAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAMUExURf///39/fxkZGf///9xAtRAAAAAEdFJOU////wBAKqn0AAAAZklEQVR42mJgZkQBzAABxMDIgAIYAQKIgZEJAmACAAEEFGBggCCIAEAAAbUwgSEIAElGgAACmQHWwAQVAAggsKEQDtgoRoAAggowwVUABBCGAEAAoQiAbAEIIAyHAQQQA7rTAQIMADfUAIeR/mmoAAAAAElFTkSuQmCC'
			, border: 0
			,
			onclick: (function (){
				_command_webtool.add_frame( _command_webtool._E('iframe', {
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
		return _command_webtool._E('img', {
			alt: 'Twib'
			, src: ('http://image.twib.jp/counter/'+ location.href.replace(/#/,'%23'))
			, border: 0
			,
			onclick: (function (){
				_command_webtool.add_frame(_command_webtool._E('iframe', {
					src: ('http://twib.jp/url/'+ location.href.replace(/#/,'%23'))
				}));
			})
		});
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

