const connection = require('./../inc/db');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  connection.query("SELECT * FROM tb_users ORDER BY name", (error, result) =>{
    if(error){
      res.send(error);
    }else{
      res.send(result);
    }
  });
});

module.exports = router;
