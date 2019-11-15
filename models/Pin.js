import mongoose from 'mongoose';


const pinSchema = new mongoose.Schema({
    type: {
        type: String,
        default: "Feature"
    },
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
        placeId: String,
        mainText: String,
        secondaryText: String,
        photoRefs: [String],
        note: String
    }
});

pinSchema.index({ "location": "2dsphere" });
const Pin = mongoose.model('Pin', pinSchema);

export default Pin;