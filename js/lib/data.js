/**
 * @fileoverview gloData
 * @author gao 
 * @date 2015-05-22
 */

define(function(require, exports, module) {
	
	window.gloData = window.gloData || {};
	module.exports = {
		
		init : function(){
			gloData.obstacles = {length:0};//障碍集
			gloData.points = {length:0};//路径集
			gloData.enabledEles = {length:0};//开启集
			gloData.close = {length:0};//关闭集
			gloData.start = null;//起点
			gloData.end = null;//终点
			gloData.parentEle = null;

		}(),

		add : function(key, val){
			gloData[key] = val;
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

		//终点
		setEndEle : function(obj){
			gloData.end = obj;
		},

		remove : function(key){
			delete gloData[key];
		},

		removeSubEle : function(key,obj){
			gloData[key] && gloData[key][obj.id] && (delete gloData[key][obj.id]);
		},

		pointsPush : function(obj){
			gloData.points[obj.id] = obj;
			gloData.points.length++ ;
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
			return G+H;//F 的值
		},

		defaultLevel : 1
	};

});