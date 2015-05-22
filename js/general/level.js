/**
 * @fileoverview level
 * @author gao 
 * @date 2015-05-22
 */

define(function(require, exports, module) {
	
	var data = require("lib/data");
	module.exports = {
		
		getObstaclesByLevel : function(level){
			var levelData = {
				1 : 5,
				2 : 8,
				3 : 10,
				4 : 20
			};

			var level = level || data.get("crLevel") || data.defaultLevel;
			return levelData[level];
		}
	};

});