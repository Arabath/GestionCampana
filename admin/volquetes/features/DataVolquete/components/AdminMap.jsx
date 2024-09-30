import React, { useState } from 'react'
import { Box } from '@mui/material'
import MapMark from '../../../../../common/components/MapMark'

const center = { lat: -34.16326, lng: -58.95918 }
const AdminMap = ({ data, isLoading }) => {
  const [position, setPosition] = useState(center)
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: 'rgb(250, 250, 250)',
        borderRadius: '20px',
        justifySelf: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: 'rgba(182, 182, 182, 0.2) 0px 2px 8px 0px',
      }}
    >
      <h3
        style={{
          textTransform: 'uppercase',
          color: '#4428a2',
          alignSelf: 'flex-start',
          paddingLeft: '2.5%',
        }}
      >
        Mapa
      </h3>
      <MapMark width='95%' data={data} variant='admin' position={position} setPosition={setPosition} />
    </Box>
  )
}

export default AdminMap
