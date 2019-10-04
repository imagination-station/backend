import mongoose from 'mongoose';


const pinSchema = new mongoose.Schema({
    type: {
        type: String,
        default: "Feature"
    },
    placeId: String,
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    properties: {
        mainText: String,
        secondaryText: String,
        imageUrl: String,
        note: String
    }
});

const Pin = mongoose.model('Pin', pinSchema);
export default Pin;