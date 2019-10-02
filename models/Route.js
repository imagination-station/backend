import mongoose from 'mongoose';


const routeSchema = new mongoose.Schema({
    name: String,
    creator: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Local'
    },
    location: { 
        country: {
            type: String
        }, 
        city: {
            type: String,
        }, 
        neighborhood: {
            type: String,
        }
    },
    pins: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Pin' 
    }],
    dateCreated: { 
        type: Date, 
        default: Date.now()
    },
    accessed: Number,
});

const Route = mongoose.model('Route', routeSchema);
export default Route;