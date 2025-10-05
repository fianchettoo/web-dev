const { initI18n, getLanguage } = require('../utils/i18n');

/**
 * Обработчик GET для главной страницы с локализацией.
 * @param {http.IncomingMessage} req - Запрос.
 * @param {http.ServerResponse} res - Ответ.
 */
async function handleHome(req, res) {
  const i18n = initI18n();
  const lang = getLanguage(req);
  i18n.changeLanguage(lang);

  let html = `
    <!DOCTYPE html>
    <html lang="${lang}">
    <head>
      <meta charset="UTF-8">
      <title>${i18n.t('title')}</title>
    </head>
    <body>
      <h1>${i18n.t('title')}</h1>
      <form method="GET" action="/books">
        <label>${i18n.t('selectLabel')}</label>
        <select name="reader">
          <option value="ivanov">${i18n.t('readers.ivanov')}</option>  <!-- value=ID, label=перевод -->
          <option value="petrov">${i18n.t('readers.petrov')}</option>
          <option value="sidorov">${i18n.t('readers.sidorov')}</option>
        </select>
        <input type="hidden" name="lang" value="${lang}">
        <button type="submit">${i18n.t('button')}</button>
      </form>
    </body>
    </html>
  `;

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
}

module.exports = { handleHome };