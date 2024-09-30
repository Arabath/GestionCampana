import { Box } from '@mui/material'
import React from 'react'
import useMyQuery from '../../common/hooks/useMyQuery'
import { fetchDataDiscapacidad } from '../../services/api'
import AdminNavBarContainer from '../components/AdminNavBarContainer'
import useAuth from '../hooks/useAuth'
import GridDiscapacidadData from './GridDiscapacidadData'
import { useParams } from 'react-router-dom'

const DiscapacidadData = () => {
  const { auth } = useAuth()
  const { id } = useParams()
  const payload = { discapacidadId: id, token: auth.token }
  const { data, isLoading } = useMyQuery(['getAllDataDiscapacidad', payload], () => fetchDataDiscapacidad(payload))

  return (
    <>
      <AdminNavBarContainer variant='discapacidad' />
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column-reverse', md: 'row' },
          justifyContent: 'space-between',
          p: { xs: '10px 16px 0 16px', md: '10px 25px 0 25px' },
        }}
      >
        <h2 style={{ margin: 0, color: '#4428a2' }}>Datos del solicitud:</h2>
      </Box>
      <Box sx={{ p: { xs: '0 16px', md: '0 25px' } }}>
        <GridDiscapacidadData data={data?.data} />
      </Box>
    </>
  )
}

export default DiscapacidadData
