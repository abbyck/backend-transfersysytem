const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const morganBody = require('morgan-body');

// DB connection
mongoose.connect(
    'mongodb+srv://admin:' +
        process.env.MONGO_PW +
        '@cluster0-4fxo4.mongodb.net/test?retryWrites=true',
    { useNewUrlParser: true, useCreateIndex: true },
    err => {
        if (err) {
            console.log('DB: Connection Error:' + err);
        }
        console.log('DB: Connected Successfully');
    }
);

mongoose.set('useCreateIndex', true);

morganBody(app);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header(
            'Access-Control-Allow-Methods',
            'PUT, POST, PATCH, DELETE, GET'
        );
        return res.status(200).json({});
    }
    next();
});

app.use('/', require('./api/routes'));

module.exports = app;
