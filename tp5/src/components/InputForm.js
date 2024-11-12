
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
            <div className="titulo">
                <h3>Cargar Noticia</h3>
            </div>
            <div>
                <form onSubmit={manejoSubmit}>
                    <div className="row bloqueCarga">
                        <div className="input-group ">
                            <span className="input-group-text" id="inputGroup-sizing-sm">Id Noticia y Id Usuario</span>
                            <input type="number" name="id_noticia" id="idNoticia" value={formulario.id_noticia} onChange={manejoInputChange} placeholder='Noticia' />
                            <input type="number" name="id_usuario" id="idUsuario" value={formulario.id_usuario} onChange={manejoInputChange} placeholder='Usuario' />
                        </div>
                    </div>
                    <div className="row bloqueCarga">

                        <div className="input-group input-group-sm mb-3 ">
                            <span className="input-group-text" id="inputGroup-sizing-sm">Titulo</span>
                            <input type="text" name="titulo" id="Titulo" value={formulario.titulo} onChange={manejoInputChange} placeholder='Titulo' />
                            <span className="input-group-text" id="inputGroup-sizing-sm">Fecha</span>
                            <input type="text" name="fecha"  id="Fecha" value={formulario.fecha} onChange={manejoInputChange} placeholder='fecha' />
                            <span className="input-group-text" id="inputGroup-sizing-sm">Categoria</span>
                            <input type="text" name="categoria" id="Categoria" value={formulario.categoria} onChange={manejoInputChange} placeholder='categoria' />
                        </div>

                    </div>

                    <div className="bloqueCarga">
                        <div className="textos input-group">
                            <span htmlFor="copete" className="input-group-text">Copete</span>
                            <textarea type="text" id="Copete" className="form-control" name="copete" value={formulario.copete} onChange={manejoInputChange} aria-label="With textarea" />
                        </div>

                        <div className="textos input-group">
                            <span htmlFor="cuerpo" className="input-group-text">Cuerpo</span>
                            <textarea type="text" id="Cuerpo" className="form-control" name="cuerpo" value={formulario.cuerpo} onChange={manejoInputChange} aria-label="With textarea" />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="basic-url" className="form-label">URL Imagen</label>
                        <div className="input-group">
                            <span className="input-group-text" id="basic-addon3">URL</span>
                            <input type="text" className="form-control" id="basic-url Imagen" aria-describedby="basic-addon3 basic-addon4" />
                        </div>
                        <div className="form-text" id="basic-addon4">Coloque la url de la imagen correspondiente</div>
                    </div>
                    <div><button className="btn btn-primary" variant="primary" type="submit">Guardar</button></div>

                </form>

            </div>

        </>
    )
}

export default InputForm;
