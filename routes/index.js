// routes index

const express = require('express');
const router = express.Router();

const admins = require('./admins');
const clients = require('./clients');
const psycologists = require('./psycologists');
const applicants = require('./applicants');


router.use('/admins', admins);
router.use('/clients', clients);
router.use('/psycologists', psycologists);
router.use('/applicants', applicants);


module.exports = router;
