import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Error from "./Error";
import useMoneda from "../Hooks/useMoneda";
import useCriptomoneda from "../Hooks/useCriptomoneda";
import axios from "axios";

const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #326ac0;
    cursor: pointer;
  }
`;

export default function Formulario({ guardarMoneda, guardarCriptoMoneda }) {
  //Listado de las CriptoMonedas
  const [listacripto, guardarCriptoMonedas] = useState([]);
  const [error, setError] = useState(false);

  const Monedas = [
    { codigo: "USD", nombre: "Dolar de Estados Unidos" },
    { codigo: "MXN", nombre: "Peso Mexicano" },
    { codigo: "EUR", nombre: "Euro" },
    { codigo: "ARS", nombre: "Peso Argentino" },
  ];
  const [moneda, SelectMonedas] = useMoneda("Elige tu moneda", "", Monedas);

  const [criptomoneda, SelectCripto] = useCriptomoneda(
    "Elige tu CriptoMoneda",
    "",
    listacripto
  );

  //Llamado a la API
  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
      const resultado = await axios.get(url);
      guardarCriptoMonedas(resultado.data.Data);
    };
    consultarAPI();
  }, []);
  const cotizarMoneda = (e) => {
    e.preventDefault();
    if (moneda === "" || criptomoneda === "") {
      setError(true);
      return;
    }

    setError(false);
    guardarCriptoMoneda(criptomoneda);
    guardarMoneda(moneda);
  };

  return (
    <form onSubmit={cotizarMoneda}>
      {error ? <Error mensaje="Todos los campos son obligatorios" /> : null}
      <SelectMonedas />
      <SelectCripto />
      <Boton type="submit" value="Calcular" />
    </form>
  );
}
