"use strict";

import { edicionPuestosService } from "../f_edicion_puestos_service/r_miembros_empresa.services.js";

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
  let personasEmpresas = [];
  //Esto llama el json del server creado del mockdata
  edicionPuestosService
    .findByNombre_empresa(nombre_empresa)
    .then((response) => {
      console.log(response);
      personasEmpresas = response.data;
      console.log("personasEmpresas");
      console.log(personasEmpresas);
      //Funcion que reproduce la data
      renderTablePublico(personasEmpresas);
      // console.log(response);

      //Si hubiera error este error handler es la funcion de comunicacion de programa
    }, requestErrorHandler);
}

function renderTablePublico(personasEmpresas) {
  let dataTbBody = document.querySelector("#Trabajos tbody");

  dataTbBody.innerHTML = "";

  personasEmpresas.forEach((pet) => {
    let row = dataTbBody.insertRow();

    let celname = row.insertCell();
    celname.appendChild(document.createTextNode(pet.name));

    let celsurname = row.insertCell();
    celsurname.appendChild(document.createTextNode(pet.surname));

    let celemail = row.insertCell();
    celemail.appendChild(document.createTextNode(pet.email));

    let cellevel = row.insertCell();
    cellevel.appendChild(document.createTextNode(pet.level));

    console.log("id de cada puesto");
    console.log(pet._id);

    let celEditar = row.insertCell();
    let EditarButton = document.createElement("button");
    EditarButton.id = pet._id;
    EditarButton.onclick = editarPuesto;
    EditarButton.textContent = "Editar";
    celEditar.appendChild(EditarButton);
    console.log(EditarButton);
  });
}
function editarPuesto(e) {
  let id = e.target.id;
  console.log("id en aplicar Empleo");
  console.log(id);
  sessionStorage.setItem("id_empleado", id);

  let v_usuario_empresa_name = sessionStorage.getItem("id_empleado");
  console.log("id_empleado");
  console.log(v_usuario_empresa_name);

  window.location.href =
    "/ProyectoUniversidad1 v Final/Formularios/Edicion_Puestos_Empresa/UI/f_edicion_puestos_pagina_cambios/formulario_edicion.html";
}

//Funcion de recuperar el error y poder visualizarlo
function requestErrorHandler(error) {
  console.log(error.message);
  console.log(error);
}
