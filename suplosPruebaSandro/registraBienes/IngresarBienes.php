<?php
include_once '../config/database.php';
include ( '../class/ingresarBienes.php' );

$requestMethod = $_SERVER["REQUEST_METHOD"];

switch($requestMethod) {
    case 'POST':
        $direccion = $_POST['direccion'];
        $ciudad = $_POST['ciudad'];;
        $telefono = $_POST['telefono'];;
        $codigo_postal = $_POST['codigo_postal'];;
        $tipo = $_POST['tipo'];;
        $precio = $_POST['precio'];;
        if($direccion != "" && $ciudad != "" && $telefono != "" && $codigo_postal != "" && $tipo != "" && $precio != ""){
            $database = new Database();
            $db = $database->getConnection();
            $rest = new ingresarBienes($db, $direccion, $ciudad, $telefono, $codigo_postal, $tipo, $precio);
            $stmt = $rest->ingresar();
            $response = array(
                'respuesta' => $stmt
            );
            echo "ok";
        }
        else{
            echo "Faltan parámetros";
        }
		break;
	default:
	header("HTTP/1.0 405 Method Not Allowed");
	break;
}
?>