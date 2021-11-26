const express = require('express');
const router = express.Router();
const fs = require('fs');

let psycologists = require('../../data/psycologists.json');

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

// psycologists 'byLastName' route
router.get('/byLastName/:name', (req, res) => {
    const byLastName = psycologists.filter(psy => psy.last_name.includes(req.params.name));
    if (byLastName.length > 0) {
        res.json(byLastName);
    } else {
        res.status(400).json({msg: `no psycologists with last name ${req.params.name}`});
    }
  });

  // psycologists 'byEmail' route
router.get('/byEmail/:email', (req, res) => {
    const byEmail = psycologists.filter(psy => psy.email.includes(req.params.email));
    if (byEmail.length > 0) {
        res.json(byEmail);
    } else {
        res.status(400).json({msg: `no psycologists with email ${req.params.email}`});
    }
  });

// psycologists CREATE route
router.post('/', (req, res) => {
    const id = psycologists.length + 1; 
    const newPsy = {
        id: id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password
    }

    if(!newPsy.first_name || !newPsy.last_name || !newPsy.email || !newPsy.password) {
        // return flag to exit conditional
        return res.status(400).json({msg: "please include first name, last name, email and password"});
    } 
    res.send(newPsy);
    psycologists.push(newPsy);
    // persistencia
    fs.writeFile('./data/psycologists.json', JSON.stringify(psycologists), err => {
      if (err) {
        console.error(err)
        return
      }
  });
});

// psycologists UPDATE route
router.put('/:id', (req, res) => {
    const found = psycologists.some(psy => psy.id === parseInt(req.params.id));
    if(found) {
        const updPsy = req.body;
        psycologists.forEach(psy => {
            if(psy.id === parseInt(req.params.id)) {
                psy.first_name = updPsy.first_name ? updPsy.first_name : psy.first_name; 
                psy.last_name = updPsy.last_name ? updPsy.last_name : psy.last_name; 
                psy.email = updPsy.email ? updPsy.email : psy.email; 
                psy.password = updPsy.password ? updPsy.password : psy.password; 

                res.json({msg: 'Psycologist Updated',psy});
                // persistencia
                fs.writeFile('./data/psycologists.json', JSON.stringify(clients), err => {
                  if (err) {
                    console.error(err)
                    return
                  }
              });            
            }
        });
      } else {
          res.status(400).json({msg: `no psycologist with id of ${req.params.id}`});
    }
  });

// psycologists DELETE route
router.delete('/:id', (req, res) => {
   const found = psycologists.some(psy => psy.id === parseInt(req.params.id));
   if(found) {
      psycologists = psycologists.filter( psy => psy.id !== parseInt(req.params.id))
      res.json({msg:'Psycologist Deleted',psycologists});
      // persistencia
      fs.writeFile('./data/psycologists.json', JSON.stringify(psycologists), err => {
        if (err) {
          console.error(err)
          return
        }
      });
    } else {
        res.status(400).json({msg: `no psycologist with id of ${req.params.id}`});
  }
});

module.exports = router;