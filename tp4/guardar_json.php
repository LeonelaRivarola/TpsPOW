<?php
// Obtener el contenido JSON enviado por la solicitud AJAX
$data = file_get_contents("php://input"); // lee el contenido de la solicitud que viene 
// $ indica que lo que sigue es una variable 
// Verificar si se recibieron datos
if ($data) {
    // Ruta al archivo JSON
    $archivo_json = 'puntajes.json';

    // Sobrescribir el archivo JSON con los nuevos datos
    file_put_contents($archivo_json, $data);

    // Enviar una respuesta al cliente
    echo json_encode(['mensaje' => 'Puntaje actualizado correctamente']);
} else {
    // Enviar una respuesta de error si no se recibieron datos
    echo json_encode(['mensaje' => 'No se recibieron datos']);
}
?>