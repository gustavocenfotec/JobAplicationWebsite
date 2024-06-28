"use strict"
//Servicio que se exporta al controlador

export class ClientService {
    //Direccionamiento que nos genera el json server una vez levantado
    static #URL = "http://localhost:3000";
    

    //Funcion que se encarga de obtener la informacion del formulario y agregarlo al json
    static registerClient(newClient) {
        const postData = {
            email: newClient.email,
            name: newClient.name,
            surname: newClient.surname,
            pass: newClient.pass,
            level: newClient.level,
            gender: newClient.gender
        }
        //Este axios lo que expresa que informacion sera retornada al json service para ser agregado
        //por medio del metodo post de axios
        return axios.post(ClientService.#URL + '/clients', postData, {
            //El header es para saber que etiqueta recibe el sistema para poder comunicarse e integrar
            headers: {
                'Content-Type': 'application/json'
            }
        })

    }
    
    //Este metod es basicamente para poder traer todo de la base de datos creado
    static findAll() {
        return axios.get(ClientService.#URL + '/clients');
    }


}