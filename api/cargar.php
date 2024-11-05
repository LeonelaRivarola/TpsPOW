<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

$id_noticia = isset($data['id_noticia']) ? $data['id_noticia'] : null;
$id_usuario = isset($data['id_usuario']) ? $data['id_usuario'] : null;
$titulo = isset($data['titulo']) ? $data['titulo'] : null;
$copete = isset($data['copete']) ? $data['copete'] : null;
$cuerpo = isset($data['cuerpo']) ? $data['cuerpo'] : null;
$imagen = isset($data['imagen']) ? $data['imagen'] : null;
$fecha = isset($data['fecha']) ? $data['fecha'] : null;
$categoria = isset($data['categoria']) ? $data['categoria'] : null;

// Asegúrate de conectar correctamente a la base de datos
$mysqli = new mysqli('localhost', 'root', '', 'diariodb');

if ($mysqli->connect_error) {
    echo json_encode(["status" => "error", "message" => "Error en la conexión a la base de datos"]);
    exit;
}

// Prepara la instrucción para evitar problemas de inyección SQL
$stmt = $mysqli->prepare("INSERT INTO noticias (id_noticia, id_usuario, titulo, copete, cuerpo, imagen, fecha, categoria) 
                          VALUES (?, ?, ?, ?, ?, ?, ?, ?)");

if ($stmt) {
    // Asocia los parámetros con el tipo de datos adecuado (i = integer, s = string)
    $stmt->bind_param("iissssss", $id_noticia, $id_usuario, $titulo, $copete, $cuerpo, $imagen, $fecha, $categoria);

    // Ejecuta la consulta
    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Registro guardado correctamente"]);
        exit;
    } else {
        echo json_encode(["status" => "error", "message" => "Error al ejecutar la consulta"]);
        exit;
    }

    $stmt->close();
} else {
    echo json_encode(["status" => "error", "message" => "Error en la preparación de la consulta"]);
    exit;
}

$mysqli->close();
?>
