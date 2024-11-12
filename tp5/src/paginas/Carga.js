'use client'

import React, { useState } from 'react';
import InputForm from "../components/InputForm";



function Cargar() {
  const [selectnoticia, setSelectedNoticia]=useState(null);
  const [isLoading, setIsLoading] = useState(true);  
  
  const añadirNoticia = async (nuevaNoticia) => {
    try {

      const response = await fetch(`http://localhost/tps/git/TpsPOW/api/cargar.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id_noticia: nuevaNoticia.id_noticia,
          id_usuario: nuevaNoticia.id_usuario,
          titulo: nuevaNoticia.titulo,
          copete: nuevaNoticia.copete,
          cuerpo: nuevaNoticia.cuerpo,
          imagen: nuevaNoticia.imagen,
          fecha: nuevaNoticia.fecha,
          categoria: nuevaNoticia.categoria
        })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
      setSelectedNoticia(nuevaNoticia);
      setIsLoading(false);
      
    } catch (error) {
      console.error('Error fetching añadirNoticia:', error);
    }
  }

  const resetForm = () => {
    setIsLoading(true);
    setSelectedNoticia({ id_noticia: '', id_usuario: '', titulo: '', copete: '', cuerpo: '', imagen: '', fecha: '', categoria: '' });
  };

  return (
    <div className='container'>
        {isLoading ? (
        <div id='cargar'>
          <InputForm añadirNoticia={añadirNoticia} infoInicial={{ id_noticia: '', id_usuario: '', titulo: '', copete: '', cuerpo: '', imagen: '', fecha: '', categoria: '' }} />
        </div>
      ) : (
        <div id='guardado' className='text-center'>
          <Guardado resetForm={resetForm} />
        </div>
      )}
    </div>
  )

}

export default Cargar;

function Guardado({resetForm}){
  return(
    <>
      <img src="http://localhost/tps/git/TpsPOW/tp5/src/imagenes_subidas/guardado.png" className="rounded mx-auto d-block imagenGuardar" alt="guardado"></img>
      <button className='btn btn-primary' onClick={resetForm}>Continuar</button>
    </>
  )


}