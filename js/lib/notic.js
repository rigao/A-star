/**
 * @fileoverview notic
 * @author gao 
 * @date 2015-05-22
 */

define(function(require, exports, module) {
	var $ = require("lib/select");
	module.exports = function(text){
		$("#notic-container").textContent = text;
	};
});