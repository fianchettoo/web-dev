const { booksData } = require('../data/booksData');
const { parseBody } = require('../utils/bodyParser');

/**
 * Обработчик POST для /books.
 * @param {http.IncomingMessage} req - Запрос.
 * @param {http.ServerResponse} res - Ответ.
 */
async function handleBooks(req, res) {
  const parsedBody = await parseBody(req);
  const reader = parsedBody.reader || '';
  const books = booksData[reader] || [];

  let html = `
    <html>
      <head><title>Список книг</title></head>
      <body>
        <h1>Список книг для ${reader}</h1>
        <table border="1">
          <tr><th>Книга</th></tr>
          ${books.map(book => `<tr><td>${book}</td></tr>`).join('')}
        </table>
        <a href="/">Назад</a>
      </body>
    </html>
  `;

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
}

module.exports = { handleBooks };