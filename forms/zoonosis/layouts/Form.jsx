import * as React from 'react'
import InputContainer from '../../../common/components/InputContainer'
import { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button, Typography } from '@mui/material'
import { Container } from '@mui/system'
import { ThemeProvider, createTheme } from '@mui/material'
import { formTheme } from '../../../utils/themes'
import InputAdornment from '@mui/material/InputAdornment'
import { GoHome, GoPerson, GoDeviceMobile, GoMail, GoCalendar, GoNote } from 'react-icons/go'
import { HiPhone, HiOfficeBuilding, HiOutlineClipboardList, HiOutlineIdentification } from 'react-icons/hi'
import { GiDogHouse, GiArchiveRegister, GiHealthCapsule, GiSittingDog, GiSniffingDog, GiHealthNormal } from 'react-icons/gi'
import { useQuery } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

import MapDogResponsive from '../features/MapDogResponsive'
import GeneroRadio from '../components/GeneroRadio'
import AutocompleteRazas from '../components/AutocompleteRazas'
import useBreakpoint from '../../../common/hooks/useBreakpoint'
import RazasRegistradas from '../components/RazasRegistradas'
import { fetchForm, fetchRazas } from '../../../services/api'
import FileUploadMultiple from '../components/FileUploadMultiple'
import { uploadFiles } from '../../../services/api'
import SnackbarComponent from '../components/SnackbarComponent'

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
  alert: {
    fontSize: 18,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
}

const FormZoo = () => {
  const matches = useBreakpoint('xl')
  const [castracion, setCastracion] = useState(false)
  const [antirrabica, setAntirrabica] = useState(false)
  const [quintuple, setQuintuple] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState('')
  // console.log(selectedPhoto)

  const [observations, setObservations] = useState({
    orejaIzq: '',
    orejaDer: '',
    cabeza: '',
    hocico: '',
    cuello: '',
    pecho: '',
    pataIzqAde: '',
    pataIzqAtr: '',
    pataDerAde: '',
    pataDerAtr: '',
    cola: '',
    lomo: '',
  })
  //console.log(observations);
  const { data } = useQuery(['fetchRazas'], fetchRazas)
  const [openSnack, setOpenSnack] = useState({ openSnackStatus: false })

  const handleCastracion = (event) => {
    setCastracion(event.target.value)
  }
  const handleAntirrabica = (event) => {
    setAntirrabica(event.target.value)
  }
  const handleQuintuple = (event) => {
    setQuintuple(event.target.value)
  }

  const handleCloseSnack = (event, reason) => {
    setOpenSnack({ openSnackStatus: false })
  }

  const { mutate, data: mutationData } = useMutation((payload) => fetchForm(payload), {
    onSuccess: () => {
      setOpenSnack({ openSnackStatus: true })
      // console.log("TODO BIEN");
    },
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('frente', e.target.elements['frente'].files[0])
    formData.append('latder', e.target.elements['latder'].files[0])
    formData.append('latizq', e.target.elements['latizq'].files[0])
    formData.append('trasera', e.target.elements['trasera'].files[0])
    formData.append('trescuartosizq', e.target.elements['trescuartosizq'].files[0])
    formData.append('trescuartosdcho', e.target.elements['trescuartosdcho'].files[0])
    const ids = await uploadFiles(formData)
    // console.log(ids)
    // console.log(formData);
    // console.log(ids);
    const payload = {
      propietario: {
        apellidos: e.target.elements['in_apellido'].value,
        nombres: e.target.elements['in_nombre'].value,
        domicilio: e.target.elements['in_domicilio'].value,
        fechaDeNacimiento: e.target.elements['in_nacimiento'].value,
        telefono: e.target.elements['in_telefono'].value,
        telefonoAlternativo: e.target.elements['in_telefono_alt'].value,
        email: e.target.elements['in_email'].value,
      },
      criador: {
        nombre: e.target.elements['in_criadero'].value,
        organizacionRegistro: e.target.elements['in_org_registro'].value,
        numeroRegistro: e.target.elements['in_registro'].value,
        razasRegistradas: e.target.elements['raza_registrada'].value,
      },
      canino: {
        nombre: e.target.elements['in_nombre_perro'].value,
        edad: e.target.elements['in_edad_perro'].value,
        sexo: Boolean(e.target.elements['selec_genero'].value),
        raza: e.target.elements['tiposRaza'].value,
        tamaño: e.target.elements['tiposTama'].value,
        pelajeTamaño: e.target.elements['tiposPelajeColor'].value,
        pelajeColor: e.target.elements['tiposPelajeTama'].value,
        estado: 0,
      },
      detalleSanitario: {
        castrado: Boolean(castracion),
        antirrabica: Boolean(antirrabica),
        quintuple: Boolean(quintuple),
        fechaDeVencimento: e.target.elements['vacuna_vencimiento'].value,
      },
      veterinario: {
        apellidos: e.target.elements['vet_nombre'].value,
        nombres: e.target.elements['vet_apellido'].value,
        domicilioLaboral: e.target.elements['vet_domicilio'].value,
        telefono: e.target.elements['vet_telefono'].value,
      },
      adiestrador: {
        apellidos: e.target.elements['adi_apellido'].value,
        nombres: e.target.elements['adi_nombre'].value,
        matricula: e.target.elements['adi_matricula'].value,
        fecha: e.target.elements['adi_fecha'].value,
        tipo: e.target.elements['adi_entrenamiento'].value,
      },
      seguro: {
        aseguradora: e.target.elements['aseguradora'].value,
        agenteProductor: e.target.elements['productor'].value,
        numeroPoliza: e.target.elements['poliza'].value,
        vencimiento: e.target.elements['poliza_vto'].value,
      },
      photos: ids,
      observaciones: observations,
    }
    mutate(payload, {
      onSuccess: () => {
        // console.log("PRUEBA");
        // window.location.reload();
      },
    })
    // console.log("payload",payload);
    //document.getElementById("formzoo").reset();
    //window.location.reload()
    //   setTimeout(function(){
    //     window.location.reload();
    //  }, 3000);
  }

  return (
    <ThemeProvider theme={createTheme(formTheme)}>
      <Container maxWidth='md'>
        <Box component='form' id='formzoo' onSubmit={handleSubmit}>
          <Typography variant='h4' sx={css.headerTitle}>
            Registro municipal de perros potencialmente peligrosos
          </Typography>
          <Box id='datos_propietario' sx={css.card}>
            {/* DATOS PROPIETARIO */}
            <h3>DATOS PROPIETARIO</h3>
            <p>Nombre y Apellido</p>

            <InputContainer>
              <TextField
                name={'in_nombre'}
                id='filled-required'
                sx={css.input}
                placeholder='Nombre'
                variant='filled'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <GoPerson />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                name={'in_apellido'}
                sx={css.input}
                id='filled-required'
                placeholder='Apellido'
                variant='filled'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <GoPerson />
                    </InputAdornment>
                  ),
                }}
              />
            </InputContainer>

            <p>Datos Generales</p>
            <InputContainer>
              <TextField
                sx={css.input}
                name={'in_nacimiento'}
                label='Fecha Nacimiento'
                id='filled-required'
                variant='filled'
                type='date'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <GoCalendar />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                sx={css.input}
                name={'in_domicilio'}
                id='filled-required'
                placeholder='Domicilio'
                variant='filled'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <GoHome />
                    </InputAdornment>
                  ),
                }}
              />
            </InputContainer>
            <InputContainer>
              <TextField
                sx={css.input}
                name={'in_telefono'}
                id='filled-required'
                placeholder='Telefono'
                variant='filled'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <GoDeviceMobile />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                sx={css.input}
                name={'in_telefono_alt'}
                id='filled-required'
                placeholder='Telefono Alt.'
                variant='filled'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <HiPhone />
                    </InputAdornment>
                  ),
                }}
              />
            </InputContainer>

            <TextField
              name={'in_email'}
              sx={css.input}
              id='filled-required'
              placeholder='Email'
              variant='filled'
              type='mail'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <GoMail />
                  </InputAdornment>
                ),
              }}
            />

            <hr />
            {/* DATOS CRIADORES */}

            <h3>CRIADORES (Completar en el caso que corresponda)</h3>
            <p>Nombre del criadero</p>

            <InputContainer>
              <TextField
                name={'in_criadero'}
                sx={css.input}
                id='filled-required'
                placeholder='Criadero'
                variant='filled'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <GiDogHouse />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                name={'in_org_registro'}
                sx={css.input}
                id='filled-required'
                placeholder='Registro FCA/Kennel/etc'
                variant='filled'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <GiArchiveRegister />
                    </InputAdornment>
                  ),
                }}
              />
            </InputContainer>

            <p>Registro</p>
            <InputContainer>
              <TextField
                sx={css.input}
                name={'in_registro'}
                id='filled-required'
                placeholder='N° de registro'
                variant='filled'
              />

              <RazasRegistradas fetchRazas={data?.TiposRaza} css={css} />
            </InputContainer>

            <hr />

            {/* DATOS CANINO */}
            <h3>DATOS CANINO</h3>
            <InputContainer>
              <TextField
                sx={css.input}
                name={'in_nombre_perro'}
                variant='filled'
                placeholder='Nombre'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <GiSittingDog />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                type='text'
                sx={css.input}
                name={'in_edad_perro'}
                variant='filled'
                placeholder='Edad'
                InputProps={{
                  pattern: '[0-9]+',
                  maxLength: 9,
                  startAdornment: (
                    <InputAdornment position='start'>
                      <GiSniffingDog />
                    </InputAdornment>
                  ),
                }}
              />
            </InputContainer>
            <GeneroRadio />
            <AutocompleteRazas data={data} css={css} />
            <br />

            <hr />

            {/* CANVAS INTERACTIVO */}
            <div id='canvas_seleccion'>
              <h5>Señas particulares (falta de miembros, cicatrices, etc) especificar en la silueta</h5>
              <MapDogResponsive size={(0.36).toString()} setObservations={setObservations} observations={observations} />
            </div>
            <hr />

            {/* DETALLES SANITARIOS */}
            <h3>DETALLES SANITARIOS</h3>

            <FormControl id='castracion-btn'>
              <FormLabel>Castración</FormLabel>
              <RadioGroup
                aria-labelledby='demo-controlled-radio-buttons-group'
                name='radio_castracion'
                value={castracion}
                onChange={handleCastracion}
              >
                <FormControlLabel value={true} control={<Radio />} label='Si' />
                <FormControlLabel value={false} control={<Radio />} label='No' />
              </RadioGroup>
            </FormControl>

            <FormControl id='castracion-btn'>
              <FormLabel>Antirrabica</FormLabel>
              <RadioGroup
                aria-labelledby='demo-controlled-radio-buttons-group'
                name='radio_antirrabica'
                value={antirrabica}
                onChange={handleAntirrabica}
              >
                <FormControlLabel value={true} control={<Radio />} label='Si' />
                <FormControlLabel value={false} control={<Radio />} label='No' />
              </RadioGroup>
            </FormControl>

            <FormControl id='castracion-btn'>
              <FormLabel>Quintuple</FormLabel>
              <RadioGroup
                aria-labelledby='demo-controlled-radio-buttons-group'
                name='radio_quintuple'
                value={quintuple}
                onChange={handleQuintuple}
              >
                <FormControlLabel value={true} control={<Radio />} label='Si' />
                <FormControlLabel value={false} control={<Radio />} label='No' />
              </RadioGroup>
            </FormControl>

            <InputContainer>
              <TextField
                sx={css.input}
                name='vacuna_vencimiento'
                label='Fecha Vencimiento'
                type='date'
                id='filled-required'
                placeholder='Telefono Alt.'
                variant='filled'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <HiPhone />
                    </InputAdornment>
                  ),
                }}
              />
            </InputContainer>

            <br />

            {/* DATOS VETERINARIO */}
            <p>Datos Veterinario</p>
            <InputContainer>
              <TextField
                sx={css.input}
                name='vet_nombre'
                id='filled-required'
                placeholder='Nombre'
                variant='filled'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <GoPerson />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                sx={css.input}
                name='vet_apellido'
                id='filled-required'
                placeholder='Apellido'
                variant='filled'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <GoPerson />
                    </InputAdornment>
                  ),
                }}
              />
            </InputContainer>
            <InputContainer>
              <TextField
                sx={css.input}
                name='vet_domicilio'
                id='filled-required'
                placeholder='Domicilio laboral'
                variant='filled'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <GiHealthCapsule />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                sx={css.input}
                name='vet_telefono'
                id='filled-required'
                placeholder='Telefono'
                variant='filled'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <HiPhone />
                    </InputAdornment>
                  ),
                }}
              />
            </InputContainer>

            <br />
            <br />
            <hr />

            <h3 className='adjuntar_titulo'>
              Adjuntar 6 fotografías de frente, trasera, laterales y 3/4 perfiles derecho e izquierdo.
            </h3>
            <div className='file_uploader'>
              <FileUploadMultiple selectedFile={selectedPhoto} setSelectedPhoto={setSelectedPhoto} />
            </div>

            <br />
            <hr />

            {/* ADIESTRADOR */}
            <h3>ADIESTRADOR</h3>
            <InputContainer>
              <TextField
                sx={css.input}
                name='adi_nombre'
                id='filled-required'
                placeholder='Nombre'
                variant='filled'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <GoPerson />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                sx={css.input}
                name='adi_apellido'
                id='filled-required'
                placeholder='Apellido'
                variant='filled'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <GoPerson />
                    </InputAdornment>
                  ),
                }}
              />
            </InputContainer>

            <p>Datos Generales</p>
            <InputContainer>
              <TextField
                sx={css.input}
                name='adi_matricula'
                id='filled-required'
                placeholder='Matricula'
                variant='filled'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <HiOutlineIdentification />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                sx={css.input}
                name='adi_entrenamiento'
                id='filled-required'
                placeholder='Tipo de Adiestramiento'
                variant='filled'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <GoNote />
                    </InputAdornment>
                  ),
                }}
              />
            </InputContainer>
            <InputContainer>
              <TextField
                sx={css.input}
                label='opcional'
                name='adi_telefono'
                id='filled-required'
                placeholder='Telefono'
                variant='filled'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <GoDeviceMobile />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                sx={css.input}
                name='adi_fecha'
                label='Fecha Adiestramiento'
                type='date'
                id='filled-required'
                placeholder='Telefono Alt.'
                variant='filled'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <HiPhone />
                    </InputAdornment>
                  ),
                }}
              />
            </InputContainer>
            <br />
            <hr />

            {/* SEGURO */}
            <h3>SEGURO Resp. CIVIL</h3>
            <InputContainer>
              <TextField
                sx={css.input}
                name='aseguradora'
                id='filled-required'
                placeholder='Aseguradora'
                variant='filled'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <HiOfficeBuilding />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                sx={css.input}
                name='productor'
                id='filled-required'
                placeholder='Agente Productor'
                variant='filled'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <GoPerson />
                    </InputAdornment>
                  ),
                }}
              />
            </InputContainer>
            <InputContainer>
              <TextField
                sx={css.input}
                name='poliza'
                id='filled-required'
                placeholder='Póliza N°'
                variant='filled'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <HiOutlineClipboardList />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                sx={css.input}
                name='poliza_vto'
                label='Vencimiento Póliza'
                type='date'
                id='filled-required'
                placeholder='Telefono Alt.'
                variant='filled'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <HiPhone />
                    </InputAdornment>
                  ),
                }}
              />
            </InputContainer>

            {/* BOTONERA */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: { md: 'flex-end', xs: 'center' },
              }}
            >
              <Box sx={{ display: 'flex', columnGap: '10px' }}>
                <Button color='success' id='btnsubmit' variant='contained' type='submit'>
                  Enviar
                </Button>
              </Box>
            </Box>
            <br />
          </Box>
        </Box>
        <SnackbarComponent
          handleClose={handleCloseSnack}
          openSnack={openSnack.openSnackStatus}
          mutation={mutationData}
          successMessage='La peticion se ha enviado exitosamente'
        />
      </Container>
      {/* </div> */}
    </ThemeProvider>
  )
}

export default FormZoo
