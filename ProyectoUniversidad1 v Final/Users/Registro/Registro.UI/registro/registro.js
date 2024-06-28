import { ClientService } from "../service/client.service.js";
import { EmpressService } from "../service/empress.service.js";

document.addEventListener('DOMContentLoaded', () => {
  loadData();

});

function loadData() {

  var cuentaUsuario = document.getElementById("Usuario");
  var cuentaEmpresa = document.getElementById("Empresa");
  var Genero = document.getElementById("regDetails").querySelectorAll('input[name="Genero"]');
  var Instrucciones = document.getElementById("Instrucciones");
  var CorreoError = document.getElementById("CorreoError");
  var ContraseñaError = document.getElementById("ContraseñaError");
  var NombreError = document.getElementById("NombreError");
  var ApellidoError = document.getElementById("ApellidoError");
  var ErrorGenero = document.getElementById("ErrorGenero");
  var CuentaTipo = document.getElementById("CuentaTipo");
  var CambioEU = document.getElementById("CambioEU");
  var NyA = document.querySelector(".regUsuario .NyA");
  var main1 = document.getElementById("main1")
  var main2 = document.getElementById("main2")
  function ocultarMain2() {
    main2.style.display = "none";
  }
  function ocultarMain1() {
    main1.style.display = "none";
  }
  ocultarMain2();

  function MostrarMain2() {
    main2.style.display = "block";
  }

  cuentaUsuario.addEventListener("change", function () {
    mostrarElementos();
  });

  cuentaEmpresa.addEventListener("change", function () {
    ocultarElementos();
  });


  function mostrarElementos() {
    for (var i = 0; i < Genero.length; i++) {
      Genero[i].parentNode.style.display = "block";
    }
    NyA.style.display = "block";
    Instrucciones.textContent = "(El usuario deberá agregar una foto de perfil y dar curriculum en la configuración de perfil)";
    CambioEU.textContent = "Nombres"
  }

  function ocultarElementos() {
    for (var i = 0; i < Genero.length; i++) {
      Genero[i].parentNode.style.display = "none";
    }
    NyA.style.display = "none";
    CambioEU.textContent = "Nombre de la empresa"

    Instrucciones.textContent = "(La empresa deberá añadir un logo en la configuración de perfil)";
  }

  var registroButton = document.getElementById("registroButton");
  registroButton.addEventListener("click", onFormSubmit);



  function onFormSubmit(event) {
    event.preventDefault();
    var nombre = document.getElementById("Nombres").value;
    var apellido = document.getElementById("Apellidos").value;
    var correo = document.getElementById("Correo").value;
    var contraseña = document.getElementById("password").value;
    var passwordV2 = document.getElementById("passwordV2").value;
    var generoSeleccionado = false;
    var level = 0;

    console.log("a ver si agarro el nombre");
    console.log(nombre);
    if (cuentaUsuario.checked) {
      CuentaTipo.textContent = ""
      console.log("Tipo de cuenta: Usuario");
      level = 1;
      if (correo == "") {
        console.log("Error: favor introducir un correo electrónico");
        CorreoError.textContent = "Error: favor introducir un correo electrónico";
        ContraseñaError.textContent = "";
        NombreError.textContent = "";
        ApellidoError.textContent = "";
        ErrorGenero.textContent = "";
      } else {
        CorreoError.textContent = "";
        if (FormatoCorreo(correo)) {
          console.log("Error: favor introducir un correo electrónico valido");
          CorreoError.textContent = "Error: favor introducir un correo electrónico valido";
          ContraseñaError.textContent = "";
          NombreError.textContent = "";
          ApellidoError.textContent = "";
          ErrorGenero.textContent = "";
        } else {
          console.log("Correo Electrónico:", correo);
          CorreoError.textContent = "";
          if (contraseña == "") {
            console.log("Error: favor introducir una contraseña");
            ContraseñaError.textContent = "Error: favor introducir una contraseña";
            CorreoError.textContent = "";
            NombreError.textContent = "";
            ApellidoError.textContent = "";
            ErrorGenero.textContent = "";
          } else {
            ContraseñaError.textContent = "";
            if (contraseña.length < 8) {
              console.log("Error: favor introducir una contraseña mas larga");
              ContraseñaError.textContent = "Error: favor introducir una contraseña mas larga";
              CorreoError.textContent = "";
              NombreError.textContent = "";
              ApellidoError.textContent = "";
              ErrorGenero.textContent = "";
            } else {
              ContraseñaError.textContent = "";
              if (contraseñaAlfaNumerica(contraseña)) {
                console.log("Error: la contraseña contiene caracteres especiales");
                ContraseñaError.textContent = "Error: la contraseña contiene caracteres especiales";
                CorreoError.textContent = "";
                NombreError.textContent = "";
                ApellidoError.textContent = "";
                ErrorGenero.textContent = "";
              } else {
                ContraseñaError.textContent = "";

                if (passwordV2 !== contraseña) {
                  console.log("Error: la contraseña es diferente");
                  ContraseñaError.textContent = "Error: la contraseña es diferente";
                } else {
                  ContraseñaError.textContent = "";
                  console.log("Contraseña:", contraseña);
                  if (nombre == "") {
                    console.log("Error: favor introducir un nombre");
                    NombreError.textContent = "Error: favor introducir un nombre";
                    CorreoError.textContent = "";
                    ContraseñaError.textContent = "";
                    ApellidoError.textContent = "";
                    ErrorGenero.textContent = "";
                  } else {
                    console.log("Nombre:", nombre);
                    NombreError.textContent = "";
                    if (apellido == "") {
                      console.log("Error: favor introducir un Apellido");
                      ApellidoError.textContent = "Error: favor introducir un apellido";
                      CorreoError.textContent = "";
                      ContraseñaError.textContent = "";
                      NombreError.textContent = "";
                      ErrorGenero.textContent = "";
                    } else {
                      ApellidoError.textContent = "";
                      console.log("Apellido:", apellido);
                      for (var i = 0; i < Genero.length; i++) {
                        var generoFinal
                        if (Genero[i].checked) {
                          ErrorGenero.textContent = "";
                          generoSeleccionado = true;
                          generoFinal = Genero[i].value;
                          console.log("Genero: ", generoFinal);


                          const newClient = {
                            email: correo,
                            name: nombre,
                            surname: apellido,
                            pass: contraseña,
                            level: level,
                            gender: generoFinal
                          }
                          
                          RegistroFinal(newClient);
                        }
                      }
                      if (generoSeleccionado == false) {
                        console.log("Error: favor introducir un genero");
                        ErrorGenero.textContent = "Error: favor introducir un genero";
                      }
                    }
                  }
                }
              }
            }
          }
        }

      }

    } else if (cuentaEmpresa.checked) {
      CuentaTipo.textContent = ""
      console.log("Tipo de cuenta: Empresa");
      level = 5;
      if (correo == "") {
        console.log("Error: favor introducir un correo electrónico");
        CorreoError.textContent = "Error: favor introducir un correo electrónico";
        ContraseñaError.textContent = "";
        NombreError.textContent = "";
      } else {
        CorreoError.textContent = "";
        if (FormatoCorreo(correo)) {
          console.log("Error: favor introducir un correo electrónico valido");
          CorreoError.textContent = "Error: favor introducir un correo electrónico valido";
          ContraseñaError.textContent = "";
          NombreError.textContent = "";
          ApellidoError.textContent = "";
          ErrorGenero.textContent = "";
        } else {
          console.log("Correo Electrónico:", correo);
          CorreoError.textContent = "";
          if (contraseña == "") {
            console.log("Error: favor introducir una contraseña");
            ContraseñaError.textContent = "Error: favor introducir una contraseña";
            CorreoError.textContent = "";
            NombreError.textContent = "";
          } else {
            ContraseñaError.textContent = "";
            if (contraseña.length < 8) {
              console.log("Error: favor introducir una contraseña mas larga");
              ContraseñaError.textContent = "Error: favor introducir una contraseña mas larga";
              CorreoError.textContent = "";
              NombreError.textContent = "";
            } else {

              ContraseñaError.textContent = "";
              if (contraseñaAlfaNumerica(contraseña)) {
                console.log("Error: la contraseña contiene caracteres especiales");
                ContraseñaError.textContent = "Error: la contraseña contiene caracteres especiales";
                CorreoError.textContent = "";
                NombreError.textContent = "";
              } else {
                console.log("Contraseña:", contraseña);
                ContraseñaError.textContent = "";
                if (passwordV2 !== contraseña) {
                  console.log("Error: la contraseña es diferente");
                  ContraseñaError.textContent = "Error: la contraseña es diferente";
                } else {
                  ContraseñaError.textContent = "";
                  console.log("Contraseña:", contraseña);
                  if (nombre == "") {
                    console.log("Error: favor introducir un nombre para su empresa");
                    NombreError.textContent = "Error: favor introducir el nombre de su empresa";
                    CorreoError.textContent = "";
                    ContraseñaError.textContent = "";
                  } else {
                    console.log("Nombre de empresa:", nombre);
                    NombreError.textContent = "";
                    
                    const newEmpress = {
                      email: correo,
                      name: nombre,
                      pass: contraseña,
                      level: level
                    }

                    RegistroFinalEmpresa(newEmpress)
                     
                  }
                }
              }
            }
          }
        }

      }
    } else {
      CuentaTipo.textContent = "Por favor Seleccione el tipo de cuenta";
      console.log("Error: favor seleccione el tipo de cuenta");
    }

  }

  function contraseñaAlfaNumerica(contraseña) {
    var regex = /[^a-zA-Z0-9]/;

    if (regex.test(contraseña)) {
      return true;
    } else {
      return false;
    }
  }
  function FormatoCorreo(correo) {
    var re1 = new RegExp('[\\w-+]+(?:\\.[\\w-+]+)*@(?:[\\w-]+\\.)+[a-zA-Z]{2,7}');

    if (re1.test(correo)) {
      return false;
    } else {
      return true;
    }
  }
 
  function RegistroFinal(newClient) {
    const clientRegistredPromise = ClientService.findAll(newClient.email);
  
    clientRegistredPromise.then(response => {
      const clientsData = response.data; // Acceder al arreglo de objetos dentro de la propiedad data
  
      const foundClient = clientsData.find(clients => clients.email === newClient.email);
  
      if (!foundClient) {
        ClientService.registerClient(newClient)
          .then(response => {
  
            ClientService.findAll().then(allClientResponse => {
              const allClientData = allClientResponse.data; // Acceder al arreglo de objetos dentro de la propiedad data
              
  
              ocultarMain1();
              MostrarMain2();
            });
  
            loadData();
          });
      }else {
        console.log('Error: el correo electrónico ya está registrado para una cuenta');
        CorreoError.textContent = 'Error: el correo electrónico ya está registrado para una cuentaa';
      }
    });
  }

  function RegistroFinalEmpresa(newEmpress) {
    const empressRegistredPromise = EmpressService.findAll(newEmpress.email);
  
    empressRegistredPromise.then(response => {
      const empressData = response.data; // Accede al arreglo de objetos dentro de la propiedad data
  
      const foundEmpress = empressData.find(empress => empress.email === newEmpress.email);
  
      if (!foundEmpress) { 
        EmpressService.registerEmpress(newEmpress)
          .then(response => {
  
            EmpressService.findAll().then(allEmpressesResponse => {
              const allEmpressesData = allEmpressesResponse.data; // Accede al arreglo de objetos dentro de la propiedad data
              ocultarMain1();
              MostrarMain2();
            });
  
            loadData();
          });
      }else {
        console.log('Error: el correo electrónico ya está registrado para una cuenta');
        CorreoError.textContent = 'Error: el correo electrónico ya está registrado para una cuentaa';
      }
    });
  }
  console.log("Pagina cargada")
}


