const Address = require("./address");//importación del modelo address
const Customer = require("./customer");//importación del modelo customer

//Este es el modelo para factura
module.exports = class Bill{
    constructor(date = (new Date), status, type, items, payment_form, payment_method, currency, exchange, exports,
    customer = new Customer(legal_name, rfc, tax_system, email, addressC),//instanciación de la clase Customer
    address = new Address(zip, city, municipality,state, country,),//instanciación de la clase Address
    total, folio_number){
        this.date = date;
        this.status = status;
        this.type = type;
        this.items = items;//este un arreglo que contiene cantidad, descuento y una instancia de la clase producto
        this.payment_form = payment_form;
        this.payment_method = payment_method;
        this.currency = currency;
        this.exchange = exchange;
        this.exports = exports;
        this.customer = customer;
        this.address = address;
        this.total = total;
        this.folio_number = folio_number;
    }
}