const express = require('express');
const app = express();
const port = 5000;
const {MongoClient}= require('mongodb')
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();


// Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2efaz.mongodb.net/?retryWrites=true&w=majority`;

async function main() {
    

    const client = new MongoClient(uri);
    try {
      // Connect to the MongoDB cluster
      await client.connect();
      console.log("db connected");
      // Make the appropriate DB calls
      const database = client.db("portfolio");
      const projectCollection = database.collection("projects");

      app.get("/projects", async (req, res) => {
        const cursor = projectCollection.find({});
        const projects = await cursor.toArray();
        res.send(projects);
      });

      app.get("/project/:id", async (req, res) => {
        const id = req.params.id;
        console.log(id);
        const query = {
          _id: ObjectId(id),
        };
        const project = await projectCollection.findOne(query);
        console.log(project);
        res.json(project);
      });
      // Add a Project
      app.post("/foods", async (req, res) => {
        const project = req.body;
        console.log("hit the post api", project);
        const result = await projectCollection.insertOne(project);
        console.log(result);
        res.json(result);
      });
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