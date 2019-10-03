import mongoose from 'mongoose';


const citySchema = new mongoose.Schema({
    name:  String,
    state: String,
    country: String,
});

const City = mongoose.model('City', citySchema);
export default City;