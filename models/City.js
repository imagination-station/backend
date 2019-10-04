import mongoose from 'mongoose';


const citySchema = new mongoose.Schema({
    placeId: String,
    name:  String,
});

const City = mongoose.model('City', citySchema);
export default City;