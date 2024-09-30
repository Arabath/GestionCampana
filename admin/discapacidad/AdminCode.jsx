import React, { useState } from 'react'
import { Box, Typography, Button } from '@mui/material'
import AdminDatum from '../components/AdminDatum'
import useBreakpoint from '../../common/hooks/useBreakpoint'
import Barcode from 'react-barcode'

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

const AdminCode = ({ data, isLoading }) => {
  const matches = useBreakpoint('sm')
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }
  const fechaVencimiento = data?.fechaNacimiento
    ? new Intl.DateTimeFormat('es', options).format(new Date(data?.fechaNacimiento))
    : '-'

  return (
    <Box className='data-dog'>
      <Box sx={matches ? grid : gridResponsive}>
        <AdminDatum title='email:' text={data?.email ?? '-'} isLoading={isLoading} />
        <AdminDatum title='Solicitud N°:' text={data?.id ?? '-'} isLoading={isLoading} />
        <AdminDatum title='Diagnostico CUD:' text={data?.diagnosticoCUD ?? '-'} isLoading={isLoading} />
        <AdminDatum title='Fecha vencimiento CUD:' text={fechaVencimiento} isLoading={isLoading} />
        <Box sx={{ width: '100%', justifySelf: 'center', alignSelf: 'center' }}>
          <Barcode value={data?.codeBar ?? null} format='CODE39' />
        </Box>
        <AdminDatum
          title='Empleado municipal:'
          text={data?.esEmpleadoMunicipal ? 'Sí' : 'No' ?? '-'}
          isLoading={isLoading}
        />
      </Box>
    </Box>
  )
}

export default AdminCode
