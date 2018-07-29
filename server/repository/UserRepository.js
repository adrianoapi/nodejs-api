
const bluebird = require('bluebird');
const db = require('../config/mongo')

const UserRepository = {
  findToken(token, callback) {
    db.collection('users').findOne({ base64: token }, callback)
  }
}


module.exports = bluebird.promisifyAll(UserRepository)
