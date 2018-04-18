(function(){
	if(!location.search){
		ajax(
			"get",
			"data/router/user/isLogin.php",
			function(msg){
				if(msg.state == "1"){
					document.querySelector("#avt>img").setAttribute("src",msg.avatar);
					$("user_name").innerHTML = msg.uname;
					ajax(
						"get",
						"data/router/user/getMsg.php",
						function(data){
							var areas = $("zone").getElementsByTagName("span");
							var html = "";
							if(data.gender == "0"){
								html = "<b class='boy'></b>ID：<span>"+msg.id+"</span>";
							}else if(data.gender == "1"){
								html = "<b class='girl'></b>ID：<span>"+msg.id+"</span>";
							}else{
								html = "<b></b>ID：<span>"+msg.id+"</span>";
							}
							var arr = [data.attention,data.fans,data.hot];
							$("sex_id").innerHTML = html;
							for(var i=0;i<areas.length;i++){
								areas[i].innerHTML = arr[i];
							}
						},
						"uid="+msg.id,
						"json"
					);	
				}else{
					location.href = "login.html";
				}
			},
			null,
			"json"
		);
	}else{
		var uid = parseInt(location.search.split("=")[1]);
		ajax(
			"get",
			"data/router/user/loadUserMsg.php",
			function(data){
				var areas = $("zone").getElementsByTagName("span");
				document.title = data.uname+"的音乐空间";
				document.querySelector("#avt>img").setAttribute("src",data.avatar);
				$("user_name").innerHTML = data.uname;
				if(data.gender == "0"){
					html = "<b class='boy'></b>ID：<span>"+uid+"</span>";
				}else if(data.gender == "1"){
					html = "<b class='girl'></b>ID：<span>"+uid+"</span>";
				}else{
					html = "<b></b>ID：<span>"+uid+"</span>";
				}
				var arr = [data.attention,data.fans,data.hot];
				$("sex_id").innerHTML = html;
				for(var i=0;i<areas.length;i++){
					areas[i].innerHTML = arr[i];
				}
			},
			"uid="+uid,
			"json"
		);
	}
})()