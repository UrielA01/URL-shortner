import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/short_urls').then(() => console.log("Connected to mongoDB")).catch((err) => console.error(err))
