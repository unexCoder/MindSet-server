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
const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD;

///////////////////////////////// 
// conect mongodb with mongoose
const mongoose = require('mongoose');
const URI='mongodb+srv://'+db_user+':'+db_password+'@mindsetcluster.fyrnq.mongodb.net/mindset_data?retryWrites=true&w=majority';
mongoose.connect(URI,{ useNewUrlParser: true, useUnifiedTopology: true })
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