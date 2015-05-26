/**
 * @fileoverview scene.js
 * @author gao 
 * @date 2015-03-04
 */

define(function(require, exports, module) {
	"use strict";
	
	var $ = require("lib/select");
	var addEvent = require("lib/addEvent");
	var notic = require("lib/notic");
	var point = require("general/point");

	var scene = {
		getTdNum : function(){
			var ele = $("#td_count");
			return parseInt(ele.value);
		},

		buildDom : function(num){
			var tdCount = num || this.getTdNum();
			var trs = '';
			for(var i=0; i<tdCount; i++){
				var tds = '';
				for(var j=0; j<tdCount; j++){
					tds += this.getTdHtml(i,j);
				}
				trs += '<tr>'+tds+'</tr>';
			}
			if($("#tbody").innerHTML = trs){

				var items = $("td");

				for(var i=0; i<items.length; i++){
					addEvent(items[i],"click", point.add);
				}
			}
		},

		getTdHtml : function(i,j){
			return '<td id="item_'+(j+1)+'_'+(i+1)+'" title="'+(j+1)+'*'+(i+1)+'" class="normarl">&nbsp;'+(j+1)+'*'+(i+1)+'</td>';
		}
	};
	
	module.exports = scene;
});