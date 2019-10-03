import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();

import Local from '../models/Local';
import Visitor from '../models/Visitor';
import Route from '../models/Route';
import Pin from '../models/Pin';
import City from '../models/City';

mongoose.set('useUnifiedTopology', true);

var mongoDbUrl = process.env.DB_CONNECT;
mongoose.connect(mongoDbUrl);

let db = mongoose.connection
db.once('open', function() {
    console.log('Connected to mongo')
});

const models = { Local, Visitor, Route, Pin, City };
export default models;