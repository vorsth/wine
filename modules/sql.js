var express = require('express');
var pgp = require('pg-promise')();

exports.SqlFromFile = function(file){
  return pgp.QueryFile(file, {minify: true});
}
