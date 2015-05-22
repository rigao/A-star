/**
 * @fileoverview select
 * @author gao 
 * @date 2015-5-22
 */

define(function(require, exports, module) {
	"use strict";
	
	var select = {
		$ : function(id){
			return document.getElementById(id);
		}
	};
	
	module.exports = select.$;
});