const Address = require("./address");//importación del modelo address

//modelo para representar un cliente
module.exports = class Customer{
    constructor(legal_name, rfc, tax_system, email, 
    address = new Address(zip, city, municipality,state, country),//instanciación de la clase Address 
    createdAt=(new Date)){
        this.legal_name = legal_name;
        this.rfc = rfc;
        this.tax_system = tax_system;
        this.email = email;
        this.address = address;//Aquí recibe la instancia de Address
        this.createdAt = createdAt;
    }
}