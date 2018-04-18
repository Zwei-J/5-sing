/*document.addEventListener("DOMContentLoaded", function(event){
	console.log('Hello World!');
});*/

function $(id){
	return document.getElementById(id);
}

/*ajax  请求类型,地址,回调函数,接收值,返回类型 */
function ajax(type,url,success,kw,dataType){
	dataType= dataType==undefined?"text":"json";
	var xhr;
	if(window.XMLHttpRequest){
		xhr = new XMLHttpRequest();
	}else{
		xhr = new ActiveXObject("Microsoft.XMLHttp");
	}
	if(type=="get"&&kw){
		url=url+"?"+kw;
	}
	xhr.open(type,url,true);
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4&&xhr.status==200){
			if(dataType=="json")
				success(JSON.parse(xhr.responseText));
			else
				success(xhr.responseText);
		}
	}
	if(type=="post"){
		xhr.setRequestHeader("Content-Type",
			"application/x-www-form-urlencoded");	
		xhr.send(kw);
	}else
		xhr.send(null);
}