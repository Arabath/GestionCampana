import React, { useCallback } from "react";
import { Button } from "@mui/material";
import createExcelFile from "../../../utils/createExcelFile";

const ExportExcelVolquetes = ({ gridRef }) => {
  const onBtnExportExcel = useCallback(() => {
    // console.log(gridRef.current.api);
    const list = [];

    gridRef.current.api.forEachNodeAfterFilterAndSort((e) => {
      // console.log(e);
      list.push({
        altura: e.data.altura,
        aprobado: e.data.aprobado,
        calle: e.data.calle,
        coordenadasLAT: e.data.coordenadas.item1,
        coordenadasLNG: e.data.coordenadas.item2,
        destinoFinal: e.data.destinoFinal,
        diaEntrega: e.data.diaEntrega,
        diaRetiro: e.data.diaRetiro,
        dniChofer: e.data.dniChofer,
        empresa: e.data.empresaNombre,
        entreCalle1: e.data.entreCalle.item1,
        entreCalle2: e.data.entreCalle.item2,
        fechaAlta: e.data.fechaAlta,
        id: e.data.id,
        nombreChofer: e.data.nombreChofer,
        nombreSolicitante: e.data.nombreSolicitante,
        numeroAutorizacion: e.data.numeroAutorizacion,
        patenteCamion: e.data.patenteCamion,
      });
    });
    createExcelFile(list);
    // eslint-disable-next-line
  }, []);
  return (
    <Button
      variant="contained"
      onClick={onBtnExportExcel}
      sx={{ fontWeight: "600" }}
      color="secondary"
    >
      Exportar Excel
    </Button>
  );
};

export default ExportExcelVolquetes;
