import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/short_urls').then(() => console.log("Connect to mongoDB")).catch((err) => console.log(err))
