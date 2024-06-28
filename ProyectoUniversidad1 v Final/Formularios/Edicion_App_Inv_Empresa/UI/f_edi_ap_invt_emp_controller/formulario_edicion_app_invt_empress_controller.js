import { ReporteServiceInv } from "../f_edi_ap_invt_emp__services/r_f_edicion_inv_emp_services.js";
//Inicio de Pagina
document.addEventListener("DOMContentLoaded", () => {
  // MOMENTO DONDE SE BUSCA QUIEN PIDE LA INFORMACION E INDICAR LA INFORMACION REQUERIDA
  var verificacion_empresa_name = sessionStorage.getItem("empresa_name");
  var verificacion_usuario_empresa = sessionStorage.getItem("user_job");
  var nombre_empresa = "";

  if (verificacion_empresa_name == null) {
    nombre_empresa = verificacion_usuario_empresa;
  } else {
    nombre_empresa = verificacion_empresa_name;
  }
  loadData(nombre_empresa);
});

//Esta Funcion representa que se muestra dentro del html, una vez que se encuentra funcional el server
function loadData(nombre_empresa) {
  console.log(nombre_empresa, "empresa");
  let ReportData = [];
  //Esto llama el json del server creado del mockdata
  ReporteServiceInv.findAllClientByEmpresa(nombre_empresa).then((response) => {
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

    let celu_invite = row.insertCell();
    celu_invite.appendChild(document.createTextNode(pet.u_invite));

    let celposition = row.insertCell();
    celposition.appendChild(document.createTextNode(pet.position));

    // Ingreso de boton y se revisa que estado es el que se le pone

    let inputSend = document.createElement("input");
    inputSend.type = "radio";
    inputSend.name = pet._id;
    inputSend.onclick = function (e) {
      onStatusChange(e, "send");
    };
    if (pet.inv_send === "X") {
      inputSend.checked = true;
    }

    let inputApproved = document.createElement("input");
    inputApproved.type = "radio";
    inputApproved.name = pet._id;
    inputApproved.onclick = function (e) {
      onStatusChange(e, "accepted");
    };
    if (pet.accepted === "X") {
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

    let celinv_send = row.insertCell();
    celinv_send.appendChild(inputSend);

    let celaccepted = row.insertCell();
    celaccepted.appendChild(inputApproved);

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
  ReporteServiceInv.onStatusChange(id, newStatus);
}

function eliminarReporteEmpleo(e) {
  let id = e.target.id;
  console.log("id en aplicar Empleo");
  console.log(id);
  alert("Se elimina el empleo designado");
  ReporteServiceInv.deleteJob(id);
  loadData();
}
