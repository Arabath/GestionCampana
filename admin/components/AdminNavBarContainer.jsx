import React, { useState } from 'react'
import { Button, AppBar, Toolbar, Typography, MenuItem, Menu, Box } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'
import PalaCampanenseIcon from '../../assets/logos/palaCampanense.svg'
import discapacidadWhite from '../../assets/logos/discapacidadWhite.svg'
import arrowLeft from '../../assets/arrowLeft.svg'
// import circleIcon from "../../assets/whiteCircle.svg";
import pawIcon from '../../assets/pawWhite.svg'
import volqueteLogo from '../../assets/logos/volqueteLogo.svg'
import { routes } from '../../utils/paths'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useBreakpoint from '../../common/hooks/useBreakpoint'

const AdminNavBarContainer = ({ variant }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const navigate = useNavigate()
  const { logout, auth } = useAuth()
  const matches = useBreakpoint('sm')
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  // console.log(auth);
  return (
    <div>
      <AppBar position='static'>
        <Toolbar
          sx={
            window.location.pathname.includes('zoonosis/')
              ? { justifyContent: 'space-between' }
              : { justifyContent: 'space-between' }
          }
        >
          {window.location.pathname.includes('zoonosis/') ||
          window.location.pathname.includes('volquetes/') ||
          window.location.pathname.includes('discapacidad/') ? (
            <Button
              variant='contained'
              onClick={() =>
                window.location.pathname.includes('zoonosis/')
                  ? navigate(routes.adminZoonosis)
                  : window.location.pathname.includes('volquetes/')
                  ? navigate(routes.adminVolquetes)
                  : window.location.pathname.includes('discapacidad/') && navigate(routes.adminDiscapacidad)
              }
              sx={{
                color: '#fafafa',
                fontWeight: 600,
                display: 'flex',
                placeContent: 'center',
                cursor: 'pointer',
              }}
              color='secondary'
            >
              <img src={arrowLeft} alt='icono de flecha' />
              volver
            </Button>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={
                  window.location.pathname.includes('zoonosis')
                    ? pawIcon
                    : window.location.pathname.includes('volquete')
                    ? volqueteLogo
                    : window.location.pathname.includes('discapacidad')
                    ? discapacidadWhite
                    : PalaCampanenseIcon
                }
                alt='logo'
                style={{ width: '40px', height: '40px' }}
              />
              <Typography variant='subtitle1' sx={{ ml: '15px' }}>
                {variant === 'panel' && 'Rol: ' + auth?.permisos?.toString()}
              </Typography>
            </Box>
          )}
          {variant === 'volquetes' && (
            <Button
              variant='contained'
              sx={{
                color: '#fafafa',
                fontWeight: 600,
                display: 'flex',
                placeContent: 'center',
                cursor: 'pointer',
              }}
              color='secondary'
              onClick={() => navigate(routes.adminHistorico)}
            >
              volquetes hoy{' '}
              <Box sx={{ width: '15px' }}>
                <Box className='notification-white' />
              </Box>
            </Button>
          )}
          <div
            onClick={handleMenu}
            style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              gap: '5px',
            }}
          >
            {matches && <Typography>{auth.username}</Typography>}
            <AccountCircle sx={{ width: '40px', height: '40px' }} />
          </div>
          <Menu
            sx={{ mt: '30px' }}
            id='menu-appbar'
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {(variant === 'zoonosis' || variant === 'volquetes' || variant === 'discapacidad') && (
              <MenuItem
                onClick={() => {
                  navigate(routes.adminPanel)
                }}
              >
                Volver a panel
              </MenuItem>
            )}
            <MenuItem
              onClick={() => {
                handleClose()
                logout()
              }}
            >
              Cerrar sesión
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default AdminNavBarContainer
