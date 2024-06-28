"use strict";
//Informacion de Importadcion de Servicios
import { ReporteServiceInv } from "../R_Invitaciones_services/reporte_inv_empresas_service.js";

//Inicio de Pagina
document.addEventListener("DOMContentLoaded", () => {
  var verificacion_empresa_name = sessionStorage.getItem("empresa_name");
  var verificacion_usuario_empresa = sessionStorage.getItem("user_job");
  var nombre_empresa = "";

  console.log(verificacion_empresa_name);
  console.log(verificacion_usuario_empresa);

  if (verificacion_empresa_name == null) {
    nombre_empresa = verificacion_usuario_empresa;
  } else {
    nombre_empresa = verificacion_empresa_name;
  }
  console.log("se envia a load data");
  console.log(nombre_empresa);
  loadData(nombre_empresa);
});

//Esta Funcion representa que se muestra dentro del html, una vez que se encuentra funcional el server
function loadData(nombre_empresa) {
  console.log("nombre_empresa load");
  console.log(nombre_empresa);
  let ReportData = [];
  //Esto llama el json del server creado del mockdata
  ReporteServiceInv.findAllByNombre_empresa(nombre_empresa).then((response) => {
    console.log(response);
    ReportData = response.data;
    console.log("ReportData");
    console.log(ReportData);
    //Funcion que reproduce la data
    renderTable(ReportData);

    //Si hubiera error este error handler es la funcion de comunicacion de programa
  }, requestErrorHandler);

  // console.log(carData)
}

//Funcion de recuperar el error y poder visualizarlo
function requestErrorHandler(error) {
  console.log(error.message);
  console.log(error);
}

//Funcion que llama a la renderizacion de la tabla
function renderTable(ReportData) {
  let dataTbBody = document.querySelector("#Tabla_invitaciones tbody");

  dataTbBody.innerHTML = "";

  ReportData.forEach((pet) => {
    let row = dataTbBody.insertRow();

    let celu_invite = row.insertCell();
    celu_invite.appendChild(document.createTextNode(pet.u_invite));

    let celposition = row.insertCell();
    celposition.appendChild(document.createTextNode(pet.position));

    let celinv_send = row.insertCell();
    celinv_send.appendChild(document.createTextNode(pet.inv_send));

    let celaccepted = row.insertCell();
    celaccepted.appendChild(document.createTextNode(pet.accepted));

    let celdenied = row.insertCell();
    celdenied.appendChild(document.createTextNode(pet.denied));
  });
}
