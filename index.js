const fs = require('fs');
const path = require('path');
const pify = require('pify');

// I started out fancy, but all I need is KISS 💋

const fsAsync = pify(fs);

(async () => {
  const jsonPath = path.join(__dirname, 'package.json');
  const rawJson = await fsAsync.readFile(jsonPath, 'utf8')
    .then(JSON.parse)
    .then
  console.log(package)
})();