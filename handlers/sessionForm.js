const fs = require('fs').promises;
const path = require('path');
const ejs = require('ejs');
const { getLanguage } = require('../utils/translations');

const viewsDir = path.join(__dirname, '../views');

async function handleSessionForm(req, res) {
  const lang = getLanguage ? getLanguage(req) : 'en';
  const template = await fs.readFile(path.join(viewsDir, 'input.ejs'), 'utf-8');
  const html = ejs.render(template, { lang });
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
}

module.exports = { handleSessionForm };
