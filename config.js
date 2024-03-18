const dotenv = require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || "NO SE PUDO OBTENER EL PUERTO",
    MONGO_URI: process.env.MONGO_URI || "NO SE PUEDO OBTENER LA URI DE MONGO"
}