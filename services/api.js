//peticiones
// const API_URL = "http://192.168.10.82:7206/api";
// const API_URL = 'https://gestion.campana.gov.ar/api'
//const API_TRANSITO_EXAMENES = 'http://192.168.1.134/TransitoAPI/Api.svc'
const API_URL = 'http://testiis01.campana.gov.ar/Municipalidad.Campana.Api/api'
const API_TRANSITO_EXAMENES = 'http://locahost:3000'
export const API_STORAGE = 'http://192.168.10.82:7044/Storage/static/'

export const fetchLogin = (credentials) => {
  return fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
export const fetchPostVolquetes = async (payload) => {
  return fetch(`${API_URL}/Volquetes/v2/Solicitud`, {
    method: 'POST',
    body: JSON.stringify({
      empresaUsuario: payload.empresaUsuario,
      empresaCodigo: payload.empresaCodigo,
      diaEntrega: payload.DiaEntrega,
      diaRetiro: payload.DiaRetiro,
      calle: payload.Calle ? payload.Calle : null,
      altura: payload.Altura ? Number(payload.Altura) : null,
      entreCalle: {
        item1: payload.EntreCalle1 ? payload.EntreCalle1 : null,
        item2: payload.EntreCalle2 ? payload.EntreCalle2 : null,
      },
      nombreSolicitante: payload.NombreSolicitante ? payload.NombreSolicitante : null,
      tipoVolqueteId: payload.TipoVolqueteId,
      patenteCamion: payload.PatenteCamion,
      nombreChofer: payload.NombreChofer,
      NumVolquete: Number(payload.NumVolquete),
      dniChofer: Number(payload.DNIChofer),
      destinoFinal: payload.DestinoFinal,
      coordenadas: {
        item1: payload.Coordenadas.item1,
        item2: payload.Coordenadas.item2,
      },
      loteCountry: payload.LoteCountry ? payload.LoteCountry : null,
    }),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
}
export const fetchPostDiscapacidad = async (payload) => {
  return fetch(`${API_URL}/discapacidad/solicitud`, {
    method: 'POST',
    body: JSON.stringify({
      Nombre: payload.Nombre,
      Apellido: payload.Apellido,
      FechaNacimiento: payload.FechaNacimiento,
      DNI: payload.DNI,
      CalleId: payload.CalleId ? payload.CalleId : null,
      Altura: payload.Altura ? Number(payload.Altura) : null,
      BarrioId: payload.BarrioId,
      LoteCountry: payload.LoteCountry ? payload.LoteCountry : null,
      Celular: payload.Celular,
      Email: payload.Email,
      DiagnosticoCUD: payload.DiagnosticoCUD,
      TipoDiscapacidadId: payload.TipoDiscapacidadId.split(',').map(Number),
      FechaVencimientoCUD: payload.FechaVencimientoCUD,
      BeneficiarioPensionContributiva: payload.BeneficiarioPensionContributiva === '0' ? false : true,
      CoberturaSalud: Number(payload.CoberturaSalud),
      CoberturaSaludPrivada: payload.CoberturaSaludPrivada,
      EsEmpleadoMunicipal: payload.EsEmpleadoMunicipal === 'false' ? false : true,
      CodeBar: payload.CodeBar,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
export const fetchDogsTable = async (token) => {
  const response = await fetch(`${API_URL}/Zoonosis/fichas`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  })

  return response.json()
}

export const fetchVolquetesTable = async (token) => {
  const response = await fetch(`${API_URL}/volquetes/v2/solicitud`, {
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
  })

  return response.json()
}

export const fetchVolquetesTablePaginated = async (token, pageNumber, rowsPerPage, sortColumn, sortDirection) => {
  const response = await fetch(
    `${API_URL}/volquetes/v2/solicitud?pageNumber=${pageNumber}&rowsPerPage=${rowsPerPage}&sortColumn=${sortColumn}&sortDirection=${sortDirection}`,
    {
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.json();
};


export const fetchVolqueteID = async (token, id) => {
  const response = await fetch(`${API_URL}/volquetes/v2/solicitud/${id}`, {
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
  })

  return response.json()
}

export const fetchUsuariosExamenTransito = async () => {
  //const token = '3M8K-ysfJ-Qvn0-Qa03-hc52'
  const response = await fetch(`${API_TRANSITO_EXAMENES}/examUsers`, {
  //   headers: {
  //     'Token': token,
  //  },
  }) 

  return response.json()
}

export const insertarResultadoExamenPractico = async (payload) => {
  return fetch(`${API_TRANSITO_EXAMENES}/InsertarResultadoExamenPractico`, {
    method: 'POST',
    body: JSON.stringify({
      idTurnoAsignado: payload.idTurnoAsignado,
      estadoExamenPractico: payload.estadoExamenPractico,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const fetchDataDog = async (payload) => {
  const response = await fetch(`${API_URL}/Zoonosis/fichas/${payload.dogId}`, {
    headers: {
      Authorization: 'Bearer ' + payload.token,
    },
  })
  return response.json()
}

export const fetchStatusDog = async (payload) => {
  const response = await fetch(`${API_URL}/Zoonosis/fichas/status`, {
    method: 'PUT',
    body: JSON.stringify({
      estado: payload.state,
      id: payload.dogId,
    }),
    headers: {
      Authorization: 'Bearer ' + payload.token,
      'Content-Type': 'application/json',
    },
  })
  return response
}

export const fetchForm = async (payload) => {
  const response = await fetch(`${API_URL}/zoonosis/fichas`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response
}

export const fetchRazas = async () => {
  const response = await fetch(`${API_URL}/zoonosis/fichas/options`, {})
  return response.json()
}

export const fetchCalles = async () => {
  const response = await fetch(`${API_URL}/commons/calles`, {})
  return response.json()
}

export const fetchBarrios = async () => {
  const response = await fetch(`${API_URL}/commons/barrios`, {})
  return response.json()
}

export const fetchDiscapacidad = async () => {
  const response = await fetch(`${API_URL}/discapacidad/tipos`, {})
  return response.json()
}

export const fetchSolicitudes = async (token) => {
  const response = await fetch(`${API_URL}/discapacidad/solicitud`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  })
  return response.json()
}

export const fetchDataDiscapacidad = async (payload) => {
  const response = await fetch(`${API_URL}/discapacidad/solicitud/${payload.discapacidadId}`, {
    headers: {
      Authorization: 'Bearer ' + payload.token,
    },
  })

  return response.json()
}

export const fetchCoberturas = async () => {
  const response = await fetch(`${API_URL}/discapacidad/coberturas`, {})
  return response.json()
}

export const fetchTipoVolquete = async () => {
  const response = await fetch(`${API_URL}/volquetes/tipo`, {})
  return response.json()
}

export const uploadFiles = async (data) => {
  const response = await fetch(`${API_URL}/zoonosis/fichas/upload_photos`, {
    method: 'POST',
    body: data,
    // headers:{
    //   'Content-Type': 'multipart/form-data'
    // }
  })

  if (!response.ok) {
    return false
  }
  return await response.json()
}

export const fetchDataVolquete = async (payload) => {
  const response = await fetch(`${API_URL}/Volquetes/solicitud/${payload.volqueteId}`, {
    headers: {
      Authorization: 'Bearer ' + payload.token,
    },
  })

  return response.json()
}
export const fetchDataVolqueteUser = async (payload) => {
  const response = await fetch(`${API_URL}/Volquetes/v2/solicitud/${payload.volqueteId}`, {
    headers: {
      Authorization: 'Bearer ' + payload.token,
    },
  })

  return response.json()
}

// Post request rejected
export const fetchStatusVolquete = async (payload) => {
  const response = await fetch(`${API_URL}/Volquetes/solicitud`, {
    method: 'PATCH',
    body: JSON.stringify({
      id: payload.id,
      aprobado: payload.aprobado,
      mensaje: payload.message,
    }),
    headers: {
      Authorization: 'Bearer ' + payload.token,
      'Content-Type': 'application/json',
    },
  })
  return response.json()
}
