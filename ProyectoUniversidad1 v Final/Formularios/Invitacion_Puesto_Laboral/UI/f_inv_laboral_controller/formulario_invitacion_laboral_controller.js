"use strict";

import { MailerService } from "../f_inv_labroal_services/mailer_service.js";
import { fInvLaboral } from "../f_inv_labroal_services/Invitacion_services.js";

document.addEventListener("DOMContentLoaded", () => {
  loadData();
  // const form = document.getElementById("invitacion");
  // form.addEventListener("submit", onFormSubmit);
});

function loadData() {
  var v_empresa_email = sessionStorage.getItem("empresa_email");
  var v_empresa_name = sessionStorage.getItem("empresa_name");
  var v_usuario_email = sessionStorage.getItem("user_email");
  var v_usuario_empresa_name = sessionStorage.getItem("user_job");
  var correo_empresa = "";
  var nombre_empresa = "";

  if (v_empresa_email == null) {
    correo_empresa = v_usuario_email;
  } else {
    correo_empresa = v_empresa_email;
  }

  if (v_empresa_name == null) {
    nombre_empresa = v_usuario_empresa_name;
  } else {
    nombre_empresa = v_empresa_name;
  }

  console.log("Quiero ver si estoy en trabajos");
  console.log(correo_empresa);
  console.log(nombre_empresa);
  Trabajos_Empresa(nombre_empresa);
}

function Trabajos_Empresa(nombre_empresa) {
  let TrabajosEmpresa = [];
  //Esto llama el json del server creado del mockdata
  fInvLaboral.findAllByNombre_empresa(nombre_empresa).then((response) => {
    console.log(response);
    TrabajosEmpresa = response.data;
    console.log("TrabajosEmpresa");
    console.log(TrabajosEmpresa);
    //Funcion que reproduce la data
    renderTablePublico(TrabajosEmpresa);
    // console.log(response);

    //Si hubiera error este error handler es la funcion de comunicacion de programa
  }, requestErrorHandler);
}

function renderTablePublico(TrabajosEmpresa) {
  let dataTbBody = document.querySelector("#Invitacion_Laboral tbody");

  dataTbBody.innerHTML = "";

  TrabajosEmpresa.forEach((pet) => {
    let row = dataTbBody.insertRow();

    let celnombre_empresa = row.insertCell();
    celnombre_empresa.appendChild(document.createTextNode(pet.responsible));

    let celpuesto_laboral = row.insertCell();
    celpuesto_laboral.appendChild(document.createTextNode(pet.puesto_laboral));

    let celAplicar = row.insertCell();
    let AplicarButton = document.createElement("button");
    //se le asigna el id de cada trabajo a los botones
    AplicarButton.id = pet._id;
    //Se aplica la funcion de invitacion al boton
    AplicarButton.onclick = invitacionEmpleo;
    AplicarButton.textContent = "Aplicar";
    celAplicar.appendChild(AplicarButton);
    console.log(AplicarButton);
  });
}

//Se llama la funcion de button creado, ademas se maneja de forma asincronada para poder asignar a variables
//las respuestas del BL
const invitacionEmpleo = async (e) => {
  e.preventDefault();
  console.log(e.target);
  var Puesto_Deseado = [];
  let id = e.target.id;
  console.log("id en aplicar Empleo", id);

  let invite_email = "";

  invite_email = document.getElementById("correo").value;
  console.log(invite_email);

  if (invite_email.length == 0) {
    alert("No hay correo");
  } else {
    console.log("REVISANDO CORREO");
    //Momento que se asigna el resultado de lo encontrado en findCliente, en este momento todo el dato json ligado al correo puesto
    Puesto_Deseado = await fInvLaboral.findClientByEmail(invite_email);

    console.log("Puesto_Deseado");
    console.log(Puesto_Deseado);
    //Aqui se pone el Dato para analizar si estaba creado el usuario
    if (Puesto_Deseado) {
      console.log("LLEGUE AL ULTIMO SALTO QUIERO VER ID");
      console.log(id);
      //Se asigna el valor id del button para analisis y se asigna en la variate job para realizar los empleos invite
      const job = await fInvLaboral.findJobBy_id(id);
      //se generan reportes y correos
      crearReporte(job, invite_email);
    }
  }
};

//Funcion de recuperar el error y poder visualizarlo
function requestErrorHandler(error) {
  console.log(error.message);
  console.log(error);
}

function crearReporte(Puesto_Deseado, invite_email) {
  console.log("LLEGUE A FORMAR LOS DATOS");
  //Se envia a crear reportes dentro del BL sobre reportes de puestos laborales
  fInvLaboral.reporteLaboral(Puesto_Deseado, invite_email);
  console.log("EMPEZAMOS EL CORREO");
  console.log("REVISO PUESTO DESEADO");
  console.log("Puesto_Deseado.responsible", Puesto_Deseado.data.responsible);
  sendEmailUser(Puesto_Deseado, invite_email);
  sendEmailEnterprise(Puesto_Deseado, invite_email);
}

function sendEmailUser(Puesto_Deseado, invite_email) {
  console.log("Envio usuario");
  console.log("Puesto_Deseado.responsible", Puesto_Deseado.data.responsible);
  const to = invite_email;
  const sujeto = `Invitacion a formar parte de nuestra empresa: ${Puesto_Deseado.data.nombre_empresa}`;
  const mensaje = `Sea usted bienvenido a ser parte de nuestro equipo en el puesto de: ${Puesto_Deseado.data.puesto_laboral}, si desea este participar en este puesto porfavor indicar su respuesta postiva o negativa al correo:${Puesto_Deseado.responsible}`;
  console.log("Antes de enviar el correo y generar reporte");
  MailerService.sendMail(to, sujeto, mensaje);
  alert(
    "Gracias por aplicar al puesto de Trabajo de: " +
      Puesto_Deseado.data.puesto_laboral
  );
}

function sendEmailEnterprise(Puesto_Deseado, invite_email) {
  console.log("Envio empresa");
  console.log("Puesto_Deseado.responsible", Puesto_Deseado.data.responsible);
  const to = Puesto_Deseado.data.responsible;
  const sujeto = `Se recibio una aplicacion laboral al puesto de: ${Puesto_Deseado.puesto_laboral}`;
  const mensaje = `El usuario: ${invite_email}, se muestra interesado del puesto laboral previamente indicado, por favor solicitar la informacion del cv por medio de correo electronico:${Puesto_Deseado.data.responsible}`;
  console.log("Antes de enviar el correo y generar reporte");
  MailerService.sendMail(to, sujeto, mensaje);
}
