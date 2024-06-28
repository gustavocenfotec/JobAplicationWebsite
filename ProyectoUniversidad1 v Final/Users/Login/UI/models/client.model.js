'use strict'
export class mocData_cliente {
    
    //***********PRIVATE************/
    #email;
    #name;
    #surname;
    #pass;
    #sujeto;
    #level;
    #gender;
    //**************************************/

    //***********PUBLIC*********************/

    //***********CONSTRUCTOR************/
    constructor(formData) {
        this.setEmail(formData.get("email"));
        this.setName(formData.get("name"));
        this.setSurname(formData.get("surname"));
        this.setPass(formData.get("pass"));
        this.setSujeto(formData.get("sujeto"));
        this.setLevel(formData.get("level"));
        this.setGender(formData.get("gender"));
    }
    //**************************************/

    //***********GETTERS SETTERS************/
    getEmail() { return this.#email; }
    setEmail(pemail) { this.#email = pemail; }

    getName() { return this.#name; }
    setName(pname) { this.#name = pname; }

    getSurname() { return this.#surname; }
    setSurname(psurname) { this.#surname = psurname; }

    getPass() { return this.#pass; }
    setPass(ppass) { this.#pass = ppass; }

    getSujeto() { return this.#sujeto; }
    setSujeto(psujeto) { this.#sujeto = psujeto; }

    getLevel() { return this.#level; }
    setLevel(plevel) { this.#level = plevel; }

    getGender() { return this.#gender; }
    setGender(pgender) { this.#gender = pgender; }
    //**************************************/

    asJSON(){
        return {
            email :this.getEmail(),
            name : this.getName(),
            surname : this.getSurname(),
            pass : this.getPass(),
            sujeto : this.getSujeto(),
            level : this.getLevel(),
            gender : this.getGender()
        }
    }
}
