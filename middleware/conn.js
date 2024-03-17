// Instanciamos el cliente de mongoDB
const { MongoClient } = require('mongodb');

// Funcion para conectar a la base de datos y realizar operaciones CRUD
async function main() {

    // Conexion con mongo atlas
    const uri = "mongodb+srv://isanfloresfa:Tyl2OXkCtA1f4ogn@apifactura.awf6sfw.mongodb.net/?retryWrites=true&w=majority&appName=ApiFactura";

    // Creamos el cliente
    const client = new MongoClient(uri);

    try {
        await client.connect();
        await listDatabases(client);
    } catch (el) {
        console.error(el);
    } finally {
        await client.close();
    }
}

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

main().catch(console.error);