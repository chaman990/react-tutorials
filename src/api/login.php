<?php 

require_once 'db.php';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
header('Access-Control-Allow-Headers: token, Content-Type');
header('Access-Control-Max-Age: 1728000');
header('Content-Length: 0');
header('Content-Type: application/json');

$response = [];
$inputs = file_get_contents("php://input");

if(isset($_POST['email']) && isset($_POST['password'])){
    extract($_POST);
}else{
    
    if(isset(json_decode($inputs)->inputs->email) && isset(json_decode($inputs)->inputs->password) ){
        $email = json_decode($inputs)->inputs->email;
        $password = json_decode($inputs)->inputs->password;
    }else{
        $response = array('success'=>false, 'message'=>'Please Enter email and password');
        print_r(json_encode($response));
        die;    
    }
}

if(empty($password) && empty($email)){
    $response = array('success'=>false, 'message'=>'Empty Inputs');
    print_r(json_encode($response));
    die;
}

$sql = "SELECT * FROM `users` WHERE email = '${email}'";
if($conn->query($sql)->num_rows > 0){
   $user_password = $conn->query($sql)->fetch_assoc()['password'];
    if(md5($password) === $user_password){
        $response = array('success'=>true, 'message'=>'Successfully Login');
    }else{
        $response = array('success'=>false, 'message'=>'Password is wrong');
    }
}else{
    $response = array('success'=>false, 'message'=>'No user with this email found');
}

print_r(json_encode($response));
die;