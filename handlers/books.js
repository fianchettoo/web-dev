const fs = require('fs').promises;
const path = require('path');
const url = require('url');
const ejs = require('ejs');
const { booksData } = require('../data/booksData');
const { getTranslation, interpolate, getLanguage } = require('../utils/translations');

const viewsDir = path.join(__dirname, '../views');

/**
 * Обработчик GET для /books?reader=...
 * @param {http.IncomingMessage} req - Запрос.
 * @param {http.ServerResponse} res - Ответ.
 */
async function handleBooks(req, res) {
  const lang = getLanguage(req);

  const queryObject = url.parse(req.url, true).query;
  const readerId = queryObject.reader || '';

  if (!booksData[readerId]) {
    const errorMessage = 'Invalid reader selected';

    const template = await fs.readFile(path.join(viewsDir, 'error.ejs'), 'utf-8');
    const html = ejs.render(template, { lang, errorMessage });

    res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
    return;
  }

  const readerData = booksData[readerId]?.[lang] || booksData[readerId]?.['en'] || { name: '', books: [] };
  const readerName = readerData.name || readerId;
  const books = readerData.books || [];

  const translations = {
    bookColumn: getTranslation(lang, 'bookColumn'),
    noBooks: getTranslation(lang, 'noBooks'),
    backLink: getTranslation(lang, 'backLink')
  };
  const booksHeaderTemplate = getTranslation(lang, 'booksHeader');
  const booksHeader = interpolate(booksHeaderTemplate, { reader: readerName });

  const template = await fs.readFile(path.join(viewsDir, 'books.ejs'), 'utf-8');
  const html = ejs.render(template, { lang, booksHeader, translations, books });

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
}

module.exports = { handleBooks };