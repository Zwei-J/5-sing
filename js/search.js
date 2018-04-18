(function(){
	var kw = location.search.split("=")[1];
	function page(dataAll,fn){
		//分页
		var pno = parseInt(dataAll.pno);
		var totalCount = dataAll.totalCount;
		var pageCount = dataAll.pageCount;
		var html = "<span id='prevList'>上一页</span>";
		if(pageCount<=3){
			for(var i=1;i<=pageCount;i++){
				html += "<span>"+i+"</span>";
			}
		}else{
			if(pno==1){
				for(var i=1;i<=2;i++){
					html += "<span>"+i+"</span>";
				}
				html += " ... ";
				html += "<span>"+pageCount+"</span>";
			}else if(pno>1&&pno<4){
				for(var i=0;i<pno;i++){
					html += "<span>"+(i+1)+"</span>";
				}
				html += " ... ";
				html += "<span>"+pageCount+"</span>";
			}else if(pno>=4){
				if(pno>pageCount-3){
					html += "<span>1</span>";
					html += " ... ";
					for(var i=pno-1;i<=pageCount;i++){
						html += "<span>"+i+"</span>";
					}
				}else{
					html += "<span>1</span>";
					html += " ... ";
					for(var i=pno-1;i<=pno+1;i++){
						html += "<span>"+i+"</span>";
					}
					html += " ... ";
					html += "<span>"+pageCount+"</span>";
				}
			}
		}
		html += "<span id='nextList'>下一页</span>";
		html += "<a> 到 <input type='text' id='targetPage'> 页 <span>确定</span></a>";               
		$("page_btn").innerHTML = html;

		var btns = $("page_btn").getElementsByTagName("span");
		for(var i=0;i<btns.length;i++){
			if(btns[i].innerHTML == pno){
				btns[i].className = "currentPage";
			}
			if(btns[i].innerHTML == "上一页"&&pno==1){
				btns[i].className = "effect";
			}
			if(btns[i].innerHTML == "下一页"&&pno==pageCount){
				btns[i].className = "effect";
			}
		}

		$("prevList").onclick = function(){
			if(pno>1){
				fn(pno-1);
			}
		}
		$("nextList").onclick = function(){
			if(pno<pageCount){
				fn(pno+1);
			}
		}

		for(var i=1;i<btns.length-2;i++){
			btns[i].onclick = function(){
				fn(this.innerHTML);
			}
		}

		btns[btns.length-1].onclick = function(){
			var tar = $("targetPage").value;
			var num = parseInt(tar);
			if(num){
				if(num>pageCount){
					num = pageCount;
				}
				fn(num);
			}
		}
	}
	if(kw!="_"&&kw){
		var input = document.querySelector(".search-box>input");
		var newKw = decodeURI(kw);
		input.value = newKw;
		function loadSearchList(pno){
			ajax(
				"get",
				"data/router/song/search.php",
				function(dataAll){
					console.log(dataAll);
					var data = dataAll.content;
					var len = data.length;
					if(len>0){
						$("search-msg").innerHTML = "搜索“<span>"+newKw+"</span>” , 找到<b>"+len+"</b>首歌曲!";
						var html = "";
						html += "<ul class='title'><li>序号</li><li>歌曲名</li><li>演唱</li><li>类别</li><li>语言</li><li>歌曲人气</li><li>试听</li><li>下载</li></ul>";
						for(var i=0;i<data.length;i++){
							var typeHref = data[i].type=="原创"?"original.html":"cover.html";
							var oriHref = "origin_detail.html?sid="+data[i].sid;
							html += "<ul><li>"+(i+1)+"</li><li class='link'><a href='"+oriHref+"' target='_blank' title='"+data[i].sname+"'>"+data[i].sname+"</a></li><li>"+data[i].singer+"</li><li class='link'><a href='"+typeHref+"' target='_blank'>"+data[i].type+"</a></li><li>"+data[i].lang+"</li><li>"+data[i].degree+"</li><li><i class='listen'></i></li><li><i class='down'></i></li></ul>";
						}
						$("result").innerHTML = html;
						page(dataAll,loadSearchList);
					}else{
						$("search-msg").innerHTML = "抱歉，找不到与“<span>"+newKw+"</span>”相关的歌曲~";
						$("result").innerHTML = "<div class='notFound'><img src='img/search/notFound.png'></div>";
					}
				},
				"keyword="+kw+"&pno="+pno,
				"json"
			);
		}
		loadSearchList(1);
	}else{
		function loadList(pno){
	        ajax(
	            "get",
	            "data/router/song/search.php",
	            function(dataAll){
	                //console.log(dataAll);
	                var data = dataAll.content;
					$("search-msg").innerHTML = "所有歌曲 , 共"+dataAll.totalCount+"条记录";
					var html = "";
					html += "<ul class='title'><li>序号</li><li>歌曲名</li><li>演唱</li><li>类别</li><li>语言</li><li>歌曲人气</li><li>试听</li><li>下载</li></ul>";
					for(var i=0;i<data.length;i++){
						var typeHref = data[i].type=="原创"?"original.html":"cover.html";
						var oriHref = "origin_detail.html?sid="+data[i].sid;
						html += "<ul><li>"+(i+1)+"</li><li class='link'><a href='"+oriHref+"' target='_blank' title='"+data[i].sname+"'>"+data[i].sname+"</a></li><li>"+data[i].singer+"</li><li class='link'><a href='"+typeHref+"' target='_blank'>"+data[i].type+"</a></li><li>"+data[i].lang+"</li><li>"+data[i].degree+"</li><li><i class='listen'></i></li><li><i class='down'></i></li></ul>";
					}
					$("result").innerHTML = html;
					page(dataAll,loadList);
	            },
	            "pno="+pno,
	            "json"
	        );     
	    }
	    loadList(1);
	}



	function innerSearch(){
        var kw = document.querySelector(".search-box>input").value;
        location.search = "?keyword="+kw;
	}
	$("search-btn").onclick = function(){
		innerSearch();
	};
    var input = document.querySelector(".search-box>input");
    input.onfocus = function(){
        window.onkeydown = function(e){
			if(e.keyCode==13){
				innerSearch();
			}
        }
    }
})();