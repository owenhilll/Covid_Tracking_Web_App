class User {
    #uid;
    #firstName;
    #lastName;
    #email;
    #password;


    constructor(uid, firstName, lastName, email, password){
        this.#uid = uid;
        this.#firstName = firstName;
        this.#lastName = lastName;
        this.#email = email;
        this.#password = password;
    }
}