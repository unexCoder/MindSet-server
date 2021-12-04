const express = require('express');
const path = require('path'); 

const time_stamper = require('./middleware/time_stamper')

// // mongoDB setup
// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://cluster_0_admin:unexcoder@cluster0.vj1w5.mongodb.net/unexcoder?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// // mongoDB connect
// client.connect(err => {
//     const collection = client.db('unexcoder').collection('albums');
//     console.log(collection);
//     client.close();
//     console.log('close cloud connection');
// });

////
// ////// mongo connection method 3
// const { MongoClient } = require("mongodb");
// // Connection URI
// const uri = "mongodb+srv://cluster_0_admin:unexcoder@cluster0.vj1w5.mongodb.net/unexcoder?retryWrites=true&w=majority";
// // Create a new MongoClient
// const client = new MongoClient(uri);
// async function run() {
//   try {
//     // Connect the client to the server
//     await client.connect();
//     // Establish and verify connection
//     await client.db("unexcoder").command({ ping: 1 });
//     console.log("Connected successfully to server");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
// ////


////// mongo connection method 2
// const mongodb = require('mongodb');
// const uri = "mongodb+srv://cluster_0_admin:unexcoder@cluster0.vj1w5.mongodb.net/unexcoder?retryWrites=true&w=majority";
// const mongo_client = mongodb.MongoClient;
// mongo_client.connect(uri)
// .then((db) => {
//     const albums = db.db('unexcoder').collection('albums');
//     return albums.find({year: 2019});
// })
// // .then((count) => {
// //     log.addEntry(`Existing record count: ${count}`);
// //     console.log(count);
// //     return albums.find();
// // })
// .then((cursor) => {
//     // console.log(cursor);
// })
// .catch((err) => {
//     // ...
// })
////////////////////////////////

///////////////////////////////// 
// conect mongodb with mongoose
const mongoose = require('mongoose');
const uri = "mongodb+srv://cluster_0_admin:unexcoder@cluster0.vj1w5.mongodb.net/unexcoder?retryWrites=true&w=majority";
mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => console.log('connected to db'))
.catch((err) => console.log(err));



/////////////////////////////
// declare server object
const server = express();
const PORT = process.env.PORT || 8008;

// middleware
server.use(time_stamper);
// body parser middleware
server.use(express.json());
server.use(express.urlencoded({extended: false}));

// API routes
server.use('/api/clients',require('./routes/controllers/clients'))
server.use('/api/applicants',require('./routes/controllers/applicants'))
server.use('/api/psycologists',require('./routes/controllers/psycologists'))
server.use('/api/admins',require('./routes/controllers/admins'))

// default endpoint
// server static folder
server.use(express.static(path.join(__dirname,'public')));







// mongoose test routes
// write new entry with album schema
const Album = require('./models/album')
server.post('/api/mongoose/newAlbum', (req,res) => {
    const album = new Album({
        title:req.body.title,
        year:req.body.year,
        genre:req.body.genre,
        style: req.body.style,
        type: req.body.type
    });
    album.save()
    .then((result) => {
        res.send(result);  
    })
    .catch((err) => {
        console.log(err);    
    });
});

// get all
server.get('/api/mongoose/getAll', (req,res) => {
    Album.find()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    }) 
})

// get single
server.get('/api/mongoose/getsingle', (req,res) => {
    Album.findById('61a4c5841b0ae164fc6c3cd5')
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    }) 
})


server.listen(PORT, () => {
    console.log(">>>>> server running >>>>>");
    console.log(`>>>>> listening at http://localhost:${PORT} >>>>>`);
})