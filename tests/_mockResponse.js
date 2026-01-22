function createResponse() {
  const res = {};
  res.headers = {};
  res.body = '';
  res.statusCode = 200;
  res.finished = false;

  res.writeHead = (status, headers = {}) => {
    res.statusCode = status;
    Object.assign(res.headers, headers);
  };
  res.setHeader = (k, v) => { res.headers[k] = v; };
  res.getHeader = (k) => res.headers[k];
  res.write = (chunk) => { res.body += String(chunk); };
  res.end = (chunk) => { if (chunk) res.body += String(chunk); res.finished = true; };

  return res;
}

module.exports = { createResponse };
