"use strict";
export class EmpressService {
  static #URL = "http://localhost:3000";

  static findAllClients() {
    return axios.get(EmpressService.#URL + "/empresses");
  }

  static findClientByEmail(email) {
    return axios.get(EmpressService.#URL + "/empresses/email/" + email);
  }

  static updateClient(id, updatedData) {
    console.log(id, "dentro");
    console.log(updatedData, "data");
    return axios.put(
      EmpressService.#URL + "/empresses/updateprofile",
      updatedData
    );
  }

  static updateInformation(data) {
    const { id, updatedData } = data;
    console.log("id", id);
    console.log("updatedData", updatedData);

    //Este axios lo que expresa que informacion sera retornada al json service para ser agregado
    //por medio del metodo post de axios
    return axios.put(
      EmpressService.#URL + "/empresses/updateprofile",
      { id: id, updatedData: updatedData },
      {
        //El header es para saber que etiqueta recibe el sistema para poder comunicarse e integrar
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
