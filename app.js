var config = require('config');
var fs = require('fs');
var http = require('http');
var https = require('https');
var nunjucks = require('nunjucks');

var privateKey = fs.readFileSync('../sslcert/privkey.pem', 'utf8');
var certificate = fs.readFileSync('../sslcert/cert.pem', 'utf8');
var credentials = { key: privateKey, cert: certificate };
var express = require('express');

var app = express();
app.use(express.static('static'));

var index = require('./modules/index.js');
var wineViews = require('./modules/WineViews.js');

app.use('/', index);
app.use('/wineViews', wineViews);

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

