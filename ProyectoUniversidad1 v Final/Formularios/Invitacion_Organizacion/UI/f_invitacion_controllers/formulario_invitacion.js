const form="";

const mocData_cliente = [{
    user: "gustavo@gmail.com",
    pass: "cristovive",
    sujeto: "client",
    nivel: "1"
},
{
    user: "demo@gmail.com",
    pass: "diosesbueno",
    sujeto: "client",
    nivel: "2"
},
{
    user: "alondra@gmail.com",
    pass: "empresados",
    sujeto: "client",
    nivel: "3"
},
{
    user: "administrador@gmail.com",
    pass: "administrador2",
    sujeto: "client",
    nivel: "4"
}
]


function onLoadComplete(){
    const form=document.getElementById("invitacion");
    form.addEventListener("submit",onFormSubmit);
}
// Esta funcion lo que plantea es al momento de hacer el Submit, inicializar la captura de datos de dicho formulario
// y ademas de realizar las verificaciones correspondientes de la informacion registrada
function onFormSubmit(event){
    event.preventDefault();
    correo= document.getElementById("correo");
    administrador = document.getElementById("administrador");
    manager = document.getElementById("manager");
    reclutador= document.getElementById("reclutador");
    let email=correo.value;
    let a=administrador.checked;
    let b=manager.checked;
    let c=reclutador.checked;
    console.log(email);
    console.log(a);
    console.log(b);
    console.log(c);
    // Este dato es utilizado para realizar la inspeccion de los datos dentro del formulario
    var verificacion=true;
    verificacion = CheckVerificacion(email,a,b,c);
    console.log(verificacion);

    // Si la funcion previa es encontrada como verdadera se procede a realizar la verificacion en la base de datos con los elementos
    // previamente asignados y si la verificacion da como false la misma devuelve al usuario al inicio del proceso
    if(verificacion===true){
    checkUserDatabase(email,a,b,c);
    }
    else{
        alert("Error: Hay que rellenar todos los espacios");
    }
}   
// Esta funcion realiza la revision de todos los espacios esten completados en el formulario
function CheckVerificacion(email,a, b,c) {
    console.log(a);
    console.log(b);
    console.log(c);
    
// Se realiza la revision que el espacio email este lleno
    if (email=== ''){
        alert('Error: Espacio de correo Electronico se encuentra vacio');
        return verificacion = false;
    }
//Se realiza la revision que el espacio de ratio y tipo de invitacion este lleno
    if ((a=== false) && (b=== false) && (c=== false)) {
        alert('Error: Por favor seleccionar el tipo de Invitacion');
        return verificacion = false;
    }
    else
        return verificacion = true;
}


//Esta funcion lo que realiza es la revision que el correo corresponda a un correo electronico dentro
//de la base de datos de clientes para permitir la invitacion
function checkUserDatabase(email,a,b,c){
    let exist=false;
    console.log(email);
    console.log(a);
    console.log(b);
    console.log(c);
    console.log("ESTOY USANDO LISTA DE ESTOY USANDO LISTA DE CLIENTE")
    // Aqui este ciclo for lo que realiza es la verificacion que el correo electronico exista dentro de la base de datos de clientes
    for(var i=0 ; i< mocData_cliente.length ; i++){
        if(email===mocData_cliente[i].user){
                    exist=true;
                    break;
        }
    }
    //Aqui lo que se realiza es la revision del atributo check para poder determinar que tipo de invitacion
    //se envia a los clientes
    if (exist==true){
        if(a==true){
        alert("Se envia el correo de invitacion a ser Administrador al correo electronico: " +mocData_cliente[i].user);
        }
        else if(b==true){
        alert("Se envia el correo de invitacion a ser Manager al correo electronico: " +mocData_cliente[i].user);
        }
        else if(c==true){
        alert("Se envia el correo de invitacion a ser Reclutador al correo electronico: " +mocData_cliente[i].user);
        }
        }
    else
    alert("Correo no se encuentra en esta base de datos");
}






