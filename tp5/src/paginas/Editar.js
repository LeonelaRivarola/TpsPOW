'use client'

import React, { useState } from 'react';
import Edit from '../components/Edit';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Editar() {
    const navegar = useNavigate();
    const location = useLocation();
    const { data } = location.state || {};

    const [selectedNoticia, setSelectedNoticia] = useState(data);


    // actualizar la base de datos
    const updateNoticia = async (editarNoticia) => {
        try {
            const response = await fetch(`http://localhost/api/update.php`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_noticia: editarNoticia.id_noticia,
                    id_usuario: editarNoticia.id_usuario,
                    titulo: editarNoticia.titulo,
                    copete: editarNoticia.copete,
                    cuerpo: editarNoticia.cuerpo,
                    imagen: editarNoticia.imagen,
                    fecha: editarNoticia.fecha,
                    categoria: editarNoticia.categoria
                })

            })

            if (!response.ok) {
                throw new Error('Network response was not ok, in update');
            }

            const data = await response.json()
            const datos= [];
            datos.push(data.noticia);
            setSelectedNoticia(datos);


        } catch (error) {
            alert("update error" + error)
        }
    }


    const manejoSubmit = (event) => {
        event.preventDefault();
        const data=selectedNoticia;     
        navegar('/Noticias', {
            state:{data}
        });
    };

    return (
        <>
            <Edit noticia={selectedNoticia} updateNoticia={updateNoticia} />
            <form onSubmit={manejoSubmit}>
                <button type='submit'>volver</button>
            </form>
        </>
    )

}


export default Editar;