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
	var action = require("general/action");
	var data = require("lib/data")

	function init(){

		addEvent($("#begin"),"click", Game.start);

	}

	var Game = {
		init : function(){
			scene.buildDom();
			init();
		},
		start : action.start
	};
	
	module.exports = Game;
});