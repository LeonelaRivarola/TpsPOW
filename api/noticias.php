<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Content-Type: application/json');
extract($_REQUEST);
$mysqli = new mysqli('localhost', 'root', '', 'diariodb');
$myArray = array();
if ($result = $mysqli->query("SELECT * FROM noticias limit $inicio,$fin")) {
    $tempArray = array();
    while ($row = $result->fetch_object()) {
        $tempArray = $row;
        array_push($myArray, $tempArray);
    }
    echo json_encode($myArray);
}

$result->close();
$mysqli->close();
////http://localhost/api/noticias.php?inicio=0&fin=60
// ESTE URL SE UTILIZO ENEL TP DE REACT
?>

