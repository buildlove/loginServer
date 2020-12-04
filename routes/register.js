var express = require('express');
var router = express.Router();
var mysql_help = require('mysql_help')
var { aesDecrypt } = require('../utils/crypto');
var { uuid } = require('../utils/index');
var { isUserNameExist } = require('../utils/auth');
var Mail = require('../utils/email_info');

/* GET users listing. */
router.post('/', async function(req, res, next) {
  let { publickey } = req.headers
  let { username, password } = req.body
  // console.log(req.headers)
  const showPassWord = aesDecrypt(password, publickey)
  if(username && showPassWord){
    // console.log(showPassWord)
    let userTable = new mysql_help('user')
    let userInfo = {
      userid: uuid(), 
      username, 
      password: showPassWord, 
      authorized: 0,
      create_time: new Date().getTime()
    }
    const result = await userTable.addRow(userInfo)
    if(result.status){
      const userIsExist = await isUserNameExist(username)

      if(userIsExist){
        Mail.sendMail({// 发送邮件
          id: userInfo.userid,
          username
        })
        res.json({code: 1, message: '注册成功, 请到邮箱中点击链接激活账号然后登陆'});
      }else{
        res.json({code: 1, message: '用户已经存在, 请到邮箱中点击链接激活账号或直接登录'});
      }
    }
  }else{
    res.json({code: 0, message: '刷新页面后重新注册'});
  }
});

module.exports = router;
