var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('index', { title: '主页' });
});

router.get('/login', function(req, res) {
  res.render('login', { data: 'login' });
});

module.exports = router;
