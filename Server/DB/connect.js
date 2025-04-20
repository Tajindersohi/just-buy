const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
require("dotenv").config();

const connectDB = () => {
    console.log("process.env.CONNECTION_STRING",process.env.CONNECTION_STRING);
    return mongoose.connect(process.env.CONNECTION_STRING);
}
module.exports = connectDB
