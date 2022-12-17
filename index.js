const express = require('express');
const app = express();
const port = 5000;
const {MongoClient}= require('mongodb')
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();



async function main() {
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2efaz.mongodb.net/?retryWrites=true&w=majority`;

    const client = new MongoClient(uri);
    try {
      // Connect to the MongoDB cluster
      await client.connect();
        console.log('db connected');
      // Make the appropriate DB calls
      
    } catch (e) {
        console.log(e)
    }
    finally {
        // await client.close()
    }
}
main().catch(console.error);
// Checking server
app.get('/', (req, res) => {
    res.send('Hello World')
});
app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})