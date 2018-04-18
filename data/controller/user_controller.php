<?php
	require("../../init.php");
	/*用户注册*/
	function reg(){
		global $conn;
		@$phone = $_REQUEST["phone"];
		@$uname = $_REQUEST["uname"];
		@$upwd = $_REQUEST["upwd"];
		if($phone&&$uname&&$upwd){
			$sql = "insert into wx_user(phone,uname,upwd,avatar) value 
			('$phone','$uname','$upwd',DEFAULT)";
//			echo $sql;
			$result = mysqli_query($conn,$sql);
//			var_dump $result;	
			if(!$result)
				return 0;
			else
				return 1;
		}
	}

	function checkPhone(){
		global $conn;
		@$phone = $_REQUEST["phone"];
		if($phone){
			$sql = "select * from wx_user where phone = '$phone'";
			$result = mysqli_query($conn,$sql);
			if(mysqli_fetch_row($result)!=null)
				return 0;
			else
				return 1;
		}
	}
//	checkPhone();

	function checkName(){
		global $conn;
		@$uname = $_REQUEST["uname"];
		if($uname){
			$sql = "select * from wx_user where uname = '$uname'";
			$result = mysqli_query($conn,$sql);
			if(mysqli_fetch_row($result)!=null)
				return 0;
			else
				return 1;
		}
	}

	function login(){
		global $conn;
		@$phone = $_REQUEST["phone"];
		@$upwd = $_REQUEST["upwd"];
		if($phone&&$upwd){
			$sql = "select uid from wx_user where phone = '$phone' and 
			binary upwd = '$upwd'";
			$result = mysqli_query($conn,$sql);
			$user = mysqli_fetch_assoc($result);
			if($user){
				session_start();
				$_SESSION["wx_uid"] = $user["uid"];
				return true;
			}else
				return false;
		}
	}

	function isLogin(){
		global $conn;
		session_start();
		@$uid=$_SESSION["wx_uid"];//1;
		if($uid){
			$sql = "select * from wx_user where uid = $uid";
		//	echo $sql;
			$result = mysqli_query($conn,$sql);
			$user = mysqli_fetch_assoc($result);
	//		echo $uname["uname"];
			return ["state"=>1,"uname"=>$user["uname"],"avatar"=>$user["avatar"],"id"=>$user["uid"]];
		}else{
			return ["state"=>0];
		}
	}
//	isLogin();

	function logout(){
		session_start();
		$_SESSION["wx_uid"]=null;
	}

	function loadInfo(){
		global $conn;
		$uid = $_REQUEST["uid"];
		$sql = "SELECT gender,born,location,Qnum,music_identity,language,
				style,introduce FROM wx_user WHERE uid = $uid";
		echo json_encode(mysqli_fetch_assoc(mysqli_query($conn,$sql)));
	}

	function loadHotSinger(){
		global $conn;
		$sql = "SELECT uname,avatar FROM wx_user ORDER BY fans DESC LIMIT 0,11";
		echo json_encode(mysqli_fetch_all(mysqli_query($conn,$sql),1));
	}

	//修改用户信息
	function updataUser(){
		global $conn;
		$uid = $_REQUEST["uid"];
		$uname = $_REQUEST["new_name"];
		$gender = $_REQUEST["new_gender"];
		$born = $_REQUEST["new_born"];
		$local = $_REQUEST["new_local"];
		$Qmum = $_REQUEST["new_Qnum"];
		$iden = $_REQUEST["new_iden"];
		$lang = $_REQUEST["new_lang"];
		$style = $_REQUEST["new_style"];
		$intro = $_REQUEST["new_intro"];
		if(!$uname){
			die('{"code":-1,"msg":"用户名不能为空"}');
		}
		$inputArr = [
			'uname'=>$uname,
			'gender'=>$gender,
			'born'=>$born,
			'location'=>$local,
			'Qnum'=>$Qmum,
			'music_identity'=>$iden,
			'language'=>$lang,
			'style'=>$style,
			'introduce'=>$intro
		];
//		echo count($inputArr);
		$str = "";
		foreach ($inputArr as $key => $value) {
			if($value==null){
				if($key!='introduce'){
					$str.= "$key=NULL,";
				}else{
					$str.= "$key=NULL";
				}
			}else{
				if($key!='introduce'){
					$str.= "$key='$value',";
				}else{
					$str.= "$key='$value'";
				}
			}
		}
		$sql = "UPDATE wx_user SET ";
		$sql.= $str;
		$sql.= " WHERE uid = $uid";
	//	echo $sql;
		if(mysqli_query($conn,$sql)==false){
			echo '{"code":-2,"msg":"网络错误"}';
		}else{
			echo '{"code":1,"msg":"更新成功"}';
		}
	}

	//更新密码
	function updateUpwd(){
		global $conn;
		@$uid = $_REQUEST["uid"];
		@$oldPwd = $_REQUEST["oldPwd"];
		@$newPwd = $_REQUEST["newPwd"];
		if($uid&&$oldPwd&&$newPwd){
			$sql = "SELECT binary upwd FROM wx_user WHERE uid=$uid";
			if($oldPwd == mysqli_fetch_row(mysqli_query($conn,$sql))[0]){
				$sql = "UPDATE wx_user SET upwd = '$newPwd' WHERE uid = $uid";
				if(mysqli_query($conn,$sql)){
					echo '{"code":1,"msg":"修改成功"}';
				}else{
					echo '{"code":-2,"msg":"网络错误"}';
				}
			}else{
				echo '{"code":-1,"msg":"密码错误"}';
			}
		}
	}

	//头像上传
	function avtUpLoad(){
		global $conn;
		//获取上传文件名称
		$picName = $_FILES["upFile"]["name"];
		//获取上传文件大小	上取整
		$picSize = ceil($_FILES["upFile"]["size"]/1024);
		//判断文件大小
		if($picSize>1024){
        	die('{"code":-1,"msg":"文件过大"}');
   	 	}
   	 	$picType = strstr($picName,".");
   	 	//判断文件类型
   	 	if($picType!=".jpg"&&$picType!=".png"){
   	 		echo '{"code":-2,"msg":"图片格式不正确"}';
   	 		return;
   	 	}
   	 	//创建新文件名
   	 	$newPicName = time().rand(1,9999).$picType;
   	 	//获取上传临时文件名
   	 	$tmp = $_FILES["upFile"]["tmp_name"];
   	 	//创建文件新路径
   	 	$src = "img/userAvt/upload/".$newPicName;
   	 	//目标文件
   	 	$des = "../../../img/userAvt/upload/".$newPicName;
   	 	//将临时文件移动到目标文件上
   	 	move_uploaded_file($tmp,$des);
   	 	echo '{"code":1,"msg":"上传成功","src":"'.$src.'"}';
	}

	//更新头像
	function updateAvt(){
		global $conn;
		$uid = $_REQUEST["uid"];
		$src = $_REQUEST["new_src"];
		$sql = "UPDATE wx_user SET avatar = '$src' WHERE uid = $uid";
		if(mysqli_query($conn,$sql)==false){
			echo '{"code":-1,"msg":"网络错误"}';
		}else{
			echo '{"code":1,"msg":"更新成功"}';
		}
	}

	//音乐空间获取信息
	function getMsg(){
		global $conn;
		$uid = $_REQUEST["uid"];
		$sql = "SELECT gender,attention,fans,hot FROM wx_user WHERE uid=$uid";
		$row = mysqli_fetch_assoc(mysqli_query($conn,$sql));
		echo json_encode($row);
	}

	//加载音乐空间其他用户信息
	function loadUserMsg(){
		global $conn;
		$uid = $_REQUEST["uid"];
		$sql = "SELECT avatar,uname,gender,attention,fans,hot FROM wx_user WHERE uid=$uid";
		$row = mysqli_fetch_assoc(mysqli_query($conn,$sql));
		echo json_encode($row);
	}

	//加载主页热门音乐人第一位
	function getTopOne(){
		global $conn;
		$sql = "SELECT uid,uname,avatar,introduce FROM wx_user ORDER BY hot DESC LIMIT 0,1";
		$row = mysqli_fetch_assoc(mysqli_query($conn,$sql));
		echo json_encode($row);
	}

	//加载主页其他热门音乐人
	function getHotSinger(){
		global $conn;
		// for($i=1;$i<=11;$i++){
		// 	$sql = "SELECT uid,uname,avatar,music_identity,introduce FROM wx_user ORDER BY hot DESC LIMIT $i,($i+1)";
		// 	$row = mysqli_fetch_assoc(mysqli_query($conn,$sql));
		// 	$output[count($output)] = $row;
		// }
		$sql = "SELECT uid,uname,avatar,music_identity,introduce FROM wx_user ORDER BY hot DESC LIMIT 1,10";
		$result = mysqli_fetch_all(mysqli_query($conn,$sql),1);
		echo json_encode($result);
	}

	
?>