// server/controller/AuthorController.js

const repository = require('../repository/AuthorRepository')

const AuthorController = {
  list(request, response, next) {
    repository.findAsync({})
      .then(result => response.json(result))
      .catch(next)
  },
  getById(request, response, next) {
    const id = request.params.id;
    repository.findByIdAsync(id)
      .then((result = []) => response.json(result[0]))
      .catch(next)
  },
  create(request, response, next) {
    const body = request.body
    repository.createAsync(body)
      .then(result => response.status(201).json(result))
      .catch(next)
  },
  update(request, response, next) {
    const body = request.body
    const id = request.params.id
    repository.updateAsync(id, body)
      .then(result => response.json(result))
      .catch(next)
  },
  delete(request, response, next) {
    const id = request.params.id
    repository.deleteAsync(id, body)
      .then(result => response.sendStatus(204))
      .catch(next)
  }
}
module.exports = AuthorController
