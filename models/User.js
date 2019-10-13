import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    bio: String,
    location: String,
    bookmarkedRoutes: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Route' 
    }],
});

const User = mongoose.model('User', userSchema);
export default User;