// @ts-nocheck
var express = require('express');
var vCode = require('svg-captcha');
var { aesEncrypt, aesDecrypt } = require('../utils/crypto');
var router = express.Router();
var btoa = require('btoa');
var mysql_help = require('mysql_help')

// session
// [{
//   publicKey: 'U2FsdGVkX191EKXu5VlHzco7h2p+iUjkSVQAxikFZJVB/sqCf6x9rtqIW4XG8btO',
//   verifyCode: '106852',
//   createTime: ''
// }]

// publicKey
router.get('/getPublicKey', function(req, res, next) {
  const key = req.headers['user-agent']
  const publicKey = aesEncrypt(key)
  if(!req.session.loginInfo){
    req.session.loginInfo = {}
  }
  req.session.loginInfo[publicKey] = ''
  res.json({
    "code": 1,
    "message": "成功",
    "data": {
      publicKey: publicKey
    }
  });
});


// 验证码
router.get('/sendVerifyCode', function(req, res, next) {
  // console.log(req.headers)
  let { publickey } = req.headers
  const captcha = vCode.create({ fontSize: 50, width: 100 }); // {data: '', text: ''}
  if(!req.session.loginInfo){
    req.session.loginInfo = {}
  }
  req.session.loginInfo[publickey] = captcha.text.toLocaleLowerCase() // text 缓存到 session 用于验证
  // console.log(req.session.loginInfo)
  const base64 = 'data:image/svg+xml;base64,'+ btoa(captcha.data);
  // console.log(blob)
  res.json({
    "code": 1,
    "message": "成功",
    "data": {
      img: base64,
      timestamp: new Date().getTime()
    }
  });
});

// 登陆
router.post('/', async function(req, res, next) {
  let {
    username,
    password,
    verifyCode
  } = req.body
  let result = {code: 0, message: '', data: null}
  let publicKey = ''
  // console.log('session', req.session)
  const loginInfo = req.session && req.session.loginInfo ?Object.keys(req.session.loginInfo):{}
  loginInfo.forEach((code) => {
    if(req.session.loginInfo[code] === verifyCode.toLocaleLowerCase()) publicKey = code
  })
  if(!publicKey){
    if(req.session && typeof req.session.loginInfo !== 'object'){
      result.message = '没有获取到公共key, 请刷新页面'
    }else{
      result.message = '验证码输入错误'
    }
    res.json(result)
  }else{
    const showPassWord = aesDecrypt(password, publicKey)
    // console.log('loginInfo', loginInfo)
    // console.log('publicKey', publicKey)
    // console.log('密码:', showPassWord)
    let userTable = new mysql_help('user')
    try{
      let info = await userTable.getRowsByWhere({username, password: showPassWord})
      if(info.status){
        let userInfo = info.result[0]
        const tokenString = userInfo.userid+'_'+userInfo.username+'_'+userInfo.create_time
        res.json({code: 1, message: '登陆成功', data: {
          userId: userInfo.userid,
          token: aesEncrypt(tokenString)
        }})
      }else{
        res.json({code: 0, message: '账号密码输入错误, 或状态为无效用户'})
      }
    }catch(err) {
      res.json({code: 0, message: '账号密码输入错误, 或状态为无效用户'})
    }
  }

});


module.exports = router;