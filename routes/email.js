var express = require('express');
var router = express.Router();
var mysqlHelp = require('mysql_help')

router.get('/activateTheAccount', async function(req, res, next) {
  console.log(res.mysqlHelp)

  const userTable = new mysqlHelp('user')

  if(req.query.id){
    const info = await userTable.getRowById(req.query.id)
    if(info.status && info.result && info.result.authorized === '0'){
      await userTable.updateRow({userid: req.query.id, authorized: '1'})
      res.redirect('/login')
    }else{
      res.send('账户不存在或者已经激活')
    }
  }else{
    res.send('激活账户失败')
  }
});

module.exports = router;