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
			if(!data.get("start")){
				data.add("start",e.target);
				e.target.className = "start";
				notic("请选择终点");
				return;
			}

			if(!data.get('end')){
				data.add("end",e.target);
				e.target.className = "end";
				notic("请选择障碍点");
				return;
			}

			var obstacles = data.get('obstacles');
			if(obstacles.length < level.getObstaclesByLevel()){
				data.obstaclesPush(e.target);
				e.target.className = 'obstacles';
			} else {
				notic("已超过数量");
			}
		}
	};
	
	module.exports = point;
});