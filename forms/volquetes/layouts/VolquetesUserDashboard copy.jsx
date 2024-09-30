import React, { useState, useMemo, useRef } from "react";
import useMyQuery from "../../../common/hooks/useMyQuery";
import volqueteIcon from "../../../assets/logos/volqueteViolet.svg";
import pendienteIcon from "../../../assets/pendiente.svg";
import altaIcon from "../../../assets/alta.svg";
import bajaIcon from "../../../assets/baja.svg";
import { routes } from "../../../utils/paths";
import { AgGridReact } from "ag-grid-react";
import { AG_GRID_LOCALE_ES } from "../../../utils/locale.es";
import { useNavigate } from "react-router-dom";
import { fetchVolquetesTable } from "../../../services/api";
import { Tooltip, Zoom, Box, Button } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community/styles/ag-theme-material.css";
import ExportExcelVolquetes from "../../../admin/volquetes/features/ExportExcelVolquetes";
import useAuth from "../../../admin/hooks/useAuth";
import AdminNavBarContainer from "../../../admin/components/AdminNavBarContainer";
import UserNavBarContainer from "../components/UserNavBarContainer";
import { ButtonAdd } from "../components/buttonAdd/ButtonAdd";
import ModalConfirma from "../components/ModalEpagos/ModalConfirma";

const VolquetesUserDashboard = () => {
  const navigate = useNavigate();
  const gridRef = useRef();
  const { auth } = useAuth();
  const token = auth.token;
  const { data } = useMyQuery(["getVolquetes", token], () =>
    fetchVolquetesTable(token)
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [montoOperacion, setMontoOperacion] = useState(0);
  const [detalleOperacion, setDetalleOperacion] = useState(0);
  const [detalleAgrupacion, setDetalleAgrupacion] = useState(0);

  const onSelectionChanged = () => {
    const selectedNodes = gridRef.current.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    setSelectedRows(selectedData);

    const detalleOperacion = selectedData.map((row, index) => ({
      id_item: index,
      desc_item: `Empresa: ${row.empresaNombre}- Solicitud Id: ${row.id}`,
      monto_item: row.importe,
      cantidad_item: 1,
    }));
    setDetalleOperacion(detalleOperacion);
    // console.log(detalleOperacion);

    const detalleAgrupacion = selectedData.map((row) => ({
      Codigo: row.cbm,
      Vencimiento: row.fechaVencimiento,
      Importe: row.importe,
    }));
    setDetalleAgrupacion(detalleAgrupacion);
    // console.log(detalleAgrupacion);

    const montoOperacion = selectedData.reduce(
      (acc, row) => acc + row.importe,
      0
    );
    setMontoOperacion(montoOperacion);
    // console.log(montoOperacion);
  };


  const [columnDefs] = useState([
    {
      field: "calle",
      headerCheckboxSelection: true,
      checkboxSelection: (params) => {
        return params.data.estado === 0;
      },
    },
    {
      field: "altura",
    },
    {
      field: "Id",
      headerName: "ID",
      cellRenderer: (params) => {
        return params.data.id;
      },
    },
    {
      field: "fechaAlta",
      cellRenderer: (p) => {
        const options = {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        };
        const date = p.value
          ? new Intl.DateTimeFormat("es", options).format(new Date(p.value))
          : "-";
        return date;
      },
      sort: "desc",
      filter: false,
    },
    {
      field: "aprobado",
      headerName: "Estado",
      filter: false,
      cellRenderer: (p) => (
        <>
          {p?.data?.aprobado === null ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src={pendienteIcon} alt="icono de baja" />
              <div style={{ color: "#01579b" }}>Pendiente</div>
            </div>
          ) : p?.data?.aprobado === true ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src={altaIcon} alt="icono de alta" />
              <div style={{ color: "#1b5e20" }}>Aceptado</div>
            </div>
          ) : (
            p?.data?.aprobado === false && (
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src={bajaIcon} alt="icono de baja" />
                <div style={{ color: "#c62828" }}>Rechazado</div>
              </div>
            )
          )}
        </>
      ),
    },
    {
      field: "pago",
      headerName: "Estado de pago",
      filter: false,
      cellRenderer: (p) => (
        <>
          {p?.data?.estado === 0 ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src={pendienteIcon} alt="icono de baja" />
              <div style={{ color: "#01579b" }}>Pendiente</div>
            </div>
          ) : p?.data?.estado === 2 ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src={altaIcon} alt="icono de alta" />
              <div style={{ color: "#1b5e20" }}>Pagado</div>
            </div>
          ) : (
            p?.data?.estado === 1 && (
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src={bajaIcon} alt="icono de baja" />
                <div style={{ color: "#c62828" }}>Rechazado</div>
              </div>
            )
          )}
        </>
      ),
    },
    {
      field: "masInformacion",
      headerName: "Más información",
      filter: false,
      sortable: false,
      cellRenderer: (p) => (
        <Box
          sx={{
            color: "#82368c",
            fontWeight: "600",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
          onClick={() =>
            navigate(routes.volquetesUserDataId.replace(":id", p?.data.id))
          }
        >
          <img
            style={{ width: "20px" }}
            src={volqueteIcon}
            alt="icono de volquete"
          />
          Ver solicitud
        </Box>
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
      minWidth: 50,
    };
  }, []);

  const localeText = useMemo(() => {
    return AG_GRID_LOCALE_ES;
  }, []);

  return (
    <>
      <UserNavBarContainer variant="volquetes" />
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "98%",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <ExportExcelVolquetes gridRef={gridRef} />
          <Button
            variant="contained"
            sx={{
              color: "#fafafa",
              fontWeight: 600,
              display: "flex",
              placeContent: "center",
              cursor: "pointer",
            }}
            color="secondary"
            onClick={() => navigate(routes.volquetesUserLocation)}
          >
            ubicación de volquetes{" "}
            <Box sx={{ width: "15px" }}>
              <Box className="notification-white" />
            </Box>
          </Button>
          <ModalConfirma
            variant="contained"
            onClick={
              () => setIsModalOpen(true)
            }
            detalleAgrupacion={detalleAgrupacion}
            montoOperacion={montoOperacion}
            detalleOperacion={detalleOperacion}
            onClose={() => setIsModalOpen(false)}
            selectedRows={selectedRows}
          >
            Pagar selección
          </ModalConfirma>
          {isModalOpen && (
            <ModalConfirma onClose={() => setIsModalOpen(false)} />
          )}
          {/* <ModalConfirma /> */}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          placeContent: "center",
          marginTop: "20px",
        }}
      >
        <Box
          className="ag-theme-material"
          sx={{
            width: "98%",
            border: "1px solid #e2e2e2",
          }}
        >
          <AgGridReact
            ref={gridRef}
            animateRows={true}
            domLayout="autoHeight"
            pagination={true}
            paginationPageSize={10} 
            paginationPageSizeSelector={[10, 25, 50, 100]} 
            rowData={data?.data}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            localeText={localeText}
            rowSelection="multiple"
            onSelectionChanged={onSelectionChanged}
          />
        </Box>
      </Box>
      <Box onClick={() => navigate(routes.volquetesRegistration)}>
        <ButtonAdd />
      </Box>
    </>
  );
};

export default VolquetesUserDashboard;
