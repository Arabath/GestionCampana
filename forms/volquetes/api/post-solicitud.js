import { DATA_SOLICITUD } from "../../../constants/endpoints";
import { handler } from "../../../utils/error-handler";

export const postsSolicitudVolquete = async (payload) => {
  // console.log(payload);
  const response = await fetch(DATA_SOLICITUD, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${payload.token}`,
    },
    body: JSON.stringify({
      diaEntrega: payload.DiaEntrega,
      diaRetiro: payload.DiaRetiro,
      calle: payload.Calle ? payload.Calle : null,
      altura: payload.Altura ? Number(payload.Altura) : null,
      entreCalle: {
        item1: payload.EntreCalle1 ? payload.EntreCalle1 : null,
        item2: payload.EntreCalle2 ? payload.EntreCalle2 : null,
      },
      nombreSolicitante: payload.NombreSolicitante
        ? payload.NombreSolicitante
        : null,
      tipoVolqueteId: payload.TipoVolqueteId,
      patenteCamion: payload.PatenteCamion,
      nombreChofer: payload.NombreChofer,
      NumVolquete: Number(payload.NumVolquete),
      dniChofer: Number(payload.DNIChofer),
      destinoFinalId: payload.DestinoFinal,
      coordenadas: {
        item1: payload.Coordenadas.item1,
        item2: payload.Coordenadas.item2,
      },
      loteCountry: payload.LoteCountry ? payload.LoteCountry : null,
    }),
  });
  return handler(response);
};

// export const fetchPostVolquetes = async (payload) => {
//   return fetch(`${API_URL}/Volquetes/v2/Solicitud`, {
//     method: 'POST',
//     body: JSON.stringify({
//       empresaUsuario: payload.empresaUsuario,
//       empresaCodigo: payload.empresaCodigo,
//       diaEntrega: payload.DiaEntrega,
//       diaRetiro: payload.DiaRetiro,
//       calle: payload.Calle ? payload.Calle : null,
//       altura: payload.Altura ? Number(payload.Altura) : null,
//       entreCalle: {
//         item1: payload.EntreCalle1 ? payload.EntreCalle1 : null,
//         item2: payload.EntreCalle2 ? payload.EntreCalle2 : null,
//       },
//       nombreSolicitante: payload.NombreSolicitante ? payload.NombreSolicitante : null,
//       tipoVolqueteId: payload.TipoVolqueteId,
//       patenteCamion: payload.PatenteCamion,
//       nombreChofer: payload.NombreChofer,
//       NumVolquete: Number(payload.NumVolquete),
//       dniChofer: Number(payload.DNIChofer),
//       destinoFinal: payload.DestinoFinal,
//       coordenadas: {
//         item1: payload.Coordenadas.item1,
//         item2: payload.Coordenadas.item2,
//       },
//       loteCountry: payload.LoteCountry ? payload.LoteCountry : null,
//     }),
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`,
//     },
//   })
// }
