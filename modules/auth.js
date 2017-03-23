var express = require('express');
var db = require('./db.js');
var sql = require('./sql.js');

module.exports = function(middleware){
  'use strict';

  var app = express.Router();
  app.use(middleware);

  app.post('/tokensignin', function(req, res){
    var user = req.user;
    console.log(user);
    if(user != null){
      db.none( sql.SqlFromFile('./sql/users/UpsertUserLogin.sql'), user)
        .then( () => {
          console.log('USER INSERTED OR UPDATED');
          res.send('SUCCESS');
      }).catch( error => {
          console.log(error);
          return handleError(error);
      });
    }else{
      res.send('PASS');
    }
  });

  return app;
};

