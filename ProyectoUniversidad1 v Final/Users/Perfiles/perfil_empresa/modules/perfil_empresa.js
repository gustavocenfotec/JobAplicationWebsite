"use strict";

import { EmpressService } from "../service/empress.service.js";

document.addEventListener("DOMContentLoaded", () => {
  loadData();
});

function loadData() {
  var email = "";
  email = sessionStorage.getItem("empresa_email")
  console.log(email);
  EmpressService.findClientByEmail(email).then((response) => {
    var Empress = [];
    console.log(Empress.id, "1");
    Empress = response.data;
    console.log(Empress);
    var SeleccionarImagenButton = document.getElementById("SeleccionarImagen");
    var GuardarCambiosButton = document.getElementById("GuardarCambios");

    SeleccionarImagenButton.addEventListener("click", SeleccionarImagen);
    GuardarCambiosButton.addEventListener("click", () => {
      GuardarCambios(Empress);
    });

    var nombreInput = document.getElementById("Nombre");
    var DescripcionModificar = document.getElementById("descripcionGuardar");
    var imagenEmpresa = document.getElementById("imagenEmpresa");
    var sitioWebLink = document.getElementById("sitioWebLink");
    var storedURL = sessionStorage.getItem("fotoPerfilURL");
    nombreInput.value = Empress.name;
    DescripcionModificar.textContent = Empress.descripcion;
    imagenEmpresa.src = Empress.f_perfil;
    sitioWebLink.href = Empress.sitio_web; // Actualiza el link al valor del input.
    if (storedURL) { // Verificar si storedURL no está vacío
      Empress.f_perfil = storedURL;
    }
    imagenEmpresa.src = Empress.f_perfil;
  });
}

function SeleccionarImagen() {
  var input = document.getElementById("imagenInput");
  input.click();

  input.addEventListener("change", function () {
    // Se activa cuando el elemento input ha cambiado.
    var archivo = input.files[0]; //Obtiene el archivo seleccionado
    var reader = new FileReader(); //Crea un objeto para leer el archivo seleccionado.

    reader.onload = function (event) {
      // Se activa cuando el archivo se haya cargado correctamente.
      var fotoPerfil = event.target.result; // Se le asigna el archivo seleccionado a fotoPerfil.
      sessionStorage.setItem("fotoPerfilURL", fotoPerfil);
      MostrarFotoPerfil(); // Actualiza la foto de perfil en el documento html.
    };

    reader.readAsDataURL(archivo); // Lee el archivo seleccionado
  });
}

function MostrarFotoPerfil() {
  // Se activa despues de que el archivo seleccionado por el usuario haya cargado.
  var imagenEmpresa = document.getElementById("imagenEmpresa"); // Obtiene la imagen actual dentro del documento html.
  var storedURL = sessionStorage.getItem("fotoPerfilURL");
  imagenEmpresa.src = storedURL; // Actualiza la imagen al archivo que haya seleccionado el usuario.
}

function GuardarCambios(Empress) {
  console.log(Empress, "guardar cambios");
  var descripcionInput = document.getElementById("descripcion");
  var nombreInput = document.getElementById("Nombre");
  var ContraseñaInput = document.getElementById("Contraseña");
  var descripcionP = document.getElementById("descripcionGuardar");
  descripcionP.textContent = descripcionInput.value; // Actualiza la descripcion dentro del texto al valor del input.
  var sitioWebInput = document.getElementById("sitioWeb");
  var sitioWebLink = document.getElementById("sitioWebLink");
  if (ContraseñaInput.value == "") {
    console.log("Error: favor introducir una contraseña");
    alert("Error: favor introducir una contraseña");
  } else {
    if (ContraseñaInput.value.length < 8) {
      console.log("Error: favor introducir una contraseña mas larga");
      alert("Error: favor introducir una contraseña mas larga");

    } else {
      if (contraseñaAlfaNumerica(ContraseñaInput.value)) {
        console.log(contraseñaInput);
        console.log("Error: la contraseña contiene caracteres especiales");
        alert("Error: la contraseña contiene caracteres especiales");

      } else {
        var confirmSave = confirm("¿Esta seguro que desea guardar los cambios?");

        if (confirmSave) {
          sitioWebLink.href = sitioWebInput.value; // Actualiza el link al valor del input.

          const updatedData = {
            descripcion: descripcionInput.value,
            name: nombreInput.value,
            pass: ContraseñaInput.value,
            f_perfil: Empress.f_perfil,
            sitio_web: sitioWebInput.value,

          };
          console.log(Empress._id, "antes");
          var id = Empress._id;

          EmpressService.updateInformation({
            id: id,
            updatedData: updatedData,
          });
        }
      }
    }
  }




 
  // Muestra el contenido guardado en console log.
  // Aun se requeire crear un objeto dentro una base de datos para obtener el perfil actual del usuario y actualizar dicho objeto con la informacion y foto de perfil.
}
function contraseñaAlfaNumerica(contraseña) {
  var regex = /[^a-zA-Z0-9]/;

  if (regex.test(contraseña)) {
    return true;
  } else {
    return false;
  }
}
