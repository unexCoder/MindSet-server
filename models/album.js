const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const albumSchema = new Schema ({
    title: {
        type: String,
        required:true
    },
    year: {
        type: Number,
        required:true
    },
    genre: {
        type: String,
        required:true
    },
    style: {
        type: [String],
        required: false
    },
    type: {
        type: String,
        required:false
    }
},{timestamps:true});

const Album = mongoose.model('Album',albumSchema);
module.exports = Album;