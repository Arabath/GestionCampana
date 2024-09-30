import { TextField, Autocomplete } from '@mui/material'
import InputContainer from '../../../common/components/InputContainer'
import { useState } from 'react'

const StreetSelector = ({ css, calles, register, setValue, watch }) => {
  const onChange = (variant, value) => {
    if (variant == 'Calle') {
      setValue('Calle', value?.id)
    } else if (variant == 'EntreCalle1') {
      setValue('EntreCalle1', value?.id)
    } else if (variant == 'EntreCalle2') {
      setValue('EntreCalle2', value?.id)
    }
  }
  const street =
    watch('Calle') === '' ||
    watch('Calle') === undefined ||
    watch('Calle') === null ||
    watch('EntreCalle1') === '' ||
    watch('EntreCalle1') === undefined ||
    watch('EntreCalle1') === null ||
    watch('EntreCalle2') === '' ||
    watch('EntreCalle2') === undefined ||
    watch('EntreCalle2') === null

  return (
    <>
      <InputContainer title='Calle*' subtitle={'Si no posee altura especifique sus entrecalles'}>
        <Autocomplete
          sx={css.input}
          value={calles?.find((calle) => calle.id === watch('Calle')) || null}
          {...register('Calle', { required: watch('LoteCountry') === '' })}
          options={calles ? calles : []}
          onChange={(e, value) => onChange('Calle', value)}
          renderInput={(params) => <TextField {...params} label='Calle' />}
          getOptionLabel={(option) => option.descripcion}
        />
        <TextField
          {...register('Altura')}
          type='number'
          label='Altura Calle'
          sx={css.input}
          inputProps={{
            pattern: '[0-9]+',
            maxLength: 9,
          }}
        />
      </InputContainer>
      <InputContainer>
        <Autocomplete
          sx={css.input}
          value={calles?.find((calle) => calle.id === watch('EntreCalle1')) || null}
          {...register('EntreCalle1', { required: watch('LoteCountry') === '' })}
          options={calles ? calles : []}
          onChange={(e, value) => onChange('EntreCalle1', value)}
          renderInput={(params) => <TextField {...params} label='Entre calle 1' />}
          getOptionLabel={(option) => option.descripcion}
        />
        <Autocomplete
          sx={css.input}
          value={calles?.find((calle) => calle.id === watch('EntreCalle2')) || null}
          {...register('EntreCalle2', { required: watch('LoteCountry') === '' })}
          options={calles ? calles : []}
          onChange={(e, value) => onChange('EntreCalle2', value)}
          renderInput={(params) => <TextField {...params} label='Entre calle 2' />}
          getOptionLabel={(option) => option.descripcion}
        />
      </InputContainer>
      <InputContainer>
        <TextField
          {...register('LoteCountry', { required: street })}
          label='Lotes Country/ETC'
          sx={css.input}
          inputProps={{
            maxLength: 500,
          }}
        />
      </InputContainer>
    </>
  )
}

export default StreetSelector
