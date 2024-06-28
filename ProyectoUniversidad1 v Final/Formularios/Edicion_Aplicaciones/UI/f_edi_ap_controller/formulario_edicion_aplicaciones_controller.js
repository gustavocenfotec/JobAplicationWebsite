import { ReporteService } from "../f_edi_ap_services/r_f_edicion_services.js";

//Inicio de Pagina
document.addEventListener("DOMContentLoaded", () => {
  // MOMENTO DONDE SE BUSCA QUIEN PIDE LA INFORMACION E INDICAR LA INFORMACION REQUERIDA
  var verificacion_empresa_name = sessionStorage.getItem("empresa_name");
  var verificacion_usuario_empresa = sessionStorage.getItem("user_job");
  var empresa = "";

  if (verificacion_empresa_name == null) {
    empresa = verificacion_usuario_empresa;
  } else {
    empresa = verificacion_empresa_name;
  }
  loadData(empresa);
});

//Esta Funcion representa que se muestra dentro del html, una vez que se encuentra funcional el server
function loadData(empresa) {
  let ReportData = [];
  //Esto llama el json del server creado del mockdata
  ReporteService.findAllClientByEmpresa(empresa).then((response) => {
    console.log(response);
    ReportData = response.data;
    console.log("ReportData");
    console.log(ReportData);
    //Funcion que reproduce la data
    renderTable(ReportData);
    // console.log(response);

    //Si hubiera error este error handler es la funcion de comunicacion de programa
  }, requestErrorHandler);

  // console.log(carData)
}

//Funcion de recuperar el error y poder visualizarlo
function requestErrorHandler(error) {
  console.log(error.message);
  console.log(error);
}

//Funcion que llama a la renderizacion de la tabla
function renderTable(ReportData) {
  let dataTbBody = document.querySelector("#Aplicaciones tbody");

  dataTbBody.innerHTML = "";

  console.log("ReportData", ReportData);

  ReportData.forEach((pet) => {
    let row = dataTbBody.insertRow();

    let celu_applicant = row.insertCell();
    celu_applicant.appendChild(document.createTextNode(pet.u_applicant));

    let celposition = row.insertCell();
    celposition.appendChild(document.createTextNode(pet.position));

    // Ingreso de boton y se revisa que estado es el que se le pone

    let inputRecieved = document.createElement("input");
    inputRecieved.type = "radio";
    inputRecieved.name = pet._id;
    inputRecieved.onclick = function (e) {
      onStatusChange(e, "received");
    };
    if (pet.ap_recibed === "X") {
      inputRecieved.checked = true;
    }

    let inputRevision = document.createElement("input");
    inputRevision.type = "radio";
    inputRevision.name = pet._id;
    inputRevision.onclick = function (e) {
      console.log("RevisionEc=vent");
      onStatusChange(e, "revision");
    };
    if (pet.ap_on_check === "X") {
      inputRevision.checked = true;
    }

    let inputApproved = document.createElement("input");
    inputApproved.type = "radio";
    inputApproved.name = pet._id;
    inputApproved.onclick = function (e) {
      onStatusChange(e, "approved");
    };
    if (pet.approved === "X") {
      inputApproved.checked = true;
    }

    let inputRejected = document.createElement("input");
    inputRejected.type = "radio";
    inputRejected.name = pet._id;
    inputRejected.onclick = function (e) {
      onStatusChange(e, "rejected");
    };
    if (pet.denied === "X") {
      inputRejected.checked = true;
    }

    let celap_recibed = row.insertCell();
    celap_recibed.appendChild(inputRecieved);

    let celap_on_check = row.insertCell();
    celap_on_check.appendChild(inputRevision);

    let celapproved = row.insertCell();
    celapproved.appendChild(inputApproved);

    let celdenied = row.insertCell();
    celdenied.appendChild(inputRejected);

    let celBorrar = row.insertCell();
    let EliminarButton = document.createElement("button");
    EliminarButton.id = pet._id;
    EliminarButton.onclick = eliminarReporteEmpleo;
    EliminarButton.textContent = "Elminar";
    celBorrar.appendChild(EliminarButton);
    console.log(EliminarButton);
  });
}

// Funcion que revisa el stattus e envia dicho status con el id al server para su chequeo e incorporacion
function onStatusChange(e, newStatus) {
  const id = e.target.name;
  console.log("ID", id);
  console.log("NewStatus", newStatus);
  ReporteService.onStatusChange(id, newStatus);
}

function eliminarReporteEmpleo(e) {
  let id = e.target.id;
  console.log("id en aplicar Empleo");
  console.log(id);
  alert("Se elimina el empleo designado");
  ReporteService.deleteJob(id);
  loadData();
}
