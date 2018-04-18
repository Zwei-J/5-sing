<?php
	require("../../init.php");

	function isVisited(){
		global $conn;
		$sid = $_REQUEST["sid"];
		$vname = $_REQUEST["vname"];
		$sql = "SELECT vid FROM detail_visitor WHERE sid=$sid and vname='$vname'";

		$row = mysqli_fetch_row(mysqli_query($conn,$sql));
		if($row!=null){
			echo json_encode($row);
		}else{
			echo '{"code":-1,"msg":"找不到"}';
		}
	}

	function detail_visitor(){
		global $conn;
		$sid = $_REQUEST["sid"];
		$vname = $_REQUEST["vname"];
		if($sid&&$vname){
			$sql = "INSERT INTO detail_visitor VALUES(null,$sid,'$vname',now())";	
			$result = mysqli_query($conn,$sql);
		}
	}

	function update_visitor(){
		global $conn;
		$vid = $_REQUEST["vid"];
		$sql = "UPDATE detail_visitor SET time=now() WHERE vid=$vid";
		echo $sql;
		mysqli_query($conn,$sql);
	}

	function loadVisitor(){
		global $conn;
		$sid = $_REQUEST["sid"];
		$sql = "SELECT vname,time,(SELECT avatar FROM wx_user WHERE uname=vname)AS avatar,(SELECT uid FROM wx_user WHERE uname=vname)AS uid FROM detail_visitor WHERE sid=$sid ORDER BY time DESC LIMIT 0,8";
		echo json_encode(mysqli_fetch_all(mysqli_query($conn,$sql),1));
	}
?>