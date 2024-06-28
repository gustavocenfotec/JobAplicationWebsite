"use strict";
//Informacion de Importadcion de Servicios
import { ReporteService } from "../r_miembros_empresa.services/r_miembros_empresa.services.js";

//Inicio de Pagina
document.addEventListener("DOMContentLoaded", () => {
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
  ReporteService.findByNombre_empresa(nombre_empresa).then((response) => {
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
  let dataTbBody = document.querySelector("#misMiembros tbody");

  dataTbBody.innerHTML = "";

  ReportData.forEach((pet) => {
    let row = dataTbBody.insertRow();

    let celusuario = row.insertCell();
    celusuario.appendChild(document.createTextNode(pet.email));

    let celingreso = row.insertCell();
    celingreso.appendChild(document.createTextNode(pet.name));

    let celsalida = row.insertCell();
    celsalida.appendChild(document.createTextNode(pet.surname));

    let celdia = row.insertCell();
    celdia.appendChild(document.createTextNode(pet.level));
  });
}
