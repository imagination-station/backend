import mongoose from 'mongoose';


const pinSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    coordinates: [{
        type: Number
    }]
});

const Pin = mongoose.model('Pin', pinSchema);
export default Pin;