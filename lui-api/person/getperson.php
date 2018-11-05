<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
include_once '../config/database.php';
include_once '../objects/person.php';
 
$database = new Database();
$db = $database->getConnection();
 
$person = new Person($db);
 
$person->id = isset($_GET['id']) ? $_GET['id'] : die();
 
$person->getPerson();
 
if($person->first_name!=null){
    $person_arr = array(
        "id" =>  $person->id,
        "first_name" => $person->first_name,
        "last_name" => $person->last_name,
        "contact_number" => $person->contact_number,
        "modified" => $person->modified
 
    );
 
    http_response_code(200);
 
    echo json_encode($person_arr);
}
 
else{
    http_response_code(404);
 
    echo json_encode(array("message" => "Person does not exist."));
}
?>