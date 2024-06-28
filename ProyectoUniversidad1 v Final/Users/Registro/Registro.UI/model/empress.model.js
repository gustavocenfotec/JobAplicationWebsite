"use strict"
//Exportadcion de los datos obtenidos
export class Empress {
    //#Es la forma de poner los datos privados
    #email;
    #name;
    #pass;
    #level;
    #sujeto;
    #active;
    #inactive;
    //Constructor de los datos de la data
constructor(formData){
    this.setEmail(formData.get("email"));
    this.setName(formData.get("name"));
    this.setPass(formData.get("pass"));
    this.setLevel(formData.get("level"));
    this.setSujeto(formData.get("sujeto"));
    this.setActive(formData.get("active"));
    this.setInactive(formData.get("inactive"));
    }
//Get y Setter de toda la formacion de la variable
    getEmail(){return this.#email;}
    setEmail(pemail){this.#pass=pemail;}

    getName(){return this.#name;}
    setName(pname){this.#name=pname;}

    getPass(){return this.#pass;}
    setPass(ppass){this.#pass=ppass;}
    
    getLevel(){return this.#level;}
    setLevel(plevel){this.#level=plevel;}
        
    getSujeto(){return this.#sujeto;}
    setSujeto(psujeto){this.#sujeto=psujeto;}

    getActive(){return this.#active;}
    setActive(pactive){this.#active=pactive;}

    getInactive(){return this.#inactive;}
    setInactive(pinactive){this.#inactive=pinactive;}
}