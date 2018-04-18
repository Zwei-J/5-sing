<?php
 	header("Content-Type:application/json;charset=utf-8");
 	require("../../controller/comment_controller.php");
 	if(comment()=="1"){
 		echo '{"data":1,"msg":"评论成功"}';
 	}else{
 		echo '{"data":-1,"msg":"网络错误"}';
 	}
?>