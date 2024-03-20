//Modelo de datos: factura
const Bill = require('../models/bill');

//Configuración de la base de datos
const CONFIG = require('../config');
const { MongoClient } = require('mongodb');

//Conexión a la base de datos
const uri = CONFIG.MONGO_URI;
const client = new MongoClient(uri);

async function createBill(status, type, items, payment_form, payment_method, currency, exchange, exports, customer, address, total, folio_number){
    try {
        await client.connect();

        const result = await client.db('bill').collection('Bills collection').insertOne({
            date: new Date(),
            status: status,
            type: type,
            items: items,
            payment_form: payment_form,
            payment_method: payment_method,
            currency: currency,
            exchange: exchange,
            exports: exports,
            customer: customer,
            address: address,
            total: total,
            folio_number: folio_number
        });
    } catch (error) {
        console.error(error);
        return null;
    } finally {
        await client.close();
    }
    return new Bill(status, type, items, payment_form, payment_method, currency, exchange, exports, customer, address, total, folio_number);
}

async function listBills(){
    try {
        await client.connect();
        const cursor = client.db('bill').collection('Bill collection').find({});
        return await cursor.toArray();
    } catch (error) {
        console.error(error);
        return null;
    } finally {
        await client.close();
    }
}

async function getBill(folio_number){
    try {
        await client.connect();
        const cursor = client.db('bill').collection('Bill collection').find({
            folio_number: folio_number
        });
        return (await cursor.toArray());
    } catch (error) {
        console.error(error);
        return null;
    } finally {
        await client.close();
    }
}

async function updateBill(folio_number, status, items, total){
    try {
        await client.connect();
        const result = await client.db('bill').collection('Bill collection').updateOne({
            folio_number: folio_number
        }, {
            $set: {
                status: status,
                items: items,
                total: total
            }
        });
        return result.modifiedCount;
    } catch (error) {
        console.error(error);
        return null;
    } finally {
        await client.close();
    }
}

async function deleteBill(folio_number){
    try {
        await client.connect();
        const result = await client.db('bill').collection('Bill collection').deleteOne({
            folio_number: folio_number
        });
        return result.deletedCount;
    } catch (error) {
        console.error(error);
        return null;
    } finally {
        await client.close();
    }
}

module.exports = {
    createBill,
    listBills,
    getBill,
    updateBill,
    deleteBill
}