import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import imagen from "./cryptomonedas.png";
import Formulario from "./Componentes/Formulario";
import Cotizacion from "./Componentes/Cotizacion";
import "./App.css";
import Spinner from "./Componentes/Spinner";

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: "Bebas Neue", cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }
`;

function App() {
  const [moneda, guardarMoneda] = useState("");
  const [criptomoneda, guardarCriptoMoneda] = useState("");
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false);

  useEffect(() => {
    const cotizarCriptomoneda = async () => {
      //evitamos la ejecución la primera vez
      if (moneda === "") return;
      //consultamos la API para obtener la cotización
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
      const resultado = await axios.get(url);

      //mostrar el spinner
      guardarCargando(true);

      //ocultar el spinner y mostrar resultado
      setTimeout(() => {
        guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
        guardarCargando(false);
      }, 3000);
    };
    cotizarCriptomoneda();
  }, [moneda, criptomoneda]);

  const componente = cargando ? (
    <Spinner />
  ) : (
    <Cotizacion resultado={resultado} />
  );

  return (
    <Contenedor>
      <div className="App">
        <div>
          <Imagen src={imagen} alt="imagen_crypto" />
        </div>
        <div>
          <Heading>Cotiza Criptomonedas al Instante</Heading>

          <Formulario
            guardarMoneda={guardarMoneda}
            guardarCriptoMoneda={guardarCriptoMoneda}
          />
          {componente}
        </div>
      </div>
    </Contenedor>
  );
}

export default App;
