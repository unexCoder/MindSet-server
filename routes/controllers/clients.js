const express = require('express');
const router = express.Router();
const fs = require('fs');

let clients = require('../../data/clients.json');

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
  
// clients CREATE route
router.post('/', (req, res) => {
    const id = clients.length + 1; 
    const newClient = {
        id: id,
        company_name: req.body.company_name,
        branch: req.body.branch,
        phone: req.body.phone,
        email: req.body.email
    }

    if(!newClient.company_name || !newClient.branch || !newClient.phone || !newClient.email) {
        // return flag to exit conditional
        return res.status(400).json({msg: "please include company name, branch, phone and email"});
    } 
    res.send(newClient);
    clients.push(newClient);
    // persistencia
    fs.writeFile('./data/clients.json', JSON.stringify(clients), err => {
        if (err) {
          console.error(err)
          return
        }
    });
});

// clients UPDATE route
router.put('/:id', (req, res) => {
    const found = clients.some(client => client.id === parseInt(req.params.id));
    if(found) {
        const updClient = req.body;
        clients.forEach(client => {
            if(client.id === parseInt(req.params.id)) {
                client.company_name = updClient.company_name ? updClient.company_name : client.company_name; 
                client.branch = updClient.branch ? updClient.branch : client.branch; 
                client.phone = updClient.phone ? updClient.phone : client.phone; 
                client.email = updClient.email ? updClient.email : client.email; 

                res.json({msg: 'Client Updated',client});
                // persistencia
                fs.writeFile('./data/clients.json', JSON.stringify(clients), err => {
                    if (err) {
                      console.error(err)
                      return
                    }
                });            
            }
        });
      } else {
          res.status(400).json({msg: `no client with id of ${req.params.id}`});
    }
  });

// clients DELETE route
router.delete('/:id', (req, res) => {
   const found = clients.some(client => client.id === parseInt(req.params.id));
   if(found) {
        clients = clients.filter( client => client.id !== parseInt(req.params.id))    
        res.json({msg:'Client Deleted',clients});
        // persistencia
        fs.writeFile('./data/clients.json', JSON.stringify(clients), err => {
            if (err) {
                console.error(err)
                return
            }
        });
    } else {
        res.status(400).json({msg: `no client with id of ${req.params.id}`});
  }
});

module.exports = router;