// NPMs
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
// Require Models
const Admins = require('./models/Admins.js');
const Users = require('./models/Users.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Morgan Logging
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

app.use(express.static('./public'));

// mongoose.connect('mongodb://localhost/nytscrape');
mongoose.connect('mongodb://');

const db = mongoose.connection;

db.on('error', function (err) {
  console.log('Mongoose Error: ', err);
});

db.once('open', function () {
  console.log('Successful mongoose connection.');
});

// Routes
// Sends everything to html
app.get('/', function(req, res){
  res.sendFile('./public/index.html');
})
// Gets Articles
app.get('/api/saved', function(req, res) {
  Article.find({})
    .exec(function(err, doc){
      if(err){
        console.log(err);
      } else {
        res.send(doc);
      }
    })
});
// Post Article
app.post('/api/saved', function(req, res){
  const newArticle = new Article({
    title: req.body.title,
    date: req.body.date,
    url: req.body.url
  });

  newArticle.save(function(err, doc){
    if(err){
      console.log(err);
      res.send(err);
    } else {
      res.json(doc);
    }
  });
});
// Delete Article
app.delete('/api/saved/:id', function(req, res){
  Article.find({'_id': req.params.id}).remove()
    .exec(function(err, doc) {
      res.send(doc);
  });
});
// Listening on Port
app.listen(PORT, function() {
  console.log("Listening on " + PORT);
});