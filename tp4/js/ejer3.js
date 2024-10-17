var ID = 0;
var titulo = "";
var userid = "";
var cuerpo = "";

var aux = [];

//VARIABLES PAGIANDO
const postsPerPage = 20; // Número de posts por página
let currentPage = 1; // Página actual


//------------------------------------------------------


$(document).ready(function () {
  // Cargar los posts al cargar la página
 
  fetchPosts();//me acctualiza siempre al cambiar de pagina es asi, no puedo agregarle nuevos elementos a este json virtual


  $("#cargar").click(function () {
    titulo = $("#titulo").val();
    userid = $("#userid").val();
    cuerpo = $("#cuerpo").val();

    cargar();
  });

  $("#buscar").click(function () {
    titulo = $("#find").val();
    buscarTitulo();
  });


  $("#id").click(function () {
    id();
  });

  $("#titulos").click(function () {
    ordenarTitulo();
  });

  $("#Confirmar").click(function () {
    titulo = $("#tituloAct").val();
    userid = $("#useridAct").val();
    cuerpo = $("#cuerpoAct").val();
    confirAct();
  })

  $("#pag1").click(function () {
    changePage(1);
  });

  $("#pag2").click(function () {
    changePage(2);
  });

  $("#pag3").click(function () {
    changePage(3);
  });

  $("#pag4").click(function () {
    changePage(4);
  });

  $("#pag5").click(function () {
    changePage(5);
  });





});

//================================================================================================================
//================================================================================================================


function cargar() {
  $.ajax({
    url: 'https://jsonplaceholder.typicode.com/posts',
    type: 'POST',
    data: JSON.stringify({
      title: titulo,
      body: cuerpo,
      userId: userid
    }),
    contentType: 'application/json; charset=UTF-8',
    success: function (response) {
      var dato={
        id:aux.length,
        title:titulo,
        body:cuerpo,
        userId:userid
      }
      aux.push(dato);
      console.log(aux);
      $("#cargo").html("<p style='color:green';>Listo</p>");
    },
    error: function (error) {
      console.error('Error:', error);
    }
  });
}
//================================================================================================================
//================================================================================================================
//ORDENAMIENTO POR TITULO

function ordenarTitulo() {
  const start = (currentPage - 1) * postsPerPage;
  const end = start + postsPerPage;
  const paginatedPosts = aux.slice(start, end); // Extraer los posts para la página actual

  $("#lista").empty();
  aux.sort(function (a, b) {
    return a.title.localeCompare(b.title); // Ordena por la propiedad 'title'
  });

  //pagiando por titulo

  paginatedPosts.forEach(x => {
    $("#lista").append(`<div class='list' onclick='acceder("${x.title}")'><p ><b>ID</b>:${x.id}<br><b>User id</b>: ${x.userId} <br><b>Titulo</b>: ${x.title}: <br> ${x.body}</p></div>`);// Agregar cada título a la lista
  });

  $("#bloqueAct").css("display", "none");
  $("#paginado").css("display", "block");

}
//================================================================================================================
//================================================================================================================

//ORDENAMIENTO POR ID
function id() {
  const start = (currentPage - 1) * postsPerPage;
  const end = start + postsPerPage;
  const paginatedPosts = aux.slice(start, end); // Extraer los posts para la página actual

  $("#lista").empty();

  aux.sort(function (a, b) {
    return a.id - b.id; // Ordena por la propiedad 'id'
  });
  //paginado id
  paginatedPosts.forEach(x => {
    $("#lista").append(`<div class='list' onclick='acceder("${x.title}")'><p ><b>ID</b>:${x.id} <br><b>User id</b>: ${x.userId}<br> <b>Titulo</b>: ${x.title}: <br> ${x.body}</p></div>`);// Agregar cada título a la lista
  });

  $("#bloqueAct").css("display", "none");
  $("#paginado").css("display", "block");
}
//================================================================================================================
//================================================================================================================

//BUSCAR POT TITULO
function buscarTitulo() {
  $("#lista").empty();
  var aux2;

  aux.forEach(post => {
    if (titulo === post.title) {
      aux2 = post;
    }
  });

  console.log(aux2)
  // Mensaje si no se encuentran resultados
  if (aux2 == null) {
    $("#lista").append("<p>No se encontraron resultados.</p>");
  } else {
    $("#lista").append(`<div class='list')><p ><b>ID</b>: ${aux2.id}<br><b>User id</b>: ${aux2.userId} <br><b>Titulo</b>: ${aux2.title} <br>${aux2.body}</p></div>`);

    $("#lista").append("<button id='btnActualizar' type='button' class='btn btn-success'>Actualizar</button>");
    $("#lista").append("<button id='btnborrar' type='button' class='btn btn-danger'>Eliminar</button>");
    // Asignar los datos del primer post encontrado a las variables globales

    userid = aux2.userId;  // Almacena el UserID
    cuerpo = aux2.body;     // Almacena el cuerpo
    ID = aux2.id;           // Almacena el ID
  }

  // Manejo del clic del botón de actualización
  $(document).off('click', '#btnActualizar'); // Evitar múltiples manejadores
  $(document).on('click', '#btnActualizar', function () {
    actualizar(); // Llama a la función actualizar sin pasar parámetros
  });

  $(document).off('click', '#btnborrar'); // Evitar múltiples manejadores
  $(document).on('click', '#btnborrar', function () {
    borrar(); // Llama a la función actualizar sin pasar parámetros
  });

  $("#paginado").css("display", "none");
  
}



//================================================================================================================
//================================================================================================================

//PAGINADO

function fetchPosts() {
  $.ajax({
    url: 'https://jsonplaceholder.typicode.com/posts',
    type: 'GET',
    success: function (response) {
      aux = response;
      renderPosts();
      renderPagination();
    },
    error: function (error) {
      console.error('Error:', error);
    }
  });
}

function renderPosts() {
  const start = (currentPage - 1) * postsPerPage;
  const end = start + postsPerPage;
  const paginatedPosts = aux.slice(start, end); // Extraer los posts para la página actual

  $("#lista").html(""); // Limpiar la lista anterior
  id();
}

function renderPagination() {
  const totalPages = Math.ceil(aux.length / postsPerPage); // Calcular el número total de páginas

  $("#pagination").html(""); // Limpiar la paginación anterior

  for (let i = 1; i <= totalPages; i++) {
    const isActive = i === currentPage ? 'active' : '';
    $("#pagination").append(`
            <li class="page-item ${isActive}">
                <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
            </li>
        `);
  }
}

function changePage(page) {
  currentPage = page; // Cambiar a la nueva página
  renderPosts(); // Renderizar los posts de la nueva página
  renderPagination(); // Renderizar la paginación
}


//================================================================================================================
//================================================================================================================

//ACTUALIZAR

function actualizar() {

  console.log("entro")
  $("#paginado").css("display", "none");
  $("#bloqueAct").css("display", "block");
  $("#tituloAct").val(titulo);
  $("#useridAct").val(userid);
  $("#cuerpoAct").val(cuerpo);
}

function confirAct() {

  $.ajax({
    url: `https://jsonplaceholder.typicode.com/posts/${ID}`,
    type: 'PUT',
    contentType: 'application/json; charset=UTF-8',
    data: JSON.stringify({//con esto voy a modificar en teoria la base...
      id: ID,
      title: titulo,
      body: cuerpo,
      userId: userid
    }),

    success: function (response) {//aca modifico el aux
      for (let i = 0; i < aux.length; i++) {
        if (aux[i].id == ID) {
          aux[i].body = cuerpo; // Actualiza el cuerpo
          aux[i].title = titulo; // Actualiza el título
          aux[i].userId = userid; // Actualiza el userId

          $("#lista").html(""); // Limpiar la lista anterior
          $("#lista").append(`<div class='list'><p ><b>ID</b>:${aux[i].id}<br><b>User id</b>: ${aux[i].userId} <br><b>Titulo</b>: ${aux[i].title}: <br> ${aux[i].body}</p></div>`);


          // O si prefieres hacerlo después de la iteración
          break; // Para salir del bucle una vez actualizado
        }
      }

    },
    error: function (xhr, status, error) {
      console.error('Error:', error);
    }
  });
}


//================================================================================================================
//================================================================================================================

//Borrar

function borrar() {
  $.ajax({
    url: `https://jsonplaceholder.typicode.com/posts/${ID}`,
    type: 'DELETE',
    contentType: 'application/json; charset=UTF-8',
    success: function (response) {//aca modifico el aux
      aux = aux.filter(post => post.id !== ID);
      $("#lista").html(""); // Limpiar la lista anterior
      id();
      
    },
    error: function (xhr, status, error) {
      console.error('Error:', error);
    }
  }); 
}


//================================================================================================================
//================================================================================================================

//Borrar
function filtro(x){
  
  var aux2=[];

  $("#lista").empty();

  //pagindo id
  aux.forEach(post => {
    if(post.userId == x){
      aux2.push(post);
    }
  });
  console.log(aux2);
  aux2.forEach(post=>{
    $("#lista").append(
      `<div onclick='acceder("${post.title}")'>
        <p class='list'>
          <b>ID</b>:${post.id}<br>
          <b>User id</b>: ${post.userId} <br>
          <b>Titulo</b>: ${post.title}: 
          <br> ${post.body}</p>
      </div>`
    );// Agregar cada título a la lista 
  })

  $("#bloqueAct").css("display", "none");
  $("#paginado").css("display", "none");
}


//===================0

function acceder(tituloX){
  titulo=tituloX;
  buscarTitulo();
}