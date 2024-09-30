import { Box, Typography, CircularProgress } from '@mui/material'
import React, { useState, useRef, useMemo, useEffect } from 'react'
import dayjs from 'dayjs'
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet'
import PopupData from './components/PopupData'
import { greenIcon, goldIcon, blueIcon } from '../../../../utils/marks'

const MultipleMapMark = ({ data, isLoading }) => {
  // console.log(
  //   data?.filter(
  //     (datum) =>
  //       dayjs(datum?.diaEntrega).diff(dayjs(), 'day') <= 0 &&
  //       dayjs(datum?.diaEntrega).diff(dayjs(), 'day') >= -9 &&
  //       datum?.aprobado === true
  //   )
  // )
  // boton para resetear puntos
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {isLoading ? (
        <CircularProgress color='secondary' />
      ) : (
        <>
          <MapContainer
            center={{ lat: -34.16348, lng: -58.95238 }}
            zoom={15}
            scrollWheelZoom={true}
            style={{ height: '70vh' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            {data
              ?.filter(
                (datum) =>
                  dayjs(datum?.diaEntrega).diff(dayjs(), 'day') <= 0 &&
                  dayjs(datum?.diaEntrega).diff(dayjs(), 'day') >= -9 &&
                  datum?.aprobado === true
              )
              ?.map((datum) => (
                <Marker
                  draggable
                  key={datum.id}
                  position={{
                    lat: datum?.coordenadas?.item1,
                    lng: datum?.coordenadas?.item2,
                  }}
                  icon={
                    datum?.tipo === 'Aridos'
                      ? goldIcon
                      : datum?.tipo === 'Ramas'
                      ? greenIcon
                      : // : datum?.tipo === "Especiales" ? blueIcon
                        blueIcon
                  }
                >
                  <Box component={Popup} sx={{ width: { xs: '300px', md: '350px' } }}>
                    <PopupData title='Empresa:' datum={datum?.empresaNombre} />
                    {/* <PopupData title="Tipo:" datum={datum?.tipo} /> */}
                    <PopupData title='Entrega:' datum={dayjs(datum?.diaEntrega).format('DD/MM/YYYY')} />
                    <PopupData title='Retiro:' datum={dayjs(datum?.diaRetiro).format('DD/MM/YYYY')} />
                    <PopupData title='Volquete n.°:' datum={datum?.id} />
                  </Box>
                </Marker>
              ))}
          </MapContainer>
          <Typography variant='subtitle1' sx={{ m: '10px 0 10px 0' }}>
            Los marcadores en el mapa muestran donde estan ubicados los volquetes aprobados actualmente. Esto se
            actualiza dependiendo la fecha de entrega cargada en las solicitudes del formulario y la fecha actual.
            Puedes arrastrar los marcadores en caso de que haya varios superpuestos para poder desplegar su información.
          </Typography>
        </>
      )}
    </Box>
  )
}
export default MultipleMapMark
