"use strict"
//Exportadcion de los datos obtenidos
export class HomeModel {
    //#Es la forma de poner los datos privados
    #usuario;
    #ingreso;
    #salida;
    #dia;
    //Constructor de los datos de la data
constructor(data){
    this.setusuario(formData.get("usuario"));
    this.setingreso(formData.get("ingreso"));
    this.setsalida(formData.get("salida"));
    this.setdia(formData.get("dia"));
    }
//Get y Setter de toda la formacion de la variable
    getusuario(){return this.#usuario;}
    setusuario(pusuario){this.#usuario=pusuario;}

    getingreso(){return this.#ingreso;}
    setingreso(pingreso){this.#ingreso=pingreso;}

    getsalida(){return this.#salida;}
    setsalida(psalida){this.#salida=psalida;}

    getdia(){return this.#dia;}
    setdia(pdia){this.#dia=pdia;}
}