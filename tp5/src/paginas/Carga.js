'use client'

import React, { useState } from 'react';
import InputForm from "../components/InputForm";

function Cargar() {
  const [selectnoticia, setSelectedNoticia]=useState(null);
  
  
  const añadirNoticia = async (nuevaNoticia) => {
    try {

      const response = await fetch(`http://localhost/api/cargar.php`, {
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
      
    } catch (error) {
      console.error('Error fetching añadirNoticia:', error);
    }
  }


  return (
    <div className='container bloque'>
      <InputForm añadirNoticia={añadirNoticia} infoInicial={{ id_noticia: '', id_usuario: '', titulo: '', copete: '', cuerpo: '', imagen: '', fecha: '', categoria: '' }} />
      {selectnoticia ?(
        <div>
        <p>Listo</p>
      </div>
      ):null}
    </div>
  )

}

export default Cargar;