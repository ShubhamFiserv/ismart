// common module
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const keys = require('./database/db');

var corsOptions = {
    //for local deployment we need to provie API for backend server
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // For legacy browser support
}

//Model class for Payment
require('./models/Payment');

// Express app
const app = express();

//Middleware for express , one is for converting the request to json and other for cors fix on local deployment
app.use(bodyParser.json());
app.use(cors(corsOptions));

//For connecting to mongodb database, we are using the same mongoURI for local and production as well
mongoose.connect(keys.mongoURI,{useNewUrlParser: true});

//including payment Routes here with express app
require('./routes/paymentRoutes')(app);

//Code for serving client build file in production
if(process.env.NODE_ENV === 'production'){
    // Express will serve up production assets
    //like our main.js , or main.css
    app.use(express.static('client/dist/ismart'));
    
    // Express will serve up the index.html file
    // if it doesn't recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
       res.sendFile(path.resolve(__dirname, 'client', 'dist', 'ismart', 'index.html'));
    });
 }
 

const PORT = process.env.PORT || 5000;

//code to run the node app on specific port
app.listen(PORT);