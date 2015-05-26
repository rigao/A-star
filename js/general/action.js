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
			data.init();
			data.setSeletData();
			data.setObstacles();
			data.removePathStyle();
			gloData.i = 0;
			action.getPath();
		},

		//查找路径
		getPath : function(){
			var parentEle = gloData.parentEle || gloData.start;
			var parentObjXY = action.getXY(parentEle);
			var enabledIdArr = [];
			var enabledEleArr = [];
			var itemId,itemObj;
			for(var x=parentObjXY.x-1; x<= parentObjXY.x+1; x++){
				for(var y = parentObjXY.y-1; y<=parentObjXY.y + 1; y++){
					itemId = "item_"+x+"_"+y;
					enabledIdArr.push(itemId);
					itemObj = $("#"+itemId);
					if(itemObj && !gloData.close[itemId]){
						var FGH = action.getFValue(parentEle,itemObj);
						itemObj.f = FGH.f;
						itemObj.g = FGH.g;
						itemObj.h= FGH.h;
						enabledEleArr.push(itemObj);
					}
				} 
			}

			//console.log(gloData.end.id + enabledIdArr);
			if(fun.inArray(gloData.end.id, enabledIdArr)){
				console.log("yes");
				action.success();

			} else if(enabledIdArr.length == 0){

				console.log("faile");
				action.faile();

			} else {

			   var enabledhadSetedElesArr = data.getEnabledElesArr();
			   var totalEnabledEleArr = enabledEleArr.concat(enabledhadSetedElesArr);
			   //var totalEnabledEleArr = enabledEleArr;
			   var gArr = [];
			   for(var i=0; i<enabledEleArr.length; i++){
			   	  gArr.push(enabledEleArr[0].g);
			   }
			   console.log(gArr);

			   totalEnabledEleArr.sort(function(a,b){return a.f - b.f;});

			   var resEle = totalEnabledEleArr[0];
		  	   data.inObj("enabledEles",resEle) 
		  	   && data.removeSubEle("pathEles",gloData.parentObj) 
		  	   && data.removeSubEle("pathEles",data.get("lastParentKey")) 
		  	   && data.pushItem("close",gloData.parentObj);
			   
			   for(var i=0; i<totalEnabledEleArr.length; i++){
			   		data.pushItem("enabledEles", totalEnabledEleArr[i]);
			   }

			   data.setParentEle(resEle);
			   data.pushItem("pathEles",resEle);
			   data.pushItem("close",resEle);
			   data.removeSubEle("enabledEles",resEle);
			   data.set("lastParentKey",resEle);
			   action.getPath();
			}
		},

		//成功找到
		success : function(){
			for(var key in gloData.pathEles){
				if(key != "length"){
					//setTimeout(function(){
						gloData.pathEles[key].className = 'path';
					//},300)
				}
			}
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
				G += parentObj.g || 0;
			var H = (Math.abs(endXY.x - crEleXY.x) + Math.abs(endXY.y - crEleXY.y))*10;
			return {f: G+H, g:G, h: H};//F 的值
		}
	};
	
	module.exports = action;

});