<?php 
	// 读取 json 
	$jsonStr= file_get_contents("./product.json");
	// json_decode 可以将 json格式字符串 转化为 php对象 php中的数组
	// $totalArr= json_decode($jsonStr);
	// 包装为 关系型数组
	// $returnArr=array(
		// "items" =>$totalArr
	// );
	// 对变量进行JSON编码,返回JSON数据
	// echo json_encode($returnArr);
	echo $jsonStr;
?>