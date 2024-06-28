"use strict";
//Informacion de Importadcion de Servicios
import { ReporteService } from "../reporte.service/reporte_u_final_service.js";

//Inicio de Pagina
document.addEventListener("DOMContentLoaded", () => {
  //Data que se actualiza en el sistema
  loadData();
});

//Esta Funcion representa que se muestra dentro del html, una vez que se encuentra funcional el server
function loadData() {
  const u_applicant = sessionStorage.getItem("user_email");
  console.log(u_applicant);

  // Se hace verficacion de persona que entra al sistema
  findClientByU_applicant(u_applicant);
}

function findClientByU_applicant(u_applicant) {
  console.log("Service Afeura");
  console.log(u_applicant);
  let ReportData = [];
  // Se llama al servicio que pide todos los aplicantes
  ReporteService.findClientByU_applicant(u_applicant).then((response) => {
    ReportData = response.data;
    console.log(ReportData);
    renderTable(ReportData);
  }, requestErrorHandler);
}

// Funcion de recuperar el error y poder visualizarlo
function requestErrorHandler(error) {
  console.log(error.message);
  console.log(error);
}

//Funcion que llama a la renderizacion de la tabla
function renderTable(ReportData) {
  let dataTbBody = document.querySelector("#reporte_aplicacion_usuario tbody");

  dataTbBody.innerHTML = "";
  console.log(ReportData);

  ReportData.forEach((pet) => {
    let row = dataTbBody.insertRow();
    console.log(pet.empresa);
    let celempresa = row.insertCell();
    celempresa.appendChild(document.createTextNode(pet.empresa));
    console.log(pet.position);
    let celpuesto = row.insertCell();
    celpuesto.appendChild(document.createTextNode(pet.position));
    console.log(pet.ap_recibed);
    let celaplicacion_recibida = row.insertCell();
    celaplicacion_recibida.appendChild(document.createTextNode(pet.ap_recibed));

    let celaplicacion_en_revision = row.insertCell();
    celaplicacion_en_revision.appendChild(
      document.createTextNode(pet.ap_on_check)
    );

    let celaprobada = row.insertCell();
    celaprobada.appendChild(document.createTextNode(pet.approved));

    let celrechazada = row.insertCell();
    celrechazada.appendChild(document.createTextNode(pet.denied));
  });
}
