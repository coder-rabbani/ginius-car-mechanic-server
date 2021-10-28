// step 1
const express = require('express');

//mongodb import
const { MongoClient } = require('mongodb');
//dotenv package requirement for environment variable for database secret info like user and pass
require('dotenv').config();

// step 2
const app = express();
//step 3
const port = 5000;

// MongoDB settings/connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.v05ft.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){
  try{
    await client.connect();
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