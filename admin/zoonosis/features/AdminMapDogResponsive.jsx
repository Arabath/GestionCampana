import React, { useState } from 'react'
import siluetaPerro from '../../../assets/dog/silueta-perro-full.png'
// import siluetaPerro from "../assets/dog/silueta-perro.png";
import orejaIzquierda from '../../../assets/dog/orejaIzquierda-perro.png'
import orejaDerecha from '../../../assets/dog/orejaDerecha-perro.png'
import cabeza from '../../../assets/dog/cabeza-perro.png'
import hocico from '../../../assets/dog/hocico-perro.png'
import cuello from '../../../assets/dog/cuello-perro.png'
import pecho from '../../../assets/dog/pecho-perro.png'
import pataIzquierdaAdelante from '../../../assets/dog/pataIzquierdaAdelante-perro.png'
import pataIzquierdaAtras from '../../../assets/dog/pataIzquierdaAtras-perro.png'
import pataderechaAdelante from '../../../assets/dog/pataDerechaAdelante-perro.png'
import pataderechaAtras from '../../../assets/dog/pataDerechaAtras-perro.png'
import lomo from '../../../assets/dog/lomo-perro.png'
import cola from '../../../assets/dog/cola-perro.png'
import TextField from '@mui/material/TextField'
import useBreakpoint from '../../../common/hooks/useBreakpoint'

const AdminMapDogResponsive = ({ size, dataDog }) => {
  const [partBody, setPartBody] = useState('')
  const [description, setDescription] = useState('-')
  const matches = useBreakpoint('md')
  return (
    <div
      style={
        !matches
          ? { display: 'flex', alignItems: 'center', flexDirection: 'column' }
          : { display: 'flex', alignItems: 'center', flexDirection: 'row' }
      }
    >
      <div
        style={{
          position: 'relative',
          width: `calc(880px * ${size})`,
          height: `calc(600px * ${size})`,
        }}
      >
        <img style={{ position: 'absolute', width: `calc(880px * ${size})` }} src={siluetaPerro} />
        <img
          className={
            dataDog?.orejaIzq ? 'body-parts-with-data' : partBody === 'orejaIzq' ? 'body-parts-active' : 'body-parts'
          }
          src={orejaIzquierda}
          style={{
            width: `calc(90px * ${size})`,
            right: `calc(164px *${size})`,
            top: `calc(14px * ${size})`,
          }}
          onClick={() => {
            setPartBody('orejaIzq')
            dataDog?.orejaIzq !== null && setDescription(dataDog?.orejaIzq)
          }}
        />
        <img
          className={
            dataDog?.orejaDer ? 'body-parts-with-data' : partBody === 'orejaDer' ? 'body-parts-active' : 'body-parts'
          }
          src={orejaDerecha}
          style={{
            width: `calc(90px * ${size})`,
            right: `calc(302px *${size})`,
            top: `calc(14px * ${size})`,
          }}
          onClick={() => {
            setPartBody('orejaDer')
            dataDog?.orejaDer !== null && setDescription(dataDog?.orejaDer)
          }}
        />
        <img
          className={
            dataDog?.cabeza ? 'body-parts-with-data' : partBody === 'cabeza' ? 'body-parts-active' : 'body-parts'
          }
          src={cabeza}
          style={{
            width: `calc(120px * ${size})`,
            right: `calc(217px *${size})`,
            top: `calc(35px * ${size})`,
          }}
          onClick={() => {
            setPartBody('cabeza')
            dataDog?.cabeza !== null ? setDescription(dataDog?.cabeza) : setDescription(undefined)
          }}
        />
        <img
          className={
            dataDog?.hocico ? 'body-parts-with-data' : partBody === 'hocico' ? 'body-parts-active' : 'body-parts'
          }
          src={hocico}
          style={{
            width: `calc(70px * ${size})`,
            right: `calc(242px *${size})`,
            top: `calc(105px * ${size})`,
          }}
          onClick={() => {
            setPartBody('hocico')
            dataDog?.hocico !== null ? setDescription(dataDog?.hocico) : setDescription(undefined)
          }}
        />
        <img
          className={
            dataDog?.cuello ? 'body-parts-with-data' : partBody === 'cuello' ? 'body-parts-active' : 'body-parts'
          }
          src={cuello}
          style={{
            width: `calc(90px * ${size})`,
            right: `calc(248px *${size})`,
            top: `calc(165px * ${size})`,
          }}
          onClick={() => {
            setPartBody('cuello')
            dataDog?.cuello !== null ? setDescription(dataDog?.cuello) : setDescription(undefined)
          }}
        />
        <img
          className={dataDog?.lomo ? 'body-parts-with-data' : partBody === 'lomo' ? 'body-parts-active' : 'body-parts'}
          src={lomo}
          style={{
            width: `calc(310px * ${size})`,
            left: `calc(263px *${size})`,
            bottom: `calc(221px * ${size})`,
          }}
          onClick={() => {
            setPartBody('lomo')
            dataDog?.lomo !== null ? setDescription(dataDog?.lomo) : setDescription(undefined)
          }}
        />
        <img
          className={
            dataDog?.pecho ? 'body-parts-with-data' : partBody === 'pecho' ? 'body-parts-active' : 'body-parts'
          }
          src={pecho}
          style={{
            width: `calc(120px * ${size})`,
            right: `calc(243px *${size})`,
            top: `calc(221px * ${size})`,
          }}
          onClick={() => {
            setPartBody('pecho')
            dataDog?.pecho !== null ? setDescription(dataDog?.pecho) : setDescription(undefined)
          }}
        />
        <img
          className={
            dataDog?.pataDerAde
              ? 'body-parts-with-data'
              : partBody === 'pataDerAde'
              ? 'body-parts-active'
              : 'body-parts'
          }
          src={pataderechaAdelante}
          style={{
            width: `calc(60px * ${size})`,
            right: `calc(293px *${size})`,
            bottom: `calc(28px * ${size})`,
          }}
          onClick={() => {
            setPartBody('pataDerAde')
            dataDog?.pataDerAde !== null ? setDescription(dataDog?.pataDerAde) : setDescription(undefined)
          }}
        />
        <img
          className={
            dataDog?.pataDerAtr
              ? 'body-parts-with-data'
              : partBody === 'pataDerAtr'
              ? 'body-parts-active'
              : 'body-parts'
          }
          src={pataderechaAtras}
          style={{
            width: `calc(150px * ${size})`,
            left: `calc(215px *${size})`,
            bottom: `calc(24px * ${size})`,
          }}
          onClick={() => {
            setPartBody('pataDerAtr')
            dataDog?.pataDerAtr !== null ? setDescription(dataDog?.pataDerAtr) : setDescription(undefined)
          }}
        />
        <img
          className={
            dataDog?.cola ? 'body-parts-with-data' : dataDog?.cola === 'cola' ? 'body-parts-active' : 'body-parts'
          }
          src={cola}
          style={{
            width: `calc(110px * ${size})`,
            left: `calc(166px *${size})`,
            top: `calc(156px * ${size})`,
          }}
          onClick={() => {
            setPartBody('cola')
            dataDog?.cola !== null ? setDescription(dataDog?.cola) : setDescription(undefined)
          }}
        />
        <img
          className={
            dataDog?.pataIzqAde
              ? 'body-parts-with-data'
              : partBody === 'pataIzqAde'
              ? 'body-parts-active'
              : 'body-parts'
          }
          src={pataIzquierdaAdelante}
          style={{
            width: `calc(60px * ${size})`,
            right: `calc(253px *${size})`,
            bottom: `calc(64px * ${size})`,
          }}
          onClick={() => {
            setPartBody('pataIzqAde')
            dataDog?.pataIzqAde !== null ? setDescription(dataDog?.pataIzqAde) : setDescription(undefined)
          }}
        />
        <img
          className={
            dataDog?.pataIzqAtr
              ? 'body-parts-with-data'
              : partBody === 'pataIzqAtr'
              ? 'body-parts-active'
              : 'body-parts'
          }
          src={pataIzquierdaAtras}
          style={{
            width: `calc(115px * ${size})`,
            left: `calc(289px *${size})`,
            bottom: `calc(41px * ${size})`,
          }}
          onClick={() => {
            setPartBody('pataIzqAtr')
            dataDog?.pataIzqAtr !== null ? setDescription(dataDog?.pataIzqAtr) : setDescription(undefined)
          }}
        />
      </div>
      <div className='dog-textfield'>
        <span
          style={{
            alignSelf: 'flex-start',
            marginBottom: '10px',
            marginLeft: '30px',
          }}
        >
          Parte del cuerpo: {partBody === '' && ' -'}
          {partBody === 'orejaIzq' && ' Oreja izquierda'}
          {partBody === 'orejaDer' && ' Oreja derecha'}
          {partBody === 'cabeza' && ' Cabeza'}
          {partBody === 'hocico' && ' Hocico'}
          {partBody === 'cuello' && ' Cuello'}
          {partBody === 'pecho' && ' Pecho'}
          {partBody === 'lomo' && ' Lomo'}
          {partBody === 'pataIzqAde' && ' Pata izquierda adel.'}
          {partBody === 'pataIzqAtr' && ' Pata izquierda atrás'}
          {partBody === 'pataDerAde' && ' Pata derecha adel.'}
          {partBody === 'pataDerAtr' && ' Pata derecha atrás'}
          {partBody === 'cola' && ' Cola'}
        </span>
        <TextField
          id='outlined-multiline-static'
          disabled={partBody === '' && true}
          multiline
          rows={5}
          sx={{ width: '100%' }}
          inputProps={{ maxLength: 500 }}
          value={description === undefined ? '-' : description}
        />
      </div>
    </div>
  )
}

export default AdminMapDogResponsive
