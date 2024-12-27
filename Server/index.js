require("dotenv").config();
const express = require('express')
const app = express();
const port = process.env.PORT || 3000;
const connect = require('./DB/connect');
const product_routes = require('./routes/product')
console.log(process.env.PORT);
const start = async() =>{
  try {
    await connect();
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
  } catch (error) {
    console.log(error);
  }
}
start();

app.use("/api/products/", product_routes)

