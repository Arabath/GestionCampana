import React, { useState } from 'react'
import { Box, Typography, Button } from '@mui/material'
import AdminDatum from '../components/AdminDatum'
import useBreakpoint from '../../common/hooks/useBreakpoint'

const grid = {
  display: 'grid',
  gridTemplateColumns: '50% 50%',
  gap: '20px',
  alignItems: 'start',
  mb: 3,
  width: '95%',
}
const gridResponsive = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '5px',
  alignItems: 'start',
  mb: 4,
  width: '95%',
}

const AdminPersonal = ({ data, isLoading }) => {
  const matches = useBreakpoint('sm')
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }

  const fechaVencimientoCud = data?.fechaVencimientoCUD
    ? new Intl.DateTimeFormat('es', options).format(new Date(data?.fechaVencimientoCUD))
    : '-'
  return (
    <Box className='data-dog'>
      <Box sx={matches ? grid : gridResponsive}>
        <AdminDatum title='Nombre completo:' text={data?.nombre + ' ' + data?.apellido ?? '-'} isLoading={isLoading} />
        <AdminDatum title='DNI:' text={data?.dni ?? '-'} isLoading={isLoading} />
        <AdminDatum title='celular:' text={data?.celular ?? '-'} isLoading={isLoading} />
        <AdminDatum title='Fecha nacimiento:' text={fechaVencimientoCud} isLoading={isLoading} />
        <AdminDatum title='Cobertura salud:' text={data?.coberturaSalud ?? '-'} isLoading={isLoading} />
        <AdminDatum title='Cobertura privada:' text={data?.coberturaSaludPrivada ?? '-'} isLoading={isLoading} />
      </Box>
    </Box>
  )
}

export default AdminPersonal
