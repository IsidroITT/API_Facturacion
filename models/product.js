const Taxes = require("./tax");//importación del modelo tax

//Modelo para productos
module.exports = class Product{
    constructor(description, product_key, price, tax_included, taxability, taxex = new Taxes(type, rate),/*instanciación de la clase tax*/  unit_name){
        this.description = description;//nombre del producto
        this.product_key = product_key;
        this.price = price;
        this.tax_included = tax_included;
        this.taxability = taxability;
        this.taxex = taxex;
        this.unit_name = unit_name;
    }
}