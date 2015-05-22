/**
 * @fileoverview data
 * @author gao 
 * @date 2015-05-22
 */

define(function(require, exports, module) {
	
	window.data = window.data || {};
	module.exports = {
		
		init : function(){
			window.data['obstacles'] = [];
			window.data['points'] = [];
		}(),

		add : function(key, val){
			window.data[key] = val;
		},

		remove : function(key){
			delete window.data[key];
		},

		pointsPush : function(obj){
			window.data['points'].push(obj);
		},

		obstaclesPush : function(obj){
			window.data['obstacles'].push(obj);
		},

		get : function(key){
			return window.data[key];
		},

		defaultLevel : 1
	};

});