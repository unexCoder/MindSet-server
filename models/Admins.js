// Admin Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema ({
    
},{timestamps:true});

module.exports = mongoose.model('Admin', AdminSchema);

