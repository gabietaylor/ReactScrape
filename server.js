// NPMs
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const Article = require('./models/Article.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Morgan for Logging
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

app.use(express.static('./public'));

// localhost
mongoose.connect('mongodb://localhost/nytreact');
// Use for Heroku Deployment
// mongoose.connect('mongodb://heroku_t2wjvmwp:knd9pgbjt992ep3t6fm18ca2vd@ds149268.mlab.com:49268/heroku_t2wjvmwp');


var db = mongoose.connection;

db.on('error', function (err) {
  console.log('Mongoose Error: ', err);
});

db.once('open', function () {
  console.log('Mongoose connection successful.');
});