var config = require('config');
var fs = require('fs');
var http = require('http');
var https = require('https');
var token_check = require('./modules/token_check.js');
var access_control = require('./modules/access_control.js');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var privateKey = fs.readFileSync(config.get('sslPrivateKey'), 'utf8');
var certificate = fs.readFileSync(config.get('sslCert'), 'utf8');
var credentials = { key: privateKey, cert: certificate };
var express = require('express');

var app = express();

var middleware = [
  express.static('./src/frontend'),
  express.static('./src/static'),
  express.static('./node_modules'),
  express.static('./images'),
  cookieParser(),
  bodyParser.json(),
  bodyParser.urlencoded( {extended: true} ),
  session( {
    secret: 'keyboard cat',
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: 300000 }
  }),
  access_control(),
  token_check()
];

app.use(middleware);

var api = require('./modules/api.js')(middleware);

app.use('/api', api);

app.use('*', function(req, res){
  // Passing __dirname with the path to the parent is necessary to avoid a forbidden error
  return res.sendFile('./index.html', { root: __dirname + "/../frontend" });
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


