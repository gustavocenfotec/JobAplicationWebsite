"use strict";
//Servicio que se exporta al controlador
export class ReporteServiceInv {
  //Direccionamiento que nos genera el json server una vez levantado
  static #URL = "http://localhost:3000";

  //Llamado de toda la base de Datos de Puestos Laborales
  static findAllClientByEmpresa(nombre_empresa) {
    return axios.get(
      ReporteServiceInv.#URL +
        "/reporteInvitacionesEmpresa/nombre_empresa/" +
        nombre_empresa
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
      ReporteServiceInv.#URL + "/reporteInvitacionesEmpresa/updatereport",
      postData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  static deleteJob(id) {
    return axios.delete(
      ReporteServiceInv.#URL + "/reporteInvitacionesEmpresa/" + id
    );
  }
}
