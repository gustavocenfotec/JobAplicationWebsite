import { ClientService } from "../services/client.service.js";

document.addEventListener("DOMContentLoaded", () => {
  loadData();
});

function loadData() {
  var email = "1";
  email = sessionStorage.getItem("user_email");

  console.log(email);
  ClientService.findClientByEmail(email).then((response) => {
    var usuario = [];
    console.log(usuario.id, "1");
    usuario = response.data;
    console.log(usuario);
    var SeleccionarDocumentoButton = document.getElementById("SeleccionarDocumento");
    var SeleccionarImagenButton = document.getElementById("SeleccionarImagen");
    var GuardarCambiosButton = document.getElementById("GuardarCambios");
    SeleccionarDocumentoButton.addEventListener("click", SeleccionarDocumento);
    SeleccionarImagenButton.addEventListener("click", SeleccionarImagen);
    GuardarCambiosButton.addEventListener("click", () => {
      GuardarCambios(usuario);
    });

    var nombreInput = document.getElementById("Nombre");
    var apellidosInput = document.getElementById("Apellidos");
    var DescripcionModificar = document.getElementById("descripcionGuardar");
    var imagenUsuario = document.getElementById("imagenUsuario");
    var storedURL = sessionStorage.getItem("fotoPerfilURL");
    nombreInput.value = usuario.name;
    apellidosInput.value = usuario.surname;
    DescripcionModificar.textContent = usuario.descripcion;
    if (storedURL) { // Verificar si storedURL no está vacío
      usuario.f_perfil = storedURL;
    }
    imagenUsuario.src = usuario.f_perfil;
    var descargarCurriculum = document.getElementById("descargarCurriculum"); // Obtiene el elemnto descargarCurriculum de el html.
    var CVURL = sessionStorage.getItem("CVURL");
    var CVURLName = sessionStorage.getItem("CVURLName");
    if (CVURL) {
      descargarCurriculum.href = CVURL; // Establece la URL creada anteriormente como el valor del atributo href.
    descargarCurriculum.download = CVURLName; // Establece que el nombre al descargar sea el mismo nombre de el archivo subido.
    }

    // GuardarCambios(usuario);
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
  var imagenUsuario = document.getElementById("imagenUsuario"); // Obtiene la imagen actual dentro del documento html.
  var storedURL = sessionStorage.getItem("fotoPerfilURL");
  imagenUsuario.src = storedURL; // Actualiza la imagen al archivo que haya seleccionado el usuario.
}

function SeleccionarDocumento() {
  var input = document.getElementById("documentoInput");
  input.click();

  input.addEventListener("change", function () {
    // Se activa cuando el elemento input ha cambiado.
    var archivo = input.files[0]; // Obtiene el archivo seleccionado.
    var url = URL.createObjectURL(archivo); // Crea una URL para el archivo seleccionado.
    sessionStorage.setItem("CVURLName", archivo.name);
    sessionStorage.setItem("CVURL", url);
    var CVURL = sessionStorage.getItem("CVURL");
    var CVURLName = sessionStorage.getItem("CVURLName");
    var descargarCurriculum = document.getElementById("descargarCurriculum"); // Obtiene el elemnto descargarCurriculum de el html.
    descargarCurriculum.href = CVURL; // Establece la URL creada anteriormente como el valor del atributo href.
    descargarCurriculum.download = CVURLName; // Establece que el nombre al descargar sea el mismo nombre de el archivo subido.
  });
}

function GuardarCambios(usuario) {
  console.log(usuario, "guardar cambios");
  var nombreInput = document.getElementById("Nombre");
  var apellidosInput = document.getElementById("Apellidos");
  var descripcionInput = document.getElementById("descripcion");
  var contraseñaInput = document.getElementById("Contraseña");
  var DescripcionModificar = document.getElementById("descripcionGuardar");
  
  if (contraseñaInput.value == "") {
    console.log("Error: favor introducir una contraseña");
    alert("Error: favor introducir una contraseña");
  } else {
    if (contraseñaInput.value.length < 8) {
      console.log("Error: favor introducir una contraseña mas larga");
      alert("Error: favor introducir una contraseña mas larga");
      
    } else {
      if (contraseñaAlfaNumerica(contraseñaInput.value)) {
        console.log(contraseñaInput);
        console.log("Error: la contraseña contiene caracteres especiales");
        alert("Error: la contraseña contiene caracteres especiales");
        
      } else {
        var confirmSave = confirm("¿Esta seguro que desea guardar los cambios?");

        if (confirmSave){
          DescripcionModificar.textContent = descripcionInput.value;
        const updatedData = {
          descripcion: descripcionInput.value,
          name: nombreInput.value,
          pass: contraseñaInput.value,
          surname: apellidosInput.value,
          f_perfil: usuario.f_perfil,
      
        };
      
        console.log(usuario._id, "antes");
        var id = usuario._id;
      
        ClientService.updateInformation({
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