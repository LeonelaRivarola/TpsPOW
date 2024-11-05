
import React, { useState } from "react";

const InputForm = ({ añadirNoticia, infoInicial }) => {
    const [formulario, setformulario] = useState(infoInicial);

    const manejoInputChange = (event) => {
        const { name, value } = event.target;
        setformulario((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }


    const manejoSubmit = (event) => {
        event.preventDefault();
        añadirNoticia(formulario);
    };

    return (
        <>
            <h3>Cargar Noticia</h3>
            <form onSubmit={manejoSubmit}>
                <div className="row bloqueCarga">
                    <div className="input-group ">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Id Noticia y Id Usuario</span>
                        <input type="number" name="id_noticia" value={formulario.id_noticia} onChange={manejoInputChange} placeholder='Noticia' />
                        <input type="number" name="id_usuario" value={formulario.id_usuario} onChange={manejoInputChange} placeholder='Usuario' />
                    </div>
                </div>
                <div className="row bloqueCarga">

                    <div className="input-group input-group-sm mb-3 ">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Titulo</span>
                        <input type="text" name="titulo" value={formulario.titulo} onChange={manejoInputChange} placeholder='Titulo' />
                        <span className="input-group-text" id="inputGroup-sizing-sm">Fecha</span>
                        <input type="text" name="fecha" value={formulario.fecha} onChange={manejoInputChange} placeholder='fecha' />
                        <span className="input-group-text" id="inputGroup-sizing-sm">Categoria</span>
                        <input type="text" name="categoria" value={formulario.categoria} onChange={manejoInputChange} placeholder='categoria' />
                    </div>

                </div>
                <div className="bloqueCarga">
                    <label for="copete" className="form-label">Copete</label>
                    <div className="textos"><input type="text" id="copete" name="copete" value={formulario.copete} onChange={manejoInputChange} placeholder='copete' /></div>
                    <label for="cuerpo" className="form-label">Cuerpo</label>
                    <div className="textos"><input type="text" id="cuerpo" name="cuerpo" value={formulario.cuerpo} onChange={manejoInputChange} placeholder='cuerpo' /></div>
                </div>
                <div className="bloqueCarga input-group input-group-sm mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-sm">Imagen</span>
                    <input type="text" name="imagen" value={formulario.imagen} onChange={manejoInputChange} placeholder='imagen' />
                </div>
                <div className=""><button className="btn btn-primary" variant="primary" type="submit">Guardar</button></div>

            </form>

        </>
    )
}

export default InputForm;