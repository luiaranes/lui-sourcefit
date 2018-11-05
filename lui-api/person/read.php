<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
include_once '../config/database.php';
include_once '../objects/person.php';
 
$database = new Database();
$db = $database->getConnection();
 
$person = new Person($db);
 
$stmt = $person->read();
$num = $stmt->rowCount();
 
if($num>0){
 
    $person_arr=array();
    $person_arr["records"]=array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);
 
        $person_item=array(
            "id" => $id,
            "first_name" => $first_name,
            "last_name" => $last_name,
            "contact_number" => $contact_number,
            "modified" => $modified
        );
 
        array_push($person_arr["records"], $person_item);
    }
 
    http_response_code(200);
 
    echo json_encode($person_arr);
}
 
else{
 
    http_response_code(404);
 
    echo json_encode(
        array("message" => "No records found.")
    );
}
?>