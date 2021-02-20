// common module
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const keys = require('./database/db');

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // For legacy browser support
}

require('./models/Payment');


const app = express();

app.use(bodyParser.json());
app.use(cors(corsOptions));


mongoose.connect(keys.mongoURI,{useNewUrlParser: true});

require('./routes/paymentRoutes')(app);

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

app.listen(PORT);