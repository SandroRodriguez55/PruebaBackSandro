<?php
include_once '../config/database.php';
include ( '../class/consultar.php' );

$database = new Database();
$db = $database->getConnection();
$cons = new Consultar($db);
$stmt = $cons->misBienes();
$data_arr = array();
while( $record = mysqli_fetch_assoc($stmt)) {
    $data_arr[] = $record;
}
$json_response = json_encode($data_arr);
echo $json_response;

?>