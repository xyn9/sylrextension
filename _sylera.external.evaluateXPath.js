// _sylera.external.evaluateXPath.js
//
// ==UserScript==
// @name _sylera.external.evaluateXPath
// @homepage http://xyn9.github.com/sylrextension
//
// @copyright MDC (http://developer.mozilla.org/ja/docs/Using_XPath)
// @license MIT License; http://www.ibiblio.org/pub/Linux/LICENSES/mit.license
// ==UserScript==
//


//
	_sylera.external
//
.evaluateXPath = function (_aNode, _aExpr){
	// 特定の DOM ノードもしくは Document オブジェクト (_aNode) に対して
	// XPath 式 _aExpression を評価し、その結果を配列として返す。
	// 最初の作業を行った wanderingstan at morethanwarm dot mail dot com に感謝します。
	var xpe = new XPathEvaluator();
	var nsResolver = xpe.createNSResolver(
		(_aNode.ownerDocument == null)
		? _aNode.documentElement
		: _aNode.ownerDocument.documentElement
	);
	var result = xpe.evaluate(_aExpr, _aNode, nsResolver, 0, null);
	var found = [];
	var res;
	while(res = result.iterateNext()){
		found.push(res);
	}
	//
	return found;
};





//