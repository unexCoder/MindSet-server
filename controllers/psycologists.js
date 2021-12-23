// psycologists controllers
const Psycologist = require('../models/Psycologists');

// get controllers
const getAll = (req, res) => {
    Psycologist.find() // find() is from Moongose documentation
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

const getById = (req, res) => {
    Psycologist.findById(req.params.id)
    .then((PsycologistById) => res.json({ PsycologistById }))
    .catch((error) => res.status(404).json(error));
};

const getByEmail = (req, res) => {
    Psycologist.find({ email: req.params.email })
    .then((PsycologistByEmail) => res.json({ PsycologistByEmail }))
    .catch((error) => res.status(404).json(error));
};

// create controller
const createPsycologist = (req, res) => {
    if (!req.body.email || !req.body.first_name || !req.body.last_name || !req.body.password) { return res.status(400).send('Please include First and Last Name, Email and Password'); }
    const newPsy = new Psycologist({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password
    });
    newPsy.save((error, newPsy) => {
      if (error) return res.status(500).json({ msg: 'Error while creating new Psycologist Account', error });
      return res.status(201).json(newPsy);
    });
};

// update controller
const updatePsycologist = (req, res) => {
    if (!req.params.id) return res.status(400).json({ msg: 'Enter ID to be updated' });

    Psycologist.findByIdAndUpdate(
      req.params.id,
      {
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: req.body.password,
      },
      { new: true },
      (error, updatedPsyco) => {
        if (!updatedPsyco) return res.status(404).json({ msg: `No Psycologist found with ID: ${req.params.id}` });
        if (error) return res.status(400).json(error);
        return res.status(200).json({ msg: 'Psycologist updated!', updatedPsyco });
      },
    );
};

// delete controller
const deletePsycologist = (req, res) => {
    if (!req.params.id) return res.status(400).json({ msg: 'Enter ID to be deleted' });
    return Psycologist.findByIdAndDelete(req.params.id, (error, result) => {
      if (error) return res.status(400).json(error);
      if (result === null) return res.status(404).json({ msg: 'Psycologist ID not found' });
      return res.status(200).json({ msg: `Deleted Psycologist with ID: ${req.params.id}` });
    });
};
  


module.exports = {
    getAll,
    getById,
    getByEmail,
    createPsycologist,
    updatePsycologist,
    deletePsycologist
};