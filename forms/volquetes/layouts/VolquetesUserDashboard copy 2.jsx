import React, { useState, useMemo, useRef, useEffect } from "react";
import useMyQuery from "../../../common/hooks/useMyQuery";
import volqueteIcon from "../../../assets/logos/volqueteViolet.svg";
import pendienteIcon from "../../../assets/pendiente.svg";
import altaIcon from "../../../assets/alta.svg";
import bajaIcon from "../../../assets/baja.svg";
import { routes } from "../../../utils/paths";
import { AgGridReact } from "ag-grid-react";
import { AG_GRID_LOCALE_ES } from "../../../utils/locale.es";
import { useNavigate } from "react-router-dom";
import { fetchVolquetesTable, fetchVolquetesTablePaginated } from "../../../services/api";
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
import CustomPagination from "../components/CustomPagination";

const VolquetesUserDashboard = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const token = auth.token;
  
  // Estado para la paginación y los datos de la tabla
  const [pageNumber, setPageNumber] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15); // Número de filas por página
  const [sortColumn, setSortColumn] = useState("fechaAlta");
  const [sortDirection, setSortDirection] = useState("desc");
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  
  // Función para obtener los datos paginados
  const fetchData = async () => {
    const response = await fetchVolquetesTablePaginated(token, pageNumber, rowsPerPage, sortColumn, sortDirection);
    setData(response.data);
    setTotalPages(response.pagination.totalPages);
  };

  // Llamamos a fetchData cuando se cambia la página o el tamaño de página
  useEffect(() => {
    fetchData();
  }, [pageNumber, rowsPerPage, sortColumn, sortDirection]);

  const handlePageChange = (newPage) => {
    setPageNumber(newPage);
  };

  const handlePageSizeChange = (newSize) => {
    setRowsPerPage(newSize);
    setPageNumber(1);  // Reiniciar a la primera página
  };

  return (
    <>
      <UserNavBarContainer variant="volquetes" />
      <Box sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <Box sx={{ display: "flex", width: "98%", justifyContent: "space-between", alignItems: "center", marginTop: "20px" }}>
          <Button onClick={() => navigate(routes.volquetesUserLocation)}>
            Ubicación de volquetes
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <Box sx={{ width: "98%", border: "1px solid #e2e2e2" }}>
          {/* Tabla con los datos paginados */}
          <table>
            <thead>
              <tr>
                <th>Calle</th>
                <th>Altura</th>
                <th>ID</th>
                <th>Fecha Alta</th>
                <th>Estado</th>
                <th>Pago</th>
                <th>Más Información</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id}>
                  <td>{row.calle}</td>
                  <td>{row.altura}</td>
                  <td>{row.id}</td>
                  <td>{new Date(row.fechaAlta).toLocaleDateString()}</td>
                  <td>{row.aprobado ? "Aceptado" : "Pendiente"}</td>
                  <td>{row.estado === 0 ? "Pendiente" : "Pagado"}</td>
                  <td>
                    <Button onClick={() => navigate(routes.volquetesUserDataId.replace(":id", row.id))}>
                      Ver solicitud
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Paginación personalizada */}
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
  );
};

export default VolquetesUserDashboard;
