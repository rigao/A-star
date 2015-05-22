/**
 * @fileoverview Game
 * @author gao 
 * @date 2015-03-04
 */

define(function(require, exports, module) {
	"use strict";
	
	var $ = require("lib/select");
	var scene = require("general/scene");
	var addEvent = require("lib/addEvent");

	function init(){

		addEvent($("begin"),"click", Game.start());

	}

	var Game = {
		init : function(){
			scene.buildDom();
		}
	};
	
	
	
	module.exports = Game;
});