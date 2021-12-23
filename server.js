const express = require('express');
const path = require('path'); 
const cors = require('cors');
const time_stamper = require('./middleware/time_stamper');
const router = require('./routes');


/////////////////////////////
// declare server object
const server = express();
const PORT = process.env.PORT || 8008;

// middlewares
server.use(cors());
server.use(time_stamper);
// body parser middlewares
server.use(express.json());
server.use(express.urlencoded({extended: true}));

// default endpoint
// server static folder
server.use(express.static(path.join(__dirname,'public')));

///////////////////////////////// 
// conect mongodb with mongoose
const mongoose = require('mongoose');
const URI='mongodb+srv://mindset_admin:mindset_001@mindsetcluster.fyrnq.mongodb.net/mindset_data?retryWrites=true&w=majority';
mongoose.connect(URI,{ useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => console.log('connected to database'))
.catch((err) => console.log(err));

server.use('/api',router)

server.listen(PORT, () => {
    console.log(">>>>> server running >>>>>");
    console.log(`>>>>> listening at http://localhost:${PORT} >>>>>`);
})