// clients controllers
const Client = require('../models/Clients');

// get controllers
const getAll = (req, res) => {
  Client.find() // find() is from Moongose documentation
  .then((data) => res.status(200).json(data))
  .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};
  
const getById = (req, res) => {
  Client.findById(req.params.id)
  .then((ClientById) => res.json({ ClientById }))
  .catch((error) => res.status(404).json(error));
};

// create controller
const createClient = (req, res) => {
  if (!req.body.email || !req.body.company_name) { return res.status(400).send('Please include Company Name and Email'); }
  const newCo = new Client({
    company_name: req.body.company_name,
    branch: req.body.branch,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password
  });
  newCo.save((error, newCo) => {
    if (error) return res.status(500).json({ msg: 'Error while creating new Company Client', error });
    return res.status(201).json(newCo);
  });
};


// update controller
const updateClient = (req, res) => {
  if (!req.params.id) return res.status(400).json({ msg: 'Enter ID to be updated' });

  Client.findByIdAndUpdate(
    req.params.id,
    {
      email: req.body.email,
      company_name: req.body.company_name,
      branch: req.body.branch,
      phone: req.body.phone,
      password: req.body.password
    },
    { new: true },
    (error, updatedAdmin) => {
      if (!updatedAdmin) return res.status(404).json({ msg: `No Client found with ID: ${req.params.id}` });
      if (error) return res.status(400).json(error);
      return res.status(200).json({ msg: 'Cient updated!', updatedAdmin });
    },
  );
};

// delete controller
const deleteClient = (req, res) => {
  if (!req.params.id) return res.status(400).json({ msg: 'Enter ID to be deleted' });
  return Client.findByIdAndDelete(req.params.id, (error, result) => {
    if (error) return res.status(400).json(error);
    if (result === null) return res.status(404).json({ msg: 'Client ID not found' });
    return res.status(200).json({ msg: `Deleted Client with ID: ${req.params.id}` });
  });
};

module.exports = {
  getAll,
  getById,
  createClient,
  updateClient,
  deleteClient
};  