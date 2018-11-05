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
 
$person->id = $data->id;
 
$person->first_name = $data->first_name;
$person->last_name = $data->last_name;
$person->contact_number = $data->contact_number;
$person->modified = date('Y-m-d H:i:s');
 
if($person->update()){

    http_response_code(200);

    echo json_encode(array("message" => "Person's record was updated."));
}

else{

    http_response_code(503);

    echo json_encode(array("message" => "Unable to update person's record."));
}
?>