const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const http = require('http');
const app = express();
var session = require('express-session');
var passport = require('passport');

var models_path = __dirname + '/models';
fs.readdirSync(models_path).forEach(function(file) {
    require(models_path + '/' + file);
});
//use passport session

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))


app.use(passport.initialize());
app.use(passport.session());
//bootstrap passport config
require('./config/passport')(passport);
// API file for interacting with MongoDB
const api = require('./routes/api');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, '../dist')));

// API location
app.use('/api', api);




// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/'));
});

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));