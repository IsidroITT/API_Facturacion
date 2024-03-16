//modelo para representar el domicilio
module.exports = class Adress{
    constructor(zip, city, municipality, state, country){
        this.zip = zip;
        this.city = city;
        this.municipality = municipality;
        this.state = state;
        this.country = country;
    }
}