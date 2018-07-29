// server/config/mongo.js

const mongojs = require('mongojs')
const NODE_ENV = process.env.NODE_ENV;
let mongoConnection;

/* istanbul ignore else */
if (NODE_ENV === 'test') {
  mongoConnection = 'localhost/livraria-test'
} else {
  mongoConnection = 'localhost/livraria';
}
const db = mongojs(mongoConnection)

/* istanbul ignore next */
db.on('error', (err) => {
  console.log(err)
})

module.exports = db
