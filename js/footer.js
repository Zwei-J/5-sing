(function(){		//加载页脚
	ajax(
		"get",
		"footer.html",
		function success(html){
		//	console.log(html);
			$("footer").innerHTML = html;
		}
	);
})()