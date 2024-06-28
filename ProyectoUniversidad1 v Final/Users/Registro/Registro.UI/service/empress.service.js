"use strict"
//Servicio que se exporta al controlador

export class EmpressService {
    //Direccionamiento que nos genera el json server una vez levantado
    static #URL = "http://localhost:3000";
    

    //Funcion que se encarga de obtener la informacion del formulario y agregarlo al json
    static registerEmpress(newEmpress) {
        const postData = {
            email: newEmpress.email,
            name: newEmpress.name,
            surname: newEmpress.surname,
            pass: newEmpress.pass,
            level: newEmpress.level,
            gender: newEmpress.gender
        }
        //Este axios lo que expresa que informacion sera retornada al json service para ser agregado
        //por medio del metodo post de axios
        return axios.post(EmpressService.#URL + '/empresses', postData, {
            //El header es para saber que etiqueta recibe el sistema para poder comunicarse e integrar
            headers: {
                'Content-Type': 'application/json'
            }
        })

    }
    //Este metod es basicamente para poder traer todo de la base de datos creado
    static findAll() {
        return axios.get(EmpressService.#URL + '/empresses');
    }


}