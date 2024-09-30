import React, { useCallback } from "react";
import { Button } from "@mui/material";
import createExcelFile from "../../../utils/createExcelFile";

const ExportExcel = ({ gridRef }) => {
  const onBtnExportExcel = useCallback(() => {
    // console.log(gridRef.current.api);
    const list = [];

    gridRef.current.api.forEachNodeAfterFilterAndSort((e) => {
      // console.log(e);
      list.push({
        "Adiestrador nombres": e.data.adiestrador.nombres,
        "Adiestrador apellidos": e.data.adiestrador.apellidos,
        "Adiestrador fecha": e.data.adiestrador.fecha.slice(0,10),
        "Adiestrador matricula": e.data.adiestrador.matricula,
        "Adiestrador tipo": e.data.adiestrador.tipo,
        "Canino edad": e.data.canino.edad,
        "Canino nombre": e.data.canino.nombre,
        "Canino color pelaje": e.data.canino.pelajeColor,
        "Canino tamaño pelaje": e.data.canino.pelajeTamaño,
        "Canino raza": e.data.canino.raza,
        "Canino estado": e.data.estado,
        "Canino sexo": e.data.canino.sexo,
        "Canino tamaño": e.data.canino.tamaño,
        "Criador nombre": e.data.criador.nombre,
        "Criador numero de registro": e.data.criador.numeroRegistro,
        "Criador organizacion de registro": e.data.criador.organizacionRegistro,
        "Criador razas registradas": e.data.criador.razasRegistradas,
        "Sanitario antirrabica": e.data.detalleSanitario.antirrabica,
        "Sanitario castrado": e.data.detalleSanitario.castrado,
        "Sanitario fechaDeVencimento": e.data.detalleSanitario.fechaDeVencimento.slice(0,10),
        "Sanitario quintuple": e.data.detalleSanitario.quintuple,
        "Sanitario sextuple": e.data.detalleSanitario.sextuple,
        "Observaciones cabeza": e.data.observaciones.cabeza,
        "Observaciones cola": e.data.observaciones.cola,
        "Observaciones cuello": e.data.observaciones.cuello,
        "Observaciones hocico": e.data.observaciones.hocico,
        "Observaciones lomo": e.data.observaciones.lomo,
        "Observaciones orejaDer": e.data.observaciones.orejaDer,
        "Observaciones orejaIzq": e.data.observaciones.orejaIzq,
        "Observaciones pataDerAde": e.data.observaciones.pataDerAde,
        "Observaciones pataDerAtr": e.data.observaciones.pataDerAtr,
        "Observaciones pataIzqAde": e.data.observaciones.pataIzqAde,
        "Observaciones pataIzqAtr": e.data.observaciones.pataIzqAtr,
        "Observaciones pecho": e.data.observaciones.pecho,
        "Propietario domicilio": e.data.propietario.domicilio,
        "Propietario email": e.data.propietario.email,
        "Propietario fecha de nacimiento": e.data.propietario.fechaDeNacimiento.slice(0,10),
        "Propietario nombres": e.data.propietario.nombres,
        "Propietario apellidos": e.data.propietario.apellidos,
        "Propietario telefono": e.data.propietario.telefono,
        "Propietario telefono alternativo": e.data.propietario.telefonoAlternativo,
        "Seguro agente productor": e.data.seguro.agenteProductor,
        "Seguro aseguradora": e.data.seguro.aseguradora,
        "Seguro numero poliza": e.data.seguro.numeroPoliza,
        "Seguro vencimiento": e.data.seguro.vencimiento,
        "veterinario nombres": e.data.veterinario.nombres,
        "veterinario apellidos": e.data.veterinario.apellidos,
        "veterinario domicilio laboral": e.data.veterinario.domicilioLaboral,
        "veterinario telefono": e.data.veterinario.telefono,
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

export default ExportExcel;
