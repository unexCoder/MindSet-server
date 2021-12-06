// admins routes
const express = require('express');

const router = express.Router();
const admins = require('../controllers/admins');

router.get('/', admins.getAll);
router.get('/:id', admins.getById);
router.get('/byEmail/:email', admins.getByEmail);

router.post('/create',admins.createAdmin);
router.put('/update/:id',admins.updateAdmin);
router.delete('/delete/:id',admins.deleteAdmin);

module.exports = router;
