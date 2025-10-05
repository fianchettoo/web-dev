/**
 * Локализованные данные о читателях и книгах по ID и языкам.
 * @type {Object}
 */
const booksData = {
  'ivanov': {
    en: {
      name: 'Ivanov I.I.',
      books: ['Book1', 'Book2', 'Book3']
    },
    ru: {
      name: 'Иванов И.И.',
      books: ['Книга1', 'Книга2', 'Книга3']
    }
  },
  'petrov': {
    en: {
      name: 'Petrov P.P.',
      books: ['BookA', 'BookB']
    },
    ru: {
      name: 'Петров П.П.',
      books: ['КнигаA', 'КнигаB']
    }
  },
  'sidorov': {
    en: {
      name: 'Sidorov S.S.',
      books: ['BookX', 'BookY', 'BookZ']
    },
    ru: {
      name: 'Сидоров С.С.',
      books: ['КнигаX', 'КнигаY', 'КнигаZ']
    }
  }
};

module.exports = { booksData };