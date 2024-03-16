//modelo para representar los impuestos
module.exports = class Tax{
    constructor(type, rate){
        this.type = type;
        this.rate = rate;
    }
}