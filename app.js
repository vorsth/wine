var express = require('express');
var form = require('express-form');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var sql = require('seriate');

var app = express();
app.use(express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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
            res.render('Wine/ViewAllWines.html', {bottles: results} );
        }, function( err ){
            console.log("Something bad happened:", err);
            res.send("ERROR");
        });
});

app.get('/newWine', function(req, res){
    res.render('Wine/NewWine.html');
});

app.post('/newWine', 
    form(
        form.filter("name").required().trim(),
        form.filter("year").required().isNumeric(),
        form.filter("type").required().trim(),
        form.filter("region").required().trim(),
        form.filter("rating").required().isNumeric()
     ),
    function(req, res){
        console.log(req.form);
        if(req.form.isValid){
            sql.execute( {
                query: sql.fromFile('./sql/AddWine.sql'),
                params: {
                    Name: {type: sql.VARCHAR, val: req.form.name },
                    Year: {type: sql.INT, val: req.form.year },
                    Type: {type: sql.VARCHAR, val: req.form.type },
                    Region: {type: sql.VARCHAR, val: req.form.region },
                    Comments: {type: sql.VARCHAR, val: req.form.comments },
                    Rating: { type: sql.TINYINT, val: req.form.rating }
                }
            }).then( function( results ){
                console.log(results);
                res.render('Wine/ViewAllWines.html', {bottles: results})
            }, function( err ){
                console.log("Something bad happened on insert");
                res.send("ERROR");
            });
        }else{
            res.send("INVALID ENTRIES, TRY AGAIN");
        }
    }
);

var _port = 5000;
app.listen(_port, function(){
    console.log(`App listening on port ${_port}`)
});
