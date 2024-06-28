"use strict";
export class fInvLaboral {
  static #URL = "http://localhost:3000";

  static findAllByNombre_empresa(nombre_empresa) {
    console.log("nombre_empresa find");
    console.log(nombre_empresa);
    return axios.get(
      fInvLaboral.#URL + "/puestoslaborales/nombre_empresa/" + nombre_empresa
    );
  }

  static findAll() {
    return axios.get(fInvLaboral.#URL + "/puestoslaborales");
  }

  static findClientByEmail(email) {
    return axios.get(fInvLaboral.#URL + "/clients/email/" + email);
  }

  static findJobBy_id(id) {
    console.log("ultima vez que veo a id");
    console.log(id);
    return axios.get(fInvLaboral.#URL + "/puestoslaborales/" + id);
  }

  static reporteLaboral(Puesto_Deseado, invite_email) {
    const postData = {
      responsible: Puesto_Deseado.responsible,
      empresa: Puesto_Deseado.nombre_empresa,
      u_applicant: invite_email,
      position: Puesto_Deseado.puesto_laboral,
      ap_recibed: "X",
    };
    console.log("post data DENTRO DE REPORTE");
    console.log(postData);
    //Este axios lo que expresa que informacion sera retornada al json service para ser agregado
    //por medio del metodo post de axios
    return axios.post(fInvLaboral.#URL + "/reportePuestosLaborales", postData, {
      //El header es para saber que etiqueta recibe el sistema para poder comunicarse e integrar
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
