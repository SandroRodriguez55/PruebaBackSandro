<?php
class ingresarBienes{
 
    // database connection and table name
	private $conn;
	
    // constructor with $db as database connection
    public function __construct($db, $direccion, $ciudad, $telefono, $codigo_postal, $tipo, $precio){
		date_default_timezone_set('America/Panama');
		$this->conn = $db;
        $this->direccion = $direccion;
        $this->ciudad = $ciudad;
		$this->telefono = $telefono;
		$this->codigo_postal = $codigo_postal;
		$this->tipo = $tipo;
		$this->precio = $precio;
	}

	function ingresar(){

		if($query = mysqli_query($this->conn, "INSERT INTO mis_bienes 
												(direccion, ciudad, telefono, codigo_postal, tipo, precio) 
												VALUES ('".$this->direccion."','".$this->ciudad."','".$this->telefono."','".$this->codigo_postal."','".$this->tipo."','".$this->precio."')")
			){
			return "Ok";
		}
		return "Error de algún tipo al intentar ingresar la hora de inicio del servicio";
    }

}