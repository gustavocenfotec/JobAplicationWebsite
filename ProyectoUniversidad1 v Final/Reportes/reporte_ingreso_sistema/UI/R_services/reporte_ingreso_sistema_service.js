"use strict";
//Servicio que se exporta al controlador
export class ReporteService {
  //Direccionamiento que nos genera el json server una vez levantado
  static #URL = "http://localhost:3000";

  static findAllByNombre_empresa(nombre_empresa) {
    console.log("nombre_empresa find");
    console.log(nombre_empresa);
    return axios.get(
      ReporteService.#URL +
        "/reporteIngresoSistemas/nombre_empresa/" +
        nombre_empresa
    );
  }

  static findAll() {
    return axios.get(ReporteService.#URL + "/reporteIngresoSistemas");
  }

  static findAllByUsuario(usuario) {
    return axios.get(
      ReporteService.#URL +
        "/reporteIngresoSistemas/searchbar/searchbar/" +
        usuario
    );
  }
}
