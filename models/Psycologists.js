// Psycologist Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PsycologistSchema = new Schema ({
    
},{timestamps:true});

module.exports = mongoose.model('Psycologist', PsycologistSchema);


