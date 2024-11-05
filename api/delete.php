<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);
$id_noticia = isset($data['id_noticia']) ? $data['id_noticia'] : null;// dato dentro de data

// Asegúrate de conectar correctamente a la base de datos
$mysqli = new mysqli('localhost', 'root', '', 'diariodb');

if ($mysqli->connect_error) {
    echo json_encode(["status" => "error", "message" => "Error en la conexión a la base de datos"]);
    exit;
}

// Prepara la instrucción para evitar problemas de inyección SQL
$stmt = $mysqli->prepare("DELETE FROM noticias WHERE id_noticia=? ");

if ($stmt) {
    // Asocia los parámetros con el tipo de datos adecuado (i = integer, s = string)
    $stmt->bind_param("i", $id_noticia);

    // Ejecuta la consulta
    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "mensaje" => "Registro guardado correctamente"]);
        exit;
    } else {
        echo json_encode(["status" => "error", "mensaje" => "Error al ejecutar la consulta"]);
        exit;
    }

    $stmt->close();
} else {
    echo json_encode(["status" => "error", "mensaje" => "Error en la preparación de la consulta"]);
    exit;
}

$mysqli->close();
?>
