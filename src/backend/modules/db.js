var config = require('config');

var options = {
};

var pgp = require('pg-promise')(options);

var connection = config.get('PostgresqlConnection');
var db = pgp(connection);

module.exports = db;
