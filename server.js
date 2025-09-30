const http = require('http');
const { handleHome } = require('./handlers/home');
const { handleBooks } = require('./handlers/books');

/**
 * Создаёт и запускает HTTP-сервер.
 * @param {number} [port=3000] - Порт.
 */
const server = http.createServer(async (req, res) => {
  try {
    if (req.url === '/' || req.url === '/web-dev/') {
      await handleHome(res);
    } else if (req.method === 'POST' && req.url === '/books') {
      await handleBooks(req, res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
    }
  } catch (err) {
    console.error(err);
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('500 Server Error');
  }
});

const port = process.env.PORT || 3000;
server.listen(port, 'localhost', () => {
  console.log(`Node.js server running at http://localhost:${port}`);
});