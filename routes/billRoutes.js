//Imports
const express = require('express');
const billDriver = require('../controllers/billsControllers');

//función router de express
const router = express.Router();

//ruta http://localhost:8080/bill/:folio devuelve una factura por su número de folio
router.get('/:folio', async (req, res) => {

});

//ruta http://localhost:8080/bill devuelve el listado de factura
router.get('/', async (req, res) => {

});

//ruta http://localhost:8080/bill crea una nueva factura con los datos solicitados
router.post('/', async (req, res) => {

});

//ruta http://localhost:8080/bill/:folio actualiza la factura con el número de folio proporcionado 
router.put('/:folio', async (req, res) => {

});

//ruta http://localhost:8080/bill/:folio elimina la factura con el número de folio proporcionado
router.delete('/:folio', async (req, res) => {

});

module.exports = router;