import {
  Autocomplete,
  Box,
  FormControlLabel,
  Popover,
  TextField,
  FormControl,
  RadioGroup,
  FormLabel,
  Radio,
} from '@mui/material'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import informationIcon from '../../../assets/information.svg'
import codebarImage from '../../../assets/codebarImage.jpeg'
import InputContainer from '../../../common/components/InputContainer'
import { fetchBarrios, fetchCalles, fetchCoberturas, fetchDiscapacidad } from '../../../services/api'

const Imputs = ({ css, register, watch, setValue, mutation }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const { data: calles } = useQuery(['fetchCalles'], fetchCalles)
  const { data: barrios } = useQuery(['fetchBarrios'], fetchBarrios)
  const { data: discapacidad } = useQuery(['fetchDiscapacidad'], fetchDiscapacidad)
  const { data: coberturas } = useQuery(['fetchCoberturas'], fetchCoberturas)
  const handleClick = (event) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined
  const handleDate = (newValue, variant) => setValue(variant, newValue?.$d)
  const handleNumbers = (event, input) => {
    const inputValue = event.target.value
    const numericValue = inputValue.replace(/[^0-9]/g, '')
    setValue(input, numericValue)
  }
  const onChange = (variant, value) => {
    if (value === undefined) {
      setValue(variant, '')
    } else {
      setValue(variant, String(value))
    }
  }

  const beneficiarios = [
    { descripcion: 'No', id: 0 },
    { descripcion: 'Si', id: 1 },
  ]

  return (
    <>
      <InputContainer>
        <TextField label='Nombre' {...register('Nombre', { required: true })} sx={css.input} />
        <TextField label='Apellido' {...register('Apellido', { required: true })} sx={css.input} />
      </InputContainer>
      <InputContainer>
        <MobileDatePicker
          label='Fecha de nacimiento'
          inputFormat='DD/MM/YYYY'
          maxDate={new Date()}
          onChange={(e) => handleDate(e, 'FechaNacimiento')}
          value={watch('FechaNacimiento')}
          renderInput={(params) => (
            <TextField sx={css.input} {...register('FechaNacimiento', { required: true })} {...params} />
          )}
        />
        <TextField
          type='text'
          label='DNI'
          {...register('DNI', { required: true, pattern: /^[0-9]{1,12}$/, onChange: (e) => handleNumbers(e, 'DNI') })}
          sx={css.input}
          inputProps={{ maxLength: 12 }}
        />
      </InputContainer>
      <InputContainer>
        <Autocomplete
          sx={css.input}
          disableClearable
          value={calles?.find((calle) => String(calle.id) === watch('CalleId')) || null}
          {...register('CalleId', { minLength: watch('LoteCountry') === '' ? 1 : 0 })}
          options={calles ? calles : []}
          onChange={(e, value) => onChange('CalleId', value.id)}
          renderInput={(params) => <TextField {...params} label='Calle' />}
          getOptionLabel={(option) => option.descripcion}
        />
        <TextField
          {...register('Altura', { minLength: watch('LoteCountry') === '' ? 1 : 0 })}
          type='number'
          label='Altura Calle'
          sx={css.input}
          inputProps={{ pattern: '[0-9]+', maxLength: 9 }}
        />
      </InputContainer>
      <InputContainer>
        <Autocomplete
          sx={css.input}
          disableClearable
          value={barrios?.find((calle) => String(calle.id) === watch('BarrioId')) || null}
          {...register('BarrioId', { required: true })}
          options={barrios ? barrios : []}
          onChange={(e, value) => onChange('BarrioId', value.id)}
          renderInput={(params) => <TextField {...params} label='Barrio' />}
          getOptionLabel={(option) => option.descripcion}
        />
        <TextField
          {...register('LoteCountry', { required: !watch('Altura') || !watch('CalleId') })}
          label='Lotes Country/ETC'
          sx={css.input}
          inputProps={{ maxLength: 500 }}
        />
      </InputContainer>
      <InputContainer>
        <Box sx={{ position: 'relative', ...css.input }}>
          <TextField
            type='text'
            {...register('Celular', {
              required: true,
              pattern: /^[0-9]{1,12}$/,
              onChange: (e) => handleNumbers(e, 'Celular'),
            })}
            sx={{ width: '100%' }}
            placeholder='Celular'
            InputLabelProps={{ style: { paddingLeft: '60px' } }}
            helperText='10 digitos'
            inputProps={{ maxLength: 10 }}
          />
        </Box>
        <TextField label='Mail' {...register('Email', { required: false })} sx={css.input} />
      </InputContainer>
      <InputContainer>
        <TextField label='Diagnóstico según CUD' {...register('DiagnosticoCUD', { required: true })} sx={css.input} />
        <Autocomplete
          sx={css.input}
          key={mutation.isSuccess}
          multiple
          disableClearable
          filterSelectedOptions
          options={discapacidad?.data || []}
          onChange={(e, value) =>
            onChange(
              'TipoDiscapacidadId',
              value.map((v) => v.value)
            )
          }
          renderInput={(params) => <TextField {...params} label='Tipo de discapacidad' />}
          getOptionLabel={(option) => option.label}
        />
        {/* <Autocomplete
          multiple
          options={top100Films}
          getOptionLabel={(option) => option.title}
          defaultValue={[top100Films[13]]}
          filterSelectedOptions
          renderInput={(params) => <TextField {...params} label='filterSelectedOptions' placeholder='Favorites' />}
        /> */}
      </InputContainer>
      <InputContainer>
        <MobileDatePicker
          label='Fecha vencimiento CUD'
          inputFormat='DD/MM/YYYY'
          onChange={(e) => handleDate(e, 'FechaVencimientoCUD')}
          value={watch('FechaVencimientoCUD')}
          renderInput={(params) => (
            <TextField sx={css.input} {...register('FechaVencimientoCUD', { required: true })} {...params} />
          )}
        />
        <Autocomplete
          sx={css.input}
          disableClearable
          value={
            beneficiarios.find((beneficiario) => String(beneficiario.id) === watch('BeneficiarioPensionContributiva')) ||
            null
          }
          {...register('BeneficiarioPensionContributiva', { required: true })}
          options={beneficiarios || []}
          onChange={(e, value) => onChange('BeneficiarioPensionContributiva', value.id)}
          renderInput={(params) => <TextField {...params} label='Beneficiario de pensión no contributiva' />}
          getOptionLabel={(option) => option.descripcion}
        />
      </InputContainer>
      <InputContainer>
        <Autocomplete
          disableClearable
          sx={css.input}
          value={coberturas?.data?.find((cobertura) => String(cobertura.value) == watch('CoberturaSalud')) || null}
          {...register('CoberturaSalud', { required: true })}
          options={coberturas?.data || []}
          onChange={(e, value) => {
            onChange('CoberturaSalud', value.value)
            setValue('CoberturaSaludPrivada', '')
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              helperText={
                watch('CoberturaSalud') === '2'
                  ? 'Comprende a todas las Obras Sociales (INCLUSIVE PAMI e IOMA) y a las Prepagas'
                  : watch('CoberturaSalud') === '1'
                  ? 'No cuenta con Obra Social o Medicina Prepaga'
                  : ''
              }
              label='Cobertura de salud'
            />
          )}
          getOptionLabel={(option) => option.label}
        />
        {watch('CoberturaSalud') == 2 && (
          <TextField
            label='Cobertura de salud'
            {...register('CoberturaSaludPrivada', { required: watch('CoberturaSalud') === 2 })}
            sx={css.input}
          />
        )}
      </InputContainer>
      <InputContainer>
        <Box sx={{ ...css.input, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <TextField
            label='Numero codigo de barras'
            {...register('CodeBar', { required: true })}
            sx={{ ...css.input, width: '100%' }}
          />
          <Box
            component='img'
            src={informationIcon}
            alt='information Icon'
            sx={{ ml: '15px', width: { xs: '30px', lg: '40px' }, mb: '20px', cursor: 'pointer' }}
            onClick={handleClick}
          />
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'center',
              horizontal: 'right',
            }}
            sx={{ backgroundColor: 'transparent' }}
          >
            <Box component='img' src={codebarImage} sx={{ height: '70vh' }} alt='information Icon' />
          </Popover>
        </Box>
        <FormControl sx={css.input}>
          <FormLabel id='demo-controlled-radio-buttons-group'>¿Es empleado municipal?</FormLabel>
          <RadioGroup
            aria-labelledby='demo-controlled-radio-buttons-group'
            name='controlled-radio-buttons-group'
            value={watch('EsEmpleadoMunicipal')}
            onChange={(e) => setValue('EsEmpleadoMunicipal', e.target.value)}
            sx={{ flexDirection: 'row' }}
          >
            <FormControlLabel value='true' control={<Radio />} label='Sí' />
            <FormControlLabel value='false' control={<Radio />} label='No' />
          </RadioGroup>
        </FormControl>
      </InputContainer>
    </>
  )
}

export default Imputs
