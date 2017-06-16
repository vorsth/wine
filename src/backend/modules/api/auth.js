var db = require('../db.js');
var express = require('express');
var sql = require('../sql.js');

module.exports = function(middleware){
  var router = express.Router();
  router.use(middleware);

  router.post('/tokensignin', function(req, res){
    var user = req.user;
    console.log(user);
    if(user != null){
      db.none( sql.SqlFromFile('users/UpsertUserLogin.sql'), user)
        .then( () => {
          console.log('USER INSERTED OR UPDATED');
          res.send(user);
      }).catch( error => {
          console.log(error);
          return sql.HandleError(res, error);
      });
    }else{
      res.send('PASS');
    }
  });

  return router;
}
