<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Content-Type: application/json');
$mysqli = new mysqli('localhost', 'root', '', 'diariodb');
if ($mysqli->connect_error) {
    echo json_encode(["mensaje" => "nop"]);
    exit;
}
$titulo = $mysqli->real_escape_string($_GET['titulo'] ?? '');
if (empty($titulo)) {
    echo json_encode(["mensaje" => "vacio".$titulo]);
    exit;
}
$myArray = array();

if ($result = $mysqli->query("SELECT * FROM noticias where titulo='$titulo'")) {
    $tempArray = array();
    while ($row = $result->fetch_object()) {
        $tempArray = $row;
        array_push($myArray, $tempArray);
    }
    // Enviar la respuesta JSON
    if (!empty($myArray)) {
        echo json_encode(["status" => "success", "mensaje" => "Consulta realizada con éxito", "noticia" => $myArray]);
    } else {
        echo json_encode(["status" => "error", "mensaje" => "No se encontraron noticias con ese título"]);
    }
    $result->close();
} else {
    echo json_encode(["mensaje" => "no se realizo la instruccion"]);
}
$mysqli->close();

//http://localhost/api/ver_noticia.php?id_noticia=19
?>