var db = require('./db.js');
var express = require('express');
var form = require('express-form');
var sql = require('./sql.js');

module.exports = function(middleware) {

  var router = express.Router();
  router.use(middleware);

  router.get('/viewAll', function(req, res) {
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

  router.get('/detail/:wineId', function(req, res){

    var wineId = req.params.wineId;

    console.log(wineId);

    var wineDetail = db.one( sql.SqlFromFile('./sql/wines/getWineDetail.sql'), { "wine_id": wineId } );
    var comments = db.many( sql.SqlFromFile('./sql/wines/getWineComments.sql'), { "wine_id": wineId } );

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

//    var wine = {
//      Name: "Angeline Cali Card",
//      Year: "9999",
//      Type: "Chardonnay",
//      Region: "California",
//      Image: "/images/WineBottles/angeline_cali_chard_14_750.png",
//      Rating: "5.2"
//    };
//
//    var comments = [
//      {
//        "Image": "/images/WineBottles/angeline_cali_chard_14_750.png",
//        "Name": "Name ONE",
//        "Comment": "ONE"
//      },
//      {
//        "Image": "/images/WineBottles/angeline_cali_chard_14_750.png",
//        "Name": "Name two",
//        "Comment": "two"
//      },
//      {
//        "Image": "/images/WineBottles/angeline_cali_chard_14_750.png",
//        "Name": "Name three",
//        "Comment": "three"
//      },
//    ];


  });

  router.get('/new', function(req, res){
      res.render('Wine/NewWine.html');
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
  return router;
};
