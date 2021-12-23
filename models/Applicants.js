// applicants Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApplicantSchema = new Schema ({
    id: {
        type: Number,
        required:false
    },
    first_name: {
        type: String,
        required:true
    },
    last_name: {
        type: String,
        required:true
    },
    user_name: {
        type: String,
        required:false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required:true
    },
    street: {
        type: String,
        required:false
    },
    street_number: {
        type: Number,
        required:false
    },
    city: {
        type: String,
        required:false
    },
    postal_code: {
        type: String,
        required:false
    },
    state: {
        type: String,
        required:false
    },
    country: {
        type: String,
        required:false
    },
    phone: {
        type: Number,
        required:false
    },
    experience: {
        job_position: String,
        employer: String,
        start_date: String,
        end_date: String,
        description: String
    }
    
    
},{timestamps:true});

module.exports = mongoose.model('Applicant', ApplicantSchema);

