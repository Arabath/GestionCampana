import React, { useState, useMemo, useRef, useEffect } from 'react'
import AdminNavBarContainer from '../../components/AdminNavBarContainer'
import useAuth from '../../hooks/useAuth'
import useMyQuery from '../../../common/hooks/useMyQuery'
import volqueteIcon from '../../../assets/logos/volqueteViolet.svg'
import pendienteIcon from '../../../assets/pendiente.svg'
import altaIcon from '../../../assets/alta.svg'
import bajaIcon from '../../../assets/baja.svg'
// import ExportExcel from "../features/ExportExcel";
import { routes } from '../../../utils/paths'
import NewReleasesIcon from '@mui/icons-material/NewReleases'
import { AgGridReact } from 'ag-grid-react'
import { AG_GRID_LOCALE_ES } from '../../../utils/locale.es'
import { useNavigate } from 'react-router-dom'
import { fetchVolquetesTable, fetchVolquetesTablePaginated } from '../../../services/api'
import { Tooltip, Zoom, Box } from '@mui/material'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import 'ag-grid-community/styles/ag-theme-material.css'
import ExportExcelVolquetes from '../features/ExportExcelVolquetes'
import CustomPagination from '../../../forms/volquetes/components/CustomPagination'

const VolquetesDashboard = () => {
  const navigate = useNavigate()
  const gridRef = useRef()
  const { auth } = useAuth()
  const token = auth.token

  const [pageNumber, setPageNumber] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10); 
  const [sortColumn, setSortColumn] = useState("fechaAlta");
  const [sortDirection, setSortDirection] = useState("desc");
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);


  const fetchData = async () => {
    const response = await fetchVolquetesTablePaginated( token, pageNumber, rowsPerPage, sortColumn, sortDirection );
    setData(response.data);
    setTotalPages(response.pagination.totalPages);
  };

  useEffect(() => {
    fetchData();
  }, [token, pageNumber, rowsPerPage, sortColumn, sortDirection]);

  const handlePageChange = (newPage) => {
    setPageNumber(newPage);
  };

  const handlePageSizeChange = (newSize) => {
    setRowsPerPage(newSize);
    setPageNumber(1); 
  };
  const [columnDefs] = useState([
    {
      field: 'empresaNombre',
      headerName: 'Razón social',
    },
    {
      field: 'calle',
    },
    {
      field: 'altura',
    },
    {
      field: 'Id',
      headerName: 'ID',
      cellRenderer: (params) => {
        return params.data.id; 
      },
    },
    {
      field: 'fechaAlta',
      cellRenderer: (p) => {
        const options = {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        }
        const date = p.value ? new Intl.DateTimeFormat('es', options).format(new Date(p.value)) : '-'
        return date
      },
      sort: 'desc',
      filter: false,
    },
    {
      field: 'seRepite',
      headerName: 'Vrias.Unidades',
      cellRenderer: (p) => (
        <>
          {p?.data?.seRepite === true ? (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <NewReleasesIcon style={{ color: '#FFC300' }} />
              <div style={{ color: '#FFC300' }}>+1</div>
            </div>
          ) : (
            p?.data?.seRepite === false && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div> - </div>
              </div>
            )
          )}
        </>
      ),
    },
    {
      field: 'aprobado',
      headerName: 'Estado',
      filter: false,
      cellRenderer: (p) => (
        <>
          {p?.data?.aprobado === null ? (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={pendienteIcon} alt='icono de baja' />
              <div style={{ color: '#01579b' }}>Pendiente</div>
            </div>
          ) : p?.data?.aprobado === true ? (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={altaIcon} alt='icono de baja' />
              <div style={{ color: '#1b5e20' }}>Aceptado</div>
            </div>
          ) : (
            p?.data?.aprobado === false && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={bajaIcon} alt='icono de baja' />
                <div style={{ color: '#c62828' }}>Rechazado</div>
              </div>
            )
          )}
        </>
      ),
    },
    {
      field: 'pago',
      headerName: 'Estado de pago',
      filter: false,
      cellRenderer: (p) => (
        <>
          {p?.data?.estado === 0 ? (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={pendienteIcon} alt='icono de baja' />
              <div style={{ color: '#01579b' }}>Pendiente</div>
            </div>
          ) : p?.data?.estado === 2 ? (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={altaIcon} alt='icono de alta' />
              <div style={{ color: '#1b5e20' }}>Pagado</div>
            </div>
          ) : (
            p?.data?.estado === 1 && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={bajaIcon} alt='icono de baja' />
                <div style={{ color: '#c62828' }}>Rechazado</div>
              </div>
            )
          )}
        </>
      ),
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
          onClick={() => navigate(routes.adminVolquetesId.replace(':id', p?.data.id))}
        >
          <img style={{ width: '20px' }} src={volqueteIcon} alt='icono de volquete' />
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
      <AdminNavBarContainer variant='volquetes' />
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '98%',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '20px',
          }}
        >
          {data?.data?.map((e) => e.aprobado === null && true)?.reduce((prev, curr) => prev + curr, 0) === 0 ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                fontWeight: '600',
              }}
            >
              No tienes solicitudes pendientes 😋
            </Box>
          ) : (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                fontWeight: '600',
              }}
            >
              Solicitud pendiente
              <Tooltip title='Solicitud pendiente' placement='top' TransitionComponent={Zoom}>
                <Box className='notification' />
              </Tooltip>
            </Box>
          )}
          <ExportExcelVolquetes gridRef={gridRef} />
        </Box>
      </Box>
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
            domLayout="autoHeight"
            pagination={false}
            rowData={data}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            localeText={localeText}
            rowSelection="multiple"
          />
          <CustomPagination
            currentPage={pageNumber}
            totalPages={totalPages}
            pageSize={rowsPerPage}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </Box>
      </Box>
    </>
  )
}

export default VolquetesDashboard
