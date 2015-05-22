/**
 * @fileoverview device
 * @author gao
 * @date 2015-05-22
 */

define(function(require, exports, module) {
	"use strict";
	
	module.exports = {
        isMobile : (/(mobile|iphone|ipod|ipad|ios|android|windows phone)/i).test(navigator.userAgent),
        
        isAndroid : (/android/i).test(navigator.userAgent),
        
        isWeixin : (/MicroMessenger/i).test(navigator.userAgent)
        
	};
});