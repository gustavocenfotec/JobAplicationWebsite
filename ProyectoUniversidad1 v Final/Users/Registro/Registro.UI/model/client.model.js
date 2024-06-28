"use strict"
//Exportadcion de los datos obtenidos
export class Client {
    //#Es la forma de poner los datos privados
    #email;
    #name;
    #surname;
    #pass;
    #level;
    #sujeto;
    #gender;
    #active;
    #inactive;
    //Constructor de los datos de la data
constructor(formData){
    this.setEmail(formData.get("email"));
    this.setName(formData.get("name"));
    this.setSurname(formData.get("surname"));
    this.setPass(formData.get("pass"));
    this.setLevel(formData.get("level"));
    this.setSujeto(formData.get("sujeto"));
    this.setGender(formData.get("gender"));
    this.setActive(formData.get("active"));
    this.setInactive(formData.get("inactive"));
    }
//Get y Setter de toda la formacion de la variable
    getEmail(){return this.#email;}
    setEmail(pemail){this.#pass=pemail;}

    getName(){return this.#name;}
    setName(pname){this.#name=pname;}

    getSurname(){return this.#surname;}
    setSurname(psurname){this.#surname=psurname;}

    getPass(){return this.#pass;}
    setPass(ppass){this.#pass=ppass;}
    
    getLevel(){return this.#level;}
    setLevel(plevel){this.#level=plevel;}

        
    getSujeto(){return this.#sujeto;}
    setSujeto(psujeto){this.#sujeto=psujeto;}

    getGender(){return this.#gender;}
    setGender(pgender){this.#gender=pgender;}

    getActive(){return this.#active;}
    setActive(pactive){this.#active=pactive;}

    getInactive(){return this.#inactive;}
    setInactive(pinactive){this.#inactive=pinactive;}
}