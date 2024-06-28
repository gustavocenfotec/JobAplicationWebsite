"use strict";

import { edicionPuestosService } from "../f_edicion_puestos_service/r_miembros_empresa.services.js";

// Se declara la informacion de una supuesta base de datos de los clientes y empresa,
// entre estos se declara el nivel de parametros que posee cada uno de los correos param
// accesar a un homepage diferente

// Una vez cargada la pagina se extrae la informacion del form con id Login, y el boton Submit
// el cual activara la funcion onFormSubmit

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("invitacion");
  form.addEventListener("submit", onFormSubmit);
  loadData();
});
// A continucacion se declara la funcion onFormSubmit, los inputs de texto (mail y pwd)
// capturaran todo valor ingresado, los radio inputs (ambos poseen el mismo nombre acct),
// finalmente se invocan cada uno individualmente por el nombre de su id

function loadData() {
  let id = sessionStorage.getItem("id_empleado");
  console.log("id_empleado", id);
  descripcionTrabajo(id);
}

function descripcionTrabajo(id) {
  edicionPuestosService.findByClienteId(id).then((response) => {
    console.log(response);
    let personal = response.data;
    console.log("personal");
    console.log(personal);
    //Funcion que reproduce la data
    renderTablePublico(personal);
    // console.log(response);
  });
}

function renderTablePublico(personal) {
  let dataTbBody = document.querySelector("#Trabajos tbody");

  dataTbBody.innerHTML = "";

  let row = dataTbBody.insertRow();

  let celname = row.insertCell();
  celname.appendChild(document.createTextNode(personal.name));

  let celsurname = row.insertCell();
  celsurname.appendChild(document.createTextNode(personal.surname));

  let celemail = row.insertCell();
  celemail.appendChild(document.createTextNode(personal.email));

  let cellevel = row.insertCell();
  cellevel.appendChild(document.createTextNode(personal.level));

  console.log("id de la persona");
  console.log(personal._id);
}

function onFormSubmit(event) {
  event.preventDefault();
  const administrador = document.getElementById("administrador");
  const manager = document.getElementById("manager");
  const reclutador = document.getElementById("reclutador");
  let a = administrador.checked;
  let b = manager.checked;
  let c = reclutador.checked;
  let id = sessionStorage.getItem("id_empleado");

  console.log(a);
  console.log(b);
  console.log(c);
  // Este dato es utilizado para realizar la inspeccion de los datos dentro del formulario
  let verificacion = true;
  verificacion = CheckVerificacion(verificacion, a, b, c);

  let level = "";
  if (a === true) {
    level = 4;
  } else if (b === true) {
    level = 3;
  } else {
    level = 2;
  }
  console.log(verificacion);
  edicionPuestosService.findByClienteId(id).then((response) => {
    let personal = [];
    console.log(response);
    personal = response.data;
  });

  if (verificacion === true) {
    //hacer el put aqui;
    edicionPuestosService.updateInformation({
      id: id,
      level: level,
    });
  } else {
    alert("Error: Hay que rellenar todos los espacios");
  }

  function CheckVerificacion(verificacion, a, b, c) {
    console.log(a);
    console.log(b);
    console.log(c);

    //Se realiza la revision que el espacio de ratio y tipo de invitacion este lleno
    if (a === false && b === false && c === false) {
      alert("Error: Por favor seleccionar el tipo de Invitacion");
      return (verificacion = false);
    } else return (verificacion = true);
  }
}
