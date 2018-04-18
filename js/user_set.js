(function(){
	function modeAlert(content,color,background){
		$("mod_alert").innerHTML = content;
		$("mod_alert").style.color = color;
		$("mod_alert").style.background = background;
		$("mod_alert").style.display = "block";
		var timer = setTimeout(function(){
			$("mod_alert").style.display = "none";
		},1800);
	}

	

	var objImg;
	//头像上传
	var isUpload = false;
	$("upload").onchange = function(){
		objImg = $("upload").files[0];
		if(objImg){
			if(objImg.type.indexOf("image")===-1){
	            modeAlert("请选择正确的图片","#fff","#C9302C");
	            return;
	        }
	        //console.log(objImg.size/1024);
	        if(objImg.size/1024>=1024){
	        	modeAlert("图片大小超过限制","#fff","#C9302C");
	        	return;
	        }
	        var src = window.webkitURL.createObjectURL(objImg);
	        isUpload = true;
	        document.querySelector(".upload-area>img").setAttribute("src",src);
    	}
	}


	var new_gender;
	//加载出生 年 月 日
	var new_year,new_month,new_day;
	var html = "";
	html += "<option></option>";
	for(var i=2017;i>=1940;i--){
		html += "<option value='"+i+"'>"+i+"</option>";
	}
	$("born_year").innerHTML = html;
	//加载月
	$("born_year").onchange = function(){
		if(this.value){
			var year = parseInt(this.value);
			new_year = $("born_year").value;
			var isLeapYear = year%4==0 && year%100!=0||year%400==0;	//闰年
			var html = "";
			for(var i=1;i<=12;i++){
				html += "<option value='"+i+"'>"+i+"</option>";
			}
			$("born_month").innerHTML = html;
			$("born_month").onchange = function(){
				if(this.value){
					var month = parseInt(this.value);
					new_month = $("born_month").value;
					if(month==1||month==3||month==5||month==7||month==8||
					month==10||month==12){
						var html = "";
						for(var i=1;i<=31;i++){
							html += "<option value='"+i+"'>"+i+"</option>";
						}
						$("born_day").innerHTML = html;
					}else if(month==4||month==6||month==9||month==11){
						var html = "";
						for(var i=1;i<=30;i++){
							html += "<option value='"+i+"'>"+i+"</option>";
						}
						$("born_day").innerHTML = html;
					}else{
						if(isLeapYear){
							var html = "";
							for(var i=1;i<=29;i++){
								html += "<option value='"+i+"'>"+i+"</option>";
							}
							$("born_day").innerHTML = html;
						}else{
							var html = "";
							for(var i=1;i<=28;i++){
								html += "<option value='"+i+"'>"+i+"</option>";
							}
							$("born_day").innerHTML = html;
						}
					}
					new_day = $("born_day").value;
					$("born_day").onchange = function(){
						new_day = this.value;
					}
				}else{
					$("born_day").innerHTML = "<option></option>";
				}
			}
		}else{
			$("born_month").innerHTML = "<option></option>";
			$("born_day").innerHTML = "<option></option>";
			new_month = undefined;
			new_day = undefined;
		}
	}

	//加载省份
	var new_native,new_province;
	$("nation").onchange = function(){
		if(this.value!="请选择"&&this.value!=""){
			new_native = this.value;
			var arr = ["辽宁","吉林","黑龙江","河北","山西","陕西","山东"
			,"安徽","江苏","浙江","河南","湖北","湖南","江西","台湾","福建"
			,"云南","海南","四川","贵州","广东","甘肃","青海","西藏","新疆"
			,"广西","内蒙古","宁夏","北京","天津","上海"];
			var html = "";
			for(var i=0;i<arr.length;i++){
				html += "<option value='"+arr[i]+"'>"+arr[i]+"</option>";
			}
			$("province").innerHTML = html;
			$("province").onchange = function(){
				if(this.value!="请选择"){
					new_province = this.value;
				}else{
					new_province = undefined;
				}
			}
		}else{
			$("province").innerHTML = "<option>请选择</option>";
			new_native = undefined;
			new_province = undefined;
		}
	}

	var unamePass = true;
	document.querySelector(".submit>button").onclick = function(event){
		event.preventDefault();
		if(!unamePass){
			modeAlert("用户名重复","#fff","#C9302C");
			return;
		}
		var new_born = new_year+"_"+new_month+"_"+new_day;
		if(new_year){
			if(!(new_month&&new_day)){
				modeAlert("请填写合法日期","#fff","#C9302C");
			}
		}
		ajax(
			"get",
			"data/router/user/isLogin.php",
			function(data){
				if(data.state=="1"){
					var uid = data.id;
					var new_intro = $("introduce").value;	//个人介绍
					var new_Qnum = $("Qnum").value;	//QQ
					var new_name = $("user").value;	//昵称
					// console.log(new_intro);
					// console.log(new_Qnum);
					// console.log(new_name);
					// console.log(new_gender);	//性别
					//var new_born = new_year+"_"+new_month+"_"+new_day;	//生日
					var new_local = new_native+"_"+new_province;	//出生地
					// console.log(new_iden);		//音乐身份
					// console.log(new_lang);		//语言
					// console.log(new_style);		//曲风
					ajax(
						"post",
						"data/router/user/updateUser.php",
						function(success){
							if(success.code=="1"){
								if(isUpload){
									var xhr = new XMLHttpRequest();
									//console.log(objImg);
							        xhr.open("post","data/router/user/avtUpLoad.php",true);
							        //     14.修改响应头
							        xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");//修改响应头
							        xhr.onreadystatechange = function(){
										if(xhr.readyState==4&&xhr.status==200){
											var res = JSON.parse(xhr.responseText);
											if(res.code=="1"){
												var new_src = res.src;
												ajax(
													"post",
													"data/router/user/updateAvt.php",
													function(success){
														modeAlert("修改成功","#fff","#16D867");
														setTimeout(function(){
															location.reload();
														},1000);
													},
													"uid="+uid+"&new_src="+new_src,
													"json"
												);
											}else{
												modeAlert("网络错误","#fff","#C9302C");
											}
										}
									}
							     	//   15.创建FormData对象并且将上
							        var fromData = new FormData();
							        fromData.append("upFile",objImg);
							        //   16.发送
							        xhr.send(fromData);
								}else{
									modeAlert("修改成功","#fff","#16D867");
									setTimeout(function(){
										location.reload();
									},1000);
								}
							}else{
								modeAlert("网络错误","#fff","#C9302C");
							}
						},
						"uid="+uid+"&new_name="+new_name+"&new_gender="+new_gender+"&new_born="+new_born+"&new_local="+new_local+"&new_Qnum="+new_Qnum+"&new_iden="+new_iden+"&new_lang="+new_lang+"&new_style="+new_style+"&new_intro="+new_intro,
						"json"
					);
				}else{
					location.href = "login.html";
				}
			},
			null,
			"json"
		);	
	}
	var new_iden="";	//设置音乐身份
	var idenArr = [];
	var new_lang="";	//设置语言
	var langArr = [];
	var new_style="";
	var styleArr = [];
	ajax(
		"get",
		"data/router/user/isLogin.php",
		function(data){
			if(data.state == "1"){
				$("avt").setAttribute("src",data.avatar);
				$("user_name").innerHTML = data.uname;
				//中部主要资料
				$("passRoute").innerHTML = "Phone_"+data.id;
				$("id").innerHTML = data.id;
				$("user").value = data.uname;
				$("user").onblur = function(){
					var uname = $("user").value;
					if(uname!=data.uname){
						ajax(
							"get",
							"data/router/user/checkName.php",
							function(data){
								if(data=="0"){
									$("nameState").innerHTML = "该昵称已被占用";
									$("nameState").style.color = "#e84c3d";
									unamePass = false;
								}else{
									$("nameState").innerHTML = "该昵称可用";
									$("nameState").style.color = "#66cc00";
									unamePass = true;
								}
							},
							"uname="+uname
						);
					}
				}
				document.querySelector(".upload-area>img").setAttribute("src",data.avatar);
				ajax(
					"get",
					"data/router/user/loadInfo.php",
					function(msg){
			//			console.log(msg);
						new_gender = msg.gender;
						var gender = msg.gender;
						var canChangeGender = false;
						if(gender){
							var sex = $("gender").getElementsByTagName("span");
							sex[gender].className = "active";
						}else{
							canChangeGender = true;		//是否能修改性别
						}
						//加载出生年月日
						if(msg.born){
							var bornArr = msg.born.split("_");	//Array
							var years = $("born_year").getElementsByTagName("option");
							for(var i=1;i<years.length;i++){
								if(years[i].value==bornArr[0]){		//读取到的出生年
									years[i].setAttribute("selected","selected");
									$("born_year").onchange();
								}
							}
							var months = $("born_month").getElementsByTagName("option");
							for(var i=1;i<months.length;i++){
								if(months[i].value==bornArr[1]){	//读取到的出生月
									months[i].setAttribute("selected","selected");
									$("born_month").onchange();
								}
							}
							var days = $("born_day").getElementsByTagName("option");
							for(var i=0;i<days.length;i++){
								if(days[i].value==bornArr[2]){		//读取到的出生日
									days[i].setAttribute("selected","selected");
									$("born_day").onchange();
								}
							}
						}
						//加载所在地
						if(msg.location){
							var locationArr = msg.location.split("_");
							var nations = $("nation").getElementsByTagName("option");
							for(var i=1;i<nations.length;i++){
								if(nations[i].value==locationArr[0]){
									nations[i].setAttribute("selected","selected");
									$("nation").onchange();
									var provinces = $("province").getElementsByTagName("option");
									for(var j=1;j<provinces.length;j++){
										if(provinces[j].value==locationArr[1]){
											provinces[j].setAttribute("selected","selected");
											$("province").onchange();
										}
									}
								}
							}
						}
						//加载QQ号码
						if(msg.Qnum){
							$("Qnum").value = msg.Qnum;
						}
						//加载音乐身份
						var identitys = $("music_identity").getElementsByTagName("span");
						var indentityCount = 0;			//音乐身份统计
						if(msg.music_identity){
							var userIdens = msg.music_identity.split("_");	//音乐身份数组
							indentityCount = userIdens.length;
							if(userIdens.length>=3){
								canAddIdentity = false;
							}
							for(var i=0;i<userIdens.length;i++){
								for(var j=0;j<identitys.length;j++){
									if(identitys[j].innerHTML == userIdens[i]){
										identitys[j].className = "active";
									}
								}
								idenArr.push(userIdens[i]);			//输出 a_b_c 格式
							}
							new_iden = userIdens.join("_");
						}
						var canAddIdentity = indentityCount>=3?false:true;	//能否添加音乐身份
						$("music_identity").onclick = function(event){
							var tar = event.target||event.srcElement;
							if(tar.nodeName=="SPAN"){
								if(tar.className!="active"&&canAddIdentity){
									indentityCount++;
									canAddIdentity = indentityCount>=3?false:true;
									idenArr[idenArr.length]=tar.innerHTML;
									tar.className = "active";
								}else if(tar.className=="active"){
									indentityCount--;
									tar.className = null;
									for(var i=0;i<idenArr.length;i++){
										if(idenArr[i]==tar.innerHTML){
											idenArr.splice(i,1);
										}
									}
									canAddIdentity = indentityCount>=3?false:true;
								}else{
									modeAlert("最多选择三个","#fff","#C9302C");
								}
								new_iden = idenArr.join("_");		//得到音乐身份的输出字符串
							}
						}
						//加载语言
						var languages = $("music_language").getElementsByTagName("span");
						var langCount = 0;					//语言数量统计
						var canAddLang;
						if(msg.language){
							var userLang = msg.language.split("_");	//语言数组
							langCount = userLang.length;
							if(userIdens.length>=3){
								canAddLang = false;
							}
							for(var i=0;i<userLang.length;i++){
								for(var j=0;j<languages.length;j++){
									if(languages[j].innerHTML == userLang[i]){
										languages[j].className = "active";
									}
								}
								langArr.push(userLang[i]);
							}
							new_lang = userLang.join("_");
						}
						canAddLang = langCount>=3?false:true;		//能否继续选择
						$("music_language").onclick = function(event){
							var tar = event.target||event.srcElement;
							if(tar.nodeName=="SPAN"){
								if(tar.className!="active"&&canAddLang){
									langCount++;
									canAddLang = langCount>=3?false:true;
									langArr[langArr.length]=tar.innerHTML;
									tar.className = "active";
								}else if(tar.className=="active"){
									langCount--;
									tar.className = null;
									for(var i=0;i<langArr.length;i++){
										if(langArr[i]==tar.innerHTML){
											langArr.splice(i,1);
										}
									}
									canAddLang = langCount>=3?false:true;
								}else{
									modeAlert("最多选择三个","#FFF","#C9302C");
								}
								new_lang = langArr.join("_");		//得到语言的输出字符串
							}
						}
						//加载曲风
						var styles = $("music_style").getElementsByTagName("span");
						if(msg.style){
							var userStyle = msg.style.split("_");
							for(var i=0;i<userStyle.length;i++){
								for(var j=0;j<styles.length;j++){
									if(styles[j].innerHTML == userStyle[i]){
										styles[j].className = "active";
									}
								}
								styleArr.push(userStyle[i]);
							}
							new_style = userStyle.join("_");
						}
						$("music_style").onclick = function(event){
							var tar = event.target||event.srcElement;
							if(tar.nodeName=="SPAN"){
								if(tar.className!="active"){
									styleArr[styleArr.length]=tar.innerHTML;
									tar.className = "active";
								}else{
									for(var i=0;i<styleArr.length;i++){
										if(styleArr[i]==tar.innerHTML){
											styleArr.splice(i,1);
										}
									}
									tar.className = null;
								}
								new_style = styleArr.join("_");
							}
						}
						//加载个人介绍
						if(msg.introduce){
							$("introduce").innerHTML = msg.introduce;
						}
						/******************性别*******************/
						$("gender").onclick = function(event){
							var tar = event.target || event.srcElement;
							if(tar.nodeName=="SPAN"){
								if(canChangeGender){
									var spans = $("gender").getElementsByTagName("span");
									if(tar.className!="active"){
										for(var i=0;i<spans.length;i++){
											spans[i].className = "";
										}
										tar.className = "active";
										new_gender = tar.innerHTML=="男"?0:(tar.innerHTML=="女"?1:2);	//确认性别
									}
								}else{
									modeAlert("性别不可再更改","#FFF","#C9302C");
								}
							}
						}
						/****************************************/
					},
					"uid="+data.id,
					"json"
				);
			}else{
				location.href = "login.html";
			}
		},
		null,
		"json"
	);
	var divs = document.querySelectorAll(".tab-container>div");
	var nav = document.querySelector(".tab-nav");
	nav.onclick = function(e){
		var tar;
		if(e&&e.preventDefault){
			e.preventDefault();
			tar = e.target;
		}else{
			event.returnValue=false;		//IE阻止浏览器默认行为
			tar = event.srcElement;
		}
		if(tar.className!="active"&&tar.getAttribute("href")!="#"){
			var tarId = tar.getAttribute("href").slice(1);
			if(tarId){
				var tarDivs = document.querySelector(".tab-container").children;
				for(var i=0;i<tarDivs.length;i++){
					if(tarDivs[i].getAttribute("id")==tarId){
						tarDivs[i].style.display = "block";
					}else{
						tarDivs[i].style.display = "none";
					}
				}
			}
			document.querySelector(".tab-nav .active").className="";
			tar.className = "active";
		}
	}
	//修改密码
	var canUsePwd = false;
	$("newPwd").onblur = function(){
		var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
		if(reg.test($("newPwd").value)){
			canUsePwd = true;
		}else{
			canUsePwd = false;
		}
	}
	$("updateUpwd").onclick = function(){
		//event.preventDefault();
		if(canUsePwd){
			var uid;
			var oldPwd = $("upwd").value;
			var newPwd = $("newPwd").value;
			var askPwd = $("askPwd").value;
			ajax(
				"get",
				"data/router/user/isLogin.php",
				function(data){
					if(data.id){
						uid = data.id;
						if(oldPwd&&newPwd&&askPwd){
							if(newPwd==askPwd){
								ajax(
									"post",
									"data/router/user/updateUpwd.php",
									function(data){
										if(data.code==1){
											modeAlert("修改密码成功","#fff","#16D867");
											setTimeout(function(){
												location.reload();
											},1900);
										}else if(data.code==-1){
											modeAlert("密码错误","#fff","#C9302C");
										}else{
											modeAlert("网络错误","#fff","#C9302C");
										}
									},
									"uid="+uid+"&oldPwd="+oldPwd+"&newPwd="+newPwd,
									"json"
								);
							}else{
								modeAlert("两次密码不一致","#fff","#C9302C");
							}
						}else{
							modeAlert("请填写完整","#fff","#C9302C");
						}				
					}else{
						location.href = "login.html";
					}
				},
				null,
				"json"
			);
		}else{
			modeAlert("新密码不合法","#fff","#C9302C");
		}
	}
})();