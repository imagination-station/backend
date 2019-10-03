import mongoose from 'mongoose';


const bpSchema = new mongoose.Schema({
    name: String,
    email: String,
});

const BoilerPlate = mongoose.model('BoilerPlate', bpSchema);
export default BoilerPlate;