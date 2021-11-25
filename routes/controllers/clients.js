const express = require('express');
const router = express.Router();

const clients = require('../../data/clients.json');

// clients 'get all' route
router.get('/', (req, res) => res.json(clients))

// clients 'get single' route
router.get('/:id', (req, res) => {
  const found = clients.some(client => client.id === parseInt(req.params.id));
  if(found) {
    res.json(clients.filter( client => client.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({msg: `no client with id of ${req.params.id}`});
  }
});

// filters
// clients 'byName' route
router.get('/byName/:name', (req, res) => {
    const byName = clients.filter(cl => cl.company_name.includes(req.params.name));
    if (byName.length > 0) {
        res.json(byName);
    } else {
        res.status(400).json({msg: `no client with name ${req.params.name}`});
    }
  });

// clients 'byBranch' route
router.get('/byBranch/:branch', (req, res) => {
    const byBranch = clients.filter(cl => cl.branch.includes(req.params.branch));
    if (byBranch.length > 0) {
        res.json(byBranch);
    } else {
        res.status(400).json({msg: `no client with branch ${req.params.branch}`});
    }
  });

// clients 'byPhone' route
router.get('/byPhone/:phone', (req, res) => {
    const byPhone = clients.filter(cl => cl.phone.includes(req.params.phone));
    if (byPhone.length > 0) {
        res.json(byPhone);
    } else {
        res.status(400).json({msg: `no client with phone ${req.params.phone}`});
    }
  });

// clients 'byEmail' route
router.get('/byEmail/:email', (req, res) => {
    const byEmail = clients.filter(cl => cl.email.includes(req.params.email));
    if (byEmail.length > 0) {
        res.json(byEmail);
    } else {
        res.status(400).json({msg: `no client with email ${req.params.email}`});
    }
  });
  

module.exports = router;