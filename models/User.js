import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    bio: String,
    location: String,
    forkedRoutes: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Route' 
    }],
    likedRoutes: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Route' 
    }],
    firebaseId: String,
    tags: [String]
});

const User = mongoose.model('User', userSchema);
export default User;