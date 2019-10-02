import mongoose from 'mongoose';

import Local from '../models/Local';
import Visitor from '../models/Visitor';
import Route from '../models/Route';
import Pin from '../models/Pin';


var mongoDbUrl = 'mongodb://127.0.0.1/my_database';
const connectDb = () => {
  return mongoose.connect(mongoDbUrl);
};

const models = { Local, Visitor, Route, Pin };

export { connectDb };
export default models;