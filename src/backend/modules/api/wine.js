var db = require('../db.js');
var express = require('express');
var form = require('express-form');
var sql = require('../sql.js');

module.exports = function(middleware){
  var router = express.Router();
  router.use(middleware);

  router.get('/metadata', function(req, res){
    db.one( sql.SqlFromFile('getAllWinesCount.sql') )
      .then( results => {
        console.log(results);
        res.set('Access-Control-Allow-Origin', '*');
        return res.send(results.winecount);
      })
      .catch( error => {
        return sql.HandleError(res, error);
      });
  });

  router.get('/all', function(req, res){
    db.many( sql.SqlFromFile('getAllWinesDetail.sql') )
      .then( results => {
        console.log(results);
        res.set('Access-Control-Allow-Origin', '*');
        return res.send(results);
      })
      .catch(error => {
        return sql.HandleError(res, error);
      });
  });

  
  router.get('/:wine_id', function(req, res){
    var wineId = req.params.wine_id;

    var wineDetail = db.one( sql.SqlFromFile('wines/getWineDetail.sql'), { "wine_id": wineId } );
    var comments = db.many( sql.SqlFromFile('wines/getWineComments.sql'), { "wine_id": wineId } );

    Promise.all([wineDetail, comments]).then(function(results){
      console.log(results);
      var wineDetail = results[0];
      var comments = results[1];
      res.set('Access-Control-Allow-Origin', '*');
      res.send({
        wine: wineDetail,
        comments: comments
      });
    })
    .catch(function(error){
      console.log(error);
      res.sendStatus(500);
      return;
    });
  });

  router.post('/',
    form(
      form.filter("name").required().trim(),
      form.filter("year").required().isNumeric(),
      form.filter("type").required().trim(),
      form.filter("region").required().trim(),
      form.filter("rating").required().isNumeric(),
      form.filter("comment").required().trim()
    ),
    function(req, res){
      if(req.user == null){
        return res.sendStatus(401);
      } else {
        if (req.form.isValid) {
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
          db.none(sql.SqlFromFile('AddWine.sql'), params)
            .then( () => {
              console.log('INSERTED');
              return res.send({status: "INSERTED"});
            })
            .catch(error => {
              console.log(error);
              return sql.HandleError(res, error);
            });
        } else {
          console.log(req.form.errors);
          return res.send("404");
        }
      }
  });
  
  
  return router;
}
