"use strict";
//Informacion de Importadcion de Servicios
import { FLaboralModel } from "../formulario_edicion_puesto_model/formulario_edicion_puesto.js";
import { FLaboralService } from "../f_edc_puestos.services/F_laboral_service.js";
//Inicio de Pagina
document.addEventListener("DOMContentLoaded", () => {
  //El evento que se desa capturar
  addEventListener();
  //Data que se actualiza en el sistema
});

function addEventListener() {
  const form = document.getElementById("formulario_laboral");
  form.addEventListener("submit", onSubmitClick);
  loadData();
}

function loadData() {
  let id_laboral = sessionStorage.getItem("id_trabajo");

  descripcionTrabajo(id_laboral);
}

function descripcionTrabajo(id_laboral) {
  FLaboralService.findOneByid(id_laboral).then((response) => {
    console.log(response);
    let Trabajo = response.data;
    console.log("trabajo");
    console.log(Trabajo);
    //Funcion que reproduce la data
    renderTablePublico(Trabajo);
    // console.log(response);
  });
}

function renderTablePublico(Trabajo) {
  let dataTbBody = document.querySelector("#Trabajos tbody");

  dataTbBody.innerHTML = "";

  let row = dataTbBody.insertRow();

  let celpuesto_laboral = row.insertCell();
  celpuesto_laboral.appendChild(
    document.createTextNode(Trabajo.puesto_laboral)
  );

  let celrango_salarial = row.insertCell();
  celrango_salarial.appendChild(
    document.createTextNode(Trabajo.rango_salarial)
  );

  let celrequisitos_minimo = row.insertCell();
  celrequisitos_minimo.appendChild(
    document.createTextNode(Trabajo.requisitos_minimo)
  );

  let celatributos_deseables = row.insertCell();
  celatributos_deseables.appendChild(
    document.createTextNode(Trabajo.atributos_deseables)
  );

  let celBorrar = row.insertCell();
  let EliminarButton = document.createElement("button");
  EliminarButton.id = Trabajo._id;
  EliminarButton.onclick = EliminarEmpleo;
  EliminarButton.textContent = "Elminar";
  celBorrar.appendChild(EliminarButton);
  console.log(EliminarButton);

  console.log("id del puesto");
  console.log(Trabajo._id);
}

//Una vez utilizado el form se procede a capturar la informacion del formulario
//para poder generar la informacion dentro del Service
function onSubmitClick(e) {
  e.preventDefault();
  //Captura de Atributos que se envian al Servicio y al modelo

  let id_laboral = sessionStorage.getItem("id_trabajo");

  console.log("ID", id_laboral);

  const formData = new FormData(e.target);
  const newLaboral = new FLaboralModel(formData);
  console.log("antes de updateInformmation");
  console.log("newLaboral", newLaboral);

  FLaboralService.updateInformation({
    id: id_laboral,
    laboralData: newLaboral,
  });

  alert(
    "Gracias por aplicar el cambio de puesto laboral, por favor revisar informacion en el sistema"
  );
  loadData();
}

function EliminarEmpleo(e) {
  let id = e.target.id;
  console.log("id en aplicar Empleo");
  console.log(id);
  alert("Se elimina el empleo designado");
  FLaboralService.deleteJob(id);
  loadData();
}
