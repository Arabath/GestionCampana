import React, { useState, useMemo, useRef } from 'react'
import AdminNavBarContainer from '../components/AdminNavBarContainer'
import useAuth from '../hooks/useAuth'
import volqueteIcon from '../../assets/logos/volqueteViolet.svg'
import pendienteIcon from '../../assets/pendiente.svg'
import altaIcon from '../../assets/alta.svg'
import bajaIcon from '../../assets/baja.svg'
import { routes } from '../../utils/paths'
import useMyQuery from '../../common/hooks/useMyQuery'
import NewReleasesIcon from '@mui/icons-material/NewReleases'
import { AgGridReact } from 'ag-grid-react'
import { AG_GRID_LOCALE_ES } from '../../utils/locale.es'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import 'ag-grid-community/styles/ag-theme-material.css'
import { fetchSolicitudes } from '../../services/api'

const DiscapacidadDashboard = () => {
  const navigate = useNavigate()
  const gridRef = useRef()
  const { auth } = useAuth()
  const token = auth.token
  const { data } = useMyQuery(['getVolquetes', token], () => fetchSolicitudes(token))
  // console.log(data?.data)
  const [columnDefs] = useState([
    {
      field: 'nombre',
      headerName: 'Nombre',
    },
    {
      field: 'apellido',
      headerName: 'Apellido',
    },
    {
      field: 'calle',
      cellRenderer: (p) => p.value ?? '-',
    },
    {
      field: 'altura',
      cellRenderer: (p) => p.value ?? '-',
    },
    {
      field: 'loteCountry',
      cellRenderer: (p) => p.value ?? '-',
    },
    {
      field: 'fechaAlta',
      cellRenderer: (p) => p.value.slice(0, 10),
      sort: 'desc',
    },
    {
      field: 'fechaNacimiento',
      cellRenderer: (p) => {
        const options = {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        }
        const date = p.value ? new Intl.DateTimeFormat('es', options).format(new Date(p.value)) : '-'
        return date
      },
      filter: false,
    },
    {
      field: 'masInformacion',
      headerName: 'Más información',
      filter: false,
      sortable: false,
      cellRenderer: (p) => (
        <Box
          sx={{
            color: '#82368c',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
          }}
          onClick={() => navigate(routes.adminDiscapacidadId.replace(':id', p?.data.id))}
        >
          Ver solicitud
        </Box>
      ),
    },
  ])

  const defaultColDef = useMemo(() => {
    return {
      resizable: true,
      suppressMovable: true,
      filter: true,
      flex: 0.1,
      sortable: true,
      minWidth: 130,
    }
  }, [])

  const localeText = useMemo(() => {
    return AG_GRID_LOCALE_ES
  }, [])

  return (
    <>
      <AdminNavBarContainer variant='discapacidad' />
      <Box
        sx={{
          display: 'flex',
          placeContent: 'center',
          marginTop: '20px',
        }}
      >
        <Box
          className='ag-theme-material'
          sx={{
            width: '98%',
            border: '1px solid #e2e2e2',
          }}
        >
          <AgGridReact
            ref={gridRef}
            animateRows={true}
            domLayout='autoHeight'
            pagination={true}
            paginationPageSize={16}
            rowData={data?.data || []}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            localeText={localeText}
            rowSelection='multiple'
          ></AgGridReact>
        </Box>
      </Box>
    </>
  )
}

export default DiscapacidadDashboard
