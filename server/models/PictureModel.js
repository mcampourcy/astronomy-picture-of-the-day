import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PictureSchema = new Schema({
    copyright: String,
    date: String,
    explanation: String,
    hdurl: String,
    media_type: String,
    title: String,
    url: String
});

export default mongoose.model('Picture', PictureSchema);