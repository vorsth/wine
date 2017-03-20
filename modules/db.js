var config = require('config');

var options = {

};

var pgp = require('pg-promise')(options);

var connection = config.get('PostgresqlConnection');
var db = pgp(connection);

db.handleError = function(error){
  if(error instanceof pgp.errors.QueryFileError){
    return res.send('QUERY FILE ERROR');
  }
  return res.send('OTHER ERROR');
}

module.exports = db;
