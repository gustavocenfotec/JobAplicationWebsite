"use strict";
export class ClientService {
  static #URL = "http://localhost:3000";

  //BUSCAR TODOS LOS CLIENTES

  static findAllClients() {
    return axios.get(ClientService.#URL + "/clients");
  }
  //BUSCAR CLIENTE POR EMAIL
  static findClientByEmail(email) {
    return axios.get(ClientService.#URL + "/clients/email/" + email);
  }
}
