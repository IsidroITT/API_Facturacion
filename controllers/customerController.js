// Modelo de datos
const Customer = require('../models/customer');

// Configuración de la base de datos
const CONFIG = require('../config');
const { MongoClient } = require('mongodb');

// Conexion a la base de datos
const uri = CONFIG.MONGO_URI;
const client = new MongoClient(uri);

//Entradas: razón social, rfc, regimen fiscal, correo electrónico, dirección.
async function createCustomer(legal_name, rfc, tax_system, email, address){
    let customerID = "";

    try{
        // Conexion a la base de datos
        await client.connect();
        
        // Codigo para insertar un nuevo cliente
        const result = await client.db('customer').collection('Customers collection').insertOne({ 
            legal_name: legal_name,
            rfc: rfc,
            tax_system: tax_system,
            email: email,
            address: address,
            createdAt: new Date()
         });

        customerID = result.insertedId;
    }catch(e){
        // Imprimimos el error en caso de que se presente
        console.error(e);
        return null;
    }finally{
        // Cerramos la conexion
        await client.close();
    }

    // Para verificar la creación del cliente, regresamos el ID del cliente
    return customerID;
}

//Entrada(s): --
async function listCustomers(){
    try{
        // Conexion a la base de datos
        await client.connect();
        
        // Codigo para obtener todos los clientes
        const cursor = client.db('customer').collection('Customers collection').find({});

        return await cursor.toArray();
    }catch(e){
        // Imprimimos el error en caso de que se presente
        console.error(e);
        return null;
    }finally{
        // Cerramos la conexion
        await client.close();
    }
}

//Entrada: rfc
async function getCustomer(rfc){
    try{
        // Conexion a la base de datos
        await client.connect();
        
        // Codigo para obtener el cliente con el rfc proporcionado
        const cursor = client.db('customer').collection('Customers collection').find({
            rfc: rfc
        });

        return (await cursor.toArray());
    }catch(e){
        // Imprimimos el error en caso de que se presente
        console.error(e);
        return null;
    }finally{
        // Cerramos la conexion
        await client.close();
    }
}

//Entrada: rfc, razón social, email, dirección
async function updateCustomer(rfc, legal_name, email, address){
    try{
        // Conexion a la base de datos
        await client.connect();
        
        // Codigo para eliminar el cliente con el rfc proporcionado
        const result = await client.db('customer').collection('Customers collection').updateOne({
            // Criterio de busqueda
            rfc: rfc
        }, {
            // Datos a actualizar
            $set: {
                legal_name: legal_name,
                email: email,
                address: address
            }
        });

        return result.modifiedCount;
    }catch(e){
        // Imprimimos el error en caso de que se presente
        console.error(e);
        return null;
    }finally{
        // Cerramos la conexion
        await client.close();
    }
}

//Entrada: rfc
async function deleteCustomer(rfc){
    try{
        // Conexion a la base de datos
        await client.connect();
        
        // Codigo para eliminar el cliente con el rfc proporcionado
        const result = await client.db('customer').collection('Customers collection').deleteOne({
            rfc: rfc
        });

        return result.deletedCount;
    }catch(e){
        // Imprimimos el error en caso de que se presente
        console.error(e);
        return null;
    }finally{
        // Cerramos la conexion
        await client.close();
    }
}

module.exports = {
    createCustomer,
    listCustomers,
    getCustomer,
    updateCustomer,
    deleteCustomer
}