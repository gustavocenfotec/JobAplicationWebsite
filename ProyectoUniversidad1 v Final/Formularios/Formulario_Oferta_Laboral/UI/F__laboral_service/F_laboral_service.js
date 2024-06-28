"use strict"
//Servicio que se exporta al controlador
export class FLaboralService{
    //Direccionamiento que nos genera el json server una vez levantado
    static #URL = "http://localhost:3000";

    // Funcion que se encarga de obtener la informacion del formulario y agregarlo al json
    static registerEmpleo(newLaboral){
        console.log("newLaboral");
        console.log(newLaboral);
        const postData = {
            puesto_laboral: newLaboral.laboralData.getPuesto_laboral(),
            rango_salarial:newLaboral.laboralData.getRango_salarial(),
            requisitos_minimo: newLaboral.laboralData.getRequisitos_minimo(),
            atributos_deseables: newLaboral.laboralData.getAtributos_deseables(),
            responsible:newLaboral.responsible,
            nombre_empresa:newLaboral.nombre_empresa

        }
        console.log('post data');
        console.log(postData);
        //Este axios lo que expresa que informacion sera retornada al json service para ser agregado
        //por medio del metodo post de axios
        return axios.post(FLaboralService.#URL+'/puestoslaborales', postData, {
            //El header es para saber que etiqueta recibe el sistema para poder comunicarse e integrar
            headers: {
              'Content-Type': 'application/json'
            }})
          
    }

    static reporteLaboral(newLaboral){
        const postData = {
            position: newLaboral.laboralData.getPuesto_laboral(),
            // rango_salarial:newLaboral.laboralData.getRango_salarial(),
            // requisitos_minimo: newLaboral.laboralData.getRequisitos_minimo(),
            // atributos_deseables: newLaboral.laboralData.getAtributos_deseables(),
            responsible:newLaboral.responsible,
            empresa:newLaboral.nombre_empresa

        }
        console.log('post data');
        console.log(postData);
        //Este axios lo que expresa que informacion sera retornada al json service para ser agregado
        //por medio del metodo post de axios
        return axios.post(FLaboralService.#URL+'/reportePuestosLaborales', postData, {
            //El header es para saber que etiqueta recibe el sistema para poder comunicarse e integrar
            headers: {
              'Content-Type': 'application/json'
            }})
          
    }

//    Este metod es basicamente para poder traer todo de la base de datos creado
    static findAll(){
        return axios.get(FLaboralService.#URL+'/puestoslaborales');
    }


}