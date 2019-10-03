import express from 'express'
import bodyParser from 'body-parser'

const app = express();
app.use(bodyParser.json()); 

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

import models from './services/MongoConnect'

// === Top Level Route Declarations === 
import users from './routes/Users';
app.use("/users", users);

import content from './routes/Content.js';
app.use("/content", content);


app.get('/', (req, res) => res.send('Hello World!'));




