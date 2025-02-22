"use strict";
export class ClientService {
  static #URL = "http://localhost:3000";

  static findAllClients() {
    return axios.get(ClientService.#URL + "/clients");
  }

  static findClientByEmail(email) {
    return axios.get(ClientService.#URL + "/clients/email/" + email);
  }

  static updateClient(id, updatedData) {
    console.log(id, "dentro");
    console.log(updatedData, "data");
    return axios.put(
      ClientService.#URL + "/clients/updateprofile",
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
      ClientService.#URL + "/clients/updateprofile",
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
