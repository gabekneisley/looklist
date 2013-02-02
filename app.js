//dependencies
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var less = require('less-middleware');

var app = express();

app.configure(function () {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.logger('dev'));
  
  //code to properly use bootstrap
  var bootstrapPath = path.join(__dirname, 'node_modules', 'bootstrap');
  
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use('/img', express.static(path.join(bootstrapPath, 'img')));
  app.use(app.router);
  
  //set up less to auto-compile
  app.use(less({
    src: path.join(__dirname, 'assets', 'less'),
    paths: [path.join(bootstrapPath, 'less')],
    dest: path.join(__dirname, 'public', 'stylesheets'),
    prefix: '/stylesheets'
  }));
  
  app.use(express.static(path.join(__dirname, 'public')));
});

//set up the welcome content
app.get('/', function(req, res) {
  res.render('landing', {
    //put context variables here
  })
});

var port = process.env.PORT || 3000;

app.listen(port);
console.log('Listening on port ' + port);