var mysqlHelp = require('mysql_help')

/**
 * // 用户在数据库中是否已经存在
 * @param {*} username 使用账号查找
 */
async function isUserNameExist(username){
  var userTable = new mysqlHelp('user')
  const info = await userTable.getRowById(username, 'username')
  if(!info.status){
    return true
  }else{
    return false
  }
}

module.exports = { isUserNameExist }