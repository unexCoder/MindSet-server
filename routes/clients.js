// clients routes

const express = require('express');
const router = express.Router();
const clients = require('../controllers/clients');

router.get('/', clients.getAll);
router.get('/:id', clients.getById);
router.post('/create', clients.createClient);
router.put('/update/:id', clients.updateClient);
router.delete('/delete/:id', clients.deleteClient);
module.exports = router;
