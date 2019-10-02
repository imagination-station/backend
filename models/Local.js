import mongoose from 'mongoose';


const localSchema = new mongoose.Schema({
    name: String,
    email: String,
    location: { 
        country: {
            type: String
        }, 
        city: {
            type: String,
        }, 
    },
    savedRoutes: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Route' 
    }],
    createdRoutes: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Route' 
    }]
});

const Local = mongoose.model('Local', localSchema);
export default Local;