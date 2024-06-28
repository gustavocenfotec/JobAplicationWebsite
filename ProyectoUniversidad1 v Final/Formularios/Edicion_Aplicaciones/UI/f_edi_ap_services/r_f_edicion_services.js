"use strict";
//Servicio que se exporta al controlador
export class ReporteService {
  //Direccionamiento que nos genera el json server una vez levantado
  static #URL = "http://localhost:3000";

  //Llamado de toda la base de Datos de Puestos Laborales
  static findAllClientByEmpresa(empresa) {
    return axios.get(
      ReporteService.#URL + "/reportePuestosLaborales/empresa/" + empresa
    );
  }

  //linea que recibe el id y el status y se envia postdata
  static onStatusChange(e, newStatus) {
    const postData = {
      id: e,
      newStatus: newStatus,
    };
    console.log("post data");
    console.log(postData);

    return axios.put(
      ReporteService.#URL + "/reportePuestosLaborales/updatereport",
      postData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  static deleteJob(id) {
    return axios.delete(ReporteService.#URL + "/reportePuestosLaborales/" + id);
  }

  static findAllClientByEmpresa(empresa) {
    return axios.get(
      ReporteService.#URL + "/reportePuestosLaborales/empresa/" + empresa
    );
  }
}
