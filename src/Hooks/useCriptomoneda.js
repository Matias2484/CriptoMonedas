import React, { Fragment, useState } from "react";
import styled from "@emotion/styled";

const Label = styled.label`
  font-family: "Bebas Neue", cursiva;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 2.4rem;
  margin-top: 2rem;
  display: block;
`;
const Select = styled.select`
  width: 100%;
  display: block;
  padding: 1rem;
  -webkit-appearance: none;
  border-radius: 10px;
  border: none;
  font-size: 1.2rem;
`;
export default function useCriptomoneda(label, stateInicial, opciones) {
  const [state, setState] = useState(stateInicial);

  const SelectCripto = () => (
    <Fragment>
      <Label>{label}</Label>
      <Select value={state} onChange={(e) => setState(e.target.value)}>
        <option value=""> -Seleccione-</option>
        {opciones.map((opt) => (
          <option key={opt.CoinInfo.Id} value={opt.CoinInfo.Name}>
            {" "}
            {opt.CoinInfo.FullName}
          </option>
        ))}
      </Select>
    </Fragment>
  );

  return [state, SelectCripto, setState];
}
