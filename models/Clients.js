// Client Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientSchema = new Schema ({
    id: {
        type: Number,
        required:false
    },
    company_name: {
        type: String,
        required:true
    },
    branch: {
        type: String,
        required:false
    },
    phone: {
        type: String,
        required:false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }     
},{timestamps:true});

module.exports = mongoose.model('Client', ClientSchema);

