"use strict";

import { ClientService } from "../olvido_services/user_service.js";
import { EmpressService } from "../olvido_services/enterprise_service.js";
import { MailerService } from "../olvido_services/mailer_service.js";

// Se declara la informacion de una supuesta base de datos de los clientes y empresa,
// entre estos se declara el nivel de parametros que posee cada uno de los correos param
// accesar a un homepage diferente

// Una vez cargada la pagina se extrae la informacion del form con id Login, y el boton Submit
// el cual activara la funcion onFormSubmit

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("olvido_contrasena");
  form.addEventListener("submit", onFormSubmit);
});
// A continucacion se declara la funcion onFormSubmit, los inputs de texto (mail y pwd)
// capturaran todo valor ingresado, los radio inputs (ambos poseen el mismo nombre acct),
// finalmente se invocan cada uno individualmente por el nombre de su id

function onFormSubmit(event) {
  event.preventDefault();

  var emailInput = document.getElementById("correo").value;
  console.log(emailInput);

  if (emailInput == 0) {
    alert("Error 2: Revisa que el campo de correo electronico no estte vacio.");
  } else {
    //Despues de verifiacar pasamos a revisar los usuarios dentro de la base de datos
    checkUserDatabase(emailInput);
  }
}

// funcion de revision y poder dar respuesta
function checkUserDatabase(emailInput) {
  recoverClientPassword(emailInput);
  recoverEmpressPasswordEmail(emailInput);
}

// aqui se procede a revisar si el usuario existe y si la respuesta existe
// se procede a enviar el correo electronico
function recoverClientPassword(emailInput) {
  ClientService.findClientByEmail(emailInput).then((response) => {
    const user = response.data;
    if (user.email == 0) {
      alert("ERROR 005: PUEDO REGISTRARME");
    } else {
      console.log("password");
      console.log(user.pass);
      const to = user.email;
      console.log(user.pass);
      const sujeto = "Recuperacion contrasena cliente";
      const mensaje = `Mensaje para la empresa. Su contrasena es ${user.pass}`;
      // Despues de agarrar los parametros para el mensaje se procede a enviar el correo de envi de recuperacion
      MailerService.sendMail(to, sujeto, mensaje);
    }

    console.log(user);
  });
}

//Mismo paso de recuperacion, revisar correo en base y generar informacion y enviar
function recoverEmpressPasswordEmail(emailInput) {
  EmpressService.findEmpressByEmail(emailInput).then((response) => {
    const empresa = response.data;
    console.log(empresa.pass);
    if (empresa.email == 0) {
      alert("ERROR 005: EMPRESA NO EXISTE");
    } else {
      const to = empresa.email;
      const sujeto = "Recuperacion contrasena cliente";
      const mensaje = `Mensaje para la empresa. Su contrasena es ${empresa.pass}`;
      MailerService.sendMail(to, sujeto, mensaje);
    }
  });
}
