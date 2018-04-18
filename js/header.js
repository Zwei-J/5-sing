(function(){
	ajax(
		"get",
		"header.html",
		function success(html){
			$("header").innerHTML = html;		//加载头部
			loadUser();				//加载用户信息
			//搜索功能
            var input = document.querySelector(".search>input");
			function search(){
                var kw = input.value;
                if(kw){
                    location.href = "search.html?keyword="+kw;
                }else{
                    location.href = "search.html";
                }
			}
			$("search").onclick=function(){
				search();
			};
            input.onfocus = function(){
            	window.onkeydown=function(e){
            		if(e.keyCode==13){
            			search();
					}
				}
			}

			$("logout").onclick=function(){
				ajax(
					"get",
					"data/router/user/logout.php",
					function success(){
						location.reload();
					}
				);
			}
			$("top_login").onclick = function(){
				if(location.href.indexOf("index.html")<1){
					var url = encodeURIComponent(location.href);
					location.href = "login.html?back="+url;
				}else{
					location.href = "login.html";
				}
			}
		}
	);
	var isLogin = false;
	function loadUser(){
		var login_btn = $("login-btn");
		var reg_btn = $("reg-btn");
		var userMsg = $("avatar");
		var msg = $("msg");

		ajax(
			"get",
			"data/router/user/isLogin.php",
			function success(user){
		//		console.log(user);
				if(user.state=="1"){
					isLogin = true;
					login_btn.style.display = "none";
					reg_btn.style.display = "none";
					var avatar = userMsg.getElementsByTagName("img")[0];
					var uname = userMsg.getElementsByTagName("span")[0];
					avatar.setAttribute("src",user.avatar);
					uname.innerHTML = user.uname;
					userMsg.style.display="block";
					msg.style.display="block";
					userMsg.onmouseover = function(){
						$("userMenu").style.display = "block";
					};
					$("userMenu").onmouseout = function(){
						this.style.display = "none";
					};
					// $("header").onmouseout = function(){
					// 	$("userMenu").style.display = "none";
					// }
					$("setting").onclick = function(){
						location.href = "user_set.html";
					};
					$("persion_center").onclick = function(){
						location.href = "user_center.html";
					};
					$("home").onclick = function(){
						location.href = "music_zone.html";
					};
				}
			},
			null,
			"json"
		);
	}

	
})();