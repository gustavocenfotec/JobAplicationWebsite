"use strict"
//Servicio que se exporta al controlador
export class ReporteService{
    //Direccionamiento que nos genera el json server una vez levantado
    static #URL = "http://localhost:3000";

    //Llamado de toda la base de Datos de Puestos Laborales
    static findAll(){
        return axios.get(ReporteService.#URL+'/reportePuestosLaborales');
    }
    static findClientByU_applicant(u_applicant) {
        return axios.get(ReporteService.#URL + "/reportePuestosLaborales/u_applicant/" + u_applicant);
      }


}