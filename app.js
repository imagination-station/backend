import express from 'express'
import bodyParser from 'body-parser'

const app = express();
app.use(bodyParser.json());

import models from './services/MongoConnect'

// === Top Level Route Declarations ===
import users from './routes/Users';
app.use("/users", users);

import cities from './routes/Cities';
app.use("/cities", cities);


app.get('/', (req, res) => res.send('Hello World!'));

// Setting port to be set by env var, for Heroku
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on port ${port}!`));
