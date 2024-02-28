// a) Importa el paquete
const Facturapi = require('facturapi');

// b) Crea una instancia del cliente, usando la llave secreta
//    de la organización emisora (https://dashboard.facturapi.io/integration/apikeys)
const facturapi = new Facturapi('sk_test_n3gPKvVpb1D4dAjJqVX1e2vokG7orkEzy82XRMLaYQ');

// c) Crea una factura
async function createCustomer() {
    const customer = await facturapi.customers.create({
          legal_name: 'Dunder Mifflin',
          email: 'email@example.com',
          tax_id: 'ABC101010112',
          tax_system: '601',
          address: {
            zip: '85900'
          }
      });
      console.log(customer);
}

// d) Ejecuta la función
createCustomer();