import mongoose from 'mongoose';


const visitorSchema = new mongoose.Schema({
    name: String,
    email: String,
    savedRoutes: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Route' 
    }],
});

const Visitor = mongoose.model('Visitor', visitorSchema);
export default Visitor;