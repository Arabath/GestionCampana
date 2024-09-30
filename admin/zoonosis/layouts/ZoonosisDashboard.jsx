import React, { useState, useMemo, useRef } from 'react';
import AdminNavBarContainer from '../../components/AdminNavBarContainer';
import useAuth from '../../hooks/useAuth';
import useMyQuery from '../../../common/hooks/useMyQuery';
import pataIcon from '../../../assets/logos/paw.svg';
import pendienteIcon from '../../../assets/pendiente.svg';
import altaIcon from '../../../assets/alta.svg';
import bajaIcon from '../../../assets/baja.svg';
import ExportExcel from '../features/ExportExcel';
import { routes } from '../../../utils/paths';
import { AgGridReact } from 'ag-grid-react';
import { AG_GRID_LOCALE_ES } from '../../../utils/locale.es';
import { useNavigate } from 'react-router-dom';
import { fetchDogsTable } from '../../../services/api';
import { Tooltip, Zoom } from '@mui/material';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/ag-theme-material.css';

const ZoonosisDashboard = () => {
  const navigate = useNavigate();
  const gridRef = useRef();
  const { auth } = useAuth();
  const token = auth.token;

  const { data } = useMyQuery(['getDogs', token], () => fetchDogsTable(token));
  // console.log(data);
  const [columnDefs] = useState([
    {
      field: 'canino',
      valueGetter: (p) => p?.data?.canino?.nombre,
    },
    { field: 'raza', valueGetter: (p) => p?.data?.canino?.raza },
    { field: 'tamaño', valueGetter: (p) => p?.data?.canino?.tamaño },
    {
      field: 'estado',
      cellRenderer: (p) => (
        <>
          {p?.data?.estado === 0 ? (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={pendienteIcon} alt="icono de baja" />
              <div style={{ color: '#01579b' }}>Pendiente</div>
            </div>
          ) : p?.data?.estado === 1 ? (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={altaIcon} alt="icono de baja" />
              <div style={{ color: '#1b5e20' }}>Aceptado</div>
            </div>
          ) : (
            p?.data?.estado === 2 && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={bajaIcon} alt="icono de baja" />
                <div style={{ color: '#c62828' }}>Rechazado</div>
              </div>
            )
          )}
        </>
      ),
    },
    {
      headerName: 'Dueños',
      valueGetter: (p) =>
        p?.data?.propietario?.nombres + ' ' + p?.data?.propietario?.apellidos,
    },
    {
      field: 'masInformacion',
      headerName: 'Más información',
      filter: false,
      sortable: false,
      cellRenderer: (p) => (
        <div
          className="button-to-data"
          onClick={() =>
            navigate(routes.adminZoonosisId.replace(':id', p?.data.id))
          }
        >
          <img
            style={{ width: '20px' }}
            src={pataIcon}
            alt="icono de pata de perro"
          />
          Ver al perro
        </div>
      ),
    },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      resizable: true,
      suppressMovable: true,
      filter: true,
      flex: 1,
      sortable: true,
      minWidth: 130,
    };
  }, []);

  const localeText = useMemo(() => {
    return AG_GRID_LOCALE_ES;
  }, []);
  return (
    <>
      <AdminNavBarContainer variant="zoonosis" />
      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '98%',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '20px',
          }}
        >
          {data
            ?.map((e) => e.estado === 0 && 1)
            ?.reduce((prev, curr) => prev + curr, 0) === 0 ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                fontWeight: '600',
              }}
            >
              No tienes solicitudes pendientes 😋
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                fontWeight: '600',
              }}
            >
              Solicitud pendiente
              <Tooltip
                title="Solicitud pendiente"
                placement="top"
                TransitionComponent={Zoom}
              >
                <div className="notification" />
              </Tooltip>
            </div>
          )}
          <ExportExcel gridRef={gridRef} />
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          placeContent: 'center',
          marginTop: '20px',
        }}
      >
        <div
          className="ag-theme-material"
          style={{
            width: '98%',
            border: '1px solid #e2e2e2',
          }}
        >
          <AgGridReact
            ref={gridRef}
            animateRows={true}
            domLayout="autoHeight"
            pagination={true}
            paginationPageSize={16}
            rowData={data}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            localeText={localeText}
            rowSelection="multiple"
          ></AgGridReact>
        </div>
      </div>
    </>
  );
};

export default ZoonosisDashboard;
