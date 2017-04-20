var config = require('config');

module.exports = function(options){
    return function(req, res, next){
        console.log("setting Access Control");
        res.set('Access-Control-Allow-Origin', '*');
        next();
    }
}