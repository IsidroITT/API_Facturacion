const express = require('express');
const bodyParser = require("body-parser");
const customerRouter = require("./routes/customerRoutes");

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send({ Message: `Server running on ${PORT}`});
});

app.use("/customer", customerRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
})