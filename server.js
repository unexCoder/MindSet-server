const express = require('express');
const path = require('path'); 

const time_stamper = require('./middleware/time_stamper')

// declare server object
const server = express();
const PORT = process.env.PORT || 8008;

// middleware
server.use(time_stamper);

// API routes
server.use('/api/clients',require('./routes/controllers/clients'))
server.use('/api/applicants',require('./routes/controllers/applicants'))
server.use('/api/psycologists',require('./routes/controllers/psycologists'))
server.use('/api/admins',require('./routes/controllers/admins'))

// default endpoint
// server static folder
server.use(express.static(path.join(__dirname,'public')));

server.listen(PORT, () => {
    console.log(">>>>> server running >>>>>");
    console.log(`>>>>> listening at http://localhost:${PORT} >>>>>`);
})