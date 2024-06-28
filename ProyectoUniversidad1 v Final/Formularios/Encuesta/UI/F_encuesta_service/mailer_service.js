"use strict";
export class MailerService {
  static #URL = "http://localhost:3000";


  static sendMail(newto,newsubject,newmessage) {
        const postData = {
            to:newto,
            subject:newsubject,
            message:newmessage,
        }
        console.log('post data Mail Service');
        console.log(postData);
        //Este axios lo que expresa que informacion sera retornada al json service para ser agregado
        //por medio del metodo post de axios
        console.log("me voy a BL MAIL SERVICES");
        return axios.post(MailerService.#URL+'/email', postData, {
            //El header es para saber que etiqueta recibe el sistema para poder comunicarse e integrar
            headers: {
              'Content-Type': 'application/json'
            }})
  }
}

