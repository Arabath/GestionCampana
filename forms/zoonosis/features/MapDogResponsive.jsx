import React, { useState } from "react";
import siluetaPerro from "../../../assets/dog/silueta-perro-full.png";
// import siluetaPerro from "../assets/dog/silueta-perro.png";
import orejaIzquierda from "../../../assets/dog/orejaIzquierda-perro.png";
import orejaDerecha from "../../../assets/dog/orejaDerecha-perro.png";
import cabeza from "../../../assets/dog/cabeza-perro.png";
import hocico from "../../../assets/dog/hocico-perro.png";
import cuello from "../../../assets/dog/cuello-perro.png";
import pecho from "../../../assets/dog/pecho-perro.png";
import pataIzquierdaAdelante from "../../../assets/dog/pataIzquierdaAdelante-perro.png";
import pataIzquierdaAtras from "../../../assets/dog/pataIzquierdaAtras-perro.png";
import pataderechaAdelante from "../../../assets/dog/pataDerechaAdelante-perro.png";
import pataderechaAtras from "../../../assets/dog/pataDerechaAtras-perro.png";
import lomo from "../../../assets/dog/lomo-perro.png";
import cola from "../../../assets/dog/cola-perro.png";
import TextField from "@mui/material/TextField";
import useBreakpoint from "../../../common/hooks/useBreakpoint";

const MapDogResponsive = ({ size, setObservations, observations }) => {
  const [partBody, setPartBody] = useState("");
  const [description, setDescription] = useState("");
  const matches = useBreakpoint("md");

  const handleTextFieldChange = (e) => {
    setDescription(e.target.value);
    if(partBody === "cabeza") observations.cabeza = e.target.value;
    if(partBody === "cola") observations.cola = e.target.value
    if(partBody === "cuello") observations.cuello = e.target.value
    if(partBody === "hocico") observations.hocico = e.target.value
    if(partBody === "orejaDer") observations.orejaDer = e.target.value
    if(partBody === "orejaIzq") observations.orejaIzq = e.target.value
    if(partBody === "pataDerAde") observations.pataDerAde = e.target.value
    if(partBody === "pataDerAtr") observations.pataDerAtr = e.target.value
    if(partBody === "pataIzqAde") observations.pataIzqAde = e.target.value
    if(partBody === "pataIzqAtr") observations.pataIzqAtr = e.target.value
    if(partBody === "pecho") observations.pecho = e.target.value
    if(partBody === "lomo") observations.lomo = e.target.value 
    setObservations({ ...observations });
  };
  const clearDescription = () => {
    setDescription("");
  };

  return (
    <div
      style={
        !matches
          ? { display: "flex", alignItems: "center", flexDirection: "column" }
          : { display: "flex", alignItems: "center", flexDirection: "row" }
      }
    >
      <div
        style={{
          position: "relative",
          width: `calc(880px * ${size})`,
          height: `calc(600px * ${size})`,
        }}
      >
        <img
          style={{ position: "absolute", width: `calc(880px * ${size})` }}
          src={siluetaPerro}
        />
        <img
          className={partBody === "orejaIzq" ? "body-parts-active": observations?.orejaIzq !== "" ? "body-parts-with-data" : "body-parts"}
          src={orejaIzquierda}
          style={{ width: `calc(90px * ${size})`, right: `calc(164px *${size})`, top: `calc(14px * ${size})` }}
          onClick={() => {
            setPartBody("orejaIzq");
            clearDescription();
            if(observations.orejaIzq !== "") setDescription(observations.orejaIzq)
          }}
        />
        <img
          className={partBody === "orejaDer" ? "body-parts-active": observations?.orejaDer !== "" ? "body-parts-with-data" : "body-parts"}
          src={orejaDerecha}
          style={{ width: `calc(90px * ${size})`, right: `calc(302px *${size})`, top: `calc(14px * ${size})` }}
          onClick={() => {
            setPartBody("orejaDer");
            clearDescription();
            if(observations.orejaDer !== "") setDescription(observations.orejaDer)
          }}
        />
        <img
          className={partBody === "cabeza" ? "body-parts-active" : observations?.cabeza !== "" ? "body-parts-with-data" : "body-parts"}
          src={cabeza}
          style={{ width: `calc(120px * ${size})`, right: `calc(217px *${size})`, top: `calc(35px * ${size})` }}
          onClick={() => {           
            setPartBody("cabeza");
            clearDescription();
            if(observations.cabeza !== "") setDescription(observations.cabeza)
          }}
        />
        <img
          className={partBody === "hocico" ? "body-parts-active" : observations?.hocico !== "" ? "body-parts-with-data" : "body-parts"}
          src={hocico}
          style={{ width: `calc(70px * ${size})`, right: `calc(242px *${size})`, top: `calc(105px * ${size})` }}
          onClick={() => {
            setPartBody("hocico");
            clearDescription();
            if(observations.hocico !== "") setDescription(observations.hocico)
          }}
        />
        <img
          className={partBody === "cuello" ? "body-parts-active" : observations?.cuello !== "" ? "body-parts-with-data" : "body-parts"}
          src={cuello}
          style={{ width: `calc(90px * ${size})`, right: `calc(248px *${size})`, top: `calc(165px * ${size})` }}
          onClick={() => {
            setPartBody("cuello");
            clearDescription();
            if(observations.cuello !== "") setDescription(observations.cuello)
          }}
        />
        <img
          className={partBody === "lomo" ? "body-parts-active" : observations?.lomo !== "" ? "body-parts-with-data" : "body-parts"}
          src={lomo}
          style={{ width: `calc(310px * ${size})`, left: `calc(263px *${size})`, bottom: `calc(221px * ${size})` }}
          onClick={() => {
            setPartBody("lomo");
            clearDescription();
            if(observations.lomo !== "") setDescription(observations.lomo)
          }}
        />
        <img
          className={partBody === "pecho" ? "body-parts-active" : observations?.pecho !== "" ? "body-parts-with-data" : "body-parts"}
          src={pecho}
          style={{ width: `calc(120px * ${size})`, right: `calc(243px *${size})`, top: `calc(221px * ${size})` }}
          onClick={() => {
            setPartBody("pecho");
            clearDescription();
            if(observations.pecho !== "") setDescription(observations.pecho)
          }}
        />
        <img
          className={partBody === "pataDerAde" ? "body-parts-active" : observations?.pataDerAde !== "" ? "body-parts-with-data" : "body-parts"}
          src={pataderechaAdelante}
          style={{ width: `calc(60px * ${size})`, right: `calc(293px *${size})`, bottom: `calc(28px * ${size})` }}
          onClick={() => {
            setPartBody("pataDerAde");
            clearDescription();
            if(observations.pataderechaAdelante !== "") setDescription(observations.pataderechaAdelante)
          }}
        />
        <img
          className={partBody === "pataDerAtr" ? "body-parts-active" : observations?.pataDerAtr !== "" ? "body-parts-with-data" : "body-parts"}
          src={pataderechaAtras}
          style={{ width: `calc(150px * ${size})`, left: `calc(215px *${size})`, bottom: `calc(24px * ${size})` }}
          onClick={() => {
            setPartBody("pataDerAtr");
            clearDescription();
            if(observations.pataderechaAtras !== "") setDescription(observations.pataderechaAtras)
          }}
        />
        <img
          className={partBody === "cola" ? "body-parts-active" : observations?.cola !== "" ? "body-parts-with-data" : "body-parts"}
          src={cola}
          style={{ width: `calc(110px * ${size})`, left: `calc(166px *${size})`, top: `calc(156px * ${size})` }}
          onClick={() => {
            setPartBody("cola");
            clearDescription();
            if(observations.cola !== "") setDescription(observations.cola)
          }}
        />
        <img
          className={partBody === "pataIzqAde" ? "body-parts-active" : observations?.pataIzqAde !== "" ? "body-parts-with-data" : "body-parts"}
          src={pataIzquierdaAdelante}
          style={{ width: `calc(60px * ${size})`, right: `calc(253px *${size})`, bottom: `calc(64px * ${size})` }}
          onClick={() => {
            setPartBody("pataIzqAde");
            clearDescription();
            if(observations.pataIzquierdaAdelante !== "") setDescription(observations.pataIzquierdaAdelante)
          }}
        />
        <img
          className={partBody === "pataIzqAtr" ? "body-parts-active" : observations?.pataIzqAtr !== "" ? "body-parts-with-data" : "body-parts"}
          src={pataIzquierdaAtras}
          style={{ width: `calc(115px * ${size})`, left: `calc(289px *${size})`, bottom: `calc(41px * ${size})` }}
          onClick={() => {
            setPartBody("pataIzqAtr");
            clearDescription();
            if(observations.pataIzquierdaAtras !== "") setDescription(observations.pataIzquierdaAtras)
          }}
        />
      </div>
      <div className="dog-textfield">
        <span
          style={{
            alignSelf: "flex-start",
            marginBottom: "10px",
            marginLeft: "30px",
          }}
        >
          Parte del cuerpo: {partBody === "" && " -"}
          {partBody === "orejaIzq" && " Oreja izquierda"}
          {partBody === "orejaDer" && " Oreja derecha"}
          {partBody === "cabeza" && " Cabeza"}
          {partBody === "hocico" && " Hocico"}
          {partBody === "cuello" && " Cuello"}
          {partBody === "pecho" && " Pecho"}
          {partBody === "lomo" && " Lomo"}
          {partBody === "pataIzqAde" && " Pata izquierda adel."}
          {partBody === "pataIzqAtr" && " Pata izquierda atrás"}
          {partBody === "pataDerAde" && " Pata derecha adel."}
          {partBody === "pataDerAtr" && " Pata derecha atrás"}
          {partBody === "cola" && " Cola"}
        </span>

        <TextField
          id="outlined-multiline-static"
          label={partBody === "" ? "Seleccione una parte del perro" : ""}
          disabled={partBody === "" && true}
          multiline
          rows={5}
          onChange={handleTextFieldChange}
          sx={{ width: "100%", marginLeft: "0px !important"}}
          helperText="max. 500 carácteres"
          inputProps={{ maxLength: 500 }}
          value={description}
        />
      </div>
    </div>
  );
};

export default MapDogResponsive;