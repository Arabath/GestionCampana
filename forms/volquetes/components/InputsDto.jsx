import { TextField, Autocomplete, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import InputContainer from '../../../common/components/InputContainer'

const InputsDto = ({ css, dataTipoVol, register, setValue, watch }) => {
  const handleInputChange = (event) => {
    const inputValue = event.target.value
    const numericValue = inputValue.replace(/[^0-9]/g, '')
    setValue('DNIChofer', numericValue)
  }
  return (
    <>
      <InputContainer title={'Datos Chofer*'}>
        <TextField
          label='Nombre del chofer'
          {...register('NombreChofer', { required: true })}
          sx={css.input}
          inputProps={{
            maxLength: 50,
          }}
        />
        <TextField
          type='text' // Cambiado de 'number' a 'text'
          label='DNI chofer'
          {...register('DNIChofer', { required: true, pattern: /^[0-9]{1,12}$/, onChange: handleInputChange })}
          sx={css.input}
          inputProps={{
            maxLength: 12,
          }}
        />
      </InputContainer>
      <InputContainer>
        <TextField
          label='Patente del camión'
          {...register('PatenteCamion', { required: true })}
          sx={css.input}
          inputProps={{
            maxLength: 7,
          }}
        />
      </InputContainer>

      <InputContainer title={'Logística*'}>
        <Autocomplete
          sx={css.input}
          disablePortal
          value={dataTipoVol?.data?.find((tipo) => tipo.value === watch('TipoVolqueteId')) || null}
          {...register('TipoVolqueteId', { required: true })}
          onChange={(e, value) => setValue('TipoVolqueteId', value.value)}
          id='combo-box-demo'
          options={dataTipoVol == null ? [] : dataTipoVol?.data}
          renderInput={(params) => <TextField {...params} label='Tipo Volquete' />}
        />
        <TextField
          {...register('NumVolquete', { required: true })}
          type='number'
          label='Volquete N°'
          sx={css.input}
          inputProps={{
            maxLength: 20,
          }}
        />
      </InputContainer>

      <InputContainer>
      <FormControl  sx={css.input}>
        <InputLabel id="destino-final-del-material">Destino final del material</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // value={DestinoFinal}
          label="Destino final del material"
          {...register('DestinoFinal', { required: true })}
        >
          <MenuItem value={1}>Qualitas</MenuItem>
          <MenuItem value={2}>Predio Volquetero Las Praderas</MenuItem>
          <MenuItem value={3}>Predio Euroamérica</MenuItem>
          <MenuItem value={4}>Otros</MenuItem>
        </Select>
      </FormControl>
      {/* <Select
              {...register('DestinoFinal', { required: true })}
              labelId='destino-final-label'
              label='Destino final del material'
              sx={css.input}
            >
              <MenuItem value={1}>Qualitas</MenuItem>
              <MenuItem value={2}>Predio Volquetero Las Praderas</MenuItem>
              <MenuItem value={3}>Predio Euroamérica</MenuItem>
              <MenuItem value={4}>Otros</MenuItem>
      </Select> */}
      </InputContainer>
      <InputContainer title={'Datos Solicitante'}>
        <TextField
          {...register('NombreSolicitante', { required: true })}
          label='Nombre del solicitante'
          sx={css.input}
          inputProps={{
            maxLength: 50,
          }}
        />
      </InputContainer>
    </>
  )
}

export default InputsDto
