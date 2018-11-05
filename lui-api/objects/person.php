<?php
class Person{
 
    private $conn;
    private $table_name = "person";
 
    public $id;
    public $first_name;
    public $last_name;
    public $contact_number;
    public $modified;
 
    public function __construct($db){
        $this->conn = $db;
    }

    function read(){
    
        $query = "SELECT
                    id, first_name, last_name, contact_number, modified
                FROM
                    " . $this->table_name;
    
        $stmt = $this->conn->prepare($query);
    
        $stmt->execute();
    
        return $stmt;
    }

    function create(){
    
        $query = "INSERT INTO
                    " . $this->table_name . "
                SET
                    first_name=:first_name, last_name=:last_name, contact_number=:contact_number, modified=:modified";
    
        $stmt = $this->conn->prepare($query);
    
        $this->first_name=htmlspecialchars(strip_tags($this->first_name));
        $this->last_name=htmlspecialchars(strip_tags($this->last_name));
        $this->contact_number=htmlspecialchars(strip_tags($this->contact_number));
        $this->modified=htmlspecialchars(strip_tags($this->modified));
    
        $stmt->bindParam(":first_name", $this->first_name);
        $stmt->bindParam(":last_name", $this->last_name);
        $stmt->bindParam(":contact_number", $this->contact_number);
        $stmt->bindParam(":modified", $this->modified);
    
        if($stmt->execute()){
            return true;
        }
    
        return false;
        
    }

    function getPerson(){
    
        $query = "SELECT
                    first_name, last_name, contact_number, modified
                FROM
                    " . $this->table_name . "
                WHERE
                    id = ?
                LIMIT
                    0,1";
    
        $stmt = $this->conn->prepare( $query );
    
        $stmt->bindParam(1, $this->id);
    
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
    
        $this->first_name = $row['first_name'];
        $this->last_name = $row['last_name'];
        $this->contact_number = $row['contact_number'];
        $this->modified = $row['modified'];
    }

    function update(){
    
        $query = "UPDATE
                    " . $this->table_name . "
                SET
                    first_name = :first_name,
                    last_name = :last_name,
                    contact_number = :contact_number,
                    modified = :modified
                WHERE
                    id = :id";
    
        $stmt = $this->conn->prepare($query);
    
        $this->first_name=htmlspecialchars(strip_tags($this->first_name));
        $this->last_name=htmlspecialchars(strip_tags($this->last_name));
        $this->contact_number=htmlspecialchars(strip_tags($this->contact_number));
        $this->modified=htmlspecialchars(strip_tags($this->modified));
        $this->id=htmlspecialchars(strip_tags($this->id));
    
        $stmt->bindParam(':first_name', $this->first_name);
        $stmt->bindParam(':last_name', $this->last_name);
        $stmt->bindParam(':contact_number', $this->contact_number);
        $stmt->bindParam(':modified', $this->modified);
        $stmt->bindParam(':id', $this->id);
    
        if($stmt->execute()){
            return true;
        }
    
        return false;
    }

    function delete(){
    
        $query = "DELETE FROM " . $this->table_name . " WHERE id = ?";
    
        $stmt = $this->conn->prepare($query);
    
        $this->id=htmlspecialchars(strip_tags($this->id));
    
        $stmt->bindParam(1, $this->id);
    
        if($stmt->execute()){
            return true;
        }
    
        return false;
        
    }
}
?>