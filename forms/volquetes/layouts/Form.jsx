import { useState, useMemo } from "react";
import { fetchCalles, fetchTipoVolquete } from "../../../services/api";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputsDto from "../components/InputsDto";
import DateInput from "../components/DateInput";
import MapMark from "../../../common/components/MapMark";
import StreetSelector from "../components/StreetSelector";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import useAuth from "../../../admin/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { postsSolicitudVolquete } from "../api/post-solicitud";
import SnackbarComponentVolquetes from "../components/SnackbarComponentVolquetes";
import { routes } from "../../../utils/paths";
import "../../../dashboard.css";
import { usePostSolicitud } from "../hooks/use-post-solicitud";

const css = {
  container: {
    display: "flex",
    flexDirection: "column",
    width: { xs: "95%", md: "90%" },
  },
  headerTitle: {
    background: "#61277c",
    textAlign: "center",
    color: "#fff",
    fontWeight: "700",
    borderRadius: "10px 10px 0 0",
    p: "15px 0",
  },
  card: {
    background: "#fafafa",
    p: { xs: "10px", md: "40px" },
    width: "100%",
    borderRadius: "0 0 10px 10px",
  },
  input: { width: { xs: "100%", md: "47.5%" }, mb: "25px" },
};

const center = { lat: -34.16326, lng: -58.95918 };

const Form = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const token = auth.token;
  const mutation = usePostSolicitud();
  const [open, setOpen] = useState(false);
  const [openSnack, setOpenSnack] = useState({ openSnackStatus: false });
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [dateFrom, setDateFrom] = useState(dayjs().add(1, "days"));
  const [position, setPosition] = useState(center);
  const [dateTo, setDateTo] = useState("");

  const INITIAL_VALUE = {
    DiaEntrega: dayjs().add(1, "days")?.$d,
    DiaRetiro: "",
    Calle: null,
    Altura: "",
    EntreCalle1: null,
    EntreCalle2: null,
    NombreSolicitante: "",
    PatenteCamion: "",
    TipoVolqueteId: "",
    NombreChofer: "",
    NumVolquete: "",
    DNIChofer: "",
    LoteCountry: "",
    DestinoFinal: "",
    Coordenadas: {
      item1: "",
      item2: "",
    },
  };

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: INITIAL_VALUE,
  });
  const {
    mutate,
    data: mutationData,
    error: mutationError, 
    isLoading,
  } = useMutation((payload) => postsSolicitudVolquete({ ...payload, token }), {
    onSuccess: (data) => {
      setOpenSnack({ openSnackStatus: true });
      setDateFrom(dayjs().add(1, "days"));
      setPosition(center);
      setDateTo("");
      reset
      setLoading(false); // cierra el loader
      navigate(routes.volquetesUserDashboard) // navega al dashboard
      if (!checked) {
        localStorage.removeItem("empresaUsuario");
        localStorage.removeItem("empresaCodigo");
      }
      handleCloseModal(false);
    },
    onError: (error) => {
      setOpenSnack({ openSnackStatus: true });
      setLoading(false);
    },
  });

  const { data } = useQuery(["fetchCalles"], fetchCalles);

  const { data: dataTipoVol } = useQuery(
    ["fetchTipoVolquete"],
    fetchTipoVolquete
  );

  const handleOpen = () => setOpen(true);

  const handleCloseModal = () => setOpen(false);

  const handleCloseSnack = (event, reason) =>
    setOpenSnack({ openSnackStatus: false });

  const onSubmit = async (data) => {
    setLoading(true);
    mutate(data);
  };

  const street =
    watch("Calle") === "" ||
    watch("Calle") === undefined ||
    watch("Calle") === null ||
    watch("Altura") === "" ||
    watch("EntreCalle1") === "" ||
    watch("EntreCalle1") === undefined ||
    watch("EntreCalle1") === null ||
    watch("EntreCalle2") === "" ||
    watch("EntreCalle2") === undefined ||
    watch("EntreCalle2") === null;

  const lote = watch("LoteCountry") === "";

  const validation =
    !Boolean(watch("DiaEntrega")) ||
    !Boolean(watch("DiaRetiro")) ||
    !Boolean(watch("TipoVolqueteId")) ||
    !Boolean(watch("PatenteCamion")) ||
    !Boolean(watch("NombreChofer")) ||
    !Boolean(watch("DNIChofer")) ||
    !Boolean(watch("DestinoFinal")) ||
    !Boolean(watch("Coordenadas")) ||
    !Boolean(watch("NumVolquete")) ||
    !Boolean(watch("NombreSolicitante")) ||
    (street && lote);

  return (
    <Box sx={css.container} component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4" sx={css.headerTitle}>
        Registro municipal de Volquetes
      </Typography>
      <Box sx={css.card}>
        <DateInput
          css={css}
          register={register}
          setValue={setValue}
          watch={watch}
          dateFrom={dateFrom}
          setDateFrom={setDateFrom}
          setDateTo={setDateTo}
          dateTo={dateTo}
        />
        <StreetSelector
          register={register}
          css={css}
          calles={data}
          setValue={setValue}
          watch={watch}
        />
        <MapMark
          watch={watch}
          setValue={setValue}
          setPosition={setPosition}
          position={position}
          variant="form"
          title="Localización*"
          subtitle="Arraste el icono de ubicación (azul), o haga click sobre la calle y altura aproximada, o hacia la calle y entre calles de destino"
        />
        <InputsDto
          css={css}
          dataTipoVol={dataTipoVol}
          register={register}
          setValue={setValue}
          watch={watch}
        />
        <div className="separate">
          <Button
            className=""
            variant="contained"
            disabled={validation}
            type="submit"
          >
            Enviar
          </Button>
          {loading && (
            <div>
              <CircularProgress />
            </div>
          )}
          <Button
            variant="contained"
            onClick={() => navigate(routes.volquetesUserDashboard)}
          >
            Volver
          </Button>
        </div>
      </Box>
      <SnackbarComponentVolquetes
        handleClose={handleCloseSnack}
        openSnack={openSnack.openSnackStatus}
        mutation={mutationData || mutationError} 
        successMessage="La petición se ha enviado exitosamente"
      />
    </Box>
  );
};

export default Form;
