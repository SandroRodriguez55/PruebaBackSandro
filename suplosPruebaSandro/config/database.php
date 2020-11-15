<?php
class Database{
 
    // Credenciales para acceso a la base de datos
    private $host = "localhost";
    private $db_name = "Intelcost_bienes";
    private $username = "root";
    private $password = "";
    public $conn;
 
    // get the database connection
    public function getConnection(){
 
        $this->conn = null;
        $this->conn = mysqli_connect($this->host, $this->username, $this->password, $this->db_name);

        if (!$this->conn) {
            die('Error en BBDD ' . mysqli_error());
        }
 
        return $this->conn;
    }
}
?>