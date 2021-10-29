// step 1
const express = require('express');

//require ObjectId
const ObjectId = require('mongodb').ObjectId;

//import cors
const cors = require('cors');

//mongodb import
const { MongoClient } = require('mongodb');

//dotenv package requirement for environment variable for database secret info like user and pass
require('dotenv').config();

// step 2
const app = express();
//step 3
const port = process.env.PORT || 5000;

//Middleware 
app.use(cors());
app.use(express.json())

// MongoDB settings/connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.v05ft.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){
  try{
    await client.connect();
    const database = client.db('geniusCarMechanic');
    const servicesCollection = database.collection('services');

    //get api
    app.get('/services', async(req, res)=>{
      const cursor = servicesCollection.find({}); 
      const services = await cursor.toArray();
      res.send(services);
    })

    //GET single service
    app.get('/services/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {_id: ObjectId(id)};
      const service = await servicesCollection.findOne(query);
      res.json(service)
    })

    //post api
    app.post('/services', async(req, res)=>{
      const service = req.body;
      console.log('hit the post api ', service);
      
      const result = await servicesCollection.insertOne(service);
      console.log(result); 
      res.json(result);
    })

    //DELETE api
    app.delete('/services/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {_id:ObjectId(id)};
      const result = await servicesCollection.deleteOne(query);
      res.json(result);
    })
  }
  finally{ 
    // await client.close();
  }
}

run().catch(console.dir); 


//step 4 - defalut route
app.get('/', (req, res)=>{
  res.send('Running Genius Server');
});

//setp 5
app.listen(port, ()=>{
  console.log('Running Genius Server on port ', port);
});