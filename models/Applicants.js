// applicants Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApplicantSchema = new Schema ({
    
},{timestamps:true});

module.exports = mongoose.model('Applicant', ApplicantSchema);

