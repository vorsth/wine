var db = require('./db.js');
var express = require('express');
var form = require('express-form');
var sql = require('./sql.js');

module.exports = function(middleware) {

  var router = express.Router();
  router.use(middleware);

  router.get('/viewAll', function(req, res) {
    db.many( sql.SqlFromFile('getAllWinesDetail.sql') )
      .then( results => {
        console.log("SUCCESS");
        console.log(results);
        res.render('Wine/ViewAllWines.html', {bottles: results} );
      })
      .catch( error => {
        console.log("ERROR");
        console.log(error);
        console.log(db);
        return sql.HandleError(res, error);
      });
  });

  router.get('/detail/:wineId', function(req, res){

    var wineId = req.params.wineId;

    console.log(wineId);

    var wineDetail = db.one( sql.SqlFromFile('wines/getWineDetail.sql'), { "wine_id": wineId } );
    var comments = db.many( sql.SqlFromFile('wines/getWineComments.sql'), { "wine_id": wineId } );

    Promise.all([wineDetail, comments]).then(function(results){
      console.log(results);
      var wineDetail = results[0];
      var comments = results[1];
      res.render('Wine/WineDetail.html', {wine: wineDetail, comments: comments});
    })
    .catch(function(error){
      console.log(error);
      res.sendStatus(500);
      return;
    });
  });

  router.get('/new', function(req, res){
    if(req.user != null){
      res.render('Wine/NewWine.html');
    }else{
      res.render('Forbidden.html', {message: "Add New Wine - Please Login Fist"});
    }
  });

  router.post('/new', 
      form(
          form.filter("name").required().trim(),
          form.filter("year").required().isNumeric(),
          form.filter("type").required().trim(),
          form.filter("region").required().trim(),
          form.filter("rating").required().isNumeric(),
          form.filter("comment").trim()
       ),
      function(req, res){
          if(req.user == null){
            res.render('Forbidden.html', {message: "Add New Wine - Please Login First"});
          }else{
            if(req.form.isValid){
              var params = {
                user: req.user.google_user_id,
                name: req.form.name,
                year: req.form.year,
                type: req.form.type,
                region: req.form.region,
                comment: req.form.comment,
                rating: req.form.rating
              };
              console.log(params);
              db.none( sql.SqlFromFile('AddWine.sql'), params )
                .then( () => {
                  console.log('INSERTED');
                  return res.redirect('/wineViews/viewAll');
                })
                .catch( error => {
                  console.log(error);
                  return sql.HandleError(res, error);
                });
            }else{
              console.log(req.form.errors);
              res.render('FormErrors.html', {errors: req.form.errors});
            }
          }
      }
  );
  return router;
};
