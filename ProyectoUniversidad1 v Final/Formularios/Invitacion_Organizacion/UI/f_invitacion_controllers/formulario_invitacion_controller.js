"use strict";

import { ClientService } from "../f_inivitacion_services/user_service.js";
import { MailerService } from "../f_inivitacion_services/mailer_service.js";

// Se declara la informacion de una supuesta base de datos de los clientes y empresa,
// entre estos se declara el nivel de parametros que posee cada uno de los correos param
// accesar a un homepage diferente

// Una vez cargada la pagina se extrae la informacion del form con id Login, y el boton Submit
// el cual activara la funcion onFormSubmit

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("invitacion");
  form.addEventListener("submit", onFormSubmit);
});
// A continucacion se declara la funcion onFormSubmit, los inputs de texto (mail y pwd)
// capturaran todo valor ingresado, los radio inputs (ambos poseen el mismo nombre acct),
// finalmente se invocan cada uno individualmente por el nombre de su id

function onFormSubmit(event) {
  event.preventDefault();
  const correo = document.getElementById("correo");
  const administrador = document.getElementById("administrador");
  const manager = document.getElementById("manager");
  const reclutador = document.getElementById("reclutador");
  let email = correo.value;
  let a = administrador.checked;
  let b = manager.checked;
  let c = reclutador.checked;
  var v_empresa_email = sessionStorage.getItem("empresa_email");
  var v_empresa_name = sessionStorage.getItem("empresa_name");
  var v_usuario_email = sessionStorage.getItem("user_email");
  var v_usuario_empresa_name = sessionStorage.getItem("user_job");
  var correo_empresa = "";
  var nombre_empresa = "";
  console.log("v_empresa_email", v_empresa_email);
  console.log("v_empresa_name", v_empresa_name);
  console.log("user_email", v_usuario_email);
  console.log("user_job", v_usuario_empresa_name);

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

  console.log(email);
  console.log(a);
  console.log(b);
  console.log(c);
  // Este dato es utilizado para realizar la inspeccion de los datos dentro del formulario
  let verificacion = true;
  verificacion = CheckVerificacion(verificacion, email, a, b, c);

  let puesto = "";
  if (a === true) {
    puesto = "administrador";
  } else if (b === true) {
    puesto = "manager";
  } else {
    puesto = "reclutador";
  }
  console.log(verificacion);

  if (verificacion === true) {
    sendEmail(email, puesto, correo_empresa, nombre_empresa);
  } else {
    alert("Error: Hay que rellenar todos los espacios");
  }

  function CheckVerificacion(verificacion, email, a, b, c) {
    console.log(a);
    console.log(b);
    console.log(c);

    // Se realiza la revision que el espacio email este lleno
    if (email === "") {
      alert("Error: Espacio de correo Electronico se encuentra vacio");
      return (verificacion = false);
    }
    //Se realiza la revision que el espacio de ratio y tipo de invitacion este lleno
    if (a === false && b === false && c === false) {
      alert("Error: Por favor seleccionar el tipo de Invitacion");
      return (verificacion = false);
    } else return (verificacion = true);
  }

  function sendEmail(email, puesto, correo_empresa, nombre_empresa) {
    console.log("Entre al Send Email");
    ClientService.findClientByEmail(email).then((response) => {
      const user = response.data;
      if (user.email == 0) {
        alert("ERROR 005: USUARIO NO EXISTE");
      } else {
        // const to = user.email;
        const to = user.email;
        const sujeto = `Invitacion a formar parte de nuestra empresa:${nombre_empresa}`;
        const mensaje = `Sea usted bienvenido a ser parte de nuestro equipo en el puesto de: ${puesto}, si desea este puesto porfavor indicar su respuesta postiva o negativa al correo:${correo_empresa}`;
        console.log("Antes de enviar el correo y generar reporte");
        createReport(user, puesto, nombre_empresa);
        MailerService.sendMail(to, sujeto, mensaje);
        alert("Correo enviado");
      }

      console.log(user);
    });
  }
  function createReport(user, puesto, nombre_empresa) {
    const data = {
      nombre_empresa: nombre_empresa,
      u_invite: user.email,
      position: puesto,
    };
    console.log("Data Reporte");
    console.log(data);
    ClientService.creacionReporteInv(data);
  }
}
