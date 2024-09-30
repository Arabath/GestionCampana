import React from 'react'
import { Snackbar, Alert } from '@mui/material'

const SnackbarComponent = ({ handleClose, openSnack, mutation, successMessage }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      open={openSnack}
      autoHideDuration={10000}
      onClose={handleClose}
      key={'bottom' + 'left'}
      sx={{ zIndex: 1301 }}
    >
      <Alert
        onClose={handleClose}
        elevation={6}
        sx={{
          fontSize: 18,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
        variant='filled'
        severity={
          mutation?.status === 200 || mutation?.message == 'Solicitud actualizada' || mutation === 'ok' ? 'success' : 'error'
        }
      >
        {mutation?.status === 200 || mutation?.message == 'Solicitud actualizada' || mutation === 'ok'
          ? successMessage
          : mutation?.status >= 400
          ? 'Error en la petición'
          : mutation?.status >= 500
          ? 'Error en el servidor'
          : 'Error'}
        {/* error de credenciales */}
      </Alert>
    </Snackbar>
  )
}

export default SnackbarComponent
