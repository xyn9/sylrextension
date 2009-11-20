// _sylera.external.localfile.js
//
// ==UserScript==
// @name _sylera.external.localfile
// @homepage http://xyn9.github.com/sylrextension
// ==UserScript==
//


//
	_sylera.external.localfile
//
= {
	//
	file: (function (_path){
		var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
		file.initWithPath(_path);
		return file;
	})
	//
};





//
_sylera.external.localfile
//
.fileout = function (_path, _content, _mode){
	//
	if(! _mode){ _mode = 0x02 | 0x08 | 0x20;/* write, create, truncate */ }
	//
	var file = _sylera.external.localfile.file(_path);
	if(file.exists() && (! (_mode & 0x10))){
		if((_mode & 0x08) && (! (_mode & 0x20))){ return true; }
		file.remove(true);
	}
	file.create(file.NORMAL_FILE_TYPE, 0666);
	//
	var strm = Components.classes['@mozilla.org/network/file-output-stream;1'].createInstance(Components.interfaces.nsIFileOutputStream);
	with(strm){
		init(file, _mode, 0666, false);
		write(_content, _content.length);
		close();
	}
	//
	return file.exists();
}





//
_sylera.external.localfile
//
.run = function (_exe_path, _args, _wait){
	//
	var exe = _sylera.external.localfile.file(_exe_path);
	var process = Components.classes["@mozilla.org/process/util;1"].createInstance(Components.interfaces.nsIProcess);
	with( process ){
		init(exe);
		run(_wait, _args, _args.length);
	}
}





//