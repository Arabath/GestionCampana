import React, { useState } from 'react'
import AdminNavBarContainer from '../../components/AdminNavBarContainer'
import AdminGridDataDogs from '../features/DataDog/AdminGridDataDogs'
import AdminStatus from '../features/AdminStatus'
import { useParams } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { fetchDataDog } from '../../../services/api'
import { Box } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import SnackbarComponent from '../../../common/components/SnackbarComponent'
import useMyQuery from '../../../common/hooks/useMyQuery'
import useMyMutation from '../../../common/hooks/useMyMutation'
import { fetchStatusDog } from '../../../services/api'

const AdminDataDogs = () => {
  const { auth } = useAuth()
  const { id } = useParams()
  const [openSnack, setOpenSnack] = useState({ openSnackStatus: false })
  const payload = { dogId: id, token: auth.token }
  const { data: dataDog, isLoading } = useMyQuery(['getAllDataDog', payload], () => fetchDataDog(payload))

  const queryClient = useQueryClient()
  const {
    mutate,
    isLoading: loading,
    data: mutationData,
  } = useMyMutation((payload) => fetchStatusDog(payload), {
    onSuccess: () => {
      // console.log("hola")
      setOpenSnack({ openSnackStatus: true })
      queryClient.invalidateQueries('getAllDataDog')
    },
  })
  // console.log(mutationData);

  const handleCloseSnack = (event, reason) => {
    setOpenSnack({ openSnackStatus: false })
  }

  return (
    <>
      <AdminNavBarContainer variant='zoonosis' />
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column-reverse', md: 'row' },
          justifyContent: 'space-between',
          p: { xs: '10px 16px 0 16px', md: '10px 25px 0 25px' },
        }}
      >
        <h2 style={{ margin: 0, color: '#4428a2' }}>Datos del perro:</h2>
        <AdminStatus id={id} token={auth.token} data={dataDog} mutate={mutate} loading={loading} />
      </Box>

      <Box sx={{ p: { xs: '0 16px', md: '0 25px' } }}>
        <AdminGridDataDogs dataDog={dataDog} isLoading={isLoading} />
      </Box>
      <SnackbarComponent
        handleClose={handleCloseSnack}
        openSnack={openSnack.openSnackStatus}
        mutation={mutationData}
        successMessage='La peticion se ha enviado exitosamente'
      />
    </>
  )
}

export default AdminDataDogs
