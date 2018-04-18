<?php
//	header("Content-Type:application/text");
	require("../../controller/user_controller.php");
	if(login())
		echo "1";
	else
		echo "0";