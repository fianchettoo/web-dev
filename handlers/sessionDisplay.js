const fs = require('fs').promises;
const path = require('path');
const ejs = require('ejs');
const { parseCookies } = require('../utils/cookies');
const sessionStore = require('../utils/sessionStore');

const viewsDir = path.join(__dirname, '../views');

async function handleSessionDisplay(req, res) {
  const cookies = parseCookies(req);
  const sid = cookies['SID'];
  const session = sessionStore.getSession(sid) || {};

  const authorCookie = cookies['book.author'] ? decodeURIComponent(cookies['book.author']) : '';
  const color = cookies['page.color'] || 'white';

  const data = {
    sessionCounter: session.counter || 0,
    sessionLastVisit: session.lastVisit || '',
    sessionAuthor: session.author || '',
    authorCookie,
    color
  };

  const template = await fs.readFile(path.join(viewsDir, 'display.ejs'), 'utf-8');
  const html = ejs.render(template, data);
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
}

module.exports = { handleSessionDisplay };
