// applicants controllers
const Applicant = require('../models/Applicants');

// get controllers
const getAll = (req, res) => {
    Applicant.find() // find() is from Moongose documentation
      .then((data) => res.status(200).json(data))
      .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
  };
  
  const getById = (req, res) => {
    Applicant.findById(req.params.id)
      .then((ApplicantById) => res.json({ ApplicantById }))
      .catch((error) => res.status(404).json(error));
  };
  const getByEmail = (req, res) => {
    Applicant.find({ email: req.params.email })
      .then((applicantByEmail) => res.json({ applicantByEmail }))
      .catch((error) => res.status(404).json(error));
  };
  
  // create controllers
  const createApplicant = (req,res) => {
    if (!req.body.email || !req.body.password || !req.body.first_name || !req.body.last_name) { return res.status(400).send('Please include First and Last Name,Email and Password'); }
    const newApply = new Applicant({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      user_name: req.body.user_name,
      street: req.body.street,
      street_number: req.body.street_number,
      city: req.body.city,
      postal_code: req.body.postal_code,
      state: req.body.state,
      country: req.body.country,
      phone: req.body.phone,
      experience: req.body.experience
    });
    newApply.save((error, newApply) => {
      if (error) return res.status(500).json({ msg: 'Error while creating new account', error });
      return res.status(201).json(newApply);
    });
  };

  // update controllers
  const updateApplicant = (req,res) => {
    if (!req.params.id) return res.status(400).json({ msg: 'Enter ID to be updated' });
  
    Applicant.findByIdAndUpdate(
      req.params.id,
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        user_name: req.body.user_name,
        street: req.body.street,
        street_number: req.body.street_number,
        city: req.body.city,
        postal_code: req.body.postal_code,
        state: req.body.state,
        country: req.body.country,
        phone: req.body.phone,
        experience: req.body.experience      },
      { new: true },
      (error, updatedApply) => {
        if (!updatedApply) return res.status(404).json({ msg: `No User found with ID: ${req.params.id}` });
        if (error) return res.status(400).json(error);
        return res.status(200).json({ msg: 'User updated!', updatedApply });
      },
    );
  };
  
  // delete controllers
  const deleteApplicant = (req,res) => {
    if (!req.params.id) return res.status(400).json({ msg: 'Enter ID to be deleted' });
    return Applicant.findByIdAndDelete(req.params.id, (error, result) => {
      if (error) return res.status(400).json(error);
      if (result === null) return res.status(404).json({ msg: 'User ID not found' });
      return res.status(200).json({ msg: `Deleted User with ID: ${req.params.id}` });
    });
  };

module.exports = {
    getAll,
    getById,
    getByEmail,
    createApplicant,
    updateApplicant,
    deleteApplicant
  };