// _sylera.external.selection.js
//
// ==UserScript==
// @name _sylera.external.selection
// @homepage http://xyn9.github.com/sylrextension
//
// ==UserScript==
//


//
	_sylera.external.selection
//
= function (){
	//
	var sel = window.getSelection();
	if(! sel.rangeCount){ return document.createElement('div'); }
	var range1 = sel.getRangeAt(0);
	var range_owner = range1.startContainer.ownerDocument;
	var range_block = range_owner.createElement('div');
	//
	for(var i=0; i<sel.rangeCount; i++){
		var range = sel.getRangeAt(i);
		var range_clone = range.cloneContents();
		range_block.appendChild(range_clone);
	}
	//
	return range_block;
}





//