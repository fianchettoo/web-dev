const { getTranslation, getLanguage } = require('../utils/translations');

/**
 * Обработчик GET для главной страницы с локализацией.
 * @param {http.IncomingMessage} req - Запрос.
 * @param {http.ServerResponse} res - Ответ.
 */
async function handleHome(req, res) {
  const lang = getLanguage(req);

  let html = `
    <!DOCTYPE html>
    <html lang="${lang}">
    <head>
      <meta charset="UTF-8">
      <title>${getTranslation(lang, 'title')}</title>
    </head>
    <body>
      <h1>${getTranslation(lang, 'title')}</h1>
      <form method="GET" action="/books">
        <label>${getTranslation(lang, 'selectLabel')}</label>
        <select name="reader">
          <option value="ivanov">${getTranslation(lang, 'readers.ivanov')}</option>
          <option value="petrov">${getTranslation(lang, 'readers.petrov')}</option>
          <option value="sidorov">${getTranslation(lang, 'readers.sidorov')}</option>
        </select>
        <input type="hidden" name="lang" value="${lang}">
        <button type="submit">${getTranslation(lang, 'button')}</button>
      </form>
    </body>
    </html>
  `;

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
}

module.exports = { handleHome };