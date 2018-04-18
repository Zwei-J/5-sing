<?php
//	header("Content-Type:application/text");
	require("../../controller/user_controller.php");
	if(checkPhone()=="1")
		echo "1";
	else if(checkPhone()=="0")
		echo "0";
	else
		echo "error";
?>