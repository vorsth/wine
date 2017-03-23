var config = require('config');
var fs = require('fs');
var http = require('http');
var https = require('https');
var nunjucks = require('nunjucks');
var token_check = require('./modules/token_check.js');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var privateKey = fs.readFileSync(config.get('sslPrivateKey'), 'utf8');
var certificate = fs.readFileSync(config.get('sslCert'), 'utf8');
var credentials = { key: privateKey, cert: certificate };
var express = require('express');

var app = express();

var middleware = [
  express.static('static'),
  cookieParser(),
  bodyParser.json(),
  bodyParser.urlencoded( {extended: true} ),
  session( {
    secret: 'keyboard cat',
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: 300000 }
  }),
  token_check()
];

app.use(middleware);

var index = require('./modules/index.js')(middleware);
var wineViews = require('./modules/WineViews.js')(middleware);
var auth = require('./modules/auth.js')(middleware);

app.use('/', index);
app.use('/wineViews', wineViews);
app.use('/auth', auth);

nunjucks.configure('templates', {
    autoescape: true,
    express: app
});

var _httpPort = config.get('Http.Port');
var _httpsPort = config.get('Https.Port');

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(_httpPort, "0.0.0.0", function(){
  console.log(`HTTP listening on port ${_httpPort}`)
});

httpsServer.listen(_httpsPort, "0.0.0.0", function(){
  console.log(`HTTPS listening on port ${_httpsPort}`)
});

