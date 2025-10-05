const i18next = require('i18next');

/**
 * Инициализация i18n для локализации.
 * @returns {Object} - экземпляр i18next.
 */
function initI18n() {
  const i18n = i18next.createInstance();
  i18n.init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {
      en: { translation: require('../i18n/en.json') },
      ru: { translation: require('../i18n/ru.json') }
    },
    interpolation: { escapeValue: false }
  });
  return i18n;
}

/**
 * Получение языка из запроса.
 * @param {http.IncomingMessage} req - Запрос.
 * @returns {string} - Код языка (ru/en).
 */
function getLanguage(req) {
  const url = require('url');
  const query = url.parse(req.url, true).query;
  if (query.lang && ['en', 'ru'].includes(query.lang)) {
    return query.lang;
  }
  const accept = req.headers['accept-language'] || 'en';
  return accept.toLowerCase().startsWith('ru') ? 'ru' : 'en';
}

module.exports = { initI18n, getLanguage };