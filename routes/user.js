// @ts-nocheck
var express = require('express');
var router = express.Router();
var mysql_help = require('mysql_help')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('user', {data: 'user'});
});

router.post('/', async function(req, res, next) {
  let userTable = new mysql_help('user')
  const result = await userTable.getRowsByPage(pageNum, everyPageNum, orderfield, wherefield)
});


module.exports = router;
