<?php
class Consultar{
 
	private $conn;
	
	public function __construct($db){
		date_default_timezone_set('America/Panama');
		$this->conn = $db;
	}
	
	// Consulta Mis bienes guardados en base de datos
	function misBienes(){
		// select all query
		$query = mysqli_query($this->conn, "SELECT * FROM mis_bienes");
		return $query;
	}

}