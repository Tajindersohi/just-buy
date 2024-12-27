const mongoose = require('mongoose');
const connectDB = () => {
    return mongoose.connect(process.env.CONNECTION_STRING,{
        useNewUrlParser: true,
        useUnifiedTopology : true,
    });
}

module.exports = connectDB