import express from 'express'
import bodyParser from 'body-parser'

const app = express();
app.use(bodyParser.json()); 

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

import models from './services/MongoConnect'

// === Top Level Route Declarations === 
import auth from './routes/auth.js';
app.use("/auth", auth);

import content from './routes/content.js';
app.use("/content", content);


app.get('/', (req, res) => res.send('Hello World!'));




