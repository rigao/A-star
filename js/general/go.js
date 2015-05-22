/**
 * @fileoverview index
 * @author gao 
 * @date 2015-05-22
 */

define("general/go", function(require, exports, module) {
	"use strict";
	
	var game = require("general/game"); 
	game.init();
});

require(["general/go"]);