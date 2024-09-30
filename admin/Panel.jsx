import AdminNavBarContainer from './components/AdminNavBarContainer'
import informationIcon from '../assets/information.svg'
import discapacidadImg from '../assets/discapacidad.png'
import volqueteImg from '../assets/volquete.jpg'
import volquetesMini from '../assets/volquetesMini.png'
import transitoImg from '../assets/transito-asset.png'
import zoonosisImg from '../assets/zoonosis.png'
import circleIcon from '../assets/circle.svg'
import obrasImg from '../assets/obras.png'
import pawIcon from '../assets/pawBlack.svg'
import volqueteBlack from '../assets/logos/volqueteBlack.svg'
import discapacidadLogo from '../assets/logos/discapacidadLogo.svg'
import React from 'react'
import { routes } from '../utils/paths'
import { Box, Typography, Button, Tooltip, Zoom } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import useBreakpoint from '../common/hooks/useBreakpoint'
import useAuth from './hooks/useAuth'

const css = {
  cardContainer: {
    background: '#FFF',
    border: '1px solid #5D35B2',
    boxShadow: '0px 4px 4px rgba(93, 53, 178, 0.4)',
    borderRadius: '10px',
    maxWidth: '350px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '385px',
    p: '10px 20px',
    mb: '20px',
  },
  button: {
    color: '#fafafa',
    fontWeight: 600,
    display: 'flex',
    placeContent: 'center',
    cursor: 'pointer',
    mt: '10px',
  },
  bodyContainer: {
    display: 'grid',
    gridTemplateColumns: {
      xs: 'repeat(1, 1fr)',
      lg: 'repeat(2, 1fr)',
      xl: 'repeat(3, 1fr)',
    },
    placeItems: 'center',
    // justifyContent: "space-between",
    // alignItems: "center",
    // flexDirection: { xs: "column", xl: "row" },
    mt: { xs: '20px', lg: '80px' },
  },
}
const Panel = () => {
  const { auth } = useAuth()
  const sitesData = [
    {
      image: zoonosisImg,
      title: 'Zoonosis',
      description: 'Rol requerido: Administrador de zoonosis',
      icon: pawIcon,
      disabled: auth?.permisos.includes('ZOONOSIS') ? false : true,
      path: routes.adminZoonosis,
    },
    {
      image: volquetesMini,
      title: 'Volquetes',
      description: 'Rol requerido: Administrador de volquetes',
      icon: volqueteBlack,
      disabled: auth?.permisos.includes('VOLQUETES') || auth?.permisos.includes('VOLQUETES_READ_ONLY') ? false : true,
      path: routes.adminVolquetes,
    },
    // {
      //   image: volquetesMini,
      //   title: 'Volquetes-user',
      //   description: 'Rol requerido: Usuario de volquetes',
      //   icon: volqueteBlack,
      //   disabled: auth?.permisos.includes('VOLQUETES_USER') ? false : true,
      //   path: routes.volquetesUserDashboard,
      // },
      {
        image: obrasImg,
        title: 'Obras',
      description: 'Rol requerido: Administrador de obras',
      icon: circleIcon,
      disabled: auth?.permisos.includes('OBRAS') ? false : true,
      path: routes.adminPanel,
    },
    {
      image: transitoImg,
      title: 'Transito',
      description: 'Rol requerido: Administrador de transito',
      icon: circleIcon,
      disabled: auth?.permisos.includes('VOLQUETES') || auth?.permisos.includes('VOLQUETES_READ_ONLY') ? false : true,
      path: routes.adminVolquetes,
    },
    {
      image: discapacidadImg,
      title: 'Discapacidad',
      description: 'Rol requerido: Administrador de discapacidad',
      icon: discapacidadLogo,
      disabled: false,
      path: routes.adminDiscapacidad,
    },
    {
      image: transitoImg,
      title: 'TRANSITO_ADMIN',
      description: 'Rol requerido: Administrador de transito',
      icon: circleIcon,
      disabled: auth?.permisos.includes('TRANSITO_ADMIN') ? false : true,
      path: routes.adminTransito,
    },
  ]
  const navigate = useNavigate()
  const tooltipText = 'Para solicitar cambio de rol puedes comunicarte con sistemas.'

  const matches = useBreakpoint('sm')
  return (
    <>
      <AdminNavBarContainer variant='panel' />
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          p: { xs: '0px 5px', md: '100px 200px' },
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: { xs: 'center', lg: 'flex-start' },
            whiteSpace: 'nowrap',
            mt: { xs: '20px', md: 0 },
          }}
        >
          <Typography variant={matches ? 'h4' : 'h5'} fontWeight='600'>
            Gestión Campana
          </Typography>
          <Tooltip TransitionComponent={Zoom} placement='top' title={tooltipText}>
            <Box
              component='img'
              src={informationIcon}
              alt='information Icon'
              sx={{ ml: '25px', width: { xs: '30px', lg: '40px' } }}
            />
          </Tooltip>
        </Box>
        <Box sx={css.bodyContainer}>
          {sitesData.map((dto) => (
            <>
              {auth?.permisos.includes(dto.title.toUpperCase()) && (
                <Box key={dto.title} sx={css.cardContainer}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      component='img'
                      src={dto.icon}
                      alt={dto.title + 'icon'}
                      sx={{ mr: '10px', width: '30px', height: '30px' }}
                    />
                    <Typography variant='h6' fontWeight='bold'>
                      {dto.title}
                    </Typography>
                  </Box>
                  <Box
                    component='img'
                    src={dto.image}
                    alt={dto.title + 'image'}
                    sx={{
                      mt: '5px',
                      width: '100%',
                      objectFit: 'cover',
                      maxHeight: '244px',
                      borderRadius: '10px',
                    }}
                  />
                  <Typography variant='body2'>{dto.description}</Typography>
                  <Button
                    variant='contained'
                    sx={css.button}
                    color='primary'
                    onClick={() => navigate(dto.path)}
                    disabled={dto.disabled}
                  >
                    Ingresar
                  </Button>
                </Box>
              )}
            </>
          ))}
        </Box>
      </Box>
    </>
  )
}

export default Panel
