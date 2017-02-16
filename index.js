var _ = require('lodash');
var Promise = require('bluebird');
var express = require('express');
var bodyParser = require('body-parser');
var bunyanLogger = require('express-bunyan-logger');
var graphql = require('graphql');

var erm = require('./erm');


var app = express();

// bind routes
app.use(bunyanLogger({logger: this.logger, excludes: ['req','res', 'user-agent'], obfuscate: ['body.password']}));
app.use(bodyParser.json({limit:'1mb'})); // for application/json

app.get('/hello', function(req, res) {
  res.send('Hello World!');
});




// bind port
app.listen(3000, function(v) {
  console.log('listening on 3000');
});
