let fs = require('fs');
let path = require('path');

exports.handler = async (event) => {
  console.info('received:', event);
  let cssCode = fs.readFileSync(path.join(__dirname, 'main.css'))
    .toString();
  let jsCode = fs.readFileSync(path.join(__dirname, 'main.js'))
    .toString();
  let htmlTemplate = fs.readFileSync(path.join(__dirname, 'index.html'))
    .toString();

  htmlTemplate = htmlTemplate.replace('{{js}}', jsCode)
    .replace('{{css}}', cssCode);

  const response = {
    statusCode: 200,
    headers: { 'Content-Type': 'text/html' },
    body: htmlTemplate
  };
  return response;
};
