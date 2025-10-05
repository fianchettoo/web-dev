const url = require('url');
const { booksData } = require('../data/booksData');
const { initI18n, getLanguage } = require('../utils/i18n');

/**
 * Обработчик GET для /books?reader=... с локализацией.
 * @param {http.IncomingMessage} req - Запрос.
 * @param {http.ServerResponse} res - Ответ.
 */
async function handleBooks(req, res) {
  const i18n = initI18n();
  const lang = getLanguage(req);
  i18n.changeLanguage(lang);

  const queryObject = url.parse(req.url, true).query;
  const readerId = queryObject.reader || '';  // ID вроде 'ivanov'

  // Получаем данные по ID и lang (fallback en)
  const readerData = booksData[readerId]?.[lang] || booksData[readerId]?.['en'] || { name: '', books: [] };
  const readerName = readerData.name || readerId;  // Локализованное имя
  const books = readerData.books || [];

  let html = `
    <html lang="${lang}">
      <head><title>${i18n.t('booksHeader', { reader: readerName })}</title></head>
      <body>
        <h1>${i18n.t('booksHeader', { reader: readerName })}</h1>
        <table border="1">
          <tr><th>${i18n.t('bookColumn')}</th></tr>
          ${books.length ? books.map(book => `<tr><td>${book}</td></tr>`).join('') : `<tr><td>${i18n.t('noBooks')}</td></tr>`}
        </table>
        <a href="/?lang=${lang}">${i18n.t('backLink')}</a>
      </body>
    </html>
  `;

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
}

module.exports = { handleBooks };