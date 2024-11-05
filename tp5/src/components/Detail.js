import React from 'react';

const Detail = ({ noticia, editarNoticia, eliminarNoticia }) => {
    return (
        <div className="container raw ver_noticia">
            <div className="card mb-3" key={noticia[0].id_noticia}>
                <div className="row g-0">
                    <div className='col-md-4 '>
                        <img src={`http://localhost/tps/tp5/src/imagenes_subidas/${noticia[0].imagen}.jpg`} className="card-img-top" alt={noticia[0].titulo} />
                    </div>

                    <div className='col-md-8'>
                        <div className="card-body">
                            <div>
                                <h5 className="card-title">{noticia[0].titulo}</h5>
                                <p className="card-text">{noticia[0].cuerpo}</p>
                                <p className="card-text">{noticia[0].copete}</p>
                                <p className="card-text">{noticia[0].categoria} {noticia[0].fecha}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='d-grid gap-4 d-md-flex justify-content-md-center'>
                <button className="btn btn-primary btn-lg " onClick={() => editarNoticia(noticia[0])}>Editar</button>
                <button className="btn btn-danger btn-lg" onClick={() => eliminarNoticia(noticia[0].id_noticia)}>Eliminar</button>
            </div>

        </div>
    )
}

export default Detail;