const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

const connectDB = () => {
    return mongoose.connect(process.env.CONNECTION_STRING,{
        useNewUrlParser: true,
        useUnifiedTopology : true,
    });
}



// async function createUserDocument() {
//     const client = new MongoClient('mongodb://localhost:27017');

//     try {
//         await client.connect();
//         const db = client.db('myDatabase');

//         // Insert a document into a non-existent collection (will create the collection)
//         const result = await db.collection('users').insertOne({
//             username: 'johndoe',
//             email: 'johndoe@example.com',
//             password: 'hashedpassword',
//             createdAt: new Date()
//         });

//         console.log('Document inserted with _id:', result.insertedId);
//     } finally {
//         await client.close();
//     }
// }

// createUserDocument().catch(console.error);

module.exports = connectDB
