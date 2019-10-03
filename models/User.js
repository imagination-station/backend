import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    location: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'City'
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

const User = mongoose.model('User', userSchema);
export default User;