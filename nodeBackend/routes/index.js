var express = require('express');
var router = express.Router();

router.get('/table', async function(req, res, next) { 
    res.json("hello");
  });

  module.exports = router;