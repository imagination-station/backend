import mongoose from 'mongoose';


const pinSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    coordinates: [{
        type: Number
    }],
    description: String
});

const Pin = mongoose.model('Pin', pinSchema);
export default Pin;