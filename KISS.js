// Keep It Simple, Stupid 😎
const fs = require('fs')
const path = require('path')

const jsonPath = path.join(__dirname, 'package.json');
const rawData = fs.readFileSync(jsonPath, 'utf8');

const rawJson = JSON.parse(rawData);

const deps = Object.keys(rawJson.dependencies || {});
const devDeps = Object.keys(rawJson.devDependencies || {});

const ingredients = `
  ingredients: ${deps.join(', ') || 'none!'}
  may contain traces of: ${devDeps.join(', ') || 'nothing!'}
`

console.log(ingredients)