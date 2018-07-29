//server/route/index.js
const express = require('express')
const route = express.Router();
const MainController = require('../controller/MainController');
const BookController = require('../controller/BookController');
const AuthorController = require('../controller/AuthorController');

const UserRepository = require('../repository/UserRepository');


// /api/authors?token=42
const ensureAuth = (request, response, next) => {
  const token = request.query.token || request.headers['x-token'];
  let err = new Error('saia daqui')
  err.status = 401

  UserRepository.findTokenAsync(token)
    .then(result => {
      console.log('result', result)
      if(result) {
        return next()
      }
      next(err)
    })
    .catch(e => next(err))
}

route.get('/api/authors', ensureAuth, AuthorController.list)
route.get('/api/authors/:id', ensureAuth, AuthorController.getById)
route.post('/api/authors', ensureAuth, AuthorController.create)
route.put('/api/authors/:id', ensureAuth, AuthorController.update)
route.delete('/api/authors/:id', ensureAuth, AuthorController.delete)


route.get('/', MainController.getHome);
route.get('/books', MainController.getBooks);

route.get('/api/books', BookController.list)
route.get('/api/books/:id', BookController.getById)
route.post('/api/books', BookController.create)
route.put('/api/books/:id', BookController.update)
route.delete('/api/books/:id', BookController.delete)
module.exports = route;
