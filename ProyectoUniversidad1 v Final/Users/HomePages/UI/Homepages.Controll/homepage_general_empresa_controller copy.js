"use strict";

import { HomeService } from "../hompages_services/home.service.js";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("logout").addEventListener("click", onClick);
  loadData();
});
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

function loadData() {
  const user_email = sessionStorage.getItem("empresa_email");
  const user_level = sessionStorage.getItem("empresa_level");
  const user_name = sessionStorage.getItem("empresa_name");

  HomeService.findClientByEmailEmpress(user_email).then((response) => {
    var usuario = [];
    usuario = response.data;
    console.log(usuario);

    var Name = document.getElementById("name");
    var descripcion = document.getElementById("descripcion");
    var imagenUsuario = document.getElementById("profile");
    var storedURL = sessionStorage.getItem("fotoPerfilURL");
    Name.textContent = usuario.name;
    descripcion.textContent = usuario.descripcion;
    if (storedURL) {
      // Verificar si storedURL no está vacío
      usuario.f_perfil = storedURL;
    }
    imagenUsuario.src = usuario.f_perfil;
  });

  Trabajos_Publicos();
}

function Trabajos_Publicos() {
  let TrabajosPublicos = [];
  //Esto llama el json del server creado del mockdata
  HomeService.findAllJobs().then((response) => {
    console.log(response);
    TrabajosPublicos = response.data;
    console.log("TrabajosPublicos");
    console.log(TrabajosPublicos);
    //Funcion que reproduce la data
    renderTablePublico(TrabajosPublicos);
    // console.log(response);

    //Si hubiera error este error handler es la funcion de comunicacion de programa
  });
}

function renderTablePublico(TrabajosPublicos) {
  let dataTbBody = document.querySelector("#puesto_c tbody");

  dataTbBody.innerHTML = "";

  TrabajosPublicos.forEach((pet) => {
    let row = dataTbBody.insertRow();

    let celnombre_empresa = row.insertCell();
    celnombre_empresa.appendChild(document.createTextNode(pet.nombre_empresa));

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
  });
}
