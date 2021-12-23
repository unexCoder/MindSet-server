// psycologists routes

const express = require('express');
const router = express.Router();
const psycologists = require('../controllers/psycologists');

router.get('/', psycologists.getAll);
router.get('/:id', psycologists.getById);
router.get('/byEmail/:email', psycologists.getByEmail);
router.post('/create', psycologists.createPsycologist);
router.put('/update/:id', psycologists.updatePsycologist);
router.delete('/delete/:id', psycologists.deletePsycologist);
module.exports = router;
