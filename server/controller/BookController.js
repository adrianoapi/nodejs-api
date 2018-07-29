// server/controller/BookController.js
const repository = require('../repository/BookRepository')
// JSONView
const BookController = {
  list(request, response, next) {
    let query = {}

    if (request.query.title) {
      query.title = new RegExp('^' + request.query.title, 'i')
    }
    repository.findAsync(query)
      .then(data => response.json(data))
      .catch(err => next(err))
  },
  // http://localhost:3000/api/books/5b5bb7f68f2ad7496bf2f3a3
  getById(request, response, next) {
    const _id = request.params.id;
    repository.findByIdAsync(_id)
      .then(data => response.json(data))
      .catch(next)
  },
  create(request, response, next) {
    const body = request.body
    repository.createAsync(body)
      .then(data => {
        response.status(201)
        response.json(data)
      })
      .catch(next)
  },
  update(request, response, next) {
    const _id = request.params.id
    const body = request.body

    repository.updateAsync(_id, body)
      .then(data => response.json(data))
      .catch(next)
  },
  delete(request, response, next) {
    const _id = request.params.id
    repository.deleteAsync(_id)
      .then(data => response.sendStatus(204))
      .catch(err => next(err))
  }
}

module.exports = BookController
