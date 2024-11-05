import React,  { useState, useEffect} from 'react';

const Edit = ({ noticia, updateNoticia }) => {
    
    const [formulario, setformulario] = useState(noticia[0]);
    useEffect(() => {
        setformulario(noticia[0]);
    }, [noticia]); // Ejecuta esto cada vez que cambia la noticia


    const manejoInputChange = (event) => {
        const { name, value } = event.target;
        setformulario((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }


    const manejoSubmit = (event) => {
        event.preventDefault();      
        updateNoticia(formulario);
        setformulario({ id_noticia:'', id_usuario: '', titulo: '', copete: '', cuerpo: '', imagen: '', fecha: '', categoria: '' });
    };

    return (
        <>
            <div className="container carga">
                <h3>Editar Noticia</h3>
                <form onSubmit={manejoSubmit}>
                    <div className="raw">
                        <div className="col"><input type="text" name="titulo" value={formulario.titulo} onChange={manejoInputChange} placeholder='Titulo' /></div>
                        <div className="col"><input type="text" name="copete" value={formulario.copete} onChange={manejoInputChange} placeholder='copete' /></div>
                        <div className="col"><input type="text" name="cuerpo" value={formulario.cuerpo} onChange={manejoInputChange} placeholder='cuerpo' /></div>
                        <div className="col"><input type="text" name="imagen" value={formulario.imagen} onChange={manejoInputChange} placeholder='imagen' /></div>
                        <div className="col"><input type="text" name="fecha" value={formulario.fecha} onChange={manejoInputChange} placeholder='fecha' /></div>
                        <div className="col"><input type="text" name="categoria" value={formulario.categoria} onChange={manejoInputChange} placeholder='categoria' /></div>
                        <div className="col"><button className="btn btn-primary" variant="primary" type="submit">Guardar</button></div>
                    </div>
                </form>
            </div>
        </>
    )

};

export default Edit;