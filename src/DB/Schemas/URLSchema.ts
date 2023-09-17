import mongoose from 'mongoose';

const ShortURL = new mongoose.Schema({
    originalURL: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    generatedID: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    shortURL: {
        type: mongoose.SchemaTypes.String,
        required: true
    }
});

module.exports = mongoose.model('shortUrl', ShortURL)