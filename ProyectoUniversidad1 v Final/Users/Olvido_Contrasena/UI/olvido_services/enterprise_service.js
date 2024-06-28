"use strict";
export class EmpressService {
  static #URL = "http://localhost:3000";
  //Encontrar todas las empresas
  static findAllEmpresses() {
    return axios.get(EmpressService.#URL + "/empresses");
  }
  //Encontrar a la empresa exactamente por medio del correo
  static findEmpressByEmail(email) {
    return axios.get(EmpressService.#URL + "/empresses/email/" + email);
  }
}
