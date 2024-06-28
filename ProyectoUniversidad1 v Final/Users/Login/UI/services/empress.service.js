"use strict";
export class EmpressService {
  static #URL = "http://localhost:3000";

  static findAllEmpresses() {
    return axios.get(EmpressService.#URL + "/empresses");
  }

  static findEmpressByEmail(email) {
    return axios.get(EmpressService.#URL + "/empresses/email/" + email);
  }
}
