"use strict"
//Servicio que se exporta al controlador
export class ReporteService{
    //Direccionamiento que nos genera el json server una vez levantado
    static #URL = "http://localhost:3000";

    static findByNombre_empresa(nombre_empresa) {
        return axios.get(ReporteService.#URL + "/clients/nombre_empresa/" + nombre_empresa);
      }

    static findAll(){
        return axios.get(ReporteService.#URL+'/reporteInvitacionesEmpresa');
    }


}