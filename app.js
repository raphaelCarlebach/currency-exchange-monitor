const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

//   EXPRESS
// ///////////////////////////////
const app = express();


//  BODY PARSER
// ///////////////////////////////
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CRUD 
// ///////////////////////////////
app.use(function (res, req, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType, Content-Type, Accept, Authorization");
    next();
});

// CORS
// ///////////////////////////////
app.use(cors())


//  routes 
// ///////////////////////////////
const indexRouter = require('./routes/indexRouter');
const watchedcurrency = require('./routes/watchedcurrency');
const alerts = require('./routes/alerts');

app.use('/', indexRouter);
app.use('/watchedcurrency', watchedcurrency);
app.use('/alerts', alerts);

//  PORT 
// ///////////////////////////////
var server = app.listen(process.env.PORT || 4000, function () {
    var port = server.address().port;
    console.log("app is now running on port ", port);
});

