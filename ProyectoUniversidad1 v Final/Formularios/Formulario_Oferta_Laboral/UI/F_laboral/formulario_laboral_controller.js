"use strict";
//Informacion de Importadcion de Servicios
import { FLaboralService } from "../F__laboral_service/F_laboral_service.js";
import { FLaboralModel } from "../F_laboral_modelo/F_laboral_model.js";

//Inicio de Pagina
document.addEventListener("DOMContentLoaded", () => {
  //El evento que se desa capturar
  addEventListener();
  //Data que se actualiza en el sistema
});

function addEventListener() {
  const form = document.getElementById("formulario_laboral");
  form.addEventListener("submit", onSubmitClick);
}

//Una vez utilizado el form se procede a capturar la informacion del formulario
//para poder generar la informacion dentro del Service
function onSubmitClick(e) {
  e.preventDefault();
  //Captura de Atributos que se envian al Servicio y al modelo

  var verificacion_empresa_email = sessionStorage.getItem("empresa_email");
  var verificacion_empresa_name = sessionStorage.getItem("empresa_name");
  var verificacion_usuario_email = sessionStorage.getItem("user_email");
  var verificacion_usuario_empresa = sessionStorage.getItem("user_job");
  var responsible = "";
  var nombre_empresa = "";

  if (verificacion_empresa_email == null) {
    responsible = verificacion_usuario_email;
  } else {
    responsible = verificacion_empresa_email;
  }
  if (verificacion_empresa_name == null) {
    nombre_empresa = verificacion_usuario_empresa;
  } else {
    nombre_empresa = verificacion_empresa_name;
  }
  console.log("Sale este correo");
  console.log(responsible);
  console.log("Sale este nombre");
  console.log(nombre_empresa);

  const formData = new FormData(e.target);
  const newLaboral = new FLaboralModel(formData);

  FLaboralService.registerEmpleo({
    laboralData: newLaboral,
    responsible: responsible,
    nombre_empresa: nombre_empresa,
  });
  FLaboralService.reporteLaboral({
    laboralData: newLaboral,
    responsible: responsible,
    nombre_empresa: nombre_empresa,
  });

  alert(
    "Gracias por aplicar al puesto laboral, por favor revisar informacion en el sistema"
  );
}
