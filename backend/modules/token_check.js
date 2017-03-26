var config = require('config');
var GoogleAuth = require('google-auth-library');

var auth = new GoogleAuth;
var client = new auth.OAuth2(config.get('GoogleClientId'), '','');

module.exports = function(options){
  var verifyToken = function(id_token, callback){
    client.verifyIdToken(
      id_token,
      config.get('GoogleClientId'),
      function(e, login){
        if(e){
          console.log(e);
          callback(null);
        } else {
          var payload = login.getPayload();
          var userid = payload['sub'];
          var user = {
            google_user_id: userid,
            image_url: payload['picture'],
            first_name: payload['given_name'],
            last_name: payload['family_name'],
            email: payload['email']
          }
          callback(user);
        }
      });
  };

  return function(req, res, next){
    if(req.cookies["google_signin_token"]){
       verifyToken(req.cookies["google_signin_token"], function(user){
         req.user = user;
         next();
       });
    }else{
      console.log("SignIn Token not available");
      req.user = null;
      next();
    }
  };
}
