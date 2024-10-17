let numerosecreto; // Variable global para el número secreto
var intentos = 0;  // Variable global para contar los intentos
var partidas_finalizadas = 0;
var intentosTotales = 0;
// acomodar lo del puntaje

let texto = document.getElementById('texto');// accedo a este contenedor 


$(document).ready(function () {
    load();
    generarNumeroSecreto();
});

//=========================================================================================
//  (>.<) (0_0) (.)(.)
//             (  <3  )

function load() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'puntajes.json', true); //  vamos a 'puntajes.json', para cargar los datos

    xhr.onreadystatechange = function () {

        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log("entra")
            let datos = JSON.parse(xhr.responseText);

            intentosTotales = datos.intentosT;
            partidas_finalizadas = datos.partidasFinalizadas;
            document.getElementById("mejorP").innerHTML = "Mejor puntaje: " + datos.mejorPuntaje;
            document.getElementById("intentosDisplay").innerHTML = "Intentos Actuales: " + intentos;
            document.getElementById("partidas_finalizada").innerHTML = "Partidas ganadas: " + partidas_finalizadas;
            document.getElementById("totalIntentos").innerHTML = "Total de intentos: " + intentosTotales;
            if (partidas_finalizadas === 0)
                document.getElementById("resultadoFinal").innerHTML = "Promedio: " + intentosTotales;
            else {
                document.getElementById("resultadoFinal").innerHTML = "Promedio: " + parseFloat(intentosTotales / partidas_finalizadas);
            }

        }
    };

    xhr.send();

};


//=========================================================================================

function generarNumeroSecreto() {
    let min = 1;
    let max = 1000;
    numerosecreto = Math.floor(Math.random() * (max - min + 1)) + min; // Genera el número secreto
    console.log("Número secreto generado:", numerosecreto);
}

function comparar_numeros() {

    let number = document.getElementById('entrada').value;
    let numeroUsuario = Number(number);


    intentos++;
    intentosTotales++;

    document.getElementById('intentosDisplay').innerText = "Número de intentos: " + intentos;
    document.getElementById("totalIntentos").innerHTML = "Total de intentos: " + intentosTotales;
    if (partidas_finalizadas === 0)
        document.getElementById("resultadoFinal").innerHTML = "Promedio: " + intentosTotales;
    else {
        document.getElementById("resultadoFinal").innerHTML = "Promedio: " + parseFloat(intentosTotales / partidas_finalizadas);
    }



    if (numeroUsuario < numerosecreto) {
        document.getElementById('masomenos').innerHTML = '<p class=alto>El número es más alto</p>';
    } else if (numeroUsuario > numerosecreto) {
        document.getElementById('masomenos').innerHTML = '<p class=bajo>El número es más bajo</p>';
    } else if (numeroUsuario === numerosecreto) {
        partidas_finalizadas = partidas_finalizadas + 1;
        //desabilitos estos campos
        document.getElementById('entrada').disabled = true;
        document.getElementById('texto').disabled = true;
        document.getElementById('enviar').disabled = true;

        guardar_mejor_puntaje(intentos);
        // Llamar a la función para mostrar el puntaje final desde el JSON   
        setTimeout(function () {
            window.location.href = 'ganar.html'; // Cambia 'pagina_ganaste.html' por la página que quieras mostrar
        }, 1000); // Espera 2 segundos antes de redirigir
    }
}




function reiniciar_partida() {
    intentos = 0; // Reinicia el contador de intentos
    generarNumeroSecreto(); // Reinicia el número secreto
    load();
    // habilito estos campos
    document.getElementById('texto').innerHTML = " ";
    document.getElementById('entrada').disabled = false;
    document.getElementById('entrada').value = "";
    document.getElementById('texto').disabled = false;
    document.getElementById('enviar').disabled = false;


    //console.log("Juego reiniciado.");
}

function guardar_mejor_puntaje(puntaje) { // pido los datos que tiene el json para comparar
    // Realizar una solicitud AJAX para cargar el JSON con el mejor puntaje
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'puntajes.json', true); // Asegúrate de que 'puntajes.json' esté en tu servidor

    // onreadystatechange se ejecuta cuando tenemos cambios en la solicitud 
    xhr.onreadystatechange = function () { // onreadystatechange la uso para controlar los cambios de la solicitud

        if (xhr.readyState === 4 && xhr.status === 200) {
            // Convertir el texto JSON en un objeto JavaScript
            let puntajes = JSON.parse(xhr.responseText); // contiene la respuesta de la solocitud
            // lo parseo a texto para poder comparar porque la respuesta es en json

            // Comparar si el puntaje actual es mejor que el puntaje más alto
            if (puntaje < puntajes.mejorPuntaje || puntajes.mejorPuntaje === 0) {
                const data = {
                    mejorPuntaje: puntaje,
                    partidasFinalizadas: partidas_finalizadas + 1,
                    intentosT: intentosTotales
                }
                guardarJSONModificado(data);
                // Actualizar el número de partidas finalizadas
            }
            else {
                const data = {
                    mejorPuntaje: puntajes.mejorPuntaje,
                    partidasFinalizadas: partidas_finalizadas,
                    intentosT: intentosTotales
                }
                guardarJSONModificado(data);

            }

        }
    };

    xhr.send(); // Enviar la solicitud para obtener el archivo JSON
}

function guardarJSONModificado(dato) {
    // Realizar una solicitud AJAX para enviar el JSON modificado al servidor
    let xhr = new XMLHttpRequest();

    xhr.open('POST', 'guardar_json.php', true); // Asegúrate de que 'guardar_json.php' maneje la escritura del archivo
    // se los embio al json para que el los pueda modificar porque java no puede escribir directamente 
    // Establecer el encabezado para enviar datos en formato JSON
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) { };
    }
    // Enviar el JSON modificado al servidor
    xhr.send(JSON.stringify(dato)); // envia el json modificado
    //ACA TENIAS EL ERROR S
}


//===================================================
//resetea juego 
function resetear() {
    const data = {
        mejorPuntaje: 0,
        partidasFinalizadas: 0,
        intentosT: 0
    }
    guardarJSONModificado(data);

    load();
}




//js puede leer json pero no escribir poreso para guardar el json aga la conexion con el php y despues que el php lo maneje






































/*
    let objeto_ajax = new XMLHttpRequest(); // Crea un nuevo objeto XMLHttpRequest

    // Configura la solicitud: Método POST y la URL del endpoint en el servidor
    objeto_ajax.open("POST", "http://localhost/tp_4/guardar_puntaje.php", true); // Cambia 'tu_endpoint_de_guardado.php' por la URL real

    // Establece el tipo de contenido que estás enviando
    objeto_ajax.setRequestHeader("Content-Type", "application/json"); // va a ser de tipo json

    // Define la función que se ejecutará cuando la solicitud cambie de estado
    objeto_ajax.onreadystatechange = function() {
        if (objeto_ajax.readyState === 4 && objeto_ajax.status === 200) {
            // La solicitud se completó con éxito
            console.log("Mejor puntaje guardado:", objeto_ajax.responseText);
        } else if (objeto_ajax.readyState === 4) {
            // Manejo de errores
            console.error("Error al guardar el puntaje:", objeto_ajax.status, objeto_ajax.statusText);
        }
    };

    // Envía la solicitud con los datos del puntaje
    const datos = JSON.stringify({ mejor_puntaje: puntaje }); // Convierte el puntaje a formato JSON
    objeto_ajax.send(datos); // Envía la solicitud
}*/