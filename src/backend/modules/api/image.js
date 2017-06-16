var db = require('../db.js');
var express = require('express');
var multer = require('multer');
var sql = require('../sql.js');

const path = require('path');
const fs = require('fs');

var DIR = './images/uploads/';
var diskStorage = multer.diskStorage({
  destination: DIR,
  filename: function(req, file, cb){
    var ext = path.extname(file.originalname);
    var base = path.basename(file.originalname, ext);
    cb(null, base + '-' + Date.now() + ext)
  }
});

var upload = multer({
  storage: diskStorage,
  fileFilter: function (req, file, cb) {
    // accept image only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  }
});

module.exports = function(middleware){
  var router = express.Router();
  router.use(middleware);

  router.post('/', upload.single('file'), async (req, res) => {
    try {
      console.log(req.file);
      console.log(req.body);

      // Move file to the final destination
      fs.rename(req.file.path, path.join('images','WineBottles',req.file.filename));

      var queryParams = {
        filename: req.file.filename,
        wineId: req.body.wineId
      };
      db.none( sql.SqlFromFile('images/AddImage.sql'), queryParams)
        .then( () => {
          console.log('IMAGE ADDED TO DATABASE');
          res.sendStatus(200);
        })
        .catch( error => {
          console.log('ERROR ADDING IMAGE TO DATABASE');
          console.log(error);
          return sql.HandleError(res, error);
        });
    } catch (err){
      res.sendStatus(400);
    }
  });

  return router;
};
