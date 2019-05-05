// Keep It Simple, Stupid 😎
const fs = require('fs')
const path = require('path')

const print = require('./print-util');

module.exports = () => {
  const jsonPath = path.join(__dirname, 'package.json');
  const rawData = fs.readFileSync(jsonPath, 'utf8');
  
  const rawJson = JSON.parse(rawData);
  
  print(rawJson);
}
