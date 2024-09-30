import { TextField, Modal, Typography, Button, Box, Checkbox } from '@mui/material'
import LoadingButton from '../../../common/components/LoadingButton'
import { useState, useEffect } from 'react'

const css = {
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '30px',
    p: 4,
  },
  buttonContainer: {
    mt: '20px',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  input: {
    width: '100%',
    mb: '20px',
  },
}

const ModalCredenciales = ({ open, handleClose, loading, mutate, register, watch, checked, setChecked }) => {
  const handleChange = (event) => {
    if (event.target.checked) {
      localStorage.setItem('empresaUsuario', watch('empresaUsuario'))
      localStorage.setItem('empresaCodigo', watch('empresaCodigo'))
    } else {
      localStorage.removeItem('empresaUsuario')
      localStorage.removeItem('empresaCodigo')
    }
    // console.log(localStorage.getItem('empresaUsuario'))
    // console.log(localStorage.getItem('empresaCodigo'))
    setChecked(event.target.checked)
  }

  useEffect(() => {
    if (localStorage.getItem('empresaUsuario') && localStorage.getItem('empresaCodigo')) {
      setChecked(true)
    } else {
      setChecked(false)
    }
  }, [])

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={css.modal}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              variant='h5'
              sx={{
                fontWeight: 700,
                color: '#4428a2',
                alignSelf: 'center',
                whiteSpace: 'nowrap',
                margin: 0,
              }}
            >
              Ingrese sus credenciales
            </Typography>
            <Typography subtitle='h2' sx={{ mb: '20px' }}>
              Las credenciales son únicas por cada empresa de volquetes registrada.
            </Typography>

            <TextField {...register('empresaUsuario')} label='Usuario' sx={css.input} inputProps={{ maxLength: 128 }} />
            <TextField {...register('empresaCodigo')} label='Contraseña' sx={css.input} inputProps={{ maxLength: 128 }} />
            <Box sx={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center' }}>
              <Checkbox checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} />
              <Typography>Recordar credenciales</Typography>
            </Box>
            <Box sx={css.buttonContainer}>
              <LoadingButton
                type='submit'
                onClick={() => {
                  if (checked) {
                    localStorage.setItem('empresaUsuario', watch('empresaUsuario'))
                    localStorage.setItem('empresaCodigo', watch('empresaCodigo'))
                  }
                  mutate(watch())
                }}
                disabled={watch('empresaUsuario') === '' || watch('empresaCodigo') === ''}
                variant='contained'
                loading={loading}
              >
                Enviar
              </LoadingButton>
              <Button onClick={handleClose} variant='outlined'>
                Cerrar modal
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default ModalCredenciales
