"use strict";

import { HomeService } from "../hompages_services/home.service.js";

document.addEventListener("DOMContentLoaded", () => {
  loadData();
  document.getElementById("logout").addEventListener("click", onClick);
});

function loadData() {
  console.log("Quiero ver si estoy en trabajos");
  Empresas();
}

function Empresas() {
  let TodasEmpresas = [];
  //Esto llama el json del server creado del mockdata
  HomeService.findAllEmpresas().then((response) => {
    console.log(response);
    TodasEmpresas = response.data;
    console.log("TodasEmpresas");
    console.log(TodasEmpresas);
    //Funcion que reproduce la data
    renderTablePublico(TodasEmpresas);
    // console.log(response);
  });
}

function renderTablePublico(TodasEmpresas) {
  let dataTbBody = document.querySelector("#empresasTodas tbody");

  dataTbBody.innerHTML = "";

  TodasEmpresas.forEach((pet) => {
    let row = dataTbBody.insertRow();

    let celnombre_empresa = row.insertCell();
    celnombre_empresa.appendChild(document.createTextNode(pet.name));

    let celemail = row.insertCell();
    celemail.appendChild(document.createTextNode(pet.email));

    console.log("id de cada puesto");
    console.log(pet._id);

    let celBorrar = row.insertCell();
    let EliminarButton = document.createElement("button");
    EliminarButton.id = pet._id;
    EliminarButton.onclick = EliminarEmpleo;
    EliminarButton.textContent = "Elminar";
    celBorrar.appendChild(EliminarButton);
    console.log(EliminarButton);
  });
}
function EliminarEmpleo(e) {
  let id = e.target.id;
  console.log("id en aplicar Empleo");
  console.log(id);

  HomeService.deleteJob(id);
  loadData();
}

function onClick(event) {
  event.preventDefault();

  var confirmLogout = confirm("¿Desea cerrar sesión en este momento?");

  if (confirmLogout) {
    sessionStorage.clear();
    location.replace(
      "/ProyectoUniversidad1 v Final//Users/Login/UI/modules/login.html"
    );
  }
}
