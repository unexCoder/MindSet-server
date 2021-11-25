const express = require('express');
const router = express.Router();

const psycologists = require('../../data/psychologists.json');

// psycologists 'get all' route
router.get('/', (req, res) => res.json(psycologists))

// psycologists 'get single' route
router.get('/:id', (req, res) => {
  const found = psycologists.some(psy => psy.id === parseInt(req.params.id));
  if(found) {
    res.json(psycologists.filter( psy => psy.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({msg: `no psycologist with id of ${req.params.id}`});
  }
});

// filters
// psycologists 'byName' route
router.get('/byFirstName/:name', (req, res) => {
    const byFirstName = psycologists.filter(psy => psy.first_name.includes(req.params.name));
    if (byFirstName.length > 0) {
        res.json(byFirstName);
    } else {
        res.status(400).json({msg: `no psycologists with first name ${req.params.name}`});
    }
  });

// filters
// psycologists 'byLastName' route
router.get('/byLastName/:name', (req, res) => {
    const byLastName = psycologists.filter(psy => psy.last_name.includes(req.params.name));
    if (byLastName.length > 0) {
        res.json(byLastName);
    } else {
        res.status(400).json({msg: `no psycologists with last name ${req.params.name}`});
    }
  });

  // clients 'byEmail' route
router.get('/byEmail/:email', (req, res) => {
    const byEmail = psycologists.filter(psy => psy.email.includes(req.params.email));
    if (byEmail.length > 0) {
        res.json(byEmail);
    } else {
        res.status(400).json({msg: `no psycologists with email ${req.params.email}`});
    }
  });

module.exports = router;