"use strict";

import { FLaboralService } from "../f_edc_puestos.services/F_laboral_service.js";

document.addEventListener("DOMContentLoaded", () => {
  loadData();
});

function loadData() {
  var verificacion_empresa_name = sessionStorage.getItem("empresa_name");
  var verificacion_usuario_empresa = sessionStorage.getItem("user_job");
  var nombre_empresa = "";

  if (verificacion_empresa_name == null) {
    nombre_empresa = verificacion_usuario_empresa;
  } else {
    nombre_empresa = verificacion_empresa_name;
  }

  Trabajos_Empresa(nombre_empresa);
}

function Trabajos_Empresa(nombre_empresa) {
  let TrabajosEmpresa = [];
  //Esto llama el json del server creado del mockdata
  FLaboralService.findAllByNombre_empresa(nombre_empresa).then((response) => {
    console.log(response);
    TrabajosEmpresa = response.data;
    console.log("TrabajosPublicos");
    console.log(TrabajosEmpresa);
    //Funcion que reproduce la data
    renderTablePublico(TrabajosEmpresa);
    // console.log(response);

    //Si hubiera error este error handler es la funcion de comunicacion de programa
  }, requestErrorHandler);
}

function renderTablePublico(TrabajosEmpresa) {
  let dataTbBody = document.querySelector("#Trabajos tbody");

  dataTbBody.innerHTML = "";

  TrabajosEmpresa.forEach((pet) => {
    let row = dataTbBody.insertRow();

    let celpuesto_laboral = row.insertCell();
    celpuesto_laboral.appendChild(document.createTextNode(pet.puesto_laboral));

    let celrango_salarial = row.insertCell();
    celrango_salarial.appendChild(document.createTextNode(pet.rango_salarial));

    let celrequisitos_minimo = row.insertCell();
    celrequisitos_minimo.appendChild(
      document.createTextNode(pet.requisitos_minimo)
    );

    let celatributos_deseables = row.insertCell();
    celatributos_deseables.appendChild(
      document.createTextNode(pet.atributos_deseables)
    );

    console.log("id de cada puesto");
    console.log(pet._id);

    let celEditar = row.insertCell();
    let EditarButton = document.createElement("button");
    EditarButton.id = pet._id;
    EditarButton.onclick = editarTrabajo;
    EditarButton.textContent = "Editar";
    celEditar.appendChild(EditarButton);
    console.log(EditarButton);
  });
}
function editarTrabajo(e) {
  let id = e.target.id;
  console.log("id en aplicar Empleo");
  console.log(id);
  sessionStorage.setItem("id_trabajo", id);

  let v_usuario_empresa_name = sessionStorage.getItem("id_trabajo");
  console.log("id storage");
  console.log(v_usuario_empresa_name);

  window.location.href =
    "/ProyectoUniversidad1 v Final/Formularios/Edicion_Puesto.laborales/UI/f_edc_pg_edicion_definitava/f_edc_pg_edicion_definitava.html";
}

//Funcion de recuperar el error y poder visualizarlo
function requestErrorHandler(error) {
  console.log(error.message);
  console.log(error);
}
