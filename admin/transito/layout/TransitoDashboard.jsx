import React, { useState, useMemo, useRef, useEffect } from 'react'
import AdminNavBarContainer from '../../components/AdminNavBarContainer'
import useAuth from '../../hooks/useAuth'
import pendienteIcon from '../../../assets/pendiente.svg'
import altaIcon from '../../../assets/alta.svg'
import bajaIcon from '../../../assets/baja.svg'
import { AgGridReact } from 'ag-grid-react'
import { AG_GRID_LOCALE_ES } from '../../../utils/locale.es'
import { fetchVolquetesTablePaginated, fetchUsuariosExamenTransito, insertarResultadoExamenPractico } from '../../../services/api'
import { Box, Button } from '@mui/material'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import 'ag-grid-community/styles/ag-theme-material.css'
import CustomPagination from '../../../forms/volquetes/components/CustomPagination'

const TransitoDashboard = () => {
  const gridRef = useRef()
  const { auth } = useAuth()
  const token = auth.token

  const [pageNumber, setPageNumber] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10); 
  const [sortColumn, setSortColumn] = useState("fechaAlta");
  const [sortDirection, setSortDirection] = useState("desc");
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  //TODO:change with 'fetchUsuariosExamenTransito'
  const fetchData = async () => {
    const response = await fetchVolquetesTablePaginated( token, pageNumber, rowsPerPage, sortColumn, sortDirection );
    setData(response.data);
    setTotalPages(response.pagination.totalPages);
  };
  //TODO:change with 'fetchUsuariosExamenTransito'


  const postData = async () => {
    //insertarResultadoExamenPractico
  }

  useEffect(() => {
    fetchData();
    fetchData1();
  }, [token, pageNumber, rowsPerPage, sortColumn, sortDirection]);
  //TODO:Config btn for change state for "aproved" or "desaproved"

  const handlePageChange = (newPage) => {
    setPageNumber(newPage);
  };

  const handlePageSizeChange = (newSize) => {
    setRowsPerPage(newSize);
    setPageNumber(1); 
  };
  const [columnDefs] = useState([
    {
      field: 'Apellido',
    },
    {
      field: 'Nombre',
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
              <div style={{ color: '#1b5e20' }}>Aprobado</div>
            </div>
          ) : (
            p?.data?.aprobado === false && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={bajaIcon} alt='icono de baja' />
                <div style={{ color: '#c62828' }}>Desaprobado</div>
              </div>
            )
          )}
        </>
      ),
    },
    {
      field: 'masInformacion',
      headerName: 'Calificar',
      filter: false,
      sortable: false,
      cellRenderer: () => (
        <Box>
          <Button sx={{backgroundColor:'Green', marginRight:'20px', marginBottom:'10px' }} variant="contained">Aprobado</Button>
          <Button sx={{backgroundColor:'Red', marginBottom:'10px' }} variant="contained">Desaprobado</Button>
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
      <AdminNavBarContainer />
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
            alignItems: 'center',
            marginTop: '20px',
          }}
        >
          <Box > 
            <Button sx={{marginRight:'10px'}} variant="contained">(B) Auto</Button>
            <Button sx={{marginRight:'10px'}} variant="contained">(A) Moto</Button>
            <Button variant="contained">(AB) Auto/Moto</Button>
          </Box>
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
            width: '70%',
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

export default TransitoDashboard
