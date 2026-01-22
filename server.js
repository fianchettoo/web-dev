// server.js (обновлённый фрагмент)
const http = require('http');
const { handleHome } = require('./handlers/home');
const { handleBooks } = require('./handlers/books');

const { handleSessionForm } = require('./handlers/sessionForm');
const { handleSessionProcess } = require('./handlers/sessionProcess');
const { handleSessionDisplay } = require('./handlers/sessionDisplay');

const server = http.createServer(async (req, res) => {
  try {
    if (req.url === '/' || req.url.startsWith('/?') || req.url === '/web-dev/') {
      await handleHome(req, res);
    } else if (req.method === 'GET' && req.url.startsWith('/books')) {
      await handleBooks(req, res);
    } else if (req.method === 'GET' && (req.url === '/session' || req.url.startsWith('/session?'))) {
      await handleSessionForm(req, res);
    } else if (req.method === 'GET' && req.url.startsWith('/session/process')) {
      await handleSessionProcess(req, res);
    } else if (req.method === 'GET' && req.url.startsWith('/session/display')) {
      await handleSessionDisplay(req, res);
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
const host = '127.0.0.1';

server.listen(port, host, () => {
  console.log(`Node.js server running at http://localhost:${port}`);
});
