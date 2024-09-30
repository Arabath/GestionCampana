import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import volqueteLogo from '../../../assets/logos/volqueteLogo.svg'
import useAuth from '../../../admin/hooks/useAuth'
import useBreakpoint from '../../../common/hooks/useBreakpoint'
import { routes } from '../../../utils/paths'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { Button, AppBar, Toolbar, Typography, MenuItem, Menu, Box } from '@mui/material'

const UserNavBarContainer = ({ variant }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()
  const { logout, auth } = useAuth()
  const matches = useBreakpoint('sm')

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const isDashboardDetail = location.pathname.includes('/volquetes/dashboard/') && !location.pathname.endsWith('/dashboard')

  return (
    <div>
      <AppBar position='static'>
        <Toolbar
          sx={{ justifyContent: 'space-between' }}
        >
          {isDashboardDetail ? (
            <Button
              variant='contained'
              onClick={() => navigate(routes.volquetesUserDashboard)}
              sx={{
                color: '#fafafa',
                fontWeight: 600,
                display: 'flex',
                placeContent: 'center',
                cursor: 'pointer',
              }}
              color='secondary'
            >
              Volver
            </Button>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img src={location.pathname.includes('volquete') ? volqueteLogo : PalaCampanenseIcon}
                alt='logo'
                style={{ width: '40px', height: '40px' }}
              />
              <Typography variant='subtitle1' sx={{ ml: '15px' }}>
                {variant === 'panel' && 'Rol: ' + auth?.permisos?.toString()}
              </Typography>
            </Box>
          )}
          {/* {variant === 'volquetes' && (
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
              onClick={() => navigate(routes.volquetesUserLocation)}
            >
              mis volquetes{' '}
              <Box sx={{ width: '15px' }}>
                <Box className='notification-white' />
              </Box>
            </Button>
          )} */}
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
            <MenuItem
              onClick={() => {
                handleClose()
                logout()
                navigate(routes.volquetesLogin)
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

export default UserNavBarContainer
