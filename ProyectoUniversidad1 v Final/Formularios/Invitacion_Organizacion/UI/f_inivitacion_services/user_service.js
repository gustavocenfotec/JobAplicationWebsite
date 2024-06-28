"use strict";
export class ClientService {
  static #URL = "http://localhost:3000";

  static findAllClients() {
    return axios.get(ClientService.#URL + "/clients");
  }

  static findClientByEmail(email) {
    return axios.get(ClientService.#URL + "/clients/email/" + email);
  }

  static creacionReporteInv(data){
    const postData = {
      nombre_empresa:data.nombre_empresa,
      u_invite:data.u_invite,
      position:data.position,

    }
    console.log('post data ReporteInv');
    console.log(postData);
    //Este axios lo que expresa que informacion sera retornada al json service para ser agregado
    //por medio del metodo post de axios
    console.log('me voy a BL A repotes');
    return axios.post(ClientService.#URL+'/reporteInvitacionesEmpresa', postData, {
        //El header es para saber que etiqueta recibe el sistema para poder comunicarse e integrar
        headers: {
          'Content-Type': 'application/json'
        }})
      
}
  
}
