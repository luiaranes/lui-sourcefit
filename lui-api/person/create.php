<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
include_once '../config/database.php';
 
include_once '../objects/person.php';
 
$database = new Database();
$db = $database->getConnection();
 
$person = new Person($db);
 
$data = json_decode(file_get_contents("php://input"));
 
if(
    !empty($data->first_name) &&
    !empty($data->last_name) &&
    !empty($data->contact_number)
){
 
    $person->first_name = $data->first_name;
    $person->last_name = $data->last_name;
    $person->contact_number = $data->contact_number;
    $person->modified = date('Y-m-d H:i:s');
 
    if($person->create()){
 
        http_response_code(201);
 
        echo json_encode(array("message" => "Account was created."));
    }
 
    else{
 
        http_response_code(503);
 
        echo json_encode(array("message" => "Unable to create account."));
    }
}
 
else{
 
    http_response_code(400);
    
    echo json_encode(array("message" => "Unable to create account. Data is incomplete."));
}
?>