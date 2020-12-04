const nodemailer = require("nodemailer");
const config = require('./config.js')

async function sendMailFun(params){
  // smtp配置信息
  let transporter = nodemailer.createTransport(config);
  // 发送邮件
  try {
    let info = await transporter.sendMail({
      from: `<${config.auth.user}>`, // sender address
      to: params.username, // list of receivers
      subject: '激活邮件', // Subject line
      // text: data, // plain text body
      text: 'http://localhost:5000/email/activateTheAccount?id=' + params.id.trim() // html body
    });

    console.log("Message sent: %s", info);
  }catch(err){
    console.log(err)
  }
}

module.exports = {
  sendMail: sendMailFun
}