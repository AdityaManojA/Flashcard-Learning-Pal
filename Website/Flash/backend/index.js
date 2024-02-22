const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/router');
const Q1Questions = require('./q1'); // Assuming q1.js exports the questions array

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
    "origin": "*",
    "credentials": true,
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 200
};
app.use(cors(corsOptions));

// Define route for /Q1
app.get('/q1', (req, res) => {
    res.json(q1Questions);
});

app.use('/', router);

const port = 5174;
const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});