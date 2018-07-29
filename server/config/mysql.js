// server/config/mysql.js

const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'mysql524.umbler.com',
  port     : 41890,
  user     : 'livro',
  password : 'livro123',
  database : 'livraria'
});

connection.connect();
connection.on('error', (err) => {
  console.log(err.code); // 'ER_BAD_DB_ERROR'
});

module.exports = connection;
