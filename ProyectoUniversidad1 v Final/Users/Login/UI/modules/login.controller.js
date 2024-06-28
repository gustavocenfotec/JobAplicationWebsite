"use strict";

import { ClientService } from "../services/client.service.js";
import { EmpressService } from "../services/empress.service.js";

// Se declara la informacion de una supuesta base de datos de los clientes y empresa,
// entre estos se declara el nivel de parametros que posee cada uno de los correos param
// accesar a un homepage diferente

// Una vez cargada la pagina se extrae la informacion del form con id Login, y el boton Submit
// el cual activara la funcion onFormSubmit

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login");
  form.addEventListener("submit", onFormSubmit);
});
// A continucacion se declara la funcion onFormSubmit, los inputs de texto (mail y pwd)
// capturaran todo valor ingresado, los radio inputs (ambos poseen el mismo nombre acct),
// finalmente se invocan cada uno individualmente por el nombre de su id

function onFormSubmit(event) {
  event.preventDefault();
  var emailInput = document.getElementById("mail").value;
  var passwordInput = document.getElementById("pwd").value;
  var radioInputs = document.getElementsByName("acct");
  var usr = document.getElementById("usuario");
  var empresa = document.getElementById("empresa");
  console.log(emailInput);
  console.log(passwordInput);
  console.log(radioInputs);
  console.log(usr.checked);
  console.log(empresa.checked);

  //VERIFICACION DE DATOS PUESTOS EN EL FORMULARIO DE SUBMIT
  if (CheckVerificacion(emailInput, passwordInput, radioInputs)) {
    if (usr.checked === true) {
      //LLAMADA AL CHECK DE AUTORIZACION DE USER
      AuthorizeUser(emailInput, passwordInput);
    } else if (empresa.checked === true) {
      //LLAMADA AL CHECK DE AUTORIZACION DE EMPRESAS
      AuthorizeEmpress(emailInput, passwordInput);
    } else {
      alert("ERROR 001:VOLVER A PONER DATOS");
    }
  }
}

function checkUserLevel(user) {
  console.log(user.level);
  //AQUI INICIA LA SESION DE USUARIO
  sessionStorage.setItem("user_job", user.nombre_empresa);
  sessionStorage.setItem("foto_perfil", user.f_perfil);
  sessionStorage.setItem("nombre_usuario", user.name);
  sessionStorage.setItem("user_email", user.email);
  sessionStorage.setItem("user_level", user.level);
  sessionStorage.setItem("login_date", new Date());
  if (user.level === 1) {
    console.log(user.level);
    alert("Felicidades entro en su cuenta CLIENTE");
    window.location.href =
      "/ProyectoUniversidad1 v Final/Users/HomePages/UI/Homepages.Controll/homepage_usuariofinal.html";
  } else if (user.level === 2) {
    console.log(user.level);
    alert("Felicidades entro en su cuenta reclutador");
    window.location.href =
      "/ProyectoUniversidad1 v Final/Users/HomePages/UI/Homepages.Controll/homepage_reclutador.html";
  } else if (user.level === 3) {
    console.log(user.level);
    alert("Felicidades entro en su cuenta Manager");
    window.location.href =
      "/ProyectoUniversidad1 v Final/Users/HomePages/UI/Homepages.Controll/homepage_manager.html";
  } else if (user.level === 4) {
    console.log(user.level);
    alert("Felicidades entro en su cuenta Administrador");
    window.location.href =
      "/ProyectoUniversidad1 v Final/Users/HomePages/UI/Homepages.Controll/homepage_administrador.html";
  } else {
    console.log(user.level);
    alert("ERROR U-006: USUARIO (CLIENTE) NO REGISTRADO");
    //BORRAR SESION BAJO VALUE VACIO
    sessionStorage.setItem("user_job", "");
    sessionStorage.setItem("user_email", "");
    sessionStorage.setItem("user_level", "");
    sessionStorage.setItem("login_date", "");
  }
}
//AQUI INICIA LA SESION DE USUARIO
function checkEmpresaLevel(empresa) {
  sessionStorage.setItem("empresa_level", empresa.level);
  sessionStorage.setItem("empresa_name", empresa.name);
  sessionStorage.setItem("empresa_email", empresa.email);
  if (empresa.level === 5) {
    alert("Felicidades entro en su cuenta Empresa");
    window.location.href =
      "/ProyectoUniversidad1 v Final/Users/HomePages/UI/Homepages.Controll/homepage_empresa.html";
  } else if (empresa.level === 6) {
    alert("Felicidades entro en su cuenta Manejo de Empresas");
    window.location.href =
      "/ProyectoUniversidad1 v Final/Users/HomePages/UI/Homepages.Controll/homepage_master_controller.html";
  } else {
    console.log(empresa.level);
    //BORRAR SESION BAJO VALUE VACIO
    alert("ERROR E-007: USUARIO (EMPRESA) NO REGISTRADO");
    sessionStorage.setItem("empresa_level", "");
    sessionStorage.setItem("empresa_name", "");
    sessionStorage.setItem("empresa_email", "");
  }
}

//INICIO DE VERIFICACION POR MEDIO DE LLAMADO DE BASE DE DATOS POR MEDIO DEL BL
function AuthorizeUser(emailInput, passwordInput) {
  ClientService.findClientByEmail(emailInput).then((response) => {
    const user = response.data;
    console.log(user.pass);
    console.log(passwordInput);
    if (user.pass === passwordInput) {
      console.log(user.pass);
      console.log(passwordInput);
      //REVISION DE NIVEL DEL USUARIO QUE INGRESA
      checkUserLevel(user);
    } else {
      console.log(user.pass);
      console.log(passwordInput);
      alert("ERROR 005: USUARIO NO EXISTE");
    }

    console.log(user);
  });
}
//INICIO DE VERIFICACION POR MEDIO DE LLAMADO DE BASE DE DATOS POR MEDIO DEL BL
function AuthorizeEmpress(emailInput, passwordInput) {
  EmpressService.findEmpressByEmail(emailInput).then((response) => {
    const empresa = response.data;
    console.log(empresa.pass);
    console.log(passwordInput);
    if (empresa.pass === passwordInput) {
      console.log(empresa.pass);
      console.log(passwordInput);
      //REVISION DE NIVEL DEL USUARIO QUE INGRESA
      checkEmpresaLevel(empresa);
    } else {
      console.log(empresa.pass);
      console.log(passwordInput);
      alert("ERROR 005: EMPRESA NO EXISTE");
    }
  });
}

//END TODO

// Se declara una funcion que verifique los parametros necesarios para poder procesar el ingreso de cada usuario

function CheckVerificacion(emailInput, passwordInput, radioInputs) {
  // trim nos permite eliminar espacios al inicio y al final del input del correo electronico para facilitar
  // accesibilidad

  // si no hay nada en el input de correo, se pedira al usuario ingresar su correo electronico

  // el valor de verificacion se delvolvera como false

  if (emailInput.trim() === "") {
    alert("ERROR 002: FAVOR INGRESAR CORREO ELECTRÓNICO");
    return false;
  }

  // si no hay nada en el input de contraseña, se pedira al usuario ingresar su contraseña

  // el valor de verificacion se delvolvera como false

  if (passwordInput.length === "") {
    alert("ERROR 003: FAVOR INGRESAR CONTRASEÑA");
    return false;
  }

  // password va a ser igual a lo ingresado en el input respectivo (passwordInput), si la contraseña
  // no posee mas de 6 o menos de 12 caracteres se que la contraseña debe tener entre 6 y 12
  // caracteres

  // el valor de verificacion se delvolvera como false

  var password = passwordInput;
  if (password.length <= 6 || password.length >= 12) {
    alert("ERROR 004:CONTRASEÑA DEBE SER ENTRE 6 Y 12 CARACTERES");
    return false;
  }

  // se asigna valor false a la variable radioChecked

  let radioChecked = false;

  // se establece un contador llamado i con valor 0, mientras i sea menor a la longitud de la lista radioInputs,
  // el bucle se ejecutara, despues de cada interaccion del bucle se suma a i el valor de 1

  for (let i = 0; i < radioInputs.length; i++) {
    // si los radio inputs fueron chequeados, el valor de radioChecked y verificacion pasan a ser true

    if (radioInputs[i].checked) {
      radioChecked = true;
      break;
    }
  }

  // si no se a seleccionado ningun radio, se alerta al usuario para que por favor seleccione un tipo de cuenta y se
  // devuelve el valor de verificacion como false

  if (!radioChecked) {
    alert("ERROR 005: SELECCIONE UN TIPO DE INGRESO");
    return false;
  }

  // En otro caso, el valor de verificacion se devolvera como verdadera
  else return true;
}

// Se inicia la funcion checkUserDatabaseCliente en la que se mostrara en consola la informacion de usuario,
// correo y contraeña

// ERROR 001:VOLVER A PONER DATOS

// ERROR 002: FAVOR INGRESAR CORREO ELECTRONICO

// ERROR 003: FAVOR INGRESAR CONTRASEÑA

// ERROR 004:CONTRASENA DEBE SER ENTRE 6 Y 12 CARACTERES

// ERROR 005: SELECCIONE UN TIPO DE INGRESO

// ERROR U-006: USUARIO (CLIENTE) NO REGISTRADO

// ERROR E-007: USUARIO (EMPRESA) NO REGISTRADO
