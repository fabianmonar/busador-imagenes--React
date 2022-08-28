import React, { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import ListadoImagenes from "./components/ListadoImagenes";

function App() {
  const [ busqueda, guardarBusqueda ] = useState('');
  const [ imagenes, guardarImagenes ] = useState([]);
  const [ paginaactual, guardarPaginaActual ] = useState(1);
  const [ totalpaginas, guardarTotalPaginas] = useState(5);

  useEffect(() => {
    const consultarApi = async () => {
      if(busqueda === '' ) return;

      const imagenesPorPagina = 30;
      const key = '29244247-5f78a2b97ac7c8668220e4ae8';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      guardarImagenes (resultado.hits);
      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina );
      guardarTotalPaginas(calcularTotalPaginas);

      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({ behavior: 'smooth' })
    }
   
   consultarApi();
  }, [busqueda, paginaactual]
  )

  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual -1;
    if(nuevaPaginaActual === 0 ) return;
    guardarPaginaActual(nuevaPaginaActual);
  }
   
  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaactual +1;
    if(nuevaPaginaActual > totalpaginas) return;
   
    guardarPaginaActual(nuevaPaginaActual);

  }
  return (
    <div className="container">
    <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>
        <Formulario
        guardarBusqueda={guardarBusqueda}
        />
       </div>
       <div className="row justify-content-center">
          <ListadoImagenes 
            imagenes={imagenes}
          />
          { (paginaactual === 1) ? null:(
            <button
            type="button"
            className="bbtn btn-info mr-1"
            onClick={paginaAnterior}
            >&laquo; Anterior </button>
          )}
           { (paginaactual === totalpaginas) ? null:(
            <button
            type="button"
            className="bbtn btn-info "
            onClick={paginaSiguiente}
            >Siguiente &raquo;</button>
           )}

          

          </div>

    </div>
  );
}

export default App;
