import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const ShortURLSchema = new Schema({
    originalURL: {
        type: String,
        required: true
    },
    generatedID: {
        type: String,
        required: true
    },
    shortURL: {
        type: String,
        required: true
    }
});

export const URLSchema = model('short_urls', ShortURLSchema);
