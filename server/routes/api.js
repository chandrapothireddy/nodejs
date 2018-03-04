const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
var mongoose = require('mongoose');
var passport = require('passport');
var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } }; 
mongoose.Promise = global.Promise;      
mongoose.connect("mongodb://localhost/mean", options);
var db = mongoose.connection;             
 
 
 
db.on('error', console.error.bind(console, 'connection error:'));  



// Get users
var users = require('../controllers/users');
router.get('/users',  users.all);
router.post('/createusers', users.create);
router.post('/loginuser', function(req, res, next) {
    // here we fun a function which calls another function... this gives us access to req, res, and next
    // however there must be a cleaner way to do this
    // @todo refactor
    users.signin(req, res, next, passport);
});

module.exports = router;