const express = require('express');
const router = express.Router();
const fs = require('fs');

let applicants = require('../../data/applicants.json');

// applicants 'get all' route
router.get('/', (req, res) => res.json(applicants))

// applicants 'get single' route
router.get('/:id', (req, res) => {
  const found = applicants.some(applicant => applicant.id === parseInt(req.params.id));
  if(found) {
    res.json(applicants.filter( applicant => applicant.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({msg: `no applicant with id of ${req.params.id}`});
  }
});

// filters
// applicants 'byName' route
router.get('/byFirstName/:name', (req, res) => {
    const byFirstName = applicants.filter(apl => apl.first_name.includes(req.params.name));
    if (byFirstName.length > 0) {
        res.json(byFirstName);
    } else {
        res.status(400).json({msg: `no aaplicant with first name ${req.params.name}`});
    }
  });

// applicants 'byLastName' route
router.get('/byLastName/:name', (req, res) => {
    const byLastName = applicants.filter(apl => apl.last_name.includes(req.params.name));
    if (byLastName.length > 0) {
        res.json(byLastName);
    } else {
        res.status(400).json({msg: `no applicants with last name ${req.params.name}`});
    }
  });

// applicants 'byUserName' route
router.get('/byUserName/:name', (req, res) => {
    const byUserName = applicants.filter(apl => apl.user_name.includes(req.params.name));
    if (byUserName.length > 0) {
        res.json(byUserName);
    } else {
        res.status(400).json({msg: `no applicants with user name ${req.params.name}`});
    }
  });

// applicants 'byEmail' route
router.get('/byEmail/:email', (req, res) => {
    const byEmail = applicants.filter(apl => apl.email.includes(req.params.email));
    if (byEmail.length > 0) {
        res.json(byEmail);
    } else {
        res.status(400).json({msg: `no applicants with email ${req.params.email}`});
    }
  });

// applicants 'byCity' route
router.get('/byCity/:city', (req, res) => {
    const byCity = applicants.filter(apl => apl.city.includes(req.params.city));
    if (byCity.length > 0) {
        res.json(byCity);
    } else {
        res.status(400).json({msg: `no applicants from city ${req.params.city}`});
    }
  });

// applicants 'byState' route
router.get('/byState/:state', (req, res) => {
    const byState = applicants.filter(apl => apl.state.includes(req.params.state));
    if (byState.length > 0) {
        res.json(byState);
    } else {
        res.status(400).json({msg: `no applicants from state ${req.params.state}`});
    }
  });

// applicants 'byCountry' route
router.get('/byCountry/:country', (req, res) => {
    const byCountry = applicants.filter(apl => apl.country.includes(req.params.country));
    if (byCountry.length > 0) {
        res.json(byCountry);
    } else {
        res.status(400).json({msg: `no applicants from country ${req.params.country}`});
    }
  });

// applicants 'byPhone' route
router.get('/byPhone/:phone', (req, res) => {
    const byPhone = applicants.filter(apl => apl.phone.includes(req.params.phone));
    if (byPhone.length > 0) {
        res.json(byPhone);
    } else {
        res.status(400).json({msg: `no applicant with phone ${req.params.phone}`});
    }
  });

// applicants 'byPostalCode' route
router.get('/byPostalCode/:code', (req, res) => {
    const byPostalCode = applicants.filter(apl => apl.postal_code.includes(req.params.code));
    if (byPostalCode.length > 0) {
        res.json(byPostalCode);
    } else {
        res.status(400).json({msg: `no applicant with postal code ${req.params.code}`});
    }
  });

// applicants CREATE route
router.post('/', (req, res) => {
    const id = applicants.length + 1; 
    const newAplicant = {
        id: id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        user_name: req.body.user_name,
        email: req.body.email,
        password: req.body.password,
        street: req.body.street,
        street_number: req.body.street_number,
        city: req.body.city,
        postal_code: req.body.postal_code,
        state: req.body.state,
        country: req.body.country,
        phone: req.body.phone,
        exerience: req.body.experience
    }

    if(!newAplicant.first_name || !newAplicant.last_name || !newAplicant.password || !newAplicant.email) {
        // return flag to exit conditional
        return res.status(400).json({msg: "please include company first name, last name, email and password"});
    } 
    res.send(newAplicant);
    applicants.push(newAplicant);
    // persistencia
    fs.writeFile('./data/applicants.json', JSON.stringify(applicants), err => {
        if (err) {
          console.error(err)
          return
        }
    });
});

// applicants UPDATE route
router.put('/:id', (req, res) => {
    const found = applicants.some(apply => apply.id === parseInt(req.params.id));
    if(found) {
        const updApply = req.body;
        applicants.forEach(apply => {
            if(apply.id === parseInt(req.params.id)) {
                apply.first_name = updApply.first_name ? updApply.first_name : apply.first_name; 
                apply.last_name = updApply.last_name ? updApply.last_name : apply.last_name; 
                apply.user_name = updApply.user_name ? updApply.user_name : apply.user_name; 
                apply.email = updApply.email ? updApply.email : apply.email; 
                apply.password = updApply.password ? updApply.password : apply.password; 
                apply.street = updApply.street ? updApply.street : apply.street; 
                apply.street_number = updApply.street_number ? updApply.street_number : apply.street_number; 
                apply.city = updApply.city ? updApply.city : apply.city; 
                apply.postal_code = updApply.postal_code ? updApply.postal_code : apply.postal_code; 
                apply.state = updApply.state ? updApply.state : apply.state; 
                apply.country = updApply.country ? updApply.country : apply.country; 
                apply.phone = updApply.phone ? updApply.phone : apply.phone; 
                apply.experience = updApply.experience ? updApply.experience : apply.experience; 

                res.json({msg: 'Application Updated',apply});
                // persistencia
                fs.writeFile('./data/applicants.json', JSON.stringify(applicants), err => {
                    if (err) {
                        console.error(err)
                        return
                    }
                });
            }
        });
      } else {
          res.status(400).json({msg: `no application with id of ${req.params.id}`});
    }
  });

// applicants DELETE route
router.delete('/:id', (req, res) => {
   const found = applicants.some(apply => apply.id === parseInt(req.params.id));
   if(found) {
        applicants = applicants.filter( apply => apply.id !== parseInt(req.params.id))
        res.json({msg:'Application Deleted',applicants});
        // persistencia
        fs.writeFile('./data/applicants.json', JSON.stringify(applicants), err => {
            if (err) {
                console.error(err)
                return
            }
        });
    } else {
        res.status(400).json({msg: `no application with id of ${req.params.id}`});
  }
});


module.exports = router;