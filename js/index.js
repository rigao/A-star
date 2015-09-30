function getTop(top){
	var top = top;
	if(top.indexOf('%') != -1){
		top = top.replace(/%/g, '');
		top = parseFloat('0.' + top.replace('.', '')) * gameParam.maxHeight;
	}
	return top;
}

// function loadFun(){
//  	var loadDiv = $("#loadDiv"),
// 	    txtDiv = loadDiv.find("#loading_text"),
// 	    loadingTextNum = 0,
// 	    images = [gameParam.baseUrl+'images/chartsTitleImg.png',gameParam.baseUrl+'images/gameImg.png',gameParam.baseUrl+'images/gameRuleTitleImg.png',gameParam.baseUrl+'images/icon-closeBtnImg.png',gameParam.baseUrl+'images/itemDiv-bgImg.png',gameParam.baseUrl+'images/medal-1.png',gameParam.baseUrl+'images/medal-2.png',gameParam.baseUrl+'images/medal-3.png',gameParam.baseUrl+'images/myPrizeTitleImg.png',gameParam.baseUrl+'images/popup-bgImg1.png',gameParam.baseUrl+'images/popup-bgImg2.png',gameParam.baseUrl+'images/popup-bgImg3.png'],
// 	    count = images.length,
// 	    num = 0;
//     imgloadFun = function(imgUrl) {
//         var image = new Image;
//         image.onload = function() {
//             ++num;
//             loadingTextNum = parseInt(num / count * 100);
//             txtDiv.text(loadingTextNum + "%");
//         }, image.src = imgUrl;
//     };
//     for (var i = 0; i < count; ++i){
//         imgloadFun(images[i]);
//     }
//     var errorFun = setTimeout(function(){
//         if(num / count < 1){
//             alert("加载图片失败，请返回刷新尝试!");
//         }
//     }, 60000);
//     var loadingFun = setInterval(function(){
//         if(loadingTextNum == 100){
//         	clearTimeout(errorFun);
//         	if(gameParam.isLoading){
//         		clearInterval(loadingFun);
//         		$('img').each(function(){
// 	            	var _this = $(this);
// 	            	if(undefined != _this.attr('data-src') && '' != _this.attr('data-src')){
// 	            		_this.attr('src', _this.attr('data-src'));
// 	            		_this.removeAttr('data-src');
// 	            	}
// 	            });
// 	            loadDiv.hide();
// 	            requestAnimationFrame(beginFun);
// 	            touchEventFun();
//         	}
//             // gameParam.intervalFun.beginIntervalFun = setInterval(function(){
//             // 	beginFun();
//             // }, 10 * gameParam.speed);
//         }
//     }, 500);
// }

// function preImage(url,callback){
//     var img = new Image(); //创建一个Image对象，实现图片的预下载
//     img.src = url;
//     if (img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数
//          callback.call(img);
//         return; // 直接返回，不用再处理onload事件
//      }
//      img.onload = function () { //图片下载完毕时异步调用callback函数。
//          callback.call(img);//将回调函数的this替换为Image对象
//      };
// }

/*滑动函数 id要滑动的对象父级id 要滑动的对象moveId maxMoveNum滑动的最大距离 direction滑动方向 up down left right*/
function slideFun(id, moveId, maxMoveNum, direction){
	var obj = document.getElementById(id);
	obj.addEventListener('touchstart', function(e){
		var $this = $(this),
            isdrag = true,
            $move = $this.find('#' + moveId),
            sCssNams = 'transform',
            iOldCoords = 0;
            if(direction == 'up' || direction == 'down'){
            	iOldCoords = e.touches[0].pageY;
            }else{
            	iOldCoords = e.touches[0].pageX;
            }

        document.ontouchmove = function(e){
          	if (isdrag){
          		currentMoveNum = $move.css(sCssNams) || $move.css('-webkit-'+sCssNams);
          		if(null == currentMoveNum || '' == currentMoveNum || currentMoveNum.indexOf('translate') == -1){
          			currentMoveNum = 'translateY(0px)';
          		}
          		currentMoveNum = currentMoveNum.substring(currentMoveNum.indexOf('(') + 1, currentMoveNum.lastIndexOf('px)'));
            	var iDistance = parseInt((direction == 'up' || direction == 'down') ? (e.touches[0].pageY - iOldCoords) : (e.touches[0].pageX  - iOldCoords)) + parseInt(currentMoveNum);
	            if(iDistance < 0 && Math.abs(iDistance) < maxMoveNum){
	            	animateFun(iDistance + 'px');
	            }
	            if(iDistance > 0){
	            	animateFun('0px');
	            }
	            if(iDistance < 0 && Math.abs(iDistance) > maxMoveNum){
	            	animateFun('-'+ maxMoveNum +'px');
	            }
            	iOldCoords = (direction == 'up' || direction == 'down') ? e.touches[0].pageY : e.touches[0].pageX;
          	}
          	return false;
        }
      	document.ontouchend = function(e){
            document.ontouchmove = null;
            document.ontouchend = null;
            isdrag = false;
      	}
      	function animateFun(iDistance){
      		if(direction == 'up' || direction == 'down'){
            	$move.animate({'transform': 'translateY('+iDistance+')','-webkit-transform': 'translateY('+iDistance+')'}, 100);
            }else{
            	$move.animate({'transform': 'translateX('+iDistance+')','-webkit-transform': 'translateX('+iDistance+')'}, 100);
            }
      	}
      	return false;
  	}, false);
}

function slideMoveFun(e){
	e.preventDefault();
}

$(document).ready(function() {
	$('body').on('touchmove', slideMoveFun);
	window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	gameParam.interval = 1000 / gameParam.fps;
	var manifest = [
		{src:gameParam.gameImg, id:'gameImg'},
		{src:gameParam.indexBgImg.src, id: 'indexBgImg'}
	];
	if('' != gameParam.bgAudio && null != gameParam.bgAudio && undefined != gameParam.bgAudio){
		manifest.push({id: "bgAudio", src: gameParam.bgAudio});
	}
	if('' != gameParam.overAudio && null != gameParam.overAudio && undefined != gameParam.overAudio){
		manifest.push({id: "overAudio", src: gameParam.overAudio});
	}
	for(var i = 0; i < gameParam.gameBgImgs.length; i++){
		manifest.push({id: gameParam.gameBgImgObjIds[i], src: gameParam.gameBgImgs[i]});
	}
	// gameParam.loader = new createjs.LoadQueue(false);
	// gameParam.loader.installPlugin(createjs.Sound);
	// gameParam.loader.addEventListener('complete', handleComplete);
	// gameParam.loader.loadManifest(manifest);
	// gameParam.canvas = $('#canvas');
	// gameParam.maxHeight = document.documentElement.clientHeight
	// gameParam.canvas[0].width = gameParam.maxWidth;
	// gameParam.canvas[0].height = gameParam.maxHeight;
	// gameParam.ctx = gameParam.canvas[0].getContext('2d');
	gameParam.loader = new createjs.LoadQueue(false);
	gameParam.loader.installPlugin(createjs.Sound);
	gameParam.loader.addEventListener('complete', handleComplete);
	gameParam.loader.loadManifest(manifest);
	gameParam.canvas = $('#canvas');
	gameParam.maxHeight = document.documentElement.clientHeight
	gameParam.canvas.height = gameParam.maxHeight;
	gameParam.ctx = gameParam.canvas[0].getContext('2d');
	gameParam.rodCanvas = document.createElement('canvas');
    gameParam.rodCanvas.width = 640;
    gameParam.rodCanvas.height = gameParam.maxHeight;
    gameParam.rodCtx = gameParam.rodCanvas.getContext('2d');
    gameParam.loadDiv = $('div.loadDiv');
	gameParam.popupDiv = $('div.popupDiv');
	gameParam.gameRuleDiv = gameParam.popupDiv.find('div.gameRuleDiv');
	gameParam.chartsDiv = gameParam.popupDiv.find('div.chartsDiv');
	gameParam.myPrizeDiv = gameParam.popupDiv.find('div.myPrizeDiv');
	gameParam.userInfoDiv = gameParam.popupDiv.find('div.userInfoDiv');
	var num = 0;
	gameParam.loadingFun = setInterval(function(){
	 	gameParam.loadDiv.find('div.loading_wrp p').html(gameParam.loadingInfo[num]);
		num++;
		if(num >= gameParam.loadingInfo.length){
			num = 0;
		}
	}, 3000);
	// loadFun();
});

function handleComplete(){
	$('img').each(function(){
    	var _this = $(this);
    	if(undefined != _this.attr('data-src') && '' != _this.attr('data-src')){
    		_this.attr('src', _this.attr('data-src'));
    		_this.removeAttr('data-src');
    	}
    });
	gameParam.loadDiv.hide();
	clearInterval(gameParam.loadingFun);
	gameParam.gameImg = gameParam.loader.getResult('gameImg');
	gameParam.indexBgImg.obj = gameParam.loader.getResult('indexBgImg');
	touchEventFun();
	beginFun();
}

function randomInteger(low, high) {
    return low + Math.floor(Math.random() * (high - low))
}

function getGameRuleFun(){
	gameParam.gameRuleDiv.show();
	gameParam.popupDiv.show();
	var maxMoveNum = gameParam.gameRuleDiv.find('div.moveDiv').height() - gameParam.gameRuleDiv.find('div.contentDiv').height();
	if(maxMoveNum > 0){
		slideFun('gameRuleContentDiv', 'gameRuleMoveDiv', maxMoveNum, 'up');
	}
	gameParam.gameRuleDiv.find('img.closeBtnImg').off('tap').on('tap', function(){
		gameParam.popupDiv.hide();
		gameParam.gameRuleDiv.hide();
	});
}

function getMyPrizeFun(){
	if(0 == gameParam.isUserInfo){
		gameParam.userInfoDiv.show();
		gameParam.popupDiv.show();
		gameParam.userInfoDiv.find('img.closeBtnImg').off('tap').on('tap', function(){
			gameParam.popupDiv.hide();
			gameParam.userInfoDiv.hide();
		});
		gameParam.userInfoDiv.find('img.registerBtnImg').off('tap').on('tap', function(){
			var userName = gameParam.userInfoDiv.find('#userName'),
				userPhone = gameParam.userInfoDiv.find('#userPhone'),
				REG={
				    name:/^[a-zA-Z0-9\u4e00-\u9fa5]{2,12}$/,
	        	    phone:/(^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)|(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/
			 	};
			if(!REG.name.test(userName.val())){
				alert('请输入姓名！');
				return;
			}
			if(!REG.phone.test(userPhone.val())){
				alert('请输入电话！');
				return;
			}
		 	$.ajax({
		  		type: 'post',
			  	url: gameParam.saveUserInfoAjaxUrl,
		  		data: {
					wxId: gameParam.wxId,
					userName: userName.val(),
					userPhone: userPhone.val(),
					token: gameParam.token
				},
			  	dataType: 'json',
		  		timeout: 15000,
			  	success: function(data){
		  			if(data.result_code == 1){
		  				gameParam.isUserInfo = 1;
		  				gameParam.token = data.token;
		  				gameParam.myPrizeDiv.show();
						gameParam.popupDiv.show();
						var maxMoveNum = gameParam.myPrizeDiv.find('div.myPrizeMoveDiv').height() - gameParam.myPrizeDiv.find('div.contentDiv').height();
						if(maxMoveNum > 0){
							slideFun('myPrizeDiv', 'myPrizeMoveDiv', maxMoveNum, 'up');
						}
						gameParam.myPrizeDiv.find('img.closeBtnImg').off('tap').on('tap', function(){
							gameParam.popupDiv.hide();
							gameParam.myPrizeDiv.hide();
						});
			  		}else{
			  			alert(data.result_msg);
			  		}
			  	},
		  		error: function(xhr, type){
			    	alert('网络出现异常，请刷新重试！');
			  	}
			});
		});
		return;
	}
	gameParam.myPrizeDiv.show();
	gameParam.popupDiv.show();
	var maxMoveNum = gameParam.myPrizeDiv.find('div.myPrizeMoveDiv').height() - gameParam.myPrizeDiv.find('div.contentDiv').height();
	if(maxMoveNum > 0){
		slideFun('myPrizeDiv', 'myPrizeMoveDiv', maxMoveNum, 'up');
	}
	gameParam.myPrizeDiv.find('img.closeBtnImg').off('tap').on('tap', function(){
		gameParam.popupDiv.hide();
		gameParam.myPrizeDiv.hide();
	});
}

function getChartsFun(){
	$.ajax({
  		type: 'post',
	  	url: gameParam.getChartsAjaxUrl,
  		data: {
			wxId: gameParam.wxId
		},
	  	dataType: 'json',
  		timeout: 15000,
	  	success: function(data){
	  		var itemsDiv = gameParam.chartsDiv.find('div.itemsDiv');
	  		if(data.result_code == 1){
	  			if(data.datas.length > 0){
	  				var divs = '';
	  				for(i = 0; i < data.datas.length; i++){
	  					divs += '<div class="itemDiv">';
	  					divs += '<div>';
	  					if(i < 3){
	  						divs += '<img src="'+gameParam.baseUrl+'images/medal-'+ (i + 1) +'.png" alt="">';
	  					}else{
	  						divs += i + 1;
	  					}
	  					divs += '</div>';
	  					divs += '<div>';
	  					divs += '<img src="'+ data.datas[i].headimgurl +'" alt="">';
	  					divs += '</div>';
	  					divs += '<div>';
	  					divs += '<p>'+ data.datas[i].nickname +'</p>';
	  					divs += '</div>';
	  					divs += '<div>';
	  					divs += data.datas[i].maxscore;
	  					divs += '</div>';
	  					divs += '</div>';
	  				}
	  				itemsDiv.html('').append(divs);
	  			}else{
	  				itemsDiv.html('').append('<p class="prompt">暂无排行榜信息</p>');
	  			}
	  			gameParam.chartsDiv.show();
				gameParam.popupDiv.show();
				var maxMoveNum = itemsDiv.height() - itemsDiv.parent().height();
				if(maxMoveNum > 0){
					slideFun('chartsContentDiv', 'chartsMoveDiv', maxMoveNum, 'up');
				}
				gameParam.chartsDiv.find('img.closeBtnImg').off('tap').on('tap', function(){
					gameParam.popupDiv.hide();
					gameParam.chartsDiv.hide();
				});
	  		}else{
	  			alert(data.result_msg);
	  		}
	  	},
  		error: function(xhr, type){
	    	alert('网络出现异常，请刷新重试！');
	  	}
	});
}

function touchEventFun(){
	gameParam.canvas.on('touchstart', function(e){
		e.preventDefault();
		var x = e.touches[0].pageX,
			y = e.touches[0].pageY;
		if(gameParam.state == 'begin'){
			//开始游戏按钮
			if(x >= gameParam.beginBtn.x && x <= (gameParam.beginBtn.x + gameParam.beginBtn.width) && y >= getTop(gameParam.beginBtn.y) && y <= (getTop(gameParam.beginBtn.y) + gameParam.beginBtn.height)){
				if(!gameParam.isMusicPlay && '' != gameParam.bgAudio && null != gameParam.bgAudio && undefined != gameParam.bgAudio){
					gameParam.isMusicPlay = true;
					createjs.Sound.play("bgAudio", {interrupt: createjs.Sound.INTERRUPT_NONE, loop: -1});
				}
				// clearInterval(gameParam.intervalFun.beginIntervalFun);
				$.ajax({
			  		type: 'post',
				  	url: gameParam.beginGameAjaxUrl,
				  	dataType: 'json',
			  		timeout: 15000,
				  	success: function(data){
			  			if(data.result_code == 1){
			  				setTimeout(function(){
			  					gameParam.firstLand.width = randomInteger(55, 150);
								gameParam.secondLand.ml = gameParam.firstLand.width + randomInteger(10, 440);
								gameParam.secondLand.width = randomInteger(50, 640 - gameParam.secondLand.ml > 200 ? 200 : 640 - gameParam.secondLand.ml - 40);
								gameParam.jumpHeight = 0;
								gameParam.isMaxJumpHeight = false;
								gameParam.rod.rotate = 0;
					    		gameParam.isMoveOver = 'idn';
					    		gameParam.dropNum = 0;
					    		gameParam.moveNum = 0;
					    		gameParam.isGameOver = false;
					    		gameParam.moveOverNum = 0;
					    		gameParam.LandMoveNum = 0;
								gameParam.isTouchStart = false;
								gameParam.isMove = false;
								gameParam.people.maxX = 0;
								gameParam.oldRod.drawHeight = 0;
								gameParam.oldRod.drawWidth = 5;
								gameParam.rod.drawHeight = 0;
								gameParam.rod.drawWidth = 5;
								gameParam.isLandMove = false;
								gameParam.rodCanvas.width = 640;
							    gameParam.rodCanvas.height = gameParam.maxHeight;
							    gameParam.score = 0;
								gameParam.state = 'game';
								gameParam.gameBgImgNum = randomInteger(1, gameParam.gameBgImgCountNum);
								gameParam.pause = true;
								requestAnimationFrame(gameFun);
								// gameParam.intervalFun.gameIntervalFun = setInterval(function(){
								// 	gameFun();
								// }, 10 * gameParam.speed);
			  				}, 1000);
				  		}else{
				  			alert(data.result_msg);
				  		}
				  	},
			  		error: function(xhr, type){
				    	alert('网络出现异常，请刷新重试！');
				  	}
				});
			}else if(x >= gameParam.indexChartsBtnImg.x && x <= (gameParam.indexChartsBtnImg.x + gameParam.indexChartsBtnImg.width) && y >= getTop(gameParam.indexChartsBtnImg.y) && y <= (getTop(gameParam.indexChartsBtnImg.y) + gameParam.indexChartsBtnImg.height)){
				getChartsFun();
			}else if(x >= gameParam.indexGameRuleBtnImg.x && x <= (gameParam.indexGameRuleBtnImg.x + gameParam.indexGameRuleBtnImg.width) && y >= getTop(gameParam.indexGameRuleBtnImg.y) && y <= (getTop(gameParam.indexGameRuleBtnImg.y) + gameParam.indexGameRuleBtnImg.height)){
				getGameRuleFun();
			}else if(x >= gameParam.indexMyPrizeBtnImg.x && x <= (gameParam.indexMyPrizeBtnImg.x + gameParam.indexMyPrizeBtnImg.width) && y >= getTop(gameParam.indexMyPrizeBtnImg.y) && y <= (getTop(gameParam.indexMyPrizeBtnImg.y) + gameParam.indexMyPrizeBtnImg.height)){
				getMyPrizeFun();
			}
		}else if(gameParam.state == 'game'){
			if(!gameParam.isMove){
				gameParam.isTouchStart = true;
			}
		}else if(gameParam.state == 'gameOver'){
			if(x >= gameParam.homeImg.x && x <= (gameParam.homeImg.x + gameParam.homeImg.width) && y >= getTop(gameParam.homeImg.y) && y <= (getTop(gameParam.homeImg.y) + gameParam.homeImg.height)){
				gameParam.state = 'begin';
				// clearInterval(gameParam.intervalFun.gameOverIntervalFun);
				gameParam.pause = true;
				requestAnimationFrame(beginFun);
			}else if(x >= gameParam.gameAngin.x && x <= (gameParam.gameAngin.x + gameParam.gameAngin.width) && y >= getTop(gameParam.gameAngin.y) && y <= (getTop(gameParam.gameAngin.y) + gameParam.gameAngin.height) && !gameParam.isAg){
				gameParam.isAg = true;
				$.ajax({
			  		type: 'post',
				  	url: gameParam.beginGameAjaxUrl,
				  	dataType: 'json',
			  		timeout: 15000,
				  	success: function(data){
			  			if(data.result_code == 1){
			 				// clearInterval(gameParam.intervalFun.gameOverIntervalFun);
			 				setTimeout(function(){
			 					gameParam.isAg = false;
			 					gameParam.firstLand.width = randomInteger(55, 150);
								gameParam.secondLand.ml = gameParam.firstLand.width + randomInteger(10, 440);
								gameParam.secondLand.width = randomInteger(50, 640 - gameParam.secondLand.ml > 200 ? 200 : 640 - gameParam.secondLand.ml - 40);
								gameParam.jumpHeight = 0;
								gameParam.isMaxJumpHeight = false;
								gameParam.state = 'game';
								gameParam.gameBgImgNum = randomInteger(1, gameParam.gameBgImgCountNum);
								gameParam.rod.rotate = 0;
					    		gameParam.isMoveOver = 'idn';
					    		gameParam.dropNum = 0;
					    		gameParam.moveNum = 0;
					    		gameParam.score = 0;
					    		gameParam.moveOverNum = 0;
					    		gameParam.isGameOver = false;
					    		gameParam.LandMoveNum = 0;
								gameParam.isTouchStart = false;
								gameParam.isMove = false;
								gameParam.people.maxX = 0;
								gameParam.oldRod.drawHeight = 0;
								gameParam.oldRod.drawWidth = 5;
								gameParam.rod.drawHeight = 0;
								gameParam.rod.drawWidth = 5;
								gameParam.isLandMove = false;
								gameParam.rodCanvas.width = 640;
							    gameParam.rodCanvas.height = gameParam.maxHeight;
							    gameParam.pause = true;
							    requestAnimationFrame(gameFun);
								// gameParam.intervalFun.gameIntervalFun = setInterval(function(){
								// 	gameFun();
								// }, 10 * gameParam.speed);
			 				}, 1500);
			  			}else{
				  			alert(data.result_msg);
				  		}
				  	},
			  		error: function(xhr, type){
				    	alert('网络出现异常，请刷新重试！');
				  	}
				});
			}else if(x >= gameParam.gameOverChartsBtnImg.x && x <= (gameParam.gameOverChartsBtnImg.x + gameParam.gameOverChartsBtnImg.width) && y >= getTop(gameParam.gameOverChartsBtnImg.y) && y <= (getTop(gameParam.gameOverChartsBtnImg.y) + gameParam.gameOverChartsBtnImg.height)){
				getChartsFun();
			}else if(x >= gameParam.gameOverGameRuleBtnImg.x && x <= (gameParam.gameOverGameRuleBtnImg.x + gameParam.gameOverGameRuleBtnImg.width) && y >= getTop(gameParam.gameOverGameRuleBtnImg.y) && y <= (getTop(gameParam.gameOverGameRuleBtnImg.y) + gameParam.gameOverGameRuleBtnImg.height)){
				getGameRuleFun();
			}else if(x >= gameParam.gameOverMyPrizeBtnImg.x && x <= (gameParam.gameOverMyPrizeBtnImg.x + gameParam.gameOverMyPrizeBtnImg.width) && y >= getTop(gameParam.gameOverMyPrizeBtnImg.y) && y <= (getTop(gameParam.gameOverMyPrizeBtnImg.y) + gameParam.gameOverMyPrizeBtnImg.height)){
				getMyPrizeFun();
			}
		}
	});
	gameParam.canvas.on('touchmove', function(e){

	});
	gameParam.canvas.on('touchend', function(e){
		if(gameParam.isTouchStart){
			gameParam.isMove = true;
			gameParam.isTouchStart = false;
		}
	});
}

function beginFun(){
	if(gameParam.pause){
		gameParam.pause = false;
		return;
	}
	if (window.requestAnimationFrame) {
		requestAnimationFrame(beginFun);
		gameParam.now = Date.now();　　
		gameParam.delta = gameParam.now - gameParam.then;　　
		if (gameParam.delta > gameParam.interval) {
			// 这里不能简单then=now，否则还会出现上边简单做法的细微时间差问题。例如fps=10，每帧100ms，而现在每16ms（60fps）执行一次draw。16*7=112>100，需要7次才实际绘制一次。这个情况下，实际10帧需要112*10=1120ms>1000ms才绘制完成。
			gameParam.then = gameParam.now - (gameParam.delta % gameParam.interval);　　　　
			gameParam.ctx.clearRect(0, 0, 640, gameParam.maxHeight);
		    gameParam.ctx.drawImage(gameParam.indexBgImg.obj, gameParam.indexBgImg.sX, gameParam.indexBgImg.sY, gameParam.indexBgImg.sWidth, gameParam.indexBgImg.sHeight, 0, 0, gameParam.indexBgImg.width, gameParam.indexBgImg.height);
			//开始按钮
		    gameParam.ctx.drawImage(gameParam.gameImg, gameParam.beginBtn.sX, gameParam.beginBtn.sY, gameParam.beginBtn.sWidth, gameParam.beginBtn.sHeight, gameParam.beginBtn.x, getTop(gameParam.beginBtn.y), gameParam.beginBtn.width, gameParam.beginBtn.height);
			//游戏规则
		    gameParam.ctx.drawImage(gameParam.gameImg, gameParam.indexGameRuleBtnImg.sX, gameParam.indexGameRuleBtnImg.sY, gameParam.indexGameRuleBtnImg.sWidth, gameParam.indexGameRuleBtnImg.sHeight, gameParam.indexGameRuleBtnImg.x, getTop(gameParam.indexGameRuleBtnImg.y), gameParam.indexGameRuleBtnImg.width, gameParam.indexGameRuleBtnImg.height);
			//排行榜
		    gameParam.ctx.drawImage(gameParam.gameImg, gameParam.indexChartsBtnImg.sX, gameParam.indexChartsBtnImg.sY, gameParam.indexChartsBtnImg.sWidth, gameParam.indexChartsBtnImg.sHeight, gameParam.indexChartsBtnImg.x, getTop(gameParam.indexChartsBtnImg.y), gameParam.indexChartsBtnImg.width, gameParam.indexChartsBtnImg.height);
			//我的奖品
		    gameParam.ctx.drawImage(gameParam.gameImg, gameParam.indexMyPrizeBtnImg.sX, gameParam.indexMyPrizeBtnImg.sY, gameParam.indexMyPrizeBtnImg.sWidth, gameParam.indexMyPrizeBtnImg.sHeight, gameParam.indexMyPrizeBtnImg.x, getTop(gameParam.indexMyPrizeBtnImg.y), gameParam.indexMyPrizeBtnImg.width, gameParam.indexMyPrizeBtnImg.height);　　
		}
	}else{
		setTimeout(beginFun, gameParam.interval);
		gameParam.ctx.clearRect(0, 0, 640, gameParam.maxHeight);
	    gameParam.ctx.drawImage(gameParam.gameImg, gameParam.indexBgImg.sX, gameParam.indexBgImg.sY, gameParam.indexBgImg.sWidth, gameParam.indexBgImg.sHeight, 0, 0, gameParam.indexBgImg.width, gameParam.indexBgImg.height);
		//开始按钮
	    gameParam.ctx.drawImage(gameParam.gameImg, gameParam.beginBtn.sX, gameParam.beginBtn.sY, gameParam.beginBtn.sWidth, gameParam.beginBtn.sHeight, gameParam.beginBtn.x, getTop(gameParam.beginBtn.y), gameParam.beginBtn.width, gameParam.beginBtn.height);
		//游戏规则
	    gameParam.ctx.drawImage(gameParam.gameImg, gameParam.indexGameRuleBtnImg.sX, gameParam.indexGameRuleBtnImg.sY, gameParam.indexGameRuleBtnImg.sWidth, gameParam.indexGameRuleBtnImg.sHeight, gameParam.indexGameRuleBtnImg.x, getTop(gameParam.indexGameRuleBtnImg.y), gameParam.indexGameRuleBtnImg.width, gameParam.indexGameRuleBtnImg.height);
		//排行榜
	    gameParam.ctx.drawImage(gameParam.gameImg, gameParam.indexChartsBtnImg.sX, gameParam.indexChartsBtnImg.sY, gameParam.indexChartsBtnImg.sWidth, gameParam.indexChartsBtnImg.sHeight, gameParam.indexChartsBtnImg.x, getTop(gameParam.indexChartsBtnImg.y), gameParam.indexChartsBtnImg.width, gameParam.indexChartsBtnImg.height);
		//我的奖品
	    gameParam.ctx.drawImage(gameParam.gameImg, gameParam.indexMyPrizeBtnImg.sX, gameParam.indexMyPrizeBtnImg.sY, gameParam.indexMyPrizeBtnImg.sWidth, gameParam.indexMyPrizeBtnImg.sHeight, gameParam.indexMyPrizeBtnImg.x, getTop(gameParam.indexMyPrizeBtnImg.y), gameParam.indexMyPrizeBtnImg.width, gameParam.indexMyPrizeBtnImg.height);
	}
}

function gameFun(){
	if(gameParam.pause){
		gameParam.pause = false;
		return;
	}
	if (window.requestAnimationFrame) {
		requestAnimationFrame(gameFun);
		gameParam.now = Date.now();　　
		gameParam.delta = gameParam.now - gameParam.then;　　
		if (gameParam.delta > gameParam.interval) {
			gameParam.ctx.clearRect(0, 0, 640, gameParam.maxHeight);
		    gameParam.ctx.drawImage(gameParam.loader.getResult(gameParam.gameBgImgObjIds[gameParam.gameBgImgNum]), 0, 0, 640, 1008, 0, 0, 640, gameParam.maxHeight);
		    gameParam.ctx.drawImage(gameParam.gameImg, gameParam.gamePromptImg.sX, gameParam.gamePromptImg.sY, gameParam.gamePromptImg.sWidth, gameParam.gamePromptImg.sHeight, gameParam.gamePromptImg.x, getTop(gameParam.gamePromptImg.y), gameParam.gamePromptImg.width, gameParam.gamePromptImg.height);
			// 设置字体
			gameParam.ctx.font = "bold 72px 微软雅黑";
			// 设置对齐方式
			gameParam.ctx.textAlign = "center";
			// 设置填充颜色
			gameParam.ctx.fillStyle = "#893d06";
			// 设置字体内容，以及在画布上的位置
			gameParam.ctx.fillText(gameParam.score, 320, gameParam.maxHeight * 0.18 + 60);
			if(!gameParam.isLandMove){
				if(0 != gameParam.oldRod.drawWidth && 0 != gameParam.oldRod.drawHeight){
					gameParam.ctx.fillStyle = gameParam.rod.color;
					gameParam.ctx.fillRect(0, gameParam.maxHeight - gameParam.firstLand.height - gameParam.rod.drawWidth, gameParam.oldRod.drawWidth, gameParam.oldRod.drawHeight);
				}
		        gameParam.ctx.drawImage(gameParam.gameImg, gameParam.firstLand.sX, gameParam.firstLand.sY, gameParam.firstLand.sWidth, gameParam.firstLand.sHeight, 0, gameParam.maxHeight - gameParam.firstLand.height, gameParam.firstLand.width, gameParam.firstLand.height);
		        gameParam.ctx.drawImage(gameParam.gameImg, gameParam.secondLand.sX, gameParam.secondLand.sY, gameParam.secondLand.sWidth, gameParam.secondLand.sHeight, gameParam.secondLand.ml, gameParam.maxHeight - gameParam.secondLand.height, gameParam.secondLand.width, gameParam.secondLand.height);
			}else{
				gameParam.LandMoveNum += 5 * gameParam.speed;
				gameParam.LandMoveNum > gameParam.secondLand.ml && (gameParam.LandMoveNum = gameParam.secondLand.ml);
		        gameParam.ctx.drawImage(gameParam.gameImg, gameParam.firstLand.sX, gameParam.firstLand.sY, gameParam.firstLand.sWidth, gameParam.firstLand.sHeight, -gameParam.LandMoveNum, gameParam.maxHeight - gameParam.firstLand.height, gameParam.firstLand.width, gameParam.firstLand.height);
		        gameParam.ctx.drawImage(gameParam.gameImg, gameParam.secondLand.sX, gameParam.secondLand.sY, gameParam.secondLand.sWidth, gameParam.secondLand.sHeight, gameParam.secondLand.ml - gameParam.LandMoveNum, gameParam.maxHeight - gameParam.secondLand.height, gameParam.secondLand.width, gameParam.secondLand.height);
		        gameParam.ctx.drawImage(gameParam.gameImg, gameParam.thirdLand.sX, gameParam.thirdLand.sY, gameParam.thirdLand.sWidth, gameParam.thirdLand.sHeight, gameParam.thirdLand.ml + gameParam.secondLand.ml - gameParam.LandMoveNum, gameParam.maxHeight - gameParam.thirdLand.height, gameParam.thirdLand.width, gameParam.thirdLand.height);
				if(gameParam.LandMoveNum >= gameParam.secondLand.ml){
					gameParam.isLandMove = false;
					gameParam.isMove = false;
					gameParam.oldRod.drawWidth = gameParam.firstLand.width - gameParam.rod.drawWidth + gameParam.rod.drawHeight - gameParam.secondLand.ml;
					gameParam.oldRod.drawHeight = gameParam.rod.drawWidth;
					gameParam.firstLand.width = gameParam.secondLand.width;
					gameParam.secondLand.width = gameParam.thirdLand.width;
					gameParam.secondLand.ml = gameParam.thirdLand.ml;
					gameParam.rod.drawHeight = 0;
					gameParam.isGameOver = false;
					gameParam.rodCanvas.width = 640;
		    		gameParam.rodCanvas.height = gameParam.maxHeight;
		    		gameParam.rod.rotate = 0;
		    		gameParam.isMoveOver = 'idn';
		    		gameParam.dropNum = 0;
		    		gameParam.moveNum = 0;
		    		gameParam.moveOverNum = 0;
		    		gameParam.LandMoveNum = 0;
				}
			}
			gameParam.rodCtx.clearRect(0, 0, 640, gameParam.maxHeight);
			gameParam.ctx.save();
			if(gameParam.isTouchStart){
				gameParam.rod.drawHeight += 5 * gameParam.speed;
				gameParam.rodCtx.fillStyle = gameParam.rod.color;
				gameParam.rodCtx.fillRect(320, gameParam.maxHeight/ 2, gameParam.rod.drawWidth,  gameParam.rod.drawHeight);
				gameParam.ctx.drawImage(gameParam.rodCanvas, gameParam.firstLand.width - gameParam.rod.drawWidth - 320, gameParam.maxHeight / 2 - gameParam.firstLand.height - gameParam.rod.drawHeight);
			}else if(gameParam.isMove){
				if(gameParam.rod.rotate < 8 && 'idn' == gameParam.isMoveOver){
					gameParam.rod.rotate++;
					gameParam.rodCtx.fillStyle = gameParam.rod.color;
					gameParam.rodCtx.translate(320, gameParam.maxHeight/ 2 + gameParam.rod.drawHeight);
					gameParam.rodCtx.rotate(gameParam.rod.rotate*Math.PI/180);
					gameParam.rodCtx.translate(-320, -gameParam.maxHeight/ 2 + -gameParam.rod.drawHeight);
					gameParam.rodCtx.fillRect(320, gameParam.maxHeight/ 2, gameParam.rod.drawWidth,  gameParam.rod.drawHeight);
					gameParam.rodCtx.restore();
					gameParam.ctx.drawImage(gameParam.rodCanvas, gameParam.firstLand.width - gameParam.rod.drawWidth - 320, gameParam.maxHeight / 2 - gameParam.firstLand.height - gameParam.rod.drawHeight);
				}else{
					gameParam.rod.maxX = gameParam.firstLand.width + gameParam.rod.drawHeight - gameParam.rod.drawWidth;
					//判断结果
					if('idn' == gameParam.isMoveOver){
						if(gameParam.rod.maxX > gameParam.secondLand.ml &&  gameParam.rod.maxX < (gameParam.secondLand.width + gameParam.secondLand.ml)){
							gameParam.score++;
							gameParam.isMoveOver = true;
							gameParam.people.maxX = gameParam.secondLand.width + gameParam.secondLand.ml - gameParam.rod.drawWidth;
							gameParam.moveOverNum = gameParam.people.maxX - gameParam.firstLand.width + gameParam.rod.drawWidth;
						}else{
							gameParam.rod.rotate = 0;
							gameParam.isMoveOver = false;
							gameParam.moveOverNum = gameParam.firstLand.width - gameParam.rod.drawWidth + gameParam.rod.drawHeight;
							if(gameParam.moveOverNum < gameParam.secondLand.ml){
								gameParam.moveOverNum += (gameParam.secondLand.ml - gameParam.moveOverNum) > (gameParam.people.width / 2) ? (gameParam.people.width / 2) : (gameParam.secondLand.ml - gameParam.moveOverNum) / 2;
							}else{
								gameParam.moveOverNum += gameParam.people.width / 2;
							}
							gameParam.moveOverNum = gameParam.moveOverNum - gameParam.firstLand.width + gameParam.rod.drawWidth;
						}
					}
					if(gameParam.isMoveOver){
						gameParam.rodCanvas.width = gameParam.rod.drawHeight,
						gameParam.rodCanvas.height = gameParam.rod.drawWidth;
						gameParam.rodCtx.fillStyle = gameParam.rod.color;
						gameParam.rodCtx.fillRect(0, 0, gameParam.rod.drawHeight, gameParam.rod.drawWidth);
						gameParam.ctx.drawImage(gameParam.rodCanvas, gameParam.firstLand.width - gameParam.rod.drawWidth - gameParam.LandMoveNum, gameParam.maxHeight - gameParam.firstLand.height - gameParam.rod.drawWidth);
						if(gameParam.moveNum < gameParam.moveOverNum){
							gameParam.moveNum += 2 * gameParam.speed;
							gameParam.moveNum > gameParam.moveOverNum && (gameParam.moveNum = gameParam.moveOverNum);
						}else if(!gameParam.isLandMove){
							gameParam.moveOverNum = 0;
							gameParam.isLandMove = true;
							gameParam.thirdLand.ml = gameParam.secondLand.width + randomInteger(10, 440);
							gameParam.thirdLand.width = randomInteger(50, 640 - gameParam.thirdLand.ml > 200 ? 200 : 640 - gameParam.thirdLand.ml - 40);
						}
						if(gameParam.moveNum < gameParam.rod.drawHeight){
					        gameParam.ctx.drawImage(gameParam.gameImg, gameParam.people.sX, gameParam.people.sY, gameParam.people.sWidth, gameParam.people.sHeight, gameParam.firstLand.width - gameParam.people.width - gameParam.rod.drawWidth + gameParam.moveNum  - gameParam.LandMoveNum, gameParam.maxHeight - gameParam.firstLand.height - gameParam.people.height - gameParam.jumpHeight - gameParam.rod.drawWidth, gameParam.people.width, gameParam.people.height);
						}else{
					        gameParam.ctx.drawImage(gameParam.gameImg, gameParam.people.sX, gameParam.people.sY, gameParam.people.sWidth, gameParam.people.sHeight, gameParam.firstLand.width - gameParam.people.width - gameParam.rod.drawWidth + gameParam.moveNum  - gameParam.LandMoveNum, gameParam.maxHeight - gameParam.firstLand.height - gameParam.people.height - gameParam.jumpHeight, gameParam.people.width, gameParam.people.height);
						}
					}else{
						if(gameParam.moveNum < gameParam.moveOverNum){
							gameParam.moveNum += 2 * gameParam.speed;
							gameParam.moveNum > gameParam.moveOverNum && (gameParam.moveNum = gameParam.moveOverNum);
							gameParam.rodCanvas.width = gameParam.rod.drawHeight;
							gameParam.rodCanvas.height = gameParam.rod.drawWidth;
							gameParam.rodCtx.fillStyle = gameParam.rod.color;
							gameParam.rodCtx.fillRect(0, 0, gameParam.rod.drawHeight, gameParam.rod.drawWidth);
							gameParam.ctx.drawImage(gameParam.rodCanvas, gameParam.firstLand.width - gameParam.rod.drawWidth, gameParam.maxHeight - gameParam.firstLand.height - gameParam.rod.drawWidth);
					        gameParam.ctx.drawImage(gameParam.gameImg, gameParam.people.sX, gameParam.people.sY, gameParam.people.sWidth, gameParam.people.sHeight, gameParam.firstLand.width - gameParam.people.width - gameParam.rod.drawWidth + gameParam.moveNum, gameParam.maxHeight - gameParam.firstLand.height - gameParam.people.height - gameParam.jumpHeight - gameParam.rod.drawWidth, gameParam.people.width, gameParam.people.height);
							// gameParam.ctx.drawImage(image, 0, 0, gameParam.people.width, gameParam.people.height, gameParam.firstLand.drawWidth - gameParam.people.drawWidth - gameParam.rod.drawWidth + gameParam.moveNum, gameParam.maxHeight - gameParam.firstLand.drawHeight - gameParam.people.drawHeight - gameParam.jumpHeight - gameParam.rod.drawWidth, gameParam.people.drawWidth, gameParam.people.drawHeight);
						}else{
							gameParam.dropNum += 6 * gameParam.speed;
							if((gameParam.firstLand.width + gameParam.moveOverNum - gameParam.rod.drawWidth) < gameParam.secondLand.ml){
								if(gameParam.rod.rotate < 90){
									gameParam.rodCanvas.width = 640;
									gameParam.rodCanvas.height = gameParam.maxHeight;
									gameParam.rod.rotate += 2 * gameParam.speed;
									gameParam.rodCtx.fillStyle = gameParam.rod.color;
									gameParam.rodCtx.translate(320 + gameParam.rod.drawWidth, gameParam.maxHeight/ 2);
									gameParam.rodCtx.rotate(gameParam.rod.rotate*Math.PI/180);
									gameParam.rodCtx.translate(-320 + -gameParam.rod.drawWidth, -gameParam.maxHeight/ 2);
									gameParam.rodCtx.fillRect(320, gameParam.maxHeight/ 2, gameParam.rod.drawHeight,  gameParam.rod.drawWidth);
									gameParam.rodCtx.restore();
									gameParam.ctx.drawImage(gameParam.rodCanvas, gameParam.firstLand.width - 320, gameParam.maxHeight / 2 - gameParam.firstLand.height);
								}else{
									if('' != gameParam.overAudio && null != gameParam.overAudio && undefined != gameParam.overAudio){
										createjs.Sound.play("overAudio");
									}
									gameParam.rodCanvas.width = gameParam.rod.drawWidth;
									gameParam.rodCanvas.height = gameParam.rod.drawHeight;
									gameParam.rodCtx.fillStyle = gameParam.rod.color;
									gameParam.rodCtx.fillRect(0, 0, gameParam.rod.drawWidth, gameParam.rod.drawHeight);
									gameParam.ctx.drawImage(gameParam.rodCanvas, gameParam.firstLand.width, gameParam.maxHeight - gameParam.firstLand.height);
								}
							}else{
								if('' != gameParam.overAudio && null != gameParam.overAudio && undefined != gameParam.overAudio){
									createjs.Sound.play("overAudio");
								}
								gameParam.rodCtx.fillStyle = gameParam.rod.color;
								gameParam.rodCtx.fillRect(0, 0, gameParam.rod.drawHeight, gameParam.rod.drawWidth);
								gameParam.ctx.drawImage(gameParam.rodCanvas, gameParam.firstLand.width - gameParam.rod.drawWidth, gameParam.maxHeight - gameParam.firstLand.height - gameParam.rod.drawWidth);
							}
							if(gameParam.firstLand.width + gameParam.people.height + gameParam.rod.drawWidth > gameParam.dropNum){
						        gameParam.ctx.drawImage(gameParam.gameImg, gameParam.people.sX, gameParam.people.sY, gameParam.people.sWidth, gameParam.people.sHeight, gameParam.firstLand.width - gameParam.people.width - gameParam.rod.drawWidth + gameParam.moveNum, gameParam.maxHeight - gameParam.firstLand.height - gameParam.people.height - gameParam.rod.drawWidth + gameParam.dropNum, gameParam.people.width, gameParam.people.height);
							}else{
						        gameParam.ctx.drawImage(gameParam.gameImg, gameParam.people.sX, gameParam.people.sY, gameParam.people.sWidth, gameParam.people.sHeight, gameParam.firstLand.width - gameParam.people.width - gameParam.rod.drawWidth + gameParam.moveNum, gameParam.maxHeight, gameParam.people.width, gameParam.people.height);
								// clearInterval(gameParam.intervalFun.gameIntervalFun);
								gameParam.state = 'gameOver';
								gameParam.isGameOver = false;
								gameParam.pause = true;
								requestAnimationFrame(gameOver);
								// gameParam.intervalFun.gameOverIntervalFun = setInterval(function(){
									// gameOver();
								// }, 10);
							}
						}
					}
					if(!gameParam.isMaxJumpHeight){
						gameParam.jumpHeight += 1 * gameParam.speed;
						if(gameParam.jumpHeight >= gameParam.maxJumpHeight){
							gameParam.isMaxJumpHeight = true;
						}
					}else{
						gameParam.jumpHeight -= 1 * gameParam.speed;
						if(gameParam.jumpHeight <= 0){
							gameParam.isMaxJumpHeight = false;
						}
					}
				}
			}
			if((gameParam.isTouchStart || !gameParam.isTouchStart) && !gameParam.isMove){
		        gameParam.ctx.drawImage(gameParam.gameImg, gameParam.people.sX, gameParam.people.sY, gameParam.people.sWidth, gameParam.people.sHeight, gameParam.firstLand.width - gameParam.people.width - gameParam.rod.drawWidth, gameParam.maxHeight - gameParam.firstLand.height - gameParam.people.height - gameParam.jumpHeight, gameParam.people.width, gameParam.people.height);
				if(!gameParam.isMaxJumpHeight){
					gameParam.jumpHeight += 1 * gameParam.speed;
					if(gameParam.jumpHeight >= gameParam.maxJumpHeight){
						gameParam.isMaxJumpHeight = true;
					}
				}else{
					gameParam.jumpHeight -= 1 * gameParam.speed;
					if(gameParam.jumpHeight <= 0){
						gameParam.isMaxJumpHeight = false;
					}
				}
			}
		}
	}
}

function gameOver(){
	if(gameParam.pause){
		gameParam.pause = false;
		return;
	}
	if (window.requestAnimationFrame) {
		requestAnimationFrame(gameOver);
		gameParam.now = Date.now();　　
		gameParam.delta = gameParam.now - gameParam.then;　　
		if (gameParam.delta > gameParam.interval) {
			gameParam.ctx.clearRect(0, 0, 640, gameParam.maxHeight);
		    gameParam.ctx.drawImage(gameParam.loader.getResult(gameParam.gameBgImgObjIds[gameParam.gameBgImgNum]), 0, 0, 640, 1008, 0, 0, 640, gameParam.maxHeight);
		    gameParam.ctx.drawImage(gameParam.gameImg, gameParam.firstLand.sX, gameParam.firstLand.sY, gameParam.firstLand.sWidth, gameParam.firstLand.sHeight, 0, gameParam.maxHeight - gameParam.firstLand.height, gameParam.firstLand.width, gameParam.firstLand.height);
		    gameParam.ctx.drawImage(gameParam.gameImg, gameParam.secondLand.sX, gameParam.secondLand.sY, gameParam.secondLand.sWidth, gameParam.secondLand.sHeight, gameParam.secondLand.ml, gameParam.maxHeight - gameParam.secondLand.height, gameParam.secondLand.width, gameParam.secondLand.height);
		    gameParam.rodCanvas.width = gameParam.rod.drawWidth;
			gameParam.rodCanvas.height = gameParam.rod.drawHeight;
			gameParam.rodCtx.fillStyle = gameParam.rod.color;
			gameParam.rodCtx.fillRect(0, 0, gameParam.rod.drawWidth, gameParam.rod.drawHeight);
			gameParam.ctx.drawImage(gameParam.rodCanvas, gameParam.firstLand.width, gameParam.maxHeight - gameParam.firstLand.height);
			gameParam.ctx.fillStyle = 'rgba(127, 127, 127, 0.5)';
			gameParam.ctx.fillRect(0, 0, 640, gameParam.maxHeight);
		    gameParam.ctx.drawImage(gameParam.gameImg, gameParam.scoreBgImg.sX, gameParam.scoreBgImg.sY, gameParam.scoreBgImg.sWidth, gameParam.scoreBgImg.sHeight, gameParam.scoreBgImg.x, getTop(gameParam.scoreBgImg.y), gameParam.scoreBgImg.width, gameParam.scoreBgImg.height);
			gameParam.ctx.fillStyle = gameParam.scoreBgTxt1.color;
			gameParam.ctx.font = gameParam.scoreBgTxt1.font;
			gameParam.ctx.fillText(gameParam.score, gameParam.scoreBgTxt1.left, getTop(gameParam.scoreBgImg.y) + 115);
			/*if(undefined == localStorage.bestScore){
				localStorage.bestScore = gameParam.historyMaxScore <= gameParam.score ? gameParam.score : gameParam.historyMaxScore;
				if(!gameParam.isGameOver){
					gameParam.isGameOver = true;
					$.ajax({
				 		type: 'post',
					  	url: gameParam.saveScoreAjaxUrl,
						data: {
				 		    wxId: gameParam.wxId,
							token: gameParam.token,
							score: localStorage.bestScore
					 	},
					  	dataType: 'json',
						timeout: 15000,
					  	success: function(data){
					  		if(data.result_code == 1){
					  			gameParam.token = data.token;
					  		}
					  	},
				  		error: function(xhr, type){
					    	alert('网络出现异常，请刷新重试！');
					   	}
					 });
				}
			}else if(0 != gameParam.score && localStorage.bestScore < gameParam.score){
				localStorage.bestScore = gameParam.score;
				if(!gameParam.isGameOver){
					gameParam.isGameOver = true;
					$.ajax({
				 		type: 'post',
					  	url: gameParam.saveScoreAjaxUrl,
						data: {
				 		     wxId: gameParam.wxId,
							token: gameParam.token,
							score: gameParam.score
					 	},
					  	dataType: 'json',
						timeout: 15000,
					  	success: function(data){
					  		if(data.result_code == 1){
					  			gameParam.token = data.token;
					  		}
					  	},
				  		error: function(xhr, type){
					    	alert('网络出现异常，请刷新重试！');
					   	}
					 });
				}
			}else{
				if(!gameParam.isGameOver){
					gameParam.isGameOver = true;
					$.ajax({
				 		type: 'post',
					  	url: gameParam.saveScoreAjaxUrl,
						data: {
				 		    wxId: gameParam.wxId,
							token: gameParam.token,
							score: gameParam.score
					 	},
					  	dataType: 'json',
						timeout: 15000,
					  	success: function(data){
					  		if(data.result_code == 1){
					  			gameParam.token = data.token;
					  		}
					  	},
				  		error: function(xhr, type){
					    	alert('网络出现异常，请刷新重试！');
					   	}
				 	});
				}
			}*/
			gameParam.historyMaxScore = (gameParam.historyMaxScore <= gameParam.score) ? gameParam.score : gameParam.historyMaxScore;
			if(!gameParam.isGameOver){
				gameParam.isGameOver = true;
				$.ajax({
			 		type: 'post',
				  	url: gameParam.saveScoreAjaxUrl,
					data: {
			 		    wxId: gameParam.wxId,
						token: gameParam.token,
						score: gameParam.score
				 	},
				  	dataType: 'json',
					timeout: 15000,
				  	success: function(data){
				  		if(data.result_code == 1){
				  			gameParam.token = data.token;
				  		}
				  	},
			  		error: function(xhr, type){
				    	alert('网络出现异常，请刷新重试！');
				   	}
				 });
			}
			gameParam.ctx.fillStyle = gameParam.scoreBgTxt2.color;
			gameParam.ctx.font = gameParam.scoreBgTxt2.font;
			gameParam.ctx.textAlign = gameParam.scoreBgTxt2.textAlign;
			gameParam.ctx.fillText(gameParam.historyMaxScore, gameParam.scoreBgTxt2.left, getTop(gameParam.scoreBgImg.y) + 0.68 * gameParam.scoreBgImg.height) ;
		    gameParam.ctx.drawImage(gameParam.gameImg, gameParam.gameOverImg.sX, gameParam.gameOverImg.sY, gameParam.gameOverImg.sWidth, gameParam.gameOverImg.sHeight, gameParam.gameOverImg.x, getTop(gameParam.gameOverImg.y), gameParam.gameOverImg.width, gameParam.gameOverImg.height);
		    gameParam.ctx.drawImage(gameParam.gameImg, gameParam.homeImg.sX, gameParam.homeImg.sY, gameParam.homeImg.sWidth, gameParam.homeImg.sHeight, gameParam.homeImg.x, getTop(gameParam.homeImg.y), gameParam.homeImg.width, gameParam.homeImg.height);
		    gameParam.ctx.drawImage(gameParam.gameImg, gameParam.gameAngin.sX, gameParam.gameAngin.sY, gameParam.gameAngin.sWidth, gameParam.gameAngin.sHeight, gameParam.gameAngin.x, getTop(gameParam.gameAngin.y), gameParam.gameAngin.width, gameParam.gameAngin.height);
		    gameParam.ctx.drawImage(gameParam.gameImg, gameParam.gameOverGameRuleBtnImg.sX, gameParam.gameOverGameRuleBtnImg.sY, gameParam.gameOverGameRuleBtnImg.sWidth, gameParam.gameOverGameRuleBtnImg.sHeight, gameParam.gameOverGameRuleBtnImg.x, getTop(gameParam.gameOverGameRuleBtnImg.y), gameParam.gameOverGameRuleBtnImg.width, gameParam.gameOverGameRuleBtnImg.height);
		    gameParam.ctx.drawImage(gameParam.gameImg, gameParam.gameOverChartsBtnImg.sX, gameParam.gameOverChartsBtnImg.sY, gameParam.gameOverChartsBtnImg.sWidth, gameParam.gameOverChartsBtnImg.sHeight, gameParam.gameOverChartsBtnImg.x, getTop(gameParam.gameOverChartsBtnImg.y), gameParam.gameOverChartsBtnImg.width, gameParam.gameOverChartsBtnImg.height);
		    gameParam.ctx.drawImage(gameParam.gameImg, gameParam.gameOverMyPrizeBtnImg.sX, gameParam.gameOverMyPrizeBtnImg.sY, gameParam.gameOverMyPrizeBtnImg.sWidth, gameParam.gameOverMyPrizeBtnImg.sHeight, gameParam.gameOverMyPrizeBtnImg.x, getTop(gameParam.gameOverMyPrizeBtnImg.y), gameParam.gameOverMyPrizeBtnImg.width, gameParam.gameOverMyPrizeBtnImg.height);
		}
	}
}