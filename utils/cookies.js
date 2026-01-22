function parseCookies(req) {
  const header = req.headers.cookie || '';
  return header.split(';').map(s => s.trim()).filter(Boolean).reduce((acc, pair) => {
    const idx = pair.indexOf('=');
    if (idx === -1) return acc;
    const name = decodeURIComponent(pair.slice(0, idx));
    const val = decodeURIComponent(pair.slice(idx + 1));
    acc[name] = val;
    return acc;
  }, {});
}

function buildSetCookie(name, value, opts = {}) {
  let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(String(value))}`;
  if (opts.path) cookie += `; Path=${opts.path}`;
  if (opts.maxAge !== undefined) cookie += `; Max-Age=${Math.floor(opts.maxAge)}`;
  if (opts.httpOnly) cookie += `; HttpOnly`;
  if (opts.secure) cookie += `; Secure`;
  if (opts.sameSite) cookie += `; SameSite=${opts.sameSite}`;
  return cookie;
}

module.exports = { parseCookies, buildSetCookie };
