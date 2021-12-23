// Admin Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema ({
    id: {
        type: Number,
        required:false
    },
    first_name: {
        type: String,
        required:false
    },
    last_name: {
        type: String,
        required:false
    },
    user_name: {
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

module.exports = mongoose.model('Admin', AdminSchema);

