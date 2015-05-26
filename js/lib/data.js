/**
 * @fileoverview gloData
 * @author gao 
 * @date 2015-05-22
 */

define(function(require, exports, module) {
	
    var $ = require("lib/select");
	window.gloData = window.gloData || {};
	module.exports = {
		
		init : function(type){

			gloData.obstacles = {length:0};//障碍集
			gloData.pathEles = {length:0};//路径集
			gloData.enabledEles = {length:0};//开启集
			gloData.close = {length:0};//关闭集
			gloData.repeatEle = {length:0};//F值重复集
			gloData.parentEle = null;
			
		},

		setSeletData : function(){
			this.setParentEle($(".start"));
			this.setEndEle($(".end"));
			this.closePush(gloData.start);
		},

		set : function(key, val){
			gloData[key] = val;
		},

		inObj : function(key,obj){
			return gloData[key][obj.id];
		},

		//设置父节点
		setParentEle : function(obj){
			if(!gloData.start){
				gloData.start = obj;
				this.closePush(obj);
				gloData.close[obj.id] = obj;
			} else {
				gloData.parentEle = obj;
			}
			
		},

		setObstacles : function(){
			var obsEles = document.getElementsByClassName("obstacles");
			for(var i=0; i<obsEles.length; i++){
				this.obstaclesPush(obsEles[i]);
			}
		},
		removePathStyle : function(){
			var eles = document.getElementsByClassName("path");
			for(var i=0; i<eles.length; i++){
				eles[i].className = "normal";
			}
		},
		//终点
		setEndEle : function(obj){
			gloData.end = obj;
		},

		remove : function(key){
			delete gloData[key];
		},

		removeSubEle : function(key,obj){
			return  gloData[key] && obj && gloData[key][obj.id] 
					? (delete gloData[key][obj.id]) 
					: false;
		},
		pushItem : function(key, obj){
			gloData[key][obj.id] = obj;
			gloData[key].length && gloData[key].length++;
		},

		checkRepeatF : function(f){
			if(!gloData['repeatEle']) return false;
			for(var key in gloData.repeatEle){
				if(f == gloData.repeatEle[key].f){
					return gloData.repeatEle[key];
				}
			}
			return false;
		},

		pointsPush : function(obj){
			gloData.points[obj.id] = obj;
			gloData.points.length++ ;
		},

		removeObstaclesEle : function(obj){
			obj.className = "normarl";
			gloData.obstacles.length--;
			gloData.close.length--;
			delete gloData.obstacles[obj.id];
			delete gloData.close[obj.id];
		},

		obstaclesPush : function(obj){
			gloData.obstacles[obj.id] = obj;
			this.closePush(obj);
			gloData.obstacles.length++;
		},

		closePush : function(obj){
			gloData.close[obj.id] = obj;
			gloData.close.length++;
		},

		get : function(key){
			return gloData[key];
		},

		getSubEle : function(key,id){
			return gloData[key][id];
		},

		getEnabledElesArr : function(){
			var arr = [];
			for(var key in gloData.enabledEles){
				(key != "length") && arr.push(gloData.enabledEles[key]);
				
			}
			return arr;
		},

		//获取元素XY值
		getXY : function(obj){
			if(!obj) return {x:0,y:0};
			var id = obj.id.split("-");
			return {x : parseInt(id[0]), y : parseInt(id[1])};
		},

		//获取元素 F（G+H）值
		getFValue : function(parentObj,obj){
			var endXY = this.getXY(gloData.end), parentXY = this.getXY(parentObj), crEleXY = this.getXY(obj);
			var G = (Math.abs(parentXY.x - crEleXY.x) + Math.abs(parentXY.y - crEleXY.y)) > 1 ? 14 : 10;
				G += parentObj.G || 0;
			var H = (Math.abs(endXY.x - crEleXY.x) + Math.abs(endXY.y - crEleXY.y))*10;
			return {f: G+H, g:G, h: H};//F 的值
		},

		defaultLevel : 1
	};

});