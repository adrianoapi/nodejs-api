// server/controller/MainController.js
const repository = require('../repository/BookRepository')

const MainController = {
  getHome(request, response, next) { //es6
    response.send('Olá Mundo')
  },
  getBooks(request, response, next) {
    repository.findAsync({})
      .then(books => {
        response.render('books', { books: books })
      })
      .catch(next)
  }
};

module.exports = MainController;
