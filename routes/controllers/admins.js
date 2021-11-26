const express = require('express');
const router = express.Router();
const fs = require('fs');

let admins = require('../../data/admins.json');

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

// admins CREATE route
router.post('/', (req, res) => {
    const id = admins.length + 1; 
    const newAdmin = {
        id: id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        user_name: req.body.user_name,
        email: req.body.email,
        password: req.body.password
    }

    if(!newAdmin.first_name || !newAdmin.last_name || !newAdmin.email || !newAdmin.password) {
        // return flag to exit conditional
        return res.status(400).json({msg: "please include first name, last name, email and password"});
    } 
    res.send(newAdmin);
    admins.push(newAdmin);
    // persistencia
    fs.writeFile('./data/admins.json', JSON.stringify(admins), err => {
        if (err) {
          console.error(err)
          return
        }
    });
});

// admins UPDATE route
router.put('/:id', (req, res) => {
    const found = admins.some(admin => admin.id === parseInt(req.params.id));
    if(found) {
        const updAdmin = req.body;
        admins.forEach(admin => {
            if(admin.id === parseInt(req.params.id)) {
                admin.first_name = updAdmin.first_name ? updAdmin.first_name : admin.first_name; 
                admin.last_name = updAdmin.last_name ? updAdmin.last_name : admin.last_name; 
                admin.user_name = updAdmin.user_name ? updAdmin.user_name : admin.user_name; 
                admin.email = updAdmin.email ? updAdmin.email : admin.email; 
                admin.password = updAdmin.password ? updAdmin.password : admin.password; 

                res.json({msg: 'Administator Updated',admin});
                // persistencia
                fs.writeFile('./data/admins.json', JSON.stringify(admins), err => {
                    if (err) {
                      console.error(err)
                      return
                    }
                });
            }
        });
      } else {
          res.status(400).json({msg: `no admin with id of ${req.params.id}`});
    }
  });

// admins DELETE route
router.delete('/:id', (req, res) => {
    const found = admins.some(admin => admin.id === parseInt(req.params.id));
    if(found) {
        admins = admins.filter( admin => admin.id !== parseInt(req.params.id))
        res.json({msg:'Administrator Deleted',admins});
        // persistencia
        fs.writeFile('./data/admins.json', JSON.stringify(admins), err => {
            if (err) {
                console.error(err)
                return
            }
        });
    } else {
        res.status(400).json({msg: `no admin with id of ${req.params.id}`});
    }
});

module.exports = router;