"use strict";

import { HomeService } from "../hompages_services/home.service.js";
import { MailerService } from "../hompages_services/mailer_service.js";

document.addEventListener("DOMContentLoaded", () => {
  loadData();
  document.getElementById("logout").addEventListener("click", onClick);
});

function loadData() {
  const user_email = sessionStorage.getItem("user_email");
  const user_level = sessionStorage.getItem("user_level");

  console.log("Quiero ver si estoy en trabajos");
  console.log(user_email);
  console.log(user_level);

  HomeService.findClientByEmail(user_email).then((response) => {
    var usuario = [];
    usuario = response.data;
    console.log(usuario);

    var NyA = document.getElementById("NyA");
    var imagenUsuario = document.getElementById("profile");
    var storedURL = sessionStorage.getItem("fotoPerfilURL");
    NyA.innerHTML = usuario.name + "<br>" + usuario.surname;
    if (storedURL) {
      // Verificar si storedURL no está vacío
      usuario.f_perfil = storedURL;
    }
    imagenUsuario.src = usuario.f_perfil;

    // GuardarCambios(usuario);
  });
  Trabajos_Publicos();
  reporteMiAplicacion(user_email);
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
  }, requestErrorHandler);
}

function reporteMiAplicacion(user_email) {
  console.log("user_email", user_email);
  var u_applicant = user_email;
  let ReportData = [];
  // Se llama al servicio que pide todos los aplicantes
  HomeService.findClientByU_applicant(u_applicant).then((response) => {
    ReportData = response.data;
    console.log(ReportData);
    renderTableReporte(ReportData);
  }, requestErrorHandler);
}

function renderTableReporte(ReportData) {
  let dataTbBody = document.querySelector("#puesto_a tbody");

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

    console.log("id de cada puesto");
    console.log(pet._id);

    let celAplicar = row.insertCell();
    let AplicarButton = document.createElement("button");
    AplicarButton.id = pet._id;
    AplicarButton.onclick = aplicarEmpleo;
    AplicarButton.textContent = "Aplicar";
    celAplicar.appendChild(AplicarButton);
    console.log(AplicarButton);
  });
}
function aplicarEmpleo(e) {
  var Puesto_Deseado = [];
  let id = e.target.id;
  console.log("id en aplicar Empleo");
  console.log(id);

  HomeService.findJobBy_id(id).then((response) => {
    Puesto_Deseado = response.data;
    console.log("Puesto_Deseado");
    console.log(Puesto_Deseado);
    console.log("qUIERO VER SI LLEGA USER EMAIL AQUI ANTES DEL REPORTE");

    const user_email = sessionStorage.getItem("user_email");
    console.log(user_email);
    crearReporte(Puesto_Deseado, user_email);

    //Si hubiera error este error handler es la funcion de comunicacion de programa
  }, requestErrorHandler);
}

//Funcion de recuperar el error y poder visualizarlo
function requestErrorHandler(error) {
  console.log(error.message);
  console.log(error);
}

function crearReporte(Puesto_Deseado, user_email) {
  HomeService.reporteLaboral(Puesto_Deseado, user_email);
  sendEmailUser(Puesto_Deseado, user_email);
  sendEmailEnterprise(Puesto_Deseado, user_email);
}

function sendEmailUser(Puesto_Deseado, user_email) {
  const to = user_email;
  const sujeto = `Invitacion a formar parte de nuestra empresa: ${Puesto_Deseado.nombre_empresa}`;
  const mensaje = `Sea usted bienvenido a ser parte de nuestro equipo en el puesto de: ${Puesto_Deseado.puesto_laboral}, si desea este participar en este puesto porfavor indicar su respuesta postiva o negativa al correo:${Puesto_Deseado.responsible}`;
  console.log("Antes de enviar el correo y generar reporte");
  MailerService.sendMail(to, sujeto, mensaje);
  alert(
    "Gracias por aplicar al puesto de Trabajo de: " +
      Puesto_Deseado.puesto_laboral
  );
}

function sendEmailEnterprise(Puesto_Deseado, user_email) {
  const to = Puesto_Deseado.responsible;
  const sujeto = `Se recibio una aplicacion laboral al puesto de: ${Puesto_Deseado.puesto_laboral}`;
  const mensaje = `El usuario: ${user_email}, se muestra interesado del puesto laboral previamente indicado, por favor solicitar la informacion del cv por medio de correo electronico:${Puesto_Deseado.responsible}`;
  console.log("Antes de enviar el correo y generar reporte");
  MailerService.sendMail(to, sujeto, mensaje);
}

function onClick(event) {
  event.preventDefault();

  var confirmLogout = confirm("¿Desea cerrar sesión en este momento?");

  if (confirmLogout) {
    const nombre_empresa = sessionStorage.getItem("user_job");
    const user_email = sessionStorage.getItem("user_email");
    const user_level = sessionStorage.getItem("user_level");
    const date = new Date(sessionStorage.getItem("login_date"));
    const access_date = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    const access_time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    const exit_time = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;

    if (user_level != 1) {
      const data = {
        nombre_empresa: nombre_empresa,
        usuario: user_email,
        ingreso: access_time,
        salida: exit_time,
        dia: access_date,
      };
      console.log(data);
      HomeService.registerTimeStamp(data);
    } else {
      sessionStorage.clear();
    }

    sessionStorage.clear();
    location.replace(
      "/ProyectoUniversidad1 v Final//Users/Login/UI/modules/login.html"
    );
  }
}
