import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function GeneroBtn() {
  return (
  <div className='genero_wrapper'>
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Género</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="selec_genero"
        >
        <FormControlLabel value="hembra" control={<Radio />} label="Hembra" />
        <FormControlLabel value="macho" control={<Radio />} label="Macho" />
      </RadioGroup>
    </FormControl>
  </div>
  );
  }