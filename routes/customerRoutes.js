const express = require("express");
const router = express.Router();
const customerDriver = require("../controllers/customerController");

//ruta http://localhost:8080/customer devuelve un listado de todos los clientes
router.get('/', (req,res) => {
    try {
        //Aquí pondría un código si supiera cual
    } catch (error) {
        res.status(500).json({ Error: `${error}`});
    }
});

//ruta http://localhost:8080/customer/:rfc devuelve un cliente por su rfc
router.get('/:rfc', (req,res) => {
    try {
        //Aquí pondría un código si supiera cual
    } catch (error) {
        res.status(500).json({ Error: `${error}`});
    }
});

//ruta http://localhost:8080/customer crea un nuevo cliente
router.post('/', (req,res) => {
    try {
        //Aquí pondría un código si supiera cual
    } catch (error) {
        res.status(500).json({ Error: `${error}`});
    }
});

//ruta http://localhost:8080/customer actualiza un cliente con su rfc
router.put('/:rfc', (req,res) => {
    try {
        //Aquí pondría un código si supiera cual
    } catch (error) {
        res.status(500).json({ Error: `${error}`});
    }
});

//ruta http://localhost:8080/customer elimina un cliente con su rfc
router.delete('/:rfc', (req,res) => {
    try {
        //Aquí pondría un código si supiera cual
    } catch (error) {
        res.status(500).json({ Error: `${error}`});
    }
});

module.exports = router;