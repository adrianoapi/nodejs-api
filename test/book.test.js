// test/book.test.js

const assert = require('assert')
const app = require('../server/app')
const request = require('supertest')(app)
const repository = require('../server/repository/BookRepository')

describe('Book CRUD', () => {
  let id;
  beforeEach(done => {
    const book = { title: 'O Senhor dos Anéis' };
    repository.create(book, (err, data) => {
      id = String(data._id);
      done()
    })
  })
  afterEach(done => {
    repository.delete(id, done)
  })

  it('GET /api/books should list', (done) => {
    request.get('/api/books')
      .end((err, result) => {
        assert.equal(200, result.status)
        assert.ok(result.body.length)
        console.log(result.body)
        done()
      })
  })

  it('GET /api/books/:id should get one book', (done) => {
    // request.get('/api/books/' + id)
    request.get(`/api/books/${id}`)
      .end((err, result) => {
        assert.equal(200, result.status)
        assert.equal(result.body.title, 'O Senhor dos Anéis')
        done()
      })
  })

  it('POST /api/books should create a new book', (done) => {
    const book = { title: 'A história sem fim'}
    request
      .post('/api/books')
      .send(book)
      .end((err, result) => {
        assert.equal(201, result.status)
        assert.equal(result.body.title, 'A história sem fim')
        done()
      })
  })

  it('PUT /api/books/:id', () => {
    const book = { pages: 156 }
    return request
      .put(`/api/books/${id}`)
      .send(book)
      .then(result => {
        assert.equal(200, result.status)
        return repository.findByIdAsync(id)
      })
      .then(result => {
        assert.equal(156, result.pages);
        assert.equal('O Senhor dos Anéis', result.title);
      })
  })

  it('DELETE /api/books/:id', () => {
    return request
      .delete(`/api/books/${id}`)
      .then(result => {
        assert.equal(result.status, 204)
      })
  })
})
