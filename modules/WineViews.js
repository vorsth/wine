var bodyParser = require('body-parser');
var config = require('config');
var db = require('./db.js');
var express = require('express');
var form = require('express-form');
var sql = require('./sql.js');

module.exports = ( function() {
  'use strict';

  var app = express.Router();

  app.use(express.static('static'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  app.get('/viewAll', function(req, res) {
    db.many( sql.SqlFromFile('./sql/getAllWinesDetail.sql') )
      .then( results => {
        console.log("SUCCESS");
        console.log(results);
        res.render('Wine/ViewAllWines.html', {bottles: results} );
      })
      .catch( error => {
        console.log("ERROR");
        console.log(error);
        return handleError(error);
      });
  });

  app.get('/new', function(req, res){
      res.render('Wine/NewWine.html');
  });

  app.post('/new', 
      form(
          form.filter("name").required().trim(),
          form.filter("year").required().isNumeric(),
          form.filter("type").required().trim(),
          form.filter("region").required().trim(),
          form.filter("rating").required().isNumeric(),
          form.filter("comment").trim()
       ),
      function(req, res){
          console.log(req.form);
          if(req.form.isValid){
            var params = {
              name: req.form.name,
              year: req.form.year,
              type: req.form.type,
              region: req.form.region,
              comment: req.form.comment,
              rating: req.form.rating
            };
            console.log(params);
            db.none( sql.SqlFromFile('./sql/AddWine.sql'), params )
              .then( () => {
                console.log('INSERTED');
                return res.redirect('/wineViews/viewAll');
              })
              .catch( error => {
                console.log(error);
                return handleError(error);
              });
          }else{
              res.send("INVALID ENTRIES, TRY AGAIN");
          }
      }
  );


  return app;

})();
