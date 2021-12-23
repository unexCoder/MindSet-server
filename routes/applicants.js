// applicants routes
const express = require('express');

const router = express.Router();
const applicants = require('../controllers/applicants');

router.get('/', applicants.getAll);
router.get('/:id', applicants.getById);
router.get('/byEmail/:email', applicants.getByEmail);

router.post('/create',applicants.createApplicant);
router.put('/update/:id',applicants.updateApplicant);
router.delete('/delete/:id',applicants.deleteApplicant);

module.exports = router;
