'use strict'
export class mocData_empresa {
    
    //***********PRIVATE************/
    #email;
    #pass;
    #name;
    #sujeto;
    //**************************************/

    //***********PUBLIC*********************/

    //***********CONSTRUCTOR************/
    constructor(formData) {
        this.setEmail(formData.get("email"));
        this.setPass(formData.get("pass"));
        this.setName(formData.get("name"));
        this.setSujeto(formData.get("sujeto"));
    }
    //**************************************/

    //***********GETTERS SETTERS************/
    getEmail() { return this.#email; }
    setEmail(pemail) { this.#email = pemail; }

    getPass() { return this.#pass; }
    setPass(ppass) { this.#pass = ppass; }

    getName() { return this.#name; }
    setName(pname) { this.#name = pname; }

    getSujeto() { return this.#sujeto; }
    setSujeto(psujeto) { this.#sujeto = psujeto; }
    //**************************************/

    asJSON(){
        return {
            email :this.getEmail(),
            pass : this.getPass(),
            name : this.getName(),
            sujeto : this.getSujeto()
        }
    }
}