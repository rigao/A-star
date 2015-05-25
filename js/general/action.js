/**
 * @fileoverview action
 * @author gao 
 * @date 2015-05-22
 */

define(function(require, exports, module) {

	var $ = require("lib/select");
	var data = require("lib/data");
	var fun = require("lib/fun");

	var action = {
		//开始执行
		start : function(){
			//console.log(this);
			action.getPath();
		},

		getPath : function(){
			var parentEle = gloData.parentEle || gloData.start;
			var parentObjXY = this.getXY(parentEle);
			var enabledIdArr = [];
			var enabledEleArr = [];
			var itemId,itemObj;
			for(var x=parentObjXY.x-1; x<= parentObjXY.x+1; x++){
				for(var y = parentObjXY.y-1; y<=parentObjXY.y + 1; y++){
					itemId = "item_"+x+"_"+y;
					enabledIdArr.push(itemId);
					itemObj = $(itemId);
					if(itemObj && !gloData.close[itemId]){
						enabledEleArr.push({
							id: itemId, 
							obj : itemObj, 
							f : action.getFValue(parentEle,itemObj)
						});
					}
				} 
			}

			if(fun.inArray(gloData.end.id, enabledIdArr)){
				//成功找到
				console.log("yes");

			} else {
			   enabledEleArr.sort(function(a,b){ return a.f - b.f});
			   console.log(enabledEleArr);
			}

			//console.log(enabledIdArr);
			//for(var i = parentObj.x-2; i<parentObj.x) 
		},


		//获取元素XY值
		getXY : function(obj){
			if(!obj) return {x:0,y:0};
			var id = obj.id.split("_");
			return {x : parseInt(id[1]), y : parseInt(id[2])};
		},

		//获取元素 F（G+H）值
		getFValue : function(parentObj,obj){
			var endXY = this.getXY(gloData.end), parentXY = this.getXY(parentObj), crEleXY = this.getXY(obj);
			var G = (Math.abs(parentXY.x - crEleXY.x) + Math.abs(parentXY.y - crEleXY.y)) > 1 ? 14 : 10;
				G += parentObj.G || 0;
			var H = (Math.abs(endXY.x - crEleXY.x) + Math.abs(endXY.y - crEleXY.y))*10;
			return G+H;//F 的值
		}
	};
	
	module.exports = action;

});