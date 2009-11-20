// _sylera.external.element.js
//
// ==UserScript==
// @name _sylera.external.element
// @homepage http://xyn9.github.com/sylrextension
//
// @author xyn9 <xyn9.mail@gmail.com>
// @license (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/2.1/jp
// ==UserScript==
//


//
	_sylera.external
//
.element = function (_tag, _attrib, _inner){
	//
	var element = document.createElement(_tag);
	//
	if( _attrib ){
		//
		var val;
		for(var a in _attrib){
			//
			val = _attrib[a];
			if(typeof val == 'object'){
				for(var s in val){ element[a][s] = val[s]; }
			}else{
				element[a] = val;
			}
		}
	}
	//
	if( _inner ){
		for(var i=0; i<_inner.length; i++){ element.appendChild( _inner[i] ); }
	}
	//
	return element;
};





//