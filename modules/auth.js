var express = require('express');
var bodyParser = require('body-parser');
var config = require('config');
var GoogleAuth = require('google-auth-library');
var db = require('./db.js');
var sql = require('./sql.js');

var auth = new GoogleAuth;
var client = new auth.OAuth2(config.get('GoogleClientId'), '','');

module.exports = ( function(){
  'use strict';

  var app = express.Router();
  app.use(bodyParser.urlencoded({extended: true}));

  app.post('/tokensignin', function(req, res){
    client.verifyIdToken(
      req.body.idtoken,
      config.get('GoogleClientId'),
      function(e, login){
        var payload = login.getPayload();
        var userid = payload['sub'];
        var params = {
          google_user_id: userid,
          image_url: payload['picture'],
          first_name: payload['given_name'],
          last_name: payload['family_name'],
          email: payload['email']
        }
        db.none( sql.SqlFromFile('./sql/users/UpsertUserLogin.sql'), params)
          .then( () => {
            console.log('USER INSERTED OR UPDATED');
            return res.send(userid);
          })
          .catch( error => {
            console.log(error);
            return handleError(error);
          });
      });
  });

  return app;
})();
