"use strict";
export class ClientService {
  static #URL = "http://localhost:3000";

  static findAllClients() {
    return axios.get(ClientService.#URL + "/clients");
  }

  static findClientByEmail(email) {
    return axios.get(ClientService.#URL + "/clients/email/" + email);
  }
}
