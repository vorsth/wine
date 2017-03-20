var express = require('express');
var db = require('./db.js');
var sql = require('./sql.js');

module.exports = ( function() {

  'use strict';

  var app = express.Router();

  app.get('/statuscheck', function(req, res){
    console.log('statuscheck');
    res.send('SUCCESS');
  });
  
  app.get('/', function(req, res) {
    db.one( sql.SqlFromFile('./sql/getAllWinesCount.sql') )
      .then( results => {
        console.log(results);
        return res.render('index.html', { bottleCount: results.winecount } );
      })
      .catch( error => {
        return db.handleError(error);
      });
  });

  return app;

})();
