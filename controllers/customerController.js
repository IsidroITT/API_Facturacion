// Modelo de datos
const Customer = require('../models/customer');

// Configuración de la base de datos
const CONFIG = require('../config');
const {MongoClient} = require('mongodb');

// Conexion a la base de datos
const uri = CONFIG.MONGO_URI;
const client = new MongoClient(uri);
const NodeGeocoder = require("node-geocoder");
//const {stringify} = require("nodemon/lib/utils");

// Funcion para obtener ciudad, municipio, estado y país a partir de un código postal
async function getDataFromZip(zipcode) {
    const options = {
        provider: 'google',
        apiKey: CONFIG.GOOGLE_MAPS_KEY,
    };
    const geocoder = NodeGeocoder(options);
    try {
        const res = await geocoder.geocode(zipcode);
        const data = res[0];
        const location = {
            city: data.city,
            municipality: data.city,
            state: data.administrativeLevels.level1long,
            country: data.country
        };
        return location;
    } catch (err) {
        console.log(`error ${err}`);
        return null;
    }
}

//Entradas: razón social, rfc, regimen fiscal, correo electrónico, dirección.
async function createCustomer(legal_name, rfc, tax_system, email, address) {
    let customerID = "";

    try {
        // Conexion a la base de datos
        await client.connect().catch((err) => {
            console.log(`Error al conectar a la base de datos: ${err}`);
        });

        // Verificamos que el cliente no exista
        const cliente = await getCustomer(rfc);
        if (cliente === null || cliente.length > 0) {
            return null;
        }

        // Obtenemos la ciudad, municipio, estado y país a partir del código postal
        const data = await getDataFromZip(address.zip).catch((err) => {
            console.log(`Error al obtener la direccion: ${err}`);
        });

        // Crear un json con todos los datos del cliente y su dirección
        const customer = {
            legal_name: legal_name,
            rfc: rfc,
            tax_system: tax_system,
            email: email,
            address: {
                zip: address.zip,
                city: data.city,
                municipality: data.municipality,
                state: data.state,
                country: data.country
            },
            createdAt: new Date()
        };

        // Insertar el cliente en la base de datos
        const result = await client.db('customer').collection('Customers collection').insertOne(
            customer
        ).catch((err) => {
            console.error(`Error al insertar el cliente: ${err}`);
        })

        console.log(`Inserted customer ${result}`);
        customerID = result;
    } catch (e) {
        // Imprimimos el error en caso de que se presente
        console.error(`Error en el try-catch: ${e}`);
        return null;
    } finally {
        // Cerramos la conexion
        await client.close();
    }

    // Para verificar la creación del cliente, regresamos el ID del cliente
    return customerID;
}

//Entrada(s): --
async function listCustomers() {
    try {
        // Conexion a la base de datos
        await client.connect();

        // Codigo para obtener todos los clientes
        const cursor = client.db('customer').collection('Customers collection').find({});

        return await cursor.project({_id: 0}).toArray();
    } catch (e) {
        // Imprimimos el error en caso de que se presente
        console.error(e);
        return null;
    } finally {
        // Cerramos la conexion
        await client.close();
    }
}

//Entrada: rfc
async function getCustomer(rfc) {
    try {
        // Conexion a la base de datos
        await client.connect();

        // Codigo para obtener el cliente con el rfc proporcionado
        const cursor = client.db('customer').collection('Customers collection').find({
            rfc: rfc
        });

        return (await cursor.project({_id: 0}).toArray());
    } catch (e) {
        // Imprimimos el error en caso de que se presente
        console.error(e);
        return null;
    } finally {
        // Cerramos la conexion
        await client.close();
    }
}

//Entrada: rfc, razón social, email, dirección
async function updateCustomer(rfc, legal_name, email, address) {
    try {
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
    } catch (e) {
        // Imprimimos el error en caso de que se presente
        console.error(e);
        return null;
    } finally {
        // Cerramos la conexion
        await client.close();
    }
}

//Entrada: rfc
async function deleteCustomer(rfc) {
    try {
        // Conexion a la base de datos
        await client.connect();

        // Codigo para eliminar el cliente con el rfc proporcionado
        const result = await client.db('customer').collection('Customers collection').deleteOne({
            rfc: rfc
        });

        return result.deletedCount;
    } catch (e) {
        // Imprimimos el error en caso de que se presente
        console.error(e);
        return null;
    } finally {
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