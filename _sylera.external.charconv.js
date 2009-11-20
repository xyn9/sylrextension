// _sylera.external.charconv.js
//
// ==UserScript==
// @name _sylera.external.charconv
// @homepage http://xyn9.github.com/sylrextension
//
// @author xyn9 <xyn9.mail@gmail.com>
// @license (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/2.1/jp
// ==UserScript==
//


//
	_sylera.external
//
.charconv = function (_str, _charset, _unicode){
	var converter = Components.classes["@mozilla.org/intl/scriptableunicodeconverter"].getService(Components.interfaces.nsIScriptableUnicodeConverter);
	//
	try {
		converter.charset = _charset;
		return (
			_unicode
			? converter.ConvertToUnicode(_str)
			: converter.ConvertFromUnicode(_str)
		);
	}
	catch(_e){
		return _str;
	}
	//
};





//