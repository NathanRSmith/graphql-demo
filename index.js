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

app.get('/hello', function(req, rep) {
  rep.send('Hello World!');
});

app.post('/query', function(req, rep) {
  graphql.graphql(erm, req.body.query, {})
    .then(function(res) {
      // make any errors serializable
      if(res.errors) res.errors = _.map(res.errors, errToJSON);
      rep.status(200).json(res).end();
    })
    .catch(function(err) {
      rep.status(500).json(errToJSON(err)).end();
    });
});

function errToJSON(err) {
  return _.pick(err, ['name', 'message']);
}



// bind port
app.listen(3000, function(v) {
  console.log('listening on 3000');
});
