// Psycologist Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PsycologistSchema = new Schema ({
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
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model('Psycologist', PsycologistSchema);


