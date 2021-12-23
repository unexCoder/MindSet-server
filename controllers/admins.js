// admins controllers
const Admin = require('../models/Admins');

// get controllers
const getAll = (req, res) => {
  Admin.find() // find() is from Moongose documentation
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

const getById = (req, res) => {
  Admin.findById(req.params.id)
    .then((AdminById) => res.json({ AdminById }))
    .catch((error) => res.status(404).json(error));
};
const getByEmail = (req, res) => {
  Admin.find({ email: req.params.email })
    .then((AdminByEmail) => res.json({ AdminByEmail }))
    .catch((error) => res.status(404).json(error));
};

// create controllers
const createAdmin = (req,res) => {
  if (!req.body.email || !req.body.password) { return res.status(400).send('Please include Email and Password'); }
  const newAdmin = new Admin({
    email: req.body.email,
    password: req.body.password,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    user_name: req.body.user_name
  });
  newAdmin.save((error, newAdmin) => {
    if (error) return res.status(500).json({ msg: 'Error while creating new Administrator account', error });
    return res.status(201).json(newAdmin);
  });
};
// update controllers
const updateAdmin = (req,res) => {
  if (!req.params.id) return res.status(400).json({ msg: 'Enter ID to be updated' });

  Admin.findByIdAndUpdate(
    req.params.id,
    {
      email: req.body.email,
      password: req.body.password,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      user_name: req.body.user_name
    },
    { new: true },
    (error, updatedAdmin) => {
      if (!updatedAdmin) return res.status(404).json({ msg: `No Admin found with ID: ${req.params.id}` });
      if (error) return res.status(400).json(error);
      return res.status(200).json({ msg: 'Admin updated!', updatedAdmin });
    },
  );
};

// delete controllers
const deleteAdmin = (req,res) => {
  if (!req.params.id) return res.status(400).json({ msg: 'Enter ID to be deleted' });
  return Admin.findByIdAndDelete(req.params.id, (error, result) => {
    if (error) return res.status(400).json(error);
    if (result === null) return res.status(404).json({ msg: 'Admin ID not found' });
    return res.status(200).json({ msg: `Deleted Admin with ID: ${req.params.id}` });
  });
};


module.exports = {
  getAll,
  getById,
  getByEmail,
  createAdmin,
  updateAdmin,
  deleteAdmin
};