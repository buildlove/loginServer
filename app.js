// @ts-nocheck
var createError = require('http-errors');
var express = require('express');
var ejs = require('ejs');
var path = require('path');
var cookieParser = require('cookie-parser');
var session=require("express-session");
var logger = require('morgan');
var mysql_help = require('mysql_help')

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var userRouter = require('./routes/user');
var emailRouter = require('./routes/email');

var app = express();

mysql_help.config({
  "mysql": {
    "host": "127.0.0.1",
    "port": "3306",
    "user": "root",
    "password": "Lixiaoqi2468",
    "database": 'jobs',
    "env": "dev" //"prod"
  }
}, (newCf)=> {

})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.__express);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.mysqlHelp = mysql_help
  next();
});

// express中是把session信息存储在内存中
// 配置session
app.use(session({
  secret:"dsafsafsf", //设置签名秘钥 内容可以任意填写
  cookie:{ maxAge:80*1000 }, //设置cookie的过期时间，例：80s后    session和相应的cookie失效过期
  resave:true, //强制保存，如果session没有被修改也要重新保存
  saveUninitialized:false //如果原先没有session那么久设置，否则不设置
}))


app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/user', userRouter);
app.use('/email', emailRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
