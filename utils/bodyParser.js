const querystring = require('querystring');

/**
 * Парсит тело POST-запроса (urlencoded).
 * @param {http.IncomingMessage} req - Входящий запрос.
 * @returns {Promise<Object>} - Promise с parsed данными.
 */
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      resolve(querystring.parse(body));
    });
    req.on('error', reject);
  });
}

module.exports = { parseBody };