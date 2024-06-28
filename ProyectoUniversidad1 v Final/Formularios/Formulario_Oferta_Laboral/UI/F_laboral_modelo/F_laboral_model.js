"use strict"
//Exportadcion de los datos obtenidos
export class FLaboralModel {
    //#Es la forma de poner los datos privados
    #puesto_laboral;
    #rango_salarial;
    #requisitos_minimo;
    #atributos_deseables;
    //Constructor de los datos de la data
constructor(formData){
    this.setPuesto_laboral(formData.get("puesto_laboral"));
    this.setRango_salarial(formData.get("rango_salarial"));
    this.setRequisitos_minimo(formData.get("requisitos_minimo"));
    this.setAtributos_deseables(formData.get("atributos_deseables"));
    }
//Get y Setter de toda la formacion de la variable
    getPuesto_laboral(){return this.#puesto_laboral;}
    setPuesto_laboral(ppuesto_laboral){this.#puesto_laboral=ppuesto_laboral;}

    getRango_salarial(){return this.#rango_salarial;}
    setRango_salarial(prango_salarial){this.#rango_salarial=prango_salarial;}

    getRequisitos_minimo(){return this.#requisitos_minimo;}
    setRequisitos_minimo(prequisitos_minimo){this.#requisitos_minimo=prequisitos_minimo;}

    getAtributos_deseables(){return this.#atributos_deseables;}
    setAtributos_deseables(patributos_deseables){this.#atributos_deseables=patributos_deseables;}
}