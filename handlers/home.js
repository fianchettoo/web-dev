const fs = require('fs').promises;
const path = require('path');
const ejs = require('ejs');
const { getTranslation, getLanguage } = require('../utils/translations');

const viewsDir = path.join(__dirname, '../views');

/**
 * Обработчик GET для главной страницы.
 * @param {http.IncomingMessage} req - Запрос.
 * @param {http.ServerResponse} res - Ответ.
 */
async function handleHome(req, res) {
  const lang = getLanguage(req);
  const translations = {
    title: getTranslation(lang, 'title'),
    selectLabel: getTranslation(lang, 'selectLabel'),
    button: getTranslation(lang, 'button'),
    readers: {
      ivanov: getTranslation(lang, 'readers.ivanov'),
      petrov: getTranslation(lang, 'readers.petrov'),
      sidorov: getTranslation(lang, 'readers.sidorov')
    }
  };

  const template = await fs.readFile(path.join(viewsDir, 'index.ejs'), 'utf-8');
  const html = ejs.render(template, { lang, translations });  // Рендеринг с данными

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
}

module.exports = { handleHome };