"use strict";
//Informacion de Importadcion de Servicios
import { ReporteService } from "../R_puestos_laborales_service/r_puestos_laborales_service.js";

//Inicio de Pagina
document.addEventListener("DOMContentLoaded", () => {
  //MOMENTO DONDE SE BUSCA QUIEN PIDE LA INFORMACION E INDICAR LA INFORMACION REQUERIDA
  var verificacion_empresa_name = sessionStorage.getItem("empresa_name");
  var verificacion_usuario_empresa = sessionStorage.getItem("user_job");
  var empresa = "";

  const form = document.getElementById("filter");
  form.addEventListener("submit", onFormSubmit);

  if (verificacion_empresa_name == null) {
    empresa = verificacion_usuario_empresa;
  } else {
    empresa = verificacion_empresa_name;
  }
  loadData(empresa);
});

//Esta Funcion representa que se muestra dentro del html, una vez que se encuentra funcional el server
function loadData(empresa) {
  let ReportData = [];
  //Esto llama el json del server creado del mockdata
  ReporteService.findAllClientByEmpresa(empresa).then((response) => {
    console.log(response);
    ReportData = response.data;
    console.log("ReportData");
    console.log(ReportData);
    //Funcion que reproduce la data
    renderTable(ReportData);
    // console.log(response);

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
  let dataTbBody = document.querySelector("#tabla_puestos_laborales tbody");

  dataTbBody.innerHTML = "";

  ReportData.forEach((pet) => {
    let row = dataTbBody.insertRow();

    let celresponsible = row.insertCell();
    celresponsible.appendChild(document.createTextNode(pet.responsible));

    let celu_applicant = row.insertCell();
    celu_applicant.appendChild(document.createTextNode(pet.u_applicant));

    let celposition = row.insertCell();
    celposition.appendChild(document.createTextNode(pet.position));

    let celap_recibed = row.insertCell();
    celap_recibed.appendChild(document.createTextNode(pet.ap_recibed));

    let celap_on_check = row.insertCell();
    celap_on_check.appendChild(document.createTextNode(pet.ap_on_check));

    let celapproved = row.insertCell();
    celapproved.appendChild(document.createTextNode(pet.approved));

    let celdenied = row.insertCell();
    celdenied.appendChild(document.createTextNode(pet.denied));
  });
}

function onFormSubmit(event) {
  event.preventDefault();

  const positionInput = document.getElementById("finder").value;
  const position = positionInput;
  console.log(positionInput);
  console.log(position);

  ReporteService.findAllByPosition(position).then(
    (response) => {
      const posfound = response.data;
      console.log(posfound.position);
      console.log(positionInput);

      renderOneTable(posfound);
    },
    (error) => {
      console.log(error);
    }
  );
}

//Funcion que llama a la renderizacion de la tabla
function renderOneTable(posfound) {
  let dataTbBody = document.querySelector(
    "#tabla_puestos_laborales_encontrados tbody"
  );

  dataTbBody.innerHTML = "";

  posfound.forEach((pet) => {
    let row = dataTbBody.insertRow();

    let celresponsible = row.insertCell();
    celresponsible.appendChild(document.createTextNode(pet.responsible));

    let celu_applicant = row.insertCell();
    celu_applicant.appendChild(document.createTextNode(pet.u_applicant));

    let celposition = row.insertCell();
    celposition.appendChild(document.createTextNode(pet.position));

    let celap_recibed = row.insertCell();
    celap_recibed.appendChild(document.createTextNode(pet.ap_recibed));

    let celap_on_check = row.insertCell();
    celap_on_check.appendChild(document.createTextNode(pet.ap_on_check));

    let celapproved = row.insertCell();
    celapproved.appendChild(document.createTextNode(pet.approved));

    let celdenied = row.insertCell();
    celdenied.appendChild(document.createTextNode(pet.denied));
  });
}
