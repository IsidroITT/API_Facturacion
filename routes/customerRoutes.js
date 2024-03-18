const express = require("express");
const router = express.Router();
const customerDriver = require("../controllers/customerController");

//ruta http://localhost:8080/customer/:rfc devuelve un cliente por su rfc
router.get('/:rfc', async (req, res) => {
    const { rfc } = req.params;
    const customer = await customerDriver.getCustomer(rfc);

    if (customer.length === 0 || customer === null) {
        return res.status(404).json({ Error: "Cliente no encontrado" });
    }

    return res.status(200).json({ Customer: customer });
});

//ruta http://localhost:8080/customer devuelve un listado de todos los clientes
router.get('/', async (req, res) => {
    const allCustomers = await customerDriver.listCustomers();

    if (allCustomers === null) {
        return res.status(500).json({ Error: "Error al obtener los clientes" });
    }

    return res.status(200).json({ Customers: allCustomers });
});

//ruta http://localhost:8080/customer crea un nuevo cliente
router.post('/', async (req, res) => {
    const { legal_name, rfc, tax_system, email, address } = req.body;
    const newCustomer = await customerDriver.createCustomer(legal_name, rfc, tax_system, email, address);

    if (newCustomer === null) {
        return res.status(400).json({ Error: "Error al crear el cliente" });
    }

    return res.status(201).json({ Message: "Cliente creado", CustomerID: newCustomer });
});

//ruta http://localhost:8080/customer actualiza un cliente con su rfc
router.put('/:rfc', async (req, res) => {
    const { rfc } = req.params;
    const { legal_name, email, address } = req.body;

    const updatedCustomer = await customerDriver.updateCustomer(rfc, legal_name, email, address);

    if (updatedCustomer === null) {
        return res.status(404).json({ Error: "Cliente no encontrado" });
    }   

    return res.status(200).json({ Message: "Cliente actualizado", UpdatedCustomers: updatedCustomer});
});

//ruta http://localhost:8080/customer elimina un cliente con su rfc
router.delete('/:rfc', async (req, res) => {
    const { rfc } = req.params;
    const deletedCustomer = await customerDriver.deleteCustomer(rfc);

    if (deletedCustomer === null) {
        return res.status(404).json({ Error: "Cliente no encontrado" });
    }  

    return res.status(200).json({ Message: "Cliente eliminado" });
});

module.exports = router;