"use strict";
export class HomeService {
  static #URL = "http://localhost:3000";

  static registerTimeStamp(data) {
    const postData = {
      nombre_empresa: data.nombre_empresa,
      usuario: data.usuario,
      ingreso: data.ingreso,
      salida: data.salida,
      dia: data.dia,
    };
    console.log("post data");
    console.log(postData);
    //Este axios lo que expresa que informacion sera retornada al json service para ser agregado
    //por medio del metodo post de axios
    return axios.post(HomeService.#URL + "/reporteIngresoSistemas", postData, {
      //El header es para saber que etiqueta recibe el sistema para poder comunicarse e integrar
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  static findAllJobs() {
    return axios.get(HomeService.#URL + "/puestoslaborales");
  }

  static findClientByEmail(email) {
    return axios.get(HomeService.#URL + "/clients/email/" + email);
  }

  static findJobBy_id(id) {
    console.log("ultima vez que veo a id");
    console.log(id);
    return axios.get(HomeService.#URL + "/puestoslaborales/" + id);
  }

  static reporteLaboral(Puesto_Deseado, user_email) {
    const postData = {
      responsible: Puesto_Deseado.responsible,
      empresa: Puesto_Deseado.nombre_empresa,
      u_applicant: user_email,
      position: Puesto_Deseado.puesto_laboral,
      ap_recibed: "X",
    };
    console.log("post data DENTRO DE REPORTE");
    console.log(postData);
    //Este axios lo que expresa que informacion sera retornada al json service para ser agregado
    //por medio del metodo post de axios
    return axios.post(HomeService.#URL + "/reportePuestosLaborales", postData, {
      //El header es para saber que etiqueta recibe el sistema para poder comunicarse e integrar
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  static findAllEmpresas() {
    return axios.get(HomeService.#URL + "/empresses");
  }

  static deleteJob(id) {
    return axios.delete(HomeService.#URL + "/empresses/deleteenterprise/" + id);
  }

  static findClientByEmailEmpress(user_email) {
    return axios.get(HomeService.#URL + "/empresses/email/" + user_email);
  }

  static findClientByU_applicant(u_applicant) {
    return axios.get(
      HomeService.#URL + "/reportePuestosLaborales/u_applicant/" + u_applicant
    );
  }
}
