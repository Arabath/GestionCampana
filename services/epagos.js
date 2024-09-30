import { EPAGOS_ACTION, EPAGOS_URL } from "../constants/endpoints";


//❌ URL Y ACTION DE TESTING !!!!
// const EPAGOS_URL = "https://sandbox.epagos.com.ar/quickstart/index.php";
// const EPAGOS_ACTION = "https://postsandbox.epagos.com.ar/";
const CREDENCIALES = {
  clavePublica: "c339b4422344c4710d9608748ae82648",
  organismo: 23,
  ambiente: "P",
};


async function payAction(data) {
  let accion = "getFirmaToken";
  let url_origen = window.location.hostname
    ? window.location.hostname
    : "localhost";
  let dataToken =
    "password=" +
    CREDENCIALES.clavePublica + 
    "&id_organismo=" +
    CREDENCIALES.organismo +
    "&url_origen=" +
    url_origen +
    "&accion=" +
    accion;
  let response = await fetch(EPAGOS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: dataToken,
  });
  let jsonResponse = await response.json();
  // console.log(jsonResponse);
  data = { ...data, ...jsonResponse };
  let form = document.createElement("form");
  form.action = EPAGOS_ACTION;
  form.method = "POST";
  for (let i of Object.keys(data)) {
    let input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("name", i);
    input.setAttribute("value", data[i]);

    form.appendChild(input);
  }

  document.body.appendChild(form);
  form.submit();
}

export default payAction;
