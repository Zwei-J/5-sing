<?php
	header("Content-Type:application/json;charset=utf-8");
	require("../../controller/user_controller.php");
	echo json_encode(isLogin());
?>