function onLoadComplete() {
    var puestos = [
        // Objeto con informacion previa
            {
                puesto_laboral: "Ingeniero Industrial",
                rango_salarial: "720000.00",
                requisitos_minimo: "2+ de Experiencia en Manejo de Personal",
                atributos_deseables: "Conocimientos en Mercado Culinario"
            }
    ];
    var TextNombre_Puesto = document.getElementById("TextNombre_Puesto");
    var TextRango_salarial = document.getElementById("TextRango_salarial");
    var TextRequisitos_minimo = document.getElementById("TextRequisitos_minimo");
    var TextAtributos_deseables = document.getElementById("TextAtributos_deseables");
    var puestoActual = 0; 
    // Actualiza el texto TextNombre_Puesto a el valor de puesto_laboral
    TextNombre_Puesto.textContent = puestos[puestoActual].puesto_laboral; 
    // Actualiza el texto TextRango_salarial a el valor de rango_salarial
    TextRango_salarial.textContent = puestos[puestoActual].rango_salarial;
    // Actualiza el texto TextRequisitos_minimo a requisitos_minimo
    TextRequisitos_minimo.textContent = puestos[puestoActual].requisitos_minimo; 
    // Actualiza el texto TextNombre_Puesto a el valor de puesto_laboral
    TextAtributos_deseables.textContent = puestos[puestoActual].atributos_deseables; 
    var Enviar = document.getElementById("Enviar");
    Enviar.addEventListener("click", onFormSubmit);
    function onFormSubmit(event){
        //Funcion que se activa al hacer clcik en el boton Enviar.
        event.preventDefault();
        console.log(puestos[puestoActual]);
        
        alert("Aplicacion a " + puestos[puestoActual].puesto_laboral + " enviada");
    }
}


