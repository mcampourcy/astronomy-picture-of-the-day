const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PictureSchema = new Schema({
    copyright: String,
    date: String,
    explanation: String,
    hdurl: String,
    media_type: String,
    slug: String,
    title: String,
    url: String
});

module.exports = mongoose.model('Picture', PictureSchema);