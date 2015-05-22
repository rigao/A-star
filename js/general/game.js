/**
 * @fileoverview Game
 * @author gao 
 * @date 2015-03-04
 */

define(function(require, exports, module) {
	"use strict";
	
	var $ = require("lib/select");
	var scene = require("general/scene");
	var Game = {
		start : function(){
			scene.buildDom();
		}
	};
	
	
	
	module.exports = Game;
});