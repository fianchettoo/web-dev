const url = require('url');
const { parseCookies, buildSetCookie } = require('../utils/cookies');
const sessionStore = require('../utils/sessionStore');

async function handleSessionProcess(req, res) {
  const q = url.parse(req.url, true).query;
  const author = (q.author || '').trim();
  const color = (q.color || '').trim() || 'white';

  if (!author) {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('400 Bad Request — author required');
    return;
  }

  const cookies = parseCookies(req);
  let sid = cookies['SID'];

  let session = sid ? sessionStore.getSession(sid) : null;
  if (!session) {
    const created = sessionStore.createSession({});
    sid = created.sid;
    session = created.session;
  }


  session.counter = (session.counter || 0) + 1;
  session.lastVisit = new Date().toISOString();
  session.author = author;

  const cookiesToSet = [];
  cookiesToSet.push(buildSetCookie('SID', sid, { path: '/', maxAge: 60 * 30, httpOnly: true }));
  cookiesToSet.push(buildSetCookie('book.author', encodeURIComponent(author), { path: '/', maxAge: 100 }));
  cookiesToSet.push(buildSetCookie('page.color', color, { path: '/', maxAge: 60 * 60 * 24 * 7 }));

  res.writeHead(302, {
    'Set-Cookie': cookiesToSet,
    'Location': '/session/display'
  });
  res.end();
}

module.exports = { handleSessionProcess };
