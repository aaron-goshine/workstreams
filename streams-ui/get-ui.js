let fs = require('fs');
let path = require('path');

exports.handler = async (event) => {
  console.info('received:', event);
  let cssCode = fs.readFileSync(path.join(__dirname, 'main.css')).toString();
  let jsCode = fs.readFileSync(path.join(__dirname, 'main.js')).toString();
  let htmlTemplate = fs.readFileSync(path.join(__dirname, 'index.html')).toString();

  htmlTemplate = htmlTemplate.replace('{{js}}', jsCode);
  htmlTemplate = htmlTemplate.replace('{{css}}', cssCode);
  console.log(htmlTemplate);
  const response = {
    statusCode: 200,
    body: JSON.stringify(htmlTemplate)
  };
  return response;
};
