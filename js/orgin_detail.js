(function(){
	if(location.search==""){
		location.href="original.html";
	}
	var sid = parseInt(location.search.slice(5)); //alert(sid);
	//	console.log(sid);
	ajax(
		"get",
		"data/router/user/isLogin.php",
		function(msg){
			function loadVisitor(){
				ajax(
					"get",
					"data/router/visitor/loadVisitor.php",
					function(data){
						var html = "";
						for(var i=0;i<data.length;i++){
							var vtime = data[i].time.split(" ")[1];	//暂时
							var href = "music_zone.html?uid="+data[i].uid;
							html += "<li><a href='"+href+"'><img src='"+data[i].avatar+"'><p>"+data[i].vname+"</p></a><i>"+vtime+"</i></li>"
						}
						$("listener").innerHTML = html;
					},
					"sid="+sid,
					"json"
				);
			}
			loadVisitor();
			if(msg.state=="1"){
				var vname = msg.uname;
				ajax(
					"get",
					"data/router/visitor/isVisited.php",
					function(data){
						if(data[0]){
							ajax(
								"get",
								"data/router/visitor/update_visitor.php",
								function(suc){
									loadVisitor();
								},
								"vid="+data[0]
							);
						}else{
							ajax(
								"get",
								"data/router/visitor/detail_visitor.php",
								function(data){
									loadVisitor();
								},
								"sid="+sid+"&vname="+vname
							);
						}
						
						
					},
					"sid="+sid+"&vname="+vname,
					"json"
				);
			}
		},
		null,
		"json"
	);
	ajax(
		"get", 
		"data/router/song/loadDetail.php", 
		function(data){ 
		//console.log(data.sname); 
			$("b-nav").innerHTML = "<a href='index.html'>首页</a> > <a href='#''>"+data.type+"</a> > <a href='origin_detail.html?sid="+sid+"'>"+data.sname+"</a>"
			document.querySelector(".item>h2>b").innerHTML = data.sname; 
			var html = "";
			var sHref = "music_zone.html?uid="+data.uid;
			html += "<li>演唱：<a href='"+sHref+"' target='_blank'>"+data.singer+"</a></li><li>作词：<a href='#'>未知</a></li><li>作曲：<a href='#'>未知</a></li><li>编曲：<a href='#'>未知</a></li><li>混缩：<a href='#'>未知</a></li><li>分类：<a href='#'>"+data.type+"</a></li><li>语种：<a>"+data.lang+"</a></li><li class='long'>曲风：<a>"+data.style+"</a></li><li>下载设置：<a>免费下载</a></li><li class='long'>上传时间：<a>"+data.ctime+"</a></li>";
			$("item").innerHTML = html;
			$("afflatus").innerHTML = data.afflatus;
			$("singer").innerHTML = "<img src='"+data.header+"'>";
			$("singer").setAttribute("href",sHref);
			if(!data.src){
				$("music").setAttribute("src","#");
			}else{
				$("music").setAttribute("src",data.src);
			}
			$("song_name").innerHTML = data.sname;
			$("play_singer").innerHTML = data.singer;
			$("play_singer").setAttribute("href",sHref);
			document.querySelector(".user_fans>span").innerHTML = data.fans;

			(function(){
				var fileState = $("music").getAttribute("src");
				if(fileState!="#"){
					var player = $("music");		//获取video对象
					var timer;
					var playing = true;		//单曲循环使用
					$("play").onclick = function(){

				        var seconds = parseInt(player.duration);	//总秒数
				        var preload = parseInt(player.buffered.end(player.buffered.length-1));//首个缓存的缓存秒数
				        var min = parseInt(seconds/60);		//how minute
						var minute = min>10?min.toString():"0"+min;		//输出时用 分针数
						var sec = parseInt(seconds-min*60).toString();	//输出时用 秒针数
						var totalTime = minute+":"+sec;		//总时间
						$("totalTime").innerHTML = totalTime;

						$("preload").style.width = (204*preload)/seconds+"px";	//缓存进度
						this.style.display = "none";		
						$("pause").style.display = "inline-block";	//显示暂停按钮
						player.volume = 0.5;	//音量
						player.play();		//开始播放

						//音量控制
						var offsetX,canMoveV=false;
						var progress = document.querySelector("div.current-vol");
						var pointer = progress.nextElementSibling || progress.nextSibling;
						document.querySelector("div.total").onmousedown = function(e){
							var even = e.target || e.srcElement;
							e.preventDefault();
							if(even.className=="pointer"){
								offsetX = parseInt(even.style.left)+e.offsetX;
								offsetX = offsetX<0?0:(offsetX>50?50:offsetX);
							}else{
								offsetX = e.offsetX;
								offsetX = offsetX<0?0:(offsetX>50?50:offsetX);
							}
							progress.style.width = offsetX+"px";
							pointer.style.left = offsetX- 2 +"px";
							player.volume = offsetX/50;
							canMoveV = true;
						}
						window.onmousemove = function(e){
							var even = e.target || e.srcElement;
							if(canMoveV){
								var thatClass = even.className;
								if(thatClass == "pointer"){
									offsetX = parseInt(even.style.left)+e.offsetX;
									offsetX = offsetX<0?0:(offsetX>50?50:offsetX);
								}else if(thatClass=="volumeBox lf"||thatClass=="total"||thatClass=="current-vol"){
									offsetX = e.offsetX;
									offsetX = offsetX<0?0:(offsetX>50?50:offsetX);
								}
								player.volume = offsetX/50;
								progress.style.width = offsetX+"px";
								pointer.style.left = offsetX- 2 +"px";
							}
						}
						window.onmouseup = function(e){
							canMoveV = false;
						}
						//音量控制结束

						//进度条点击
						document.querySelector("div.progress-bar").onclick = function(e){
							if(e.target.className!="pointer"||e.srcElement.className!="pointer"){
								player.currentTime = (event.offsetX*seconds)/204;
								$("currentProg").style.width = event.offsetX+"px";
								$("pointer").style.left = event.offsetX-4+"px";
							}
						}
						//进度条
						
						timer = setInterval(function(){
							/*******缓存进度*******/
							if(parseInt($("preload").style.width)<204){
								var preload = parseInt(player.buffered.end(player.buffered.length-1));
								$("preload").style.width = (204*preload)/seconds+"px";
							}
							/**********************/

							var currentSec = Math.ceil(player.currentTime);	//当前播放秒数
							var c_min = parseInt(currentSec/60);		//多少分钟
							var c_minute = c_min>10?c_min.toString():"0"+c_min;	//输出分钟数
							var c_sec = currentSec%60==0?"00":
								currentSec%60>=10?(currentSec%60).toString():"0"+currentSec%60; //输出秒数
							var currentTime = c_minute+":"+c_sec;	//输出当前播放时间

							/*******播放进度*******/
					//		var currentProg = Math.round(player.currentTime);	//当前已播放时间
							$("currentProg").style.width = 
								(currentSec*204)/Math.round(seconds)+"px";
							$("pointer").style.left = 
								(currentSec*204)/Math.round(seconds)-4+"px";	//小圆点
							/*********************/
					//		console.log(currentSec);
							if(currentSec==seconds){
								playing = false;
								clearInterval(timer);
								$("play").style.display = "inline-block";
								$("pause").style.display = "none";
						//		return;
							}
							$("currentTime").innerHTML = currentTime;
						},1000);
					}
					$("pause").onclick = function(){
						this.style.display = "none";
						$("play").style.display = "inline-block";
						player.pause();
						clearInterval(timer);
					}
					player.onpause = function(){
						if(!playing){
							$("play").onclick();
							playing = true;
						}
					}			//单曲循环
				}
			})();
		}, 
		"sid="+sid,
		"json"     
	); 
})();


(function(){
	ajax(
		"get",
		"data/router/user/isLogin.php",
		function(data){
			if(data.state=="1"){
				$("shadow").style.display = "none";
			}
		},
		null,
		"json"
	);
})();

(function(){
	$("login-btn").onclick = function(e){
		var url=location.href;
		url=encodeURIComponent(url);
		location.href="login.html?back="+url;
	}
})();

//评论区
(function(){
	function loadComment(pno){
		var sid = location.search.split("=")[1];	//有风险	
		ajax(
			"get",
			"data/router/comment/loadComment.php",
			function(datas){
				if(datas.data.length!=0){
					var pno = parseInt(datas.pno);		//当前页码
					var pageCount = datas.pageCount;	//总页数
				//	console.log(typeof(pageCount));
					var pageSize = datas.pageSize;		//页记录数
					var recodeCount = datas.recodeCount;	//总记录数
					var data = datas.data;			//获取评论数组
					var html = "";
					for(var i=0;i<data.length;i++){
						var href = "music_zone.html?uid="+data[i].uid;
						html += "<li class='clear'><a href='"+href+"' target='_blank'><img src='"+data[i].cheader+"'></a><div><p><a href='"+href+"' target='_blank'>"+data[i].cuser+"</a></p><div class='comment'>"+data[i].comment+"</div><div class='other clear'><span>"+data[i].time+"</span><i></i></div></div></li>";
					}
					$("comment_list").innerHTML = html;
					if(pageCount>0){
						var html = "";
						html += "<span id='prevCom'>上一页</span>";
						for(var i=0;i<pageCount;i++){
							if(i+1==pno){
								html += "<span class='currentPage'>"+(i+1)+"</span>";	//当前页加class
							}else{
								html += "<span>"+(i+1)+"</span>";
							}
						}
						html += "<span id='nextCom'>下一页</span>";
						$("page_btn").innerHTML = html;
						/*********上下页按钮切换*********/
						if(pno==pageCount){
							$("nextCom").className = "effect";
						}
						if(pno==1){
							$("prevCom").className = "effect";
						}
						$("nextCom").onclick = function(){
							if(pno<pageCount){
								loadComment(pno+1);
							}
						}
						$("prevCom").onclick = function(){
							if(pno>0){
								loadComment(pno-1);
							}
						}
						/********************************/
						/********分页按钮点击切换********/
						var btns = $("page_btn").getElementsByTagName("span");
						for(var i=1;i<btns.length-1;i++){
							btns[i].onclick = function(){
								var value = parseInt(this.innerHTML);
								if(value!=pno){
									loadComment(value);
								};
							}
						}
						/********************************/				
					}
				}
			},
			"sid="+sid+"&pageNo="+pno,
			"json"
		);
	}
	loadComment(1);		//默认加载第一个
	//提交评论
	finish.onclick = function(){
		ajax(
			"get",
			"data/router/user/isLogin.php",
			function(data){
				if(data.state=="1"){
					var cuser = encodeURI(data.uname);		//防止IE乱码
					var sid = parseInt(location.search.slice(5));	//有风险
					var detail = encodeURI($("comInput").value);	//防止IE乱码			
					if(detail!=""){
						ajax(
							"get",
							"data/router/comment/comment.php",
							function(success){
								if(success.data==1){
									$("comInput").value = "";
									loadComment(1);			//callback hell
								}else{
									alert("网络超时");
								}
							},
							"sid="+sid+"&comment="+detail+"&cuser="+cuser,
							"json"
						);
					}
				}
			},
			null,
			"json"
		);
	}
	/****/
})();