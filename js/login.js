window.onload=function(){
	var loginState = $("cantLogin");
	function login(){
		var phone = $("phone").value;
		var upwd = $("upwd").value;
		if(phone!=""&&upwd!=""){
			ajax(
				"get",
				"data/router/user/login.php",
				function success(result){
					if(result=="1"){
						if(location.search){
							var back = decodeURIComponent(location.search.split("=")[1]);
							location.href=back;
						}else{
							location.href="index.html";
						}
					}else
						loginState.style.display = "inline-block";
				},
				"phone="+phone+"&upwd="+upwd
			);
		}
	}
	$("login-btn").onclick = login;
	$("phone").onfocus = function(){
		loginState.style.display = "none";
	}
	$("upwd").onfocus = function(){
		loginState.style.display = "none";
	}
}