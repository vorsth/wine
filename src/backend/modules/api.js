var express = require('express');

module.exports = function(middleware){
  var router = express.Router();
  router.use(middleware);

  var api_wine = require('./api/wine.js')(middleware);
  router.use('/wine', api_wine);

  var api_image = require('./api/image.js')(middleware);
  router.use('/image', api_image);

  var api_auth = require('./api/auth.js')(middleware);
  router.use('/auth', api_auth);

  return router;
}
