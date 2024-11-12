
'use client'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import BarNav from "./components/BarNav";
import Home from './paginas/Home';
import Carga from './paginas/Carga';
import ListarNoticias from './paginas/Noticias';
import Editar from './paginas/Editar';

export default function App() {


  return (
    <>
      <Router>
        <BarNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Cargar" element={<Carga />} />
          <Route path="/Noticias" element={<ListarNoticias />} />
          <Route path="/Editar" element={<Editar />} />
        </Routes>
      </Router>
      <footer className='text-body-secondary py-5'>
      <div className="container">
        <p className="autor">&copy Derecho de autor reservado</p>
      </div>
    </footer>

    </>
  );
}

