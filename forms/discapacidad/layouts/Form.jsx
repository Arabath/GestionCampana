import { Box, Typography } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import LoadingButton from '../../../common/components/LoadingButton'
import SnackbarComponent from '../../../common/components/SnackbarComponent'
import { fetchPostDiscapacidad } from '../../../services/api'
import Imputs from '../components/Imputs'

const css = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: { xs: '95%', md: '90%' },
  },
  headerTitle: {
    background: '#61277c',
    textAlign: 'center',
    color: '#fff',
    fontWeight: '700',
    borderRadius: '10px 10px 0 0',
    p: '15px 0',
  },
  card: {
    background: '#fafafa',
    p: { xs: '10px', md: '40px' },
    width: '100%',
    borderRadius: '0 0 10px 10px',
  },
  input: { width: { xs: '100%', md: '47.5%' }, mb: '25px' },
}

const Form = () => {
  const [openSnack, setOpenSnack] = useState({ openSnackStatus: false })

  const INITIAL_VALUE = {
    Nombre: '',
    Apellido: '',
    FechaNacimiento: '',
    DNI: '',
    CalleId: '',
    Altura: '',
    BarrioId: '',
    LoteCountry: '',
    Celular: '',
    Email: '',
    DiagnosticoCUD: '',
    TipoDiscapacidadId: null,
    FechaVencimientoCUD: '',
    BeneficiarioPensionContributiva: '',
    CoberturaSalud: '',
    CoberturaSaludPrivada: '',
    CodeBar: '',
    EsEmpleadoMunicipal: 'false',
  }

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: INITIAL_VALUE,
  })

  const mutation = useMutation((payload) => fetchPostDiscapacidad(payload), {
    onSuccess: () => {
      setOpenSnack({ openSnackStatus: true })
      reset(INITIAL_VALUE)
    },
  })

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnack({ openSnackStatus: false })
  }
  const onSubmit = (data) => {
    // console.log(data)
    mutation.mutate(data)
  }

  const street =
    watch('CalleId') === '' || watch('CalleId') === undefined || watch('CalleId') === null || watch('Altura') === ''
  const lote = watch('LoteCountry') === ''
  const coberturaSalud = watch('CoberturaSalud') === '2' && watch('CoberturaSaludPrivada') === ''
  const validation =
    !Boolean(watch('Nombre')) ||
    !Boolean(watch('Apellido')) ||
    !Boolean(watch('FechaNacimiento')) ||
    !Boolean(watch('DNI')) ||
    !Boolean(watch('BarrioId')) ||
    !Boolean(watch('Celular')) ||
    !Boolean(watch('CodeBar')) ||
    !Boolean(watch('DiagnosticoCUD')) ||
    !Boolean(watch('TipoDiscapacidadId')) ||
    !Boolean(watch('FechaVencimientoCUD')) ||
    !Boolean(watch('BeneficiarioPensionContributiva')) ||
    !Boolean(watch('CoberturaSalud')) ||
    !Boolean(watch('EsEmpleadoMunicipal')) ||
    coberturaSalud ||
    (street && lote)

  return (
    <Box sx={css.container} component='form' onSubmit={handleSubmit(onSubmit)}>
      <Typography variant='h4' sx={css.headerTitle}>
        Registro municipal de personas con discapacidad
      </Typography>
      <Box sx={css.card}>
        <Imputs register={register} css={css} watch={watch} setValue={setValue} mutation={mutation} />
        <LoadingButton
          disabled={validation || mutation.isLoading}
          type='submit'
          variant='contained'
          loading={mutation.isLoading}
          loadingColor='tertiary'
        >
          Enviar
        </LoadingButton>
      </Box>
      <SnackbarComponent
        handleClose={handleCloseSnack}
        openSnack={openSnack.openSnackStatus}
        mutation={{ status: 200 }}
        successMessage='Los datos fueron grabados correctamente. Gracias por contribuir hacer de Campana una ciudad inclusiva'
      />
    </Box>
  )
}

export default Form
