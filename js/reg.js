window.onload=function(){
	/****** Tab切换 ******/
	var regWay = document.getElementsByClassName("register")[0].getElementsByTagName("a");
	var form = document.getElementsByClassName("form");
	function regTab(i){
		if(regWay[i].className=="active lf")
			return;
		else{
			regWay[i].className="active lf";
			regWay[1-i].className="lf";
			form[i].style.display="block";
			form[1-i].style.display="none";
		}
	}
	regWay[0].onclick=function(){
		regTab(0);
	}
	regWay[1].onclick=function(){
		regTab(1);
	}
	/**********************/
	
	/*********  注册功能  **********/
	var phoneCanUse=false;		//手机是否可用
	var unameCanUse=false;		//昵称是否可用
	var upwdCanUse=false;		//密码是否可用
	var reUpwdCanUse=false;		//重复密码是否可用
		/* 检查手机号 */
	var phone = $("phone");
	phone.onblur=function(){
		var phoneNum = phone.value;
		var reg = /^1[34578]\d{9}$/;
		var regPhone = $("isCanUsePhone");
		if(reg.test(phoneNum)){
			ajax(
				"get",
				"data/router/user/checkPhone.php",
				function success(data){
					if(data=="1"){
						regPhone.className="canUse";
						regPhone.innerHTML="该手机号码可使用";
						phoneCanUse=true;
					}else{
						regPhone.className="cantUse";
						regPhone.innerHTML="该手机号码已被注册";
					}
				},
				"phone="+phoneNum
			)
		}else{
			regPhone.className="cantUse";
			regPhone.innerHTML="请输入正确的手机号";
		}
	}
		/* 检查昵称 */
	var uname = $("uname");
	uname.onblur = function(){
		var unames = uname.value;
		var reg = /^[\u4E00-\u9FA5A-Za-z_0-9]{1,16}$/;
		var regUname = $("isCanUseUname");
		if(reg.test(unames)){
			ajax(
				"get",
				"data/router/user/checkName.php",
				function success(data){
					if(data=="1"){
						regUname.className="canUse";
						regUname.innerHTML="该昵称可使用";
						unameCanUse=true;
					}else{
						regUname.className="cantUse";
						regUname.innerHTML="该昵称已被注册";
					}
				},
				"uname="+unames
			)
		}else{
			regUname.className="cantUse";
			regUname.innerHTML="请输入合法的昵称";
		}
	}
		/* 检查密码 */
	var upwd = $("upwd");
	upwd.onblur=function(){
		var regUpwd = $("isCanUseUpwd");
		var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
		if(reg.test(upwd.value)){
			regUpwd.className = "canUse";
			regUpwd.innerHTML = "密码可使用";
			upwdCanUse=true;
		}else{
			regUpwd.className = "cantUse";
			regUpwd.innerHTML = "密码不合法";
		}
	}
		/* 校验密码 */
	var reUpwd = $("reUpwd");
	reUpwd.onblur = function (){
		if(upwdCanUse){
			var regReupwd = $("isCanUseReupwd");
			if(this.value==upwd.value){
				regReupwd.className = "canUse";
				regReupwd.innerHTML = "密码一致";
				reUpwdCanUse=true;
			}else{
				regReupwd.className = "cantUse";
				regReupwd.innerHTML = "密码不一致";
			}
		}
	}
		/* 注册功能 */
	var sub = $("reg");
	sub.onclick=function(){
		if(phoneCanUse&&unameCanUse&&upwdCanUse&&reUpwdCanUse){
			var phone=$("phone").value, 
				uname=$("uname").value, 
				upwd=$("upwd").value;
			ajax(
				"post",
				"data/router/user/reg.php",
				function success(data){
					if(data=="1"){
						$("regSuc").style.display="block";
						$("phone").value = "";
						$("uname").value = "";
						$("upwd").value = "";
						$("reUpwd").value = "";
						setTimeout(function(){
							location.href="login.html";
						},1500)
					}
				},
				"phone="+phone+"&uname="+uname+"&upwd="+upwd
			);
		}
	}
	/*********************************/

}