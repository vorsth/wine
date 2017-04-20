var config = require('config');
var express = require('express');
var pgp = require('pg-promise')();

exports.SqlFromFile = function(file){
  var fullPath = config.get('SqlPath') + file;
  return pgp.QueryFile(fullPath, {minify: true});
}

exports.HandleError = function(res, error){
  if(error instanceof pgp.errors.QueryFileError){
    return res.send('QUERY FILE ERROR');
  }
  return res.send('OTHER ERROR' + error.message);
}
