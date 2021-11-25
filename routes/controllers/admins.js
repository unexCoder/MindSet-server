const express = require('express');
const router = express.Router();

const admins = require('../../data/admins.json');

// admins 'get all' route
router.get('/', (req, res) => res.json(admins))

 // admins 'get single' route
router.get('/:id', (req, res) => {
  const found = admins.some(admin => admin.id === parseInt(req.params.id));
  if(found) {
      res.json(admins.filter( admin => admin.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({msg: `no admin with id of ${req.params.id}`});
  }
});

// filters
// admins 'byName' route
router.get('/byFirstName/:name', (req, res) => {
    const byFirstName = admins.filter(ad => ad.first_name.includes(req.params.name));
    if (byFirstName.length > 0) {
        res.json(byFirstName);
    } else {
        res.status(400).json({msg: `no admin with first name ${req.params.name}`});
    }
  });

// admins 'byLastName' route
router.get('/byLastName/:name', (req, res) => {
    const byLastName = admins.filter(ad => ad.last_name.includes(req.params.name));
    if (byLastName.length > 0) {
        res.json(byLastName);
    } else {
        res.status(400).json({msg: `no admins with last name ${req.params.name}`});
    }
  });

  // admins 'byUserName' route
router.get('/byUserName/:name', (req, res) => {
    const byUserName = admins.filter(ad => ad.user_name.includes(req.params.name));
    if (byUserName.length > 0) {
        res.json(byUserName);
    } else {
        res.status(400).json({msg: `no admins with user name ${req.params.name}`});
    }
  });

// admins 'byEmail' route
router.get('/byEmail/:email', (req, res) => {
    const byEmail = admins.filter(ad => ad.email.includes(req.params.email));
    if (byEmail.length > 0) {
        res.json(byEmail);
    } else {
        res.status(400).json({msg: `no admins with email ${req.params.email}`});
    }
  });

module.exports = router;