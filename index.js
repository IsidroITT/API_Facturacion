const express = require('express');
const bodyParser = require("body-parser");
const CONFIG = require("./config");

// Routers de la API
const customerRouter = require("./routes/customerRoutes");
const productRouter = require("./routes/productsRoutes");
const billRouter = require("./routes/billRoutes");

const app = express();
const PORT = CONFIG.PORT;

app.use(bodyParser.json());

app.get('/', (req, res) => {
 return res.send({ Message: `Server running on ${PORT}`});
});

app.use("/customer", customerRouter);
app.use("/product", productRouter);
app.use("/bill", billRouter);

app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
})