<?php
//	header("Content-Type:application/text");
	require("../../controller/user_controller.php");
	if(checkName()=="1")
		echo "1";
	else if(checkName()=="0")
		echo "0";
	else
		echo "error";
?>