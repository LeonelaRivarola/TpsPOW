
import React from 'react';



const List = ({ noticias = [], verNoticia, eliminarNoticia}) => {
    return (
        <div className="container bloque">
            <div className='text-center ver_noticia'>
                <h1>Noticias</h1>            
            </div>
            {noticias !== 0 ? (
                noticias.map((x) => (
                    
                    <div className="card mb-3"key={x.id_noticia}>

                        <div className="row g-0">     
                            <div className='col-md-4'>
                                <img src={`http://localhost/tps/git/TpsPOW/tp5/src/imagenes_subidas/${x.imagen}.jpg`} className="img-fluid rounded-start" alt={x.titulo} />
                            </div>
                        <div className="col-md-8">
                            <div className=" card-body">
                                <h5 className="card-title">{x.titulo}</h5>
                                <p className="card-text">{x.copete.substring(0, 40)}</p>
                                <button className="btn btn-primary" onClick={() => verNoticia(x)}>Ver</button>
                                <button className="btn btn-danger" onClick={() => eliminarNoticia(x)}>Eliminar</button>
                            </div>
                        </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No hay noticias disponibles</p> // Muestra un mensaje si no hay noticias
            )}
        </div>
    );
}
export default List;


