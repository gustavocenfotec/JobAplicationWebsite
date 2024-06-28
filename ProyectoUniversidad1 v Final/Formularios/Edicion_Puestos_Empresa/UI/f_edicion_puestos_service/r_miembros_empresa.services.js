"use strict";
//Servicio que se exporta al controlador
export class edicionPuestosService {
  //Direccionamiento que nos genera el json server una vez levantado
  static #URL = "http://localhost:3000";

  static findByNombre_empresa(nombre_empresa) {
    return axios.get(
      edicionPuestosService.#URL + "/clients/nombre_empresa/" + nombre_empresa
    );
  }

  static findByClienteId(id_empleado) {
    return axios.get(edicionPuestosService.#URL + "/clients/" + id_empleado);
  }

  static findAll() {
    return axios.get(
      edicionPuestosService.#URL + "/reporteInvitacionesEmpresa"
    );
  }
  static updateInformation(data) {
    const { id, level } = data;
    console.log("id", id);
    console.log("level", level);

    //Este axios lo que expresa que informacion sera retornada al json service para ser agregado
    //por medio del metodo post de axios
    return axios.put(
      edicionPuestosService.#URL + "/clients/manageEnterprise",
      { id: id, level: level },
      {
        //El header es para saber que etiqueta recibe el sistema para poder comunicarse e integrar
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
