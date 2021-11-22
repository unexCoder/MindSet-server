const express = require('express');
const server = express();
const port = 8008;

server.get('/', (req, res) => {
  res.send('<style>body{background-color:#A3A3A4}</style><h1 style="color:#ffc600;">MindSet Server</h1>');
})

server.listen(port, () => {
    console.log(">>>>> server running >>>>>");
    console.log(`>>>>> listening at http://localhost:${port} >>>>>`);
})