require('dotenv').config();
const express = require('express');
const path = require('path'); 
const cors = require('cors');
const time_stamper = require('./middleware/time_stamper');
const router = require('./routes');


/////////////////////////////
// declare server object
const server = express();
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
///////////////////////////////// 

// conect mongodb with mongoose
const mongoose = require('mongoose');
mongoose.connect(DB_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => console.log('connected to database'))
.catch((err) => console.log(err));

server.listen(PORT, () => {
    console.log(">>>>> server running >>>>>");
    console.log(`>>>>> listening at http://localhost:${PORT} >>>>>`);
})

// middlewares
server.use(cors());
server.use(time_stamper);
// body parser middlewares
server.use(express.json());
server.use(express.urlencoded({extended: true}));

// server static folder
server.use(express.static(path.join(__dirname,'public')));

server.use('/api',router);