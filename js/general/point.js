/**
 * @fileoverview point
 * @author gao 
 * @date 2015-03-04
 */

define(function(require, exports, module) {
	"use strict";
	
	var $ = require("lib/select");
	var notic = require("lib/notic");
	var data = require("lib/data");
	var level = require("general/level");

	var point = {
		add : function(e){
			var className = e.target.className;

			//
			if(className.match("obstacles")){
				data.removeObstaclesEle(e.target);
				return;
			}
			
			if(!$(".start")){
				e.target.className = "start disabled";
				notic("请选择终点");
				return;
			}

			if(!$('.end')){
				e.target.className = "end";
				notic("请选择障碍点");
				return;
			}

			e.target.className = 'obstacles disabled';
		}
	};
	
	module.exports = point;
});