const Customer = require('../models/customer');

//Entradas: razón social, rfc, regimen fiscal, correo electrónico, dirección.
function createCustomer(legal_name, rfc, tax_system, email, addres){
    return new Customer(legal_name, rfc, tax_system, email, addres);
}

//Entrada(s): --
function listCustomers(){
    //inserta código aquí
}

//Entrada: rfc
function getCustomer(rfc){
    //inserta código aquí
}

//Entrada: rfc, razón social, email, dirección
function updateCustomer(rfc, legal_name, email, address){
    //inserta código aquí
}

//Entrada: rfc
function deleteCustomer(rfc){
    //inserta código aquí
}

module.exports = {
    createCustomer,
    listCustomers,
    getCustomer,
    updateCustomer,
    deleteCustomer
}