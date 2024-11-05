<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Content-Type: application/json');

//capturo los datos
$data = json_decode(file_get_contents("php://input"), true);

$id_noticia = isset($data['id_noticia']) ? $data['id_noticia'] : null;
$id_usuario = isset($data['id_usuario']) ? $data['id_usuario'] : null;
$titulo = isset($data['titulo']) ? $data['titulo'] : null;
$copete = isset($data['copete']) ? $data['copete'] : null;
$cuerpo = isset($data['cuerpo']) ? $data['cuerpo'] : null;
$imagen = isset($data['imagen']) ? $data['imagen'] : null;
$fecha = isset($data['fecha']) ? $data['fecha'] : null;
$categoria = isset($data['categoria']) ? $data['categoria'] : null;


//Establesco conexion con mi base de dato
$mysqli = new mysqli('localhost', 'root', '', 'diariodb');
if ($mysqli->connect_error) {
    echo json_encode(["status" => "error", "message" => "Error en la conexión a la base de datos"]);
    exit;
}


//Realizo instruccion 
$instrucion=$mysqli->prepare("UPDATE noticias SET  titulo=?, copete=?, cuerpo=?, imagen=?, fecha=?, categoria=? WHERE id_noticia=? and id_usuario=?");

if($instrucion) {
    $instrucion->bind_param("ssssssii", $titulo, $copete, $cuerpo, $imagen, $fecha, $categoria, $id_noticia, $id_usuario);    

    // Ejecuta la consulta
    if ($instrucion->execute()) {
        echo json_encode(["status" => "success", "mensaje" => "Registro Editado correctamente", "noticia"=>$data]);
        exit;
    } else {
        echo json_encode(["status" => "error", "mensaje" => "Error al ejecutar la consulta","noticia"=>$data]);
        exit;
    }

    $instrucion->close();
}
else{
    echo json_encode(["status" => "error", "mensaje" => "Error en la preparacion de la consulta","noticia"=>$data]);
}

$mysqli->close();

?>

