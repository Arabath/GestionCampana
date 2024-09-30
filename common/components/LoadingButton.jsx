import React from 'react'
import { Button, CircularProgress } from '@mui/material'

export default function LoadingButton({loading, loadingColor, children, ...props}) {
  return (
    <Button {...props}>
        {children}
        { loading ? <CircularProgress color={loadingColor} size={20} sx={{marginLeft: '.5rem'}}/> : null}
    </Button>
  )
}
