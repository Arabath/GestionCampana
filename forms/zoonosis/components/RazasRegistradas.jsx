import { useState } from 'react';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import { MenuItem, Box } from '@mui/material';



const listaPerros = [
    {label: 'Pit bull terrier', value: 1},
    {label: 'Staffordshire bull terrier', value: 2},
    {label: 'American staffordshire terrier', value: 3},
    {label: 'Rottweiler', value:4},
    {label: 'Dogo argentino', value:5},
    {label: 'Tosa inu', value:6},
    {label: 'Akita inu', value: 7},
    {label: 'Dóberman', value: 8},
    {label: 'Bullmastiff', value:9},
    {label: 'Dogo de Burdeos', value:10},
    {label: 'Mastín napolitano', value:11},
    {label: 'Bóxer', value:12},
  ]
  
const RazasRegistradas = ({css}) => {
  const [raza, setRaza] = useState(1)

  const handleRaza = (e) => {
    setRaza(e.target.value)
  }

  return (
        <TextField
              sx={css.input}
              name='raza_registrada'
              select
              label="Select"
              value={raza}
              onChange={handleRaza}
              >
            {listaPerros.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
        </TextField>
  )
}


  export default RazasRegistradas;
