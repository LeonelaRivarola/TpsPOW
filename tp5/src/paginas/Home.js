'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import List from '../components/List'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home(){
    const [noticias, setNoticia] = useState([]);
    const navegar= useNavigate();

    useEffect(() => {
        fetchNoticia();
    }, []);

    const fetchNoticia = async () => {
        const url = 'http://localhost/api/noticias.php?inicio=0&fin=60';
        try {
            const response = await fetch(url);// hago la llamada ala base de dato
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
              }
            const data = await response.json();//trnaformo la respuesta en json 
            setNoticia(data);// ¿Que hace esto?, asifna a noticias el contenido de data.
        } catch (error) {
            console.error('Error fetching Noticia:', error);
        }
    };
    //........................................................
    //VER NOTICIAS
    const verNoticia = async (noticia) => {
        
        const url = `http://localhost/api/ver_noticia.php?id_noticia=${noticia.id_noticia}`
        try {
            const response = await fetch(url);// hago la llamada ala base de dato
            const data = await response.json();//trnaformo la respuesta en json 
            navegar('/Noticias',{
                state: { message: 'Hello from HomePage!', data}
            });
        } catch (error) {
            console.error('Error fetching Noticia:', error);
        }
    }

   
    

    return (
        <List noticias={noticias} verNoticia={verNoticia}  />
        )
}


export default Home;