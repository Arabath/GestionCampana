import React, { useState } from 'react'
import { Box, Typography, Button } from '@mui/material'
import AdminDatum from '../../../../components/AdminDatum'
import useBreakpoint from '../../../../../common/hooks/useBreakpoint'
import altaIcon from '../../../../../assets/alta.svg'
import bajaIcon from '../../../../../assets/baja.svg'
import pendienteIcon from '../../../../../assets/pendiente.svg'
import RejectionReasonModal from './RejectionReasonModal'

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

const AdminEmpresas = ({ data, isLoading }) => {
  const matches = useBreakpoint('sm')
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  // console.log(data)
  return (
    <Box className='data-dog'>
      <Typography
        sx={{
          textTransform: 'uppercase',
          color: '#4428a2',
          alignSelf: 'flex-start',
          paddingLeft: '2.5%',
          fontWeight: 'bold',
          fontSize: '1.17em',
          marginBlockStart: '1em',
          marginBlockEnd: '1em',
          marginInlineStart: '0px',
          marginInlineEnd: '0px',
        }}
      >
        Datos Empresa
      </Typography>
      <Box sx={matches ? grid : gridResponsive}>
        <AdminDatum title='Razón social:' text={data?.empresaNombre ?? '-'} isLoading={isLoading} />
        <AdminDatum title='Nombre del chofer:' text={data?.nombreChofer ?? '-'} isLoading={isLoading} />
        <AdminDatum title='DNI del chofer' text={data?.dniChofer ?? '-'} isLoading={isLoading} />
        <AdminDatum title='Patente del camion:' text={data?.patenteCamion ?? '-'} isLoading={isLoading} />
        <AdminDatum title='Tipo de volquete:' text={data?.tipo ?? '-'} isLoading={isLoading} />
        <AdminDatum title='Volquete N°:' text={data?.numeroVolquete ?? '-'} isLoading={isLoading} />

        {/* Campo ESTADO */}
        <Box
          sx={{
            display: 'grid',
            width: '90%',
            gridTemplateColumns: '1fr 1fr',
          }}
        >
          <Typography
            sx={{
              margin: '0 20px 0 0 ',
              fontSize: '1.8rem',
              whiteSpace: 'wrap',
              color: '#4428a2',
              fontWeight: 'bold',
            }}
            isLoading={isLoading}
          >
            Estado:
          </Typography>
          {isLoading ? (
            <LinearProgress sx={{ mt: 1, mb: 2 }} />
          ) : (
            <Box
              sx={{
                fontSize: '1.8rem',
                width: '100%',
                wordBreak: 'break-word',
              }}
            >
              {data?.aprobado === null ? (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <img src={pendienteIcon} alt='icono de baja' />
                  <Box sx={{ color: '#01579b' }}>Pendiente</Box>
                </Box>
              ) : data?.aprobado === true ? (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <img src={altaIcon} alt='icono de baja' />
                  <Box sx={{ color: '#1b5e20' }}>Aceptado</Box>
                </Box>
              ) : (
                data?.aprobado === false && (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img src={bajaIcon} alt='icono de baja' />
                    <Box sx={{ color: '#c62828' }}>Rechazado</Box>
                  </Box>
                )
              )}
            </Box>
          )}
        </Box>

        {/* Modal motivo en caso que el estado sea RECHAZADO */}
        {data?.aprobado === false && (
          <Box
            sx={{
              display: 'grid',
              width: '90%',
              gridTemplateColumns: '1fr 1fr',
            }}
          >
            <Typography
              sx={{
                margin: '0 20px 0 0 ',
                fontSize: '1.8rem',
                whiteSpace: 'wrap',
                color: '#4428a2',
                fontWeight: 'bold',
              }}
            >
              Ver motivo del rechazo:
            </Typography>
            {isLoading ? (
              <LinearProgress sx={{ mt: 1, mb: 2 }} />
            ) : (
              <Box
                sx={{
                  fontSize: '1.8rem',
                  width: '100%',
                  wordBreak: 'break-word',
                }}
              >
                <Button
                  variant='contained'
                  onClick={() => {
                    handleOpen()
                  }}
                >
                  Motivo
                </Button>
                <RejectionReasonModal open={open} handleClose={handleClose} data={data} />
              </Box>
            )}
          </Box>
        )}
        <AdminDatum title='Destino final del material:' text={data?.destinoFinal ?? '-'} isLoading={isLoading} />
        <AdminDatum title='Solicitud N°:' text={data?.id ?? '-'} isLoading={isLoading} />
        <AdminDatum title='Lotes Country/ETC:' text={data?.loteCountry ?? '-'} isLoading={isLoading} />
      </Box>
    </Box>
  )
}

export default AdminEmpresas
