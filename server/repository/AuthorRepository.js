// server/repository/AuthorRepository.js

const db = require('../config/mysql')
const bluebird = require('bluebird')

const AuthorRepository = {
  find(query, callback) {
    db.query('SELECT * FROM author', callback)
  },
  findById(id, callback) {
    db.query('SELECT * FROM author WHERE id = ?', [id], callback)
  },
  create(data, callback) {
    const sql = `INSERT INTO author (name, birthDate, gender)
    VALUES (?, ?, ?)`;
    const params = [data.name, data.birthDate, data.gender]
    db.query(sql, params, callback)
  },
  update(id, data, callback) {
    const sql = `UPDATE author SET name=?, birthDate=?, gender=? WHERE id=?`;
    const params = [data.name, data.birthDate, data.gender, id]
    db.query(sql, params, callback)
  },
  delete(id, callback) {
    const sql = `DELETE FROM author WHERE id=?`
    db.query(sql, [id], callback)
  }
};

module.exports = bluebird.promisifyAll(AuthorRepository);
