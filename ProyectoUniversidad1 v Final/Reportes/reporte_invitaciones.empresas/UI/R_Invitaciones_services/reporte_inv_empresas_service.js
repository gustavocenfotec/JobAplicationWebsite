"use strict";
//Servicio que se exporta al controlador
export class ReporteServiceInv {
  //Direccionamiento que nos genera el json server una vez levantado
  static #URL = "http://localhost:3000";

  static findAllByNombre_empresa(empresa) {
    console.log("nombre_empresa find");
    console.log(empresa);
    return axios.get(
      ReporteServiceInv.#URL +
        "/reporteInvitacionesEmpresa/nombre_empresa/" +
        empresa
    );
  }
  //Este metod es basicamente para poder traer todo de la base de datos creado
  static findAll() {
    return axios.get(ReporteServiceInv.#URL + "/reporteInvitacionesEmpresa");
  }
}
