	<?php

	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
	header('Access-Control-Allow-Headers: token, Content-Type');
	header('Access-Control-Max-Age: 1728000');
	header('Content-Length: 0');
	header('Content-Type: text/json');
	require_once('db.php');


	$rest_json = file_get_contents("php://input");
	$data = '';
	$data = json_decode($rest_json, true);

	if(!empty($data)){
		extract($data);
	}
	
	$response = [];

	if(!empty($email) && !empty($password)){
		$sql = "SELECT * FROM users WHERE email = '".$email."'  AND password = '".$password."' ";
		$result = mysqli_query($conn, $sql);
		if(mysqli_num_rows($result) > 0){
			$response = json_encode(array('success'=>true, 'message' => 'Successfully Login'));
		}
	}else{
		$response = json_encode(array('success'=>false, 'message' => 'Email or pass is blank'));
	}
	print_r($response);
	// print_r(json_encode($_POST));