const fs = require('fs').promises;
const path = require('path');

const publicDir = path.join(__dirname, '../public');

/**
 * Обработчик GET для главной страницы.
 * @param {http.ServerResponse} res - Ответ.
 */
async function handleHome(res) {
  const filePath = path.join(publicDir, 'index.html');
  const content = await fs.readFile(filePath);
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(content);
}

module.exports = { handleHome };