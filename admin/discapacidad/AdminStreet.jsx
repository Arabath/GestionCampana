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

const AdminStreet = ({ data, isLoading }) => {
  const matches = useBreakpoint('sm')
  return (
    <Box className='data-dog'>
      <Box sx={matches ? grid : gridResponsive}>
        <AdminDatum title='Tipo discapacidad:' text={data?.tipoDiscapacidad ?? '-'} isLoading={isLoading} />
        <AdminDatum
          title='Beneficiario Pension Contributiva:'
          text={data?.beneficiarioPensionContributiva ? 'Si' : 'No' ?? '-'}
          isLoading={isLoading}
        />
        <AdminDatum title='Barrio:' text={data?.barrio ?? '-'} isLoading={isLoading} />
        <AdminDatum title='Lotes Country/ETC:' text={data?.loteCountry ?? '-'} isLoading={isLoading} />
        <AdminDatum title='Calle:' text={data?.calle ?? '-'} isLoading={isLoading} />
        <AdminDatum title='Altura:' text={data?.altura ?? '-'} isLoading={isLoading} />
      </Box>
    </Box>
  )
}

export default AdminStreet
