<?php
	require("../../init.php");
	
	//获取原创推荐
	function getOri(){
		global $conn;
		$sql = "SELECT sname,href,singer,afflatus,style,(SELECT 
		avatar FROM wx_user WHERE uname=singer)AS header,(SELECT uid FROM wx_user WHERE uname=singer)AS uid FROM songlist WHERE type='原创' ORDER BY sid DESC LIMIT 0,10";
		$result = mysqli_fetch_all(mysqli_query($conn,$sql),1);
		echo json_encode($result);
	}
//	getOri();

	//获取翻唱推荐
	function getCover(){
		global $conn;
		$sql = "SELECT sname,href,singer,afflatus,style,(SELECT avatar FROM wx_user WHERE uname=singer)AS header,(SELECT uid FROM wx_user WHERE uname=singer)AS uid FROM songlist WHERE type='翻唱' ORDER BY sid DESC LIMIT 0,10";
		$result = mysqli_fetch_all(mysqli_query($conn,$sql),1);
		echo json_encode($result);
	}
//	getCover();
	
	/*****详情页加载信息******/
	function loadDetail(){
		global $conn;
		@$sid = $_REQUEST["sid"];
		if($sid!=null){
			$sql = "SELECT sname,singer,afflatus,style,type,lang,ctime,src, (SELECT avatar FROM wx_user WHERE uname=singer)AS header,(SELECT fans FROM wx_user WHERE uname=singer)AS fans,(SELECT uid FROM wx_user WHERE uname=singer)AS uid";
			$sql .= " FROM songlist WHERE sid = $sid";
		//	echo $sql;
			$result = mysqli_fetch_assoc(mysqli_query($conn,$sql));
			echo json_encode($result);
		}
	}
//	loadDetail();

	function getIndexBanner(){
		global $conn;
		$sql = "SELECT src,href from index_banner ORDER BY bid DESC LIMIT 0,7";
		$result = mysqli_fetch_all(mysqli_query($conn,$sql),1);
		echo json_encode($result);
	}
//	getIndexBanner();

	function oriRank(){
		global $conn;
		$sql = "SELECT sname,href,singer,(SELECT uid FROM wx_user WHERE uname=singer)AS uid FROM songlist ";
		$sql .= " WHERE type='原创' ORDER BY degree DESC";
		$sql .= " LIMIT 0,10";
	//	echo $sql;
		$result = mysqli_fetch_all(mysqli_query($conn,$sql),1);
		echo json_encode($result);
	}
//	oriRank();

	//加载其他热门音乐人的热门歌曲
	function getHotSong(){
		global $conn;
		$singer0 = $_REQUEST["singer0"];
		$singer1 = $_REQUEST["singer1"];
		$singer2 = $_REQUEST["singer2"];
		$singer3 = $_REQUEST["singer3"];
		$singer4 = $_REQUEST["singer4"];
		$singer5 = $_REQUEST["singer5"];
		$singer6 = $_REQUEST["singer6"];
		$singer7 = $_REQUEST["singer7"];
		$singer8 = $_REQUEST["singer8"];
		$singer9 = $_REQUEST["singer9"];
		$input = [$singer0,$singer1,$singer2,$singer3,$singer4,$singer5,$singer6,$singer7,$singer8,$singer9];
		$output = [];
		for($i=0;$i<count($input);$i++){
			$sql = "SELECT sname,href FROM songlist WHERE singer='$input[$i]'";
			$result = mysqli_fetch_all(mysqli_query($conn,$sql));
			$output[$i]=$result;
		}
		echo json_encode($output);
	}

	//首页推荐资讯
	function getRecordMsg(){
		global $conn;
		$sql = "SELECT title,href FROM rec_msg ORDER BY mid DESC LIMIT 0,5";
		echo json_encode(mysqli_fetch_all(mysqli_query($conn,$sql),1));
	}

	//歌曲搜索
	function search(){
		global $conn;
		@$kw = $_REQUEST["keyword"];
		@$pno = $_REQUEST["pno"];
		$totalCount;
		$pageCount;
		if(!$pno){
			$pno = 1;
		}

		if($kw){
			$sql = "SELECT count(*) FROM songlist WHERE sname LIKE '%$kw%' OR singer LIKE '%$kw%'";
			$totalCount = intval(mysqli_fetch_row(mysqli_query($conn,$sql))[0]);	//总记录数
			$pageCount = ceil($totalCount/10);		//总页数
			$offset = ($pno-1)*10;
			$sql = "SELECT sid,sname,singer,type,lang,degree FROM songlist";
			$sql.= " WHERE sname LIKE '%$kw%' OR singer LIKE '%$kw%'";
			$sql.= " ORDER BY degree DESC LIMIT $offset,10";
		}else{
			$sql = "SELECT count(*) FROM songlist";
			$totalCount = intval(mysqli_fetch_row(mysqli_query($conn,$sql))[0]);	//总记录数
			$pageCount = ceil($totalCount/10);		//总页数
			$offset = ($pno-1)*10;
			$sql = "SELECT sid,sname,singer,type,lang,degree FROM songlist";
			$sql.= " ORDER BY degree DESC LIMIT $offset,10";
		}
		$data = mysqli_fetch_all(mysqli_query($conn,$sql),1);
		//echo json_encode($data);
		$output = [
			"pno"=>$pno,
			"totalCount"=>$totalCount,
			"pageCount"=>$pageCount,
			"content"=>$data
		];
		//echo json_encode(mysqli_fetch_all(mysqli_query($conn,$sql),1));
		echo json_encode($output);
	}
	//search();
?>