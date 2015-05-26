/**
 * @fileoverview select
 * @author gao 
 * @date 2015-5-22
 */

define(function(require, exports, module) {
	"use strict";
	
	var select = {
		$ : function(str){
			if(str.match("#")){
				return document.getElementById(str.substr(1));
			} else if(str.match(/^(\.)(.)*/)){
				var eles = document.getElementsByClassName(str.substr(1));
				return eles.length > 1 || eles == null ? eles : eles[0]; 
			} else {
				var eles = document.getElementsByTagName(str);
				return eles.length > 1 || eles == null ? eles : eles[0]; 
			}
		}
	};
	
	module.exports = select.$;
});