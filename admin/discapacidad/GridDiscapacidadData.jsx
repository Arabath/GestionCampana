import React from 'react'

import { Box } from '@mui/material'
import AdminPersonal from './AdminPersonal'
import AdminStreet from './AdminStreet'
import useBreakpoint from '../../common/hooks/useBreakpoint'
import AdminCode from './AdminCode'

const GridDiscapacidadData = ({ data, isLoading }) => {
  const matchesMD = useBreakpoint('md')

  return (
    <>
      <Box
        className='data-dog-container'
        sx={matchesMD ? { gridTemplateColumns: 'repeat(2, 1fr)' } : { gridTemplateColumns: 'repeat(1, 1fr)' }}
      >
        <AdminPersonal data={data} isLoading={isLoading} />
        <AdminStreet data={data} isLoading={isLoading} />
        <AdminCode data={data} isLoading={isLoading} />
      </Box>
    </>
  )
}

export default GridDiscapacidadData
