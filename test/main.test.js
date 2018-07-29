// test/main.test.js

const assert = require('assert')
const app = require('../server/app')
const request = require('supertest')(app)

// mocha

describe('testes principais', () => {
  it('GET / should responds 200', (done) => {
    request.get('/').end((err, result) => {
      assert.equal(200, result.status)
      done()
    })
  })
  it('GET /notFound should responds 404', (done) => {
    request.get('/notFound').end((err, result) => {
      assert.equal(404, result.status)
      done()
    })
  })
})
