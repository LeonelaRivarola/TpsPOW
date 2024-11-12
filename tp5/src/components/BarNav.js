import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


function BarNav() {
  const navegar = useNavigate();
  const [setBuscar, setSelectedBuscar] = useState("");

  const cambisImput = (event) => {
    setSelectedBuscar(event.target.value);
  }

  const manejoSubmit = async (event) => {
    event.preventDefault();
    const data = await buscaNoticia(setBuscar);
    navegar('/Noticias', {
      state: { data }
    })
  }

  return (
    <div>
      <nav className="navbar nav">
      <div className="container-sm">
        <div className="navegacion row"> 
          <div className="itemNav col-auto bg-light bg-gradient rounded-pill p-2"><Link className="link-dark link-underline-opacity-0" to="/">Home</Link></div>
          <div className="itemNav col-auto bg-light bg-gradient rounded-pill p-2"><Link className="link-dark link-underline-opacity-0" to="/Cargar">Cargar</Link></div>
        </div>
        <div className="busqueda">
        <form className="d-flex" role="search" onSubmit={manejoSubmit}>
          <input className="form-control me-2" type="search" placeholder="titulo" aria-label="Search" onChange={cambisImput} />
          <button className="btn btn-light" type="submit">Buscar</button>
        </form>
        </div>
      </div>
    </nav>
    </div>
  );
  /**
   * Si se clickea home va a el listado de las noticias
   * si se clicka carga va a la pagian de carga 
   * Si se ooprime el boton buscar se activa el onSubmit y se va a la ocnstante definida en esta funcion, que va a derivar a la pestaña de noticias.js
   */
}

async function buscaNoticia(titulo) {
  let data;
  try {
    const response = await fetch(`http://localhost/api/ver_noticia2.php?titulo=${encodeURIComponent(titulo)}`);// hago la llamada ala base de dato
    data = await response.json();//trnaformo la respuesta en json
  } catch (error) {
    console.error('Error fetching Noticia:', error);
  }

  return data.noticia;


}

export default BarNav;