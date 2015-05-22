/**
 * @fileoverview data
 * @author gao 
 * @date 2015-05-22
 */

define(function(require, exports, module) {
	
	window.data = window.data || {};
	
	module.exports = function(){
		
		add : function(key, val){
			window.data[key] = val;
		},
		remove : function(key){
			delete window.data[key];
		},
		pathPush : function(val){
			window.data['pathItems'] = window.data['pathItems'] || [];
			window.data['pathItems'] = push(val);
		}
	};

});