import { useState } from 'react';
import * as React from 'react';
import { MenuItem, TextField } from '@mui/material';

const ListaDinamica = ({ lista_din, name, label, css }) => {
  const [lista, setLista] = useState("")

  const handleLista = (e) => {
    setLista(e.target.value)
  }

  return (
    <>
      <TextField
        sx={css.input}
        name={name}
        select
        label={label}
        value={lista}
        onChange={handleLista}
        >
        {lista_din.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
  </>

  )
}


export default ListaDinamica;
