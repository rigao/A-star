/**
 * @fileoverview addEvent
 * @author gao 
 * @date 2015-05-22
 */

define(function(require, exports, module) {
	var util = require("lib/device");
	
	var map = {
		"click" : "touchstart",
		"mousedown" : "touchstart",
		"mouseup" : "touchend"
	};
	
	module.exports = function(dom, type, handle, isCapture){
		if(dom.addEventListener){
			dom.addEventListener(util.isMobile ? map[type] || type : type, handle, isCapture);
		}else if(dom.attachEvent){
			dom.attachEvent("on" + type, handle);
		}else{
			dom["on" + type] = handle;
		}
		
	};
});