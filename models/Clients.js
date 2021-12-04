// Client Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientSchema = new Schema ({
    
},{timestamps:true});

module.exports = mongoose.model('Client', ClientSchema);

