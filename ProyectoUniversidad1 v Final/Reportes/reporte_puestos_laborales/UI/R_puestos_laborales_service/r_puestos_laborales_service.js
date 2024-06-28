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

  static findAllByPosition(position) {
    return axios.get(
      ReporteService.#URL +
        "/reportePuestosLaborales/searchbar/searchbar/" +
        position
    );
  }
}
