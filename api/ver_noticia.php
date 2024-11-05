<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Content-Type: application/json');
extract($_REQUEST);
$mysqli = new mysqli('localhost', 'root', '', 'diariodb');
$myArray = array();
if ($result = $mysqli->query("SELECT * FROM noticias where id_noticia=$id_noticia")) {
    $tempArray = array();
    while ($row = $result->fetch_object()) {
        $tempArray = $row;
        array_push($myArray, $tempArray);
    }
    echo json_encode($myArray);
}

$result->close();
$mysqli->close();

//http://localhost/api/ver_noticia.php?id_noticia=19

?>