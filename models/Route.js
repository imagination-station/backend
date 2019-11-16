import mongoose from 'mongoose';


const routeSchema = new mongoose.Schema({
    name: String,
    creator: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Local'
    },
    city: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'City'
    },
    pins: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Pin' 
    }],
    dateCreated: { 
        type: Date, 
        default: Date.now()
    },
    accessed: {
        type: Number,
        default: 0
    },
    access: {
        type: String,
        enum: ['private', 'public'],
        default: 'public'
    },
    numLikes: {
        type: Number,
        default: 0
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Route',
        default : null
    },
    tags: {
        type: [String],
    },
    startPoint: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
            default: "Point"
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});

routeSchema.index({ "location": "2dsphere" });
const Route = mongoose.model('Route', routeSchema);
export default Route;