require("dotenv").config();
const express = require('express')
const app = express();
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true, 
}));

app.use(express.json());

const port = process.env.PORT || 3000;
const connect = require('./DB/connect');
const routes = require('./routes/index')
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

app.use("/api", routes)

