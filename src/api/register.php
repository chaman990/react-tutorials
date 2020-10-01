	<?php

	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
	header('Access-Control-Allow-Headers: token, Content-Type');
	header('Access-Control-Max-Age: 1728000');
	header('Content-Length: 0');
	header('Content-Type: text/json');
	require_once('db.php');


	$rest_json = file_get_contents("php://input");
	$data = json_decode($rest_json, true);

	if(!empty($data)){
		extract($data);
	}
	
	$response = [];

	if(!empty($email) && !empty($password) && !empty($name)){
		$sql = "INSERT INTO `users` (`name`, `email`, `password`) VALUES ('".$name."', '".$email."', '".$password."');";
		
		if (mysqli_query($conn, $sql)) {
			  $response = json_encode(array('success'=>true, 'message' => 'Successfully Registered'));
			} else {
				$response = json_encode(array('success'=>false, 'message' => mysqli_error($conn)));
			}

	}else{
		$response = json_encode(array('success'=>false, 'message' => 'Email or pass or name is blank'));
	}

	print_r($response);