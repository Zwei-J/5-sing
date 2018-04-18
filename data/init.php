<?php
	header('Access-Control-Allow-Origin:*');
	$conn = mysqli_connect("127.0.0.1","root","","5sing",3306);
	$sql = "set names utf8";
	mysqli_query($conn,$sql);
?>