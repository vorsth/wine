var bodyParser = require('body-parser');
var config = require('config');
var express = require('express');
var form = require('express-form');
var nunjucks = require('nunjucks');
var pgp = require('pg-promise')();

var app = express();
app.use(express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var connection = config.get('PostgresqlConnection');
var db = pgp(connection);

nunjucks.configure('templates', {
    autoescape: true,
    express: app
});

app.get('/statuscheck', function(req, res){
  console.log('statuscheck');
  res.send('SUCCESS');
});

app.get('/', function(req, res) {
  db.one( sql('./sql/getAllWinesCount.sql') )
    .then( results => {
      console.log(results);
      return res.render('index.html', { bottleCount: results.winecount } );
    })
    .catch( error => {
      return handleError(error);
    });
});

app.get('/viewAllWines', function(req, res) {
  db.many( sql('./sql/getAllWinesDetail.sql') )
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

app.get('/newWine', function(req, res){
    res.render('Wine/NewWine.html');
});

app.get('/repo', function(req, res){
  
});

app.post('/newWine', 
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
          db.none( sql('./sql/AddWine.sql'), params )
            .then( () => {
              console.log('INSERTED');
              return res.redirect('/viewAllWines');
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

function sql(file){
  return pgp.QueryFile(file, {minify: true});
}

function handleError(error){
  if(error instanceof pgp.errors.QueryFileError){
    return res.send('QUERY FILE ERROR');
  }
  return res.send('OTHER ERROR');
}

var _port = config.get('Http.Port');
app.listen(_port, "0.0.0.0"
, function(){
    console.log(`App listening on port ${_port}`)
});
