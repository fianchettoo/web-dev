/**
 * Хардкод переводов для разных локалей.
 * @type {Object}
 */
const translations = {
  en: {
    title: "Reader Selection Service",
    selectLabel: "Select a reader:",
    button: "Get Book List",
    booksHeader: "Book List for {{reader}}",
    bookColumn: "Book",
    noBooks: "No books found",
    backLink: "Back",
    readers: {
      ivanov: "Ivanov I.I.",
      petrov: "Petrov P.P.",
      sidorov: "Sidorov S.S."
    }
  },
  ru: {
    title: "Сервис для отображения списка книг читателя",
    selectLabel: "Выберите читателя:",
    button: "Получить список книг",
    booksHeader: "Список книг для {{reader}}",
    bookColumn: "Книга",
    noBooks: "Книги не найдены",
    backLink: "Назад",
    readers: {
      ivanov: "Иванов И.И.",
      petrov: "Петров П.П.",
      sidorov: "Сидоров С.С."
    }
  }
};

/**
 * Функция получения перевода по ключу и локали.
 * @param {string} lang - Код языка (en/ru).
 * @param {string} key - Ключ перевода.
 * @returns {string} - Переведённая строка или ключ.
 */
function getTranslation(lang, key) {
  let dict = translations[lang] || translations['en'];
  const keys = key.split('.');
  for (let k of keys) {
    dict = dict[k];
    if (!dict) return key;
  }
  return dict;
}

/**
 * @param {string} str - Строка с {{key}}.
 * @param {Object} params - Объект с значениями.
 * @returns {string} - Строка с заменами.
 */
function interpolate(str, params) {
  return str.replace(/\{\{(.+?)\}\}/g, (match, key) => params[key.trim()] || match);
}

/**
 * Получение языка из запроса.
 * @param {http.IncomingMessage} req - Запрос.
 * @returns {string} - 'ru' или 'en'.
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

module.exports = { translations, getTranslation, interpolate, getLanguage };