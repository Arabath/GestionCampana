import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const SnackbarComponentVolquetes = ({ handleClose, openSnack, mutation, successMessage }) => {
  // console.log("Mutation object:", mutation);

  const getSeverity = () => {
    if (mutation?.status === 200 || mutation?.message === 'Solicitud actualizada' || mutation?.message === 'Solicitud creada') {
      return 'success';
    } else if (mutation?.status >= 400 && mutation?.status < 500) {
      return 'error'; // Error del cliente
    } else if (mutation?.status >= 500) {
      return 'error'; // Error del servidor
    } else if (mutation instanceof Error) {
      return 'error'; // Error general
    } else {
      return 'error'; 
    }
  };

  const getMessage = () => {
    if (mutation?.status === 200 || mutation?.message === 'Solicitud actualizada' || mutation?.message === 'Solicitud creada') {
      return successMessage || mutation?.message;
    } else if (mutation instanceof Error) {
      return mutation.message; // Captura el mensaje del error
    } else if (mutation?.status >= 400 && mutation?.status < 500) {
      // Verifica diferentes ubicaciones posibles del mensaje de error
      return mutation?.response?.data?.message || mutation?.message || 'Error en la petición';
    } else if (mutation?.status >= 500) {
      return 'Error en el servidor';
    } else {
      return 'Error desconocido';
    }
  };

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
        severity={getSeverity()}
      >
        {getMessage()}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponentVolquetes;
