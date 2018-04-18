<?php
	require("../../init.php");

	//评论功能
	function comment(){
		global $conn;
		$sid = $_REQUEST["sid"];
		$comment = $_REQUEST["comment"];
		$cuser = $_REQUEST["cuser"];
		$sql = "INSERT INTO user_comment VALUES(
			null,
			'$sid',
			'$comment',
			'$cuser',
			now())";
		$result = mysqli_query($conn,$sql);
		if(!$result){
			return 0;
		}else{
			return 1;
		}
	}
//	comment();

	//读取 origin_detail.html 评论区内容 分页查询
	function loadComment(){
		global $conn;
		@$sid = $_REQUEST["sid"];
		@$pno = $_REQUEST["pageNo"];		//页码
		if(!$pno){
			$pno = 1;
		}
		$offset = ($pno-1)*10;		//起点
		$sql = "SELECT COUNT(*) FROM user_comment WHERE sid = $sid";
		$recodeCount = intval(mysqli_fetch_row(mysqli_query($conn,$sql))[0]);	//转整数 总记录数
		$pageCount = ceil($recodeCount/10);		//总页数

		$sql = "SELECT comment,cuser,time,(SELECT avatar FROM wx_user WHERE uname = cuser) AS cheader,(SELECT uid FROM wx_user WHERE uname=cuser)AS uid";
		$sql.= " FROM user_comment WHERE sid = $sid";
		$sql.= " ORDER BY ucid DESC LIMIT $offset,10";
		$data = mysqli_fetch_all(mysqli_query($conn,$sql),1);		//主要数据
		$output = [
			"recodeCount"=>$recodeCount,
			"pageCount"=>$pageCount,
			"pageSize"=>10,
			"pno"=>$pno,
			"data"=>$data
		];
		echo json_encode($output);
	}
?>