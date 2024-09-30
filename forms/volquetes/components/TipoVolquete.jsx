import { Autocomplete, TextField } from '@mui/material'
import React, { useState } from 'react'

export default function TipoVolquete({ css, dataTipoVol, volqueteData, setVolqueteData }) {
  const [value, setValue] = useState(0)

  const options = dataTipoVol == null ? [] : dataTipoVol?.data

  const handleAutoComplete = (e, value) => {
    volqueteData.TipoVolqueteId = value.value
    setVolqueteData({ ...volqueteData })
    setValue(value.label)
  }

  return (
    <>
      <Autocomplete
        sx={css.input}
        disablePortal
        value={value || []}
        onChange={handleAutoComplete}
        id='combo-box-demo'
        options={options}
        renderInput={(params) => <TextField {...params} label='Tipo Volquete' />}
      />
    </>
  )
}
