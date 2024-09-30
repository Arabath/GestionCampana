import { useState, useEffect } from 'react'
import 'dayjs/locale/es'
import { TextField, Box } from '@mui/material'
import dayjs from 'dayjs'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import InputContainer from '../../../common/components/InputContainer'

const DateInput = ({ css, register, setValue, watch, dateTo, setDateTo, dateFrom, setDateFrom }) => {
  const handleFrom = (newValue) => {
    setDateFrom(newValue)
    if (dayjs(watch('DiaRetiro')).diff(watch('DiaEntrega'), 'day') < 1) {
      setValue('DiaRetiro', '')
      setValue('DiaEntrega', newValue?.$d)
      setDateTo('')
    } else {
      setValue('DiaEntrega', newValue?.$d)
    }
  }
  const handleTo = (newValue) => {
    setDateTo(newValue)
    setValue('DiaRetiro', newValue?.$d)
  }

  useEffect(() => {
    setValue('DiaEntrega', dateFrom?.$d)
  }, [])

  return (
    <InputContainer title='Fecha de entrega*'>
      <MobileDatePicker
        label='Desde'
        inputFormat='DD/MM/YYYY'
        minDate={new Date()}
        value={dateFrom}
        onChange={handleFrom}
        renderInput={(params) => <TextField sx={css.input} {...register('DiaEntrega', { required: true })} {...params} />}
      />
      <MobileDatePicker
        label='Hasta'
        inputFormat='DD/MM/YYYY'
        minDate={dateFrom}
        maxDate={dateFrom?.add(5, 'day')}
        value={dateTo}
        onChange={handleTo}
        renderInput={(params) => <TextField sx={css.input} {...register('DiaRetiro', { required: true })} {...params} />}
      />
    </InputContainer>
  )
}

export default DateInput
