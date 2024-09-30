import { Box, Typography } from '@mui/material'
import React, { useState, useRef, useMemo, useEffect } from 'react'
import { MapContainer, Marker, TileLayer, useMapEvents, useMap } from 'react-leaflet'
import InputContainer from '../../common/components/InputContainer'

const LocationOnClick = ({ setPosition }) => {
  const map = useMapEvents({
    click(e) {
      // console.log(e);
      setPosition(e.latlng)
    },
  })
  return null
}

function ChangeView({ center, zoom }) {
  const map = useMap()
  map.setView(center, zoom)
  return null
}

const MapMark = ({ subtitle, title, width, data, variant, watch, setValue, position, setPosition }) => {
  const markerRef = useRef(null)
  // console.log(data?.coordenadas.item1);
  useEffect(() => {
    if (typeof data?.coordenadas == 'object') {
      position.lat = data?.coordenadas.item1
      position.lng = data?.coordenadas.item2
      setPosition({ ...position })
    }
    if (variant !== 'admin') {
      setValue('Coordenadas.item1', position.lat)
      setValue('Coordenadas.item2', position.lng)
    }
  }, [data])

  useEffect(() => {
    if (variant !== 'admin') {
      setValue('Coordenadas.item1', position.lat)
      setValue('Coordenadas.item2', position.lng)
    }
  }, [position])

  return (
    <InputContainer title={title} subtitle={subtitle} width={width}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <MapContainer center={position} zoom={15} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <ChangeView center={position} />
          <Marker draggable={variant !== 'admin' ? true : false} position={position} ref={markerRef} />
          {variant !== 'admin' && <LocationOnClick setPosition={setPosition} />}
        </MapContainer>
        <Typography variant='subtitle1' sx={{ mb: '10px' }}>
          Su geolocalizacion actual es: {position.lat + ', ' + position.lng}
        </Typography>
      </Box>
    </InputContainer>
  )
}
export default MapMark
