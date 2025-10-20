const url = require('url');
const { booksData } = require('../data/booksData');
const { getTranslation, interpolate, getLanguage } = require('../utils/translations');

/**
 * Обработчик GET для /books?reader=... с локализацией.
 * @param {http.IncomingMessage} req - Запрос.
 * @param {http.ServerResponse} res - Ответ.
 */
async function handleBooks(req, res) {
  const lang = getLanguage(req);

  const queryObject = url.parse(req.url, true).query;
  const readerId = queryObject.reader || '';

  const readerData = booksData[readerId]?.[lang] || booksData[readerId]?.['en'] || { name: '', books: [] };
  const readerName = readerData.name || readerId;
  const books = readerData.books || [];

  const booksHeaderTemplate = getTranslation(lang, 'booksHeader');
  const booksHeader = interpolate(booksHeaderTemplate, { reader: readerName });

  let html = `
    <html lang="${lang}">
      <head><title>${booksHeader}</title></head>
      <body>
        <h1>${booksHeader}</h1>
        <table border="1">
          <tr><th>${getTranslation(lang, 'bookColumn')}</th></tr>
          ${books.length ? books.map(book => `<tr><td>${book}</td></tr>`).join('') : `<tr><td>${getTranslation(lang, 'noBooks')}</td></tr>`}
        </table>
        <a href="/?lang=${lang}">${getTranslation(lang, 'backLink')}</a>
      </body>
    </html>
  `;

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
}

module.exports = { handleBooks };