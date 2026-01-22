jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn()
  }
}));

jest.mock('../utils/translations', () => ({
  getTranslation: jest.fn(),
  getLanguage: jest.fn(),
  interpolate: jest.fn()
}));

jest.mock('../data/booksData', () => ({
  booksData: {
    ivanov: {
      en: {
        name: 'Ivanov I.I.',
        books: ['Book1', 'Book2']
      }
    }
  }
}));

const fs = require('fs').promises;
const translations = require('../utils/translations');
const { createResponse } = require('./_mockResponse');

describe('handleBooks', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    translations.getLanguage.mockReturnValue('en');
    translations.getTranslation.mockImplementation((lang, key) => {
      const map = {
        bookColumn: 'Book',
        noBooks: 'No books',
        backLink: 'Back',
        booksHeader: 'Books of {reader}'
      };
      return map[key] || key;
    });
    translations.interpolate.mockImplementation((tpl, data) => tpl.replace('{reader}', data.reader));
  });

  test('returns 400 for invalid reader', async () => {
    fs.readFile.mockResolvedValueOnce('<html><body><%= errorMessage %></body></html>');

    const { handleBooks } = require('../handlers/books');

    const req = { url: '/books?reader=unknown', method: 'GET', headers: {} };
    const res = createResponse();

    await handleBooks(req, res);

    expect(res.statusCode).toBe(400);
    expect(res.body).toContain('Invalid reader selected');
  });

  test('renders books for valid reader', async () => {
    const booksTpl = '<html><body><h1><%= booksHeader %></h1><% books.forEach(function(b){ %><div><%= b %></div><% }) %></body></html>';
    fs.readFile.mockResolvedValue(booksTpl);

    const { handleBooks } = require('../handlers/books');

    const req = { url: '/books?reader=ivanov', method: 'GET', headers: {} };
    const res = createResponse();

    await handleBooks(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.body).toContain('Books of Ivanov I.I.');
    expect(res.body).toContain('Book1');
    expect(res.body).toContain('Book2');
  });
});
