var express = require('express');
var proxy = require('express-http-proxy');
var sql = require('seriate');
var app = express();
var nunjucks = require('nunjucks');

var config = {
    'server': 'localhost',
    'user': 'hans',
    'password': '1T5qpn00',
    'database': 'Wine'
};
sql.setDefaultConfig( config );

nunjucks.configure('templates', {
    autoescape: true,
    express: app
});


app.use(express.static('static'));

app.get('/', function(req, res) {
    sql.execute( {
            query: sql.fromFile('./sql/getAllWinesCount')
        }).then( function( results ) {
            console.log(results);
            return res.render('index.html', { bottleCount: results[0].WineCount } );
        }, function( err ){
            console.log("Something bad happened:", err);
            res.send("ERROR");
        });
});

app.get('/viewAllWines', function(req, res) {
    sql.execute( {
            query: sql.fromFile('./sql/getAllWinesDetail.sql')
        }).then( function( results ){
            console.log(results);
            res.render('viewAllWines.html', {bottles: results} );
        }, function( err ){
            console.log("Something bad happened:", err);
            res.send("ERROR");
        });
});

app.get('/newWine', function(req, res){
    res.render('newWine.html');
});

app.listen(5001, function(){
    console.log("App listening on port 5001")
});
