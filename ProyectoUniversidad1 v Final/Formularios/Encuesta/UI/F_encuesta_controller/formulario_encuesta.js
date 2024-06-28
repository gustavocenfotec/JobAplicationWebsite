
const form="";
const encuesta=[];





function onLoadComplete(){
    const form=document.getElementById("formulario_encuesta");
    form.addEventListener("submit",onFormSubmit);
}

function onFormSubmit(event){
    event.preventDefault();
    correo = document.getElementById("email").value;
    nostros = document.getElementById("nosotros").value;
    sugerencias = document.getElementById("sugerencias").value;
    otros = document.getElementById("Otros").value;
    console.log(correo);
    console.log(nostros);
    console.log(sugerencias);
    console.log(otros);
    let c=correo;
    let n=nostros;
    let s=sugerencias;
    let o=otros;


    //Aqui se organiza para cada vez que introducen los espacios deseados a cada uno de los tipo que se haga
    // un objeto por el cual podran mostra los atributos deseados
    encuesta.push({
        correo:c,
        nostros:n,
        sugerencias:s,
        otros:o,
    })
    console.log(encuesta);

    //Esta funcion lo que realiza es llamar al objeto creado para el puesto para determinar su ingreso correcto
    // en el sistema, llamando cada atributo del objeto del puesto laboral, para demostrar su creacion
    
    encuesta.forEach( (pet) => {
        alert( "El correo del usuario deseado: " +pet.correo);
        alert( "Pregunta sobre nostros: "+pet.nostros);
        alert( "Sugerencias: "+pet.sugerencias);
        alert( "Otras especificaciones: "+pet.otros);
    });

}
