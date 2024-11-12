'use client'

import React, { useState, useEffect } from 'react';
import Detail from '../components/Detail';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


function Noticias() {
    const navegar=useNavigate();
    const location = useLocation();
    const { data } = location.state || {};

    //const [noticias, setNoticia] = useState([]);
    const [selectedNoticia, setSelectedNoticia] = useState(data || null);
  
    useEffect(() => {
        setSelectedNoticia(selectedNoticia);
    }, [selectedNoticia]); // Ejecuta esto cada vez que cambia la noticia

    //VER NOTICIAS

    const editarNoticia = async (noticia) => {
        const url = `http://localhost/tps/git/TpsPOW/api/ver_noticia.php?id_noticia=${noticia.id_noticia}`
        try {
            const response = await fetch(url);// hago la llamada ala base de dato
            const data = await response.json();//trnaformo la respuesta en json 
            setSelectedNoticia(data);
            console.log(data);
            navegar("/Editar",{
                state:{ message:"enviado",data
            }
            })
        } catch (error) {
            console.error('Error fetching Noticia:', error);
        }
    }
    //---------------------------------
    // ELIMINAR EN LA BASE DE DATOS
    const eliminarNoticia = async (noticiaId) => {

        console.log(noticiaId)
        try {
            const response = await fetch('http://localhost/api/delete.php', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_noticia: noticiaId
                })
            })
            if (!response.ok) {
                throw new Error('Network response was not ok, in update');
            }

            //const updatedNoticias = noticias.filter((x) => x.id_noticia !== noticiaId);
            //setNoticia(updatedNoticias);
            navegar('/');
        } catch (error) {
            alert(error);
        }
    }


    //_------------------------------------------------------------
    return (
        <>
        {selectedNoticia ?(
            <div className='bloque'>
                <Detail noticia={selectedNoticia} editarNoticia={editarNoticia} eliminarNoticia={eliminarNoticia} />
            </div>
            ):(
                <div className='bloque'>
                    <p className='text-center mt-5'>No hay ninguna noticia con ese nombre</p>
                </div>
                
            )

        }
            
        </>
    )
}


export default Noticias;