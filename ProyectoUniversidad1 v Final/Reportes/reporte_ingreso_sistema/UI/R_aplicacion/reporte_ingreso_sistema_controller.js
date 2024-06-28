"use strict";
//Informacion de Importadcion de Servicios
import { ReporteService } from "../R_services/reporte_ingreso_sistema_service.js";

//Inicio de Pagina
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("filter");
  form.addEventListener("submit", onFormSubmit);

  var verificacion_empresa_name = sessionStorage.getItem("empresa_name");
  var verificacion_usuario_empresa = sessionStorage.getItem("user_job");
  var nombre_empresa = "";

  if (verificacion_empresa_name == null) {
    nombre_empresa = verificacion_usuario_empresa;
  } else {
    nombre_empresa = verificacion_empresa_name;
  }
  loadData(nombre_empresa);
});

//Esta Funcion representa que se muestra dentro del html, una vez que se encuentra funcional el server
function loadData(nombre_empresa) {
  let ReportData = [];
  //Esto llama el json del server creado del mockdata
  ReporteService.findAllByNombre_empresa(nombre_empresa).then((response) => {
    console.log(response);
    ReportData = response.data;
    console.log("ReportData");
    console.log(ReportData);
    //Funcion que reproduce la data
    renderTable(ReportData);

    //Si hubiera error este error handler es la funcion de comunicacion de programa
  }, requestErrorHandler);
}

//Funcion de recuperar el error y poder visualizarlo
function requestErrorHandler(error) {
  console.log(error.message);
  console.log(error);
}

//Funcion que llama a la renderizacion de la tabla
function renderTable(ReportData) {
  let dataTbBody = document.querySelector("#tabla_ingresos tbody");

  dataTbBody.innerHTML = "";

  ReportData.forEach((pet) => {
    let row = dataTbBody.insertRow();

    let celusuario = row.insertCell();
    celusuario.appendChild(document.createTextNode(pet.usuario));

    let celingreso = row.insertCell();
    celingreso.appendChild(document.createTextNode(pet.ingreso));

    let celsalida = row.insertCell();
    celsalida.appendChild(document.createTextNode(pet.salida));

    let celdia = row.insertCell();
    celdia.appendChild(document.createTextNode(pet.dia));
  });
}

function onFormSubmit(event) {
  event.preventDefault();

  const usuarioInput = document.getElementById("finder").value;
  const usuario = usuarioInput;
  console.log(usuarioInput);
  console.log(usuario);

  ReporteService.findAllByUsuario(usuario).then(
    (response) => {
      const usrfound = response.data;
      console.log(usrfound.usuario);
      console.log(usuarioInput);

      renderOneTable(usrfound);
    },
    (error) => {
      console.log(error);
    }
  );
}

function renderOneTable(usrfound) {
  let dataunTbBody = document.querySelector("#tabla_ingresosEncontrados tbody");

  dataunTbBody.innerHTML = "";

  usrfound.forEach((pet) => {
    let row = dataunTbBody.insertRow();

    let celusuario = row.insertCell();
    celusuario.appendChild(document.createTextNode(pet.usuario));

    let celingreso = row.insertCell();
    celingreso.appendChild(document.createTextNode(pet.ingreso));

    let celsalida = row.insertCell();
    celsalida.appendChild(document.createTextNode(pet.salida));

    let celdia = row.insertCell();
    celdia.appendChild(document.createTextNode(pet.dia));
  });
}
