import React, { useState } from 'react'
import { Box } from '@mui/material'
import { useParams } from 'react-router-dom'
import { fetchDataVolquete, fetchDataVolqueteUser, fetchStatusVolquete, fetchVolqueteID, fetchVolquetesTable } from '../../../services/api'
import useMyMutation from '../../../common/hooks/useMyMutation'
import { useQueryClient } from '@tanstack/react-query'
import UserNavBarContainer from '../components/UserNavBarContainer'
import GridVolqueteData from '../../../admin/volquetes/features/DataVolquete/GridVolqueteData'
import SnackbarComponent from '../../../common/components/SnackbarComponent'
import VolqueteStatus from '../../../admin/volquetes/features/DataVolquete/components/VolqueteStatus'
import useAuth from '../../../admin/hooks/useAuth'
import useMyQuery from '../../../common/hooks/useMyQuery'

const VolqueteUserData = () => {
  const { auth } = useAuth()
  const { id } = useParams()
  const token = auth.token;
  const queryClient = useQueryClient()

  const payload = { volqueteId: id, token: auth.token }
  const [openSnack, setOpenSnack] = useState({ openSnackStatus: false })
  const [open, setOpen] = useState(false)
  const { data, isLoading } = useMyQuery(['getAllDataVolquete', payload], () => fetchDataVolqueteUser(payload))
  // console.log(data)

  const handleOpen = () => {
    setOpen(true)
  }
  const handleCloseModal = () => {
    setOpen(false)
  }

  const {
    mutate,
    isLoading: loading,
    data: mutationData,
  } = useMyMutation((payload) => fetchStatusVolquete(payload), {
    onSuccess: () => {
      // console.log("hola")
      handleCloseModal()
      setOpenSnack({ openSnackStatus: true })
      queryClient.invalidateQueries('getVolquetes')
    },
  })
  // console.log(mutationData)
  const handleSnack = (newState) => () => {
    setOpenSnack({ open: true, ...newState })
  }

  const handleCloseSnack = (event, reason) => {
    setOpenSnack({ openSnackStatus: false })
  }

  // console.log(data);

  return (
    <>
      <UserNavBarContainer variant='volquetes' />
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column-reverse', md: 'row' },
          justifyContent: 'space-between',
          p: { xs: '10px 16px 0 16px', md: '10px 25px 0 25px' },
        }}
      >
        <h2 style={{ margin: 0, color: '#4428a2' }}>Datos del Volquete:</h2>
        {/* <VolqueteStatus
          data={data}
          id={id}
          token={auth.token}
          mutate={mutate}
          loading={loading}
          handleOpen={handleOpen}
          handleCloseModal={handleCloseModal}
          open={open}
        /> */}
      </Box>

      <Box sx={{ p: { xs: '0 16px', md: '0 25px' } }}>
        <GridVolqueteData data={data} />
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

export default VolqueteUserData
