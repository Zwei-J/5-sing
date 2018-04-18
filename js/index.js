window.onload=function(){
	/*******************焦点轮播图************************/
	var container=$("main-banner");
	var banner=$("play-banner");
	var next=$("b_next");
	var prev=$("b_prev");
	var lists=$("points").getElementsByTagName("li");
	var index=1;				/* 索引 */
	var isAnimate=false;		//判断是否在运动
	var timer=null;

	function showButton(){				/* 小圆点背景切换 */
		for(var i=0;i<lists.length;i++){
			if(lists[i].className=="act"){
				lists[i].className="";
				break;
			}
		}
		lists[index-1].className="act";
	}

	function animate(offset){			//动画函数
		var newLeft = parseInt(banner.style.left) + offset;
		var cycle = 300;		//周期
		var inter = 15;			//每10ms做一次运动
		var speed = offset/(cycle/inter);		//速度
		function move(){
			isAnimate=true;
			if((speed<0&&parseInt(banner.style.left)>newLeft)||
				(speed>0&&parseInt(banner.style.left)<newLeft)){
				banner.style.left=parseInt(banner.style.left)+speed+"px";
				setTimeout(move,inter);
			}else{
				banner.style.left = newLeft + "px";
				if(newLeft==-8000){
					banner.style.left = -1000+"px";
				}else if(newLeft==0){
					banner.style.left = -7000+"px";
				}
				isAnimate=false;
			}
		}
		move();
	}

	function play(){					/* 自动播放 */
		timer=setInterval(function(){
			next.onclick();
		},3000)
	}
	play();

	container.onmouseover=function(){	/* 鼠标移入清除定时 */
		next.style.display="block";
		prev.style.display="block";
		clearInterval(timer);
	}

	container.onmouseout=function(){	/* 鼠标移出打开定时 */
		next.style.display="none";
		prev.style.display="none";
		play();
	}

	next.onclick=function(){			/* 右按钮切换 */
		if(!isAnimate){
			if(index==7){
				index=1;
			}else{
				index++;
			}
			showButton();
			animate(-1000);
		}
	}
	prev.onclick=function(){			/* 左按钮切换 */
		if(!isAnimate){
			if(index==1){
				index=7;
			}else{
				index--;
			}	
			showButton();	
			animate(1000);
		}
	}

	for(var i=0;i<lists.length;i++){	/* 小圆点点击切换 */
		lists[i].onclick=function(){
			var toIndex=parseInt(this.getAttribute("ind"));
			var offset=-1000*(toIndex-index);
			animate(offset);
			index = toIndex;
			showButton();
		}
	}

	/*****************************************************/

	/* 回到顶部 */
	var scrollTop=document.body.scrollTop||
				document.documentElement.scrollTop;
	window.onscroll=function(){
		var toTop = $("toTop");
		scrollTop=document.body.scrollTop||
				document.documentElement.scrollTop;
		if(scrollTop>400){
			toTop.style.height = "54px";
		}else{
			toTop.style.height = "0";
		}
		toTop.onclick = toTopAmi;
	}
	
	function toTopAmi(){
		if(scrollTop>0){
			document.documentElement.scrollTop=scrollTop-100;
			document.body.scrollTop=scrollTop-100;
			setTimeout(toTopAmi,10);
		}else{
			return;
		}
	}

	var lis = $("tabList-lf").getElementsByTagName("li");
	for(var i=0;i<lis.length;i++){
		lis[i].onmouseover = function(){
			//找到class为show的元素移除class
			var div = document.querySelector(".tabList.lf>ul>div.show");
			if(div){
				div.className = "tab clear";
			}//找到class为hide的元素移除class
			var li = document.querySelector(".tabList.lf>ul>li.hide");
			if(li){
				li.className = "";
			}
			//设置当前元素的class为show
			this.className="hide";
			//设置当前元素的子li的class为hide
			var sibling = this.nextElementSibling||this.nextSibling;
			sibling.className="tab clear show";
		}
	}

	var lis2 = $("tabList-rt").getElementsByTagName("li");
	for(var i=0;i<lis2.length;i++){
		lis2[i].onmouseover = function(){
			//找到class为show的元素移除class
			var div = document.querySelector(".tabList.rt>ul>div.show");
			if(div){
				div.className = "tab clear";
			}//找到class为hide的元素移除class
			var li = document.querySelector(".tabList.rt>ul>li.hide");
			if(li){
				li.className = "";
			}
			//设置当前元素的class为show
			this.className="hide";
			//设置当前元素的子li的class为hide
			var sibling = this.nextElementSibling||this.nextSibling;
			sibling.className="tab clear show";
		}
	}

	/**************一刀999***************/
/*	setTimeout(function(){
		$("shit").style.height = "177px";
	},2000)
	
	var close_btn = $("shit").getElementsByTagName("span")[0];
	close_btn.onclick=function(){
		$("shit").style.height = "0px";
	}*/
	/*************************************/


//document.addEventListener("DOMContentLoaded", function(event){
	/********************加载轮播广告*************************/
//	var banners = $("play-banner").getElementsByTagName("a");
//	console.log(banners);
	ajax(
		"get",
		"data/router/song/getIndexBanner.php",
		function(data){
			var html = "";
			html += "<a href='"+data[data.length-1].href+"' target='_blank'>";
			html += "<img src='"+data[data.length-1].src+"'></a>";
			for(var i=0;i<data.length;i++){
				html += "<a href='"+data[i].href+"' target='_blank'>";
				html += "<img src='"+data[i].src+"'></a>";
			}
			html += "<a href='"+data[0].href+"' target='_blank'>";
			html += "<img src='"+data[0].src+"'></a>";
		//	console.log(html);
			$("play-banner").innerHTML = html;
		},
		null,
		"json"
	);
	/*********************************************************/

	/**********************加载原创推荐***********************/
	var lis1 = $("tabList-lf").getElementsByTagName("li");
	var divs1 = $("tabList-lf").querySelectorAll("ul>div");
//	console.log(divs);
	ajax(
		"get",
		"data/router/song/getOri.php",
		function(data){
		//	console.log(data);
			for(var i=0;i<lis1.length;i++){
				var sHerf = "music_zone.html?uid="+data[i].uid;
				lis1[i].innerHTML = "<span>"+data[i].sname+"</span><b>"+data[i].singer+"</b>";
				var html = "<div class='photoBor lf'><img src='"+data[i].header+"'>"+data[i].style+"</div><div class='detail lf'><p class='clear'><a href='"+data[i].href+"' target='_blank' class='songName lf'>"+data[i].sname+"</a><a href='javascript:;' class='listen-icon rt'></a></p><a href='"+sHerf+"' target='_blank'>"+data[i].singer+"</a><div class='info'>"+data[i].afflatus+"</div></div>";
				divs1[i].innerHTML = html;
			}
		},
		null,
		"json"
	);
	/*******************************************************/

	/*********************加载翻唱推荐**********************/
	var lis2 = $("tabList-rt").getElementsByTagName("li");
	var divs2 = $("tabList-rt").querySelectorAll("ul>div");
	ajax(
		"get",
		"data/router/song/getCover.php",
		function(data){
			for(var i=0;i<lis2.length;i++){
				var sHerf = "music_zone.html?uid="+data[i].uid;
				lis2[i].innerHTML = "<span>"+data[i].sname+"</span><b>"+data[i].singer+"</b>";
				var html = "<div class='photoBor lf'><img src='"+data[i].header+"'>"+data[i].style+"</div><div class='detail lf'><p class='clear'><a href='"+data[i].href+"' target='_blank' class='songName lf'>"+data[i].sname+"</a><a href='javascript:;' class='listen-icon rt'></a></p><a href='"+sHerf+"' target='_blank'>"+data[i].singer+"</a><div class='info'>"+data[i].afflatus+"</div></div>";
				divs2[i].innerHTML = html;
			}
		},
		null,
		"json"
	);
	/*******************************************************/

	//推荐资讯
	ajax(
		"get",
		"data/router/song/getRecordMsg.php",
		function(data){
			var html = "";
			for(var i=0;i<data.length;i++){
				html += "<li><i></i><a href='"+data[i].href+"' target='_blank'>"+data[i].title+"</a></li>";
			}
			$("recodeMsg").innerHTML = html;
		},
		null,
		"json"
	);

	/*******************加载原创排行榜********************/
	ajax(
		"get",
		"data/router/song/oriRank.php",
		function(data){
		//	console.log(data);
			var html = "";
			for(var i=0;i<data.length;i++){
				var sHerf = "music_zone.html?uid="+data[i].uid;
				html += "<li><a href='"+data[i].href+"' class='title' target='_blank'><b>"+(i+1)+"</b>"+data[i].sname+"</a><a href='"+sHerf+"' target='_blank' class='singer'>"+data[i].singer+"</a></li>";
			}
		//	console.log(html);
			$("oriRank").innerHTML = html;
			/******************原创推荐top3样式******************/
			var rank = $("oriRank").getElementsByTagName("b");
			//console.log(rank);
			var top3 = ["fir","sec","thi"];
			//console.log(top3);
			for(var i=0;i<top3.length;i++){
				rank[i].className = top3[i];
			}
			/***************************************************/
		},
		null,
		"json"
	);
	/****************************************************/

	//热门音乐人首位
	ajax(
		"get",
		"data/router/user/getTopOne.php",
		function(data){
		//	console.log(data);
			var href = "music_zone.html?uid="+data.uid;
			var html = "<a href='"+href+"' target='_blank' class='title'>"+data.uname+"</a><a href='"+href+"' target='_blank'><img src='"+data.avatar+"'></a><p>"+data.introduce+"</p>";
			$("topOne").innerHTML = html;
		},
		null,
		"json"
	);

	//其他热门音乐人
	ajax(
		"get",
		"data/router/user/getHotSinger.php",
		function(data){
		//	console.log(data);
			var html = "";
			var arr = [];
			for(var i=0;i<data.length;i++){
				arr[i]=data[i].uname;
				var uid = data[i].uid;
				var href = "music_zone.html?uid="+uid;
				if(data[i].music_identity==null){
					data[i].music_identity = "";
				}
				html+="<div class='item'><div class='head_pic'><a href='"+href+"' target='_blank'><img src='"+data[i].avatar+"' target='_blank'></a><div class='info'><a href='"+href+"' target='_blank' class='head'></a><p class='s_name'><a href='"+href+"' target='_blank'>"+data[i].uname+"</a></p><p>"+data[i].music_identity+"</p><p class='intr'>"+data[i].introduce+"</p><div class='hotSong lf'><h4>热门歌曲</h4><ul class='list'></ul></div></div></div><p>"+data[i].uname+"</p></div>";
			}
			$("singerRank").innerHTML = html;
			var str = "";
			str += "singer0="+arr[0];
			for(var i=1;i<arr.length;i++){
				str += "&singer"+i+"="+arr[i];
			}
			ajax(
				"get",
				"data/router/song/getHotSong.php",
				function(data){
				//	console.log(data);
					var items = $("singerRank").getElementsByTagName("ul");
					for(var i=0;i<data.length;i++){
						var html = "";
						for(var j=0;j<data[i].length;j++){
							html += "<li><span><a href='"+data[i][j][1]+"' target='_blank'>"+data[i][j][0]+"</a></span><i></i></li>";	
						}
						items[i].innerHTML = html;
					}
				},
				encodeURI(str),
				"json"
			);
		},
		null,
		"json"
	);
}