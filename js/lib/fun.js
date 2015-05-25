/**
 * @fileoverview fun
 * @author gao
 * @date 2015-05-22
 */

define(function(require, exports, module) {
	"use strict";
	
	module.exports = {
        inArray : function(key, arr){
        	for(var i=0; i<arr.length; i++){
        		if(arr[i] == key) return true;
        	}
        	return false;
        }
	};
});