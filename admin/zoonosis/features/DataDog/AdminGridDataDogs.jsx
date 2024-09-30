import React from 'react'
import useBreakpoint from '../../../../common/hooks/useBreakpoint'
import AdminMapDogResponsive from '../AdminMapDogResponsive'
import AdminAdiestrador from './components/AdminAdiestrador'
import AdminCanino from './components/AdminCanino'
import AdminCriador from './components/AdminCriador'
import AdminDetalleSanitario from './components/AdminDetalleSanitario'
import AdminPropietario from './components/AdminPropietario'
import AdminSeguro from './components/AdminSeguro'
import AdminVeterinario from './components/AdminVeterinario'
import AdminDogPictures from './components/AdminDogPictures'
import { Box, Typography } from '@mui/material'

const AdminGridDataDogs = ({ dataDog, isLoading }) => {
  const matchesXL = useBreakpoint('xl')
  const matchesLG = useBreakpoint('lg')
  const matchesMD = useBreakpoint('md')
  const matchesSM = useBreakpoint('sm')
  // console.log(dataDog)
  return (
    <>
      <Box
        className='data-dog-container'
        sx={matchesLG ? { gridTemplateColumns: 'repeat(2, 1fr)' } : { gridTemplateColumns: 'repeat(1, 1fr)' }}
      >
        <Box className='data-dog' sx={{ display: 'flex', justifyContent: 'center', width: '100%', pb: '20px' }}>
          <Typography
            variant='h6'
            fontWeight='bold'
            sx={{
              textTransform: 'uppercase',
              color: '#4428a2',
              alignSelf: 'flex-start',
              paddingLeft: '10%',
            }}
          >
            Características fisicas:
          </Typography>
          <AdminMapDogResponsive
            size={matchesXL ? (0.5).toString() : (0.4).toString()}
            dataDog={dataDog?.observaciones}
          />
        </Box>
        <Box className='data-dog' sx={{ display: 'flex', justifyContent: 'center', width: '100%', pb: '50px' }}>
          <AdminDogPictures matchesSM={matchesSM} dataDog={dataDog} />
        </Box>
      </Box>
      <Box
        className='data-dog-container'
        sx={matchesMD ? { gridTemplateColumns: 'repeat(2, 1fr)' } : { gridTemplateColumns: 'repeat(1, 1fr)' }}
      >
        <AdminAdiestrador dataDog={dataDog} isLoading={isLoading} />
        <AdminCanino dataDog={dataDog} isLoading={isLoading} />
        <AdminCriador dataDog={dataDog} isLoading={isLoading} />
        <AdminDetalleSanitario dataDog={dataDog} isLoading={isLoading} />
        <AdminPropietario dataDog={dataDog} isLoading={isLoading} />
        <AdminSeguro dataDog={dataDog} isLoading={isLoading} />
        <AdminVeterinario dataDog={dataDog} isLoading={isLoading} />
      </Box>
    </>
  )
}

export default AdminGridDataDogs
