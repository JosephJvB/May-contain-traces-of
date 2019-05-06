const https = require('https');
const cheerio = require('cheerio');
// const fs = require('fs');

const print = require('./print-util');

const endpoint = 'https://bundlephobia.com/api/size?package=';

const getJsonAsync = createHttpGetOfType(/^application\/json/);
const getHtmlAsync = createHttpGetOfType(/text\/html/);

module.exports = async pkgName => {

  // get package github repository url from bundlephobia API
  const BPJson = await getJsonAsync(endpoint + pkgName).then(JSON.parse)
  .catch(e => {
    console.error(`
      Failed to get package url for package: ${pkgName}
    `);
  })

  if(!BPJson.repository) {
    console.error(`
      Found package data did not include repository field\n${JSON.stringify(BPJson, null, 2)}
    `);
  }

  // get html content github package.json page
  const html = await getHtmlAsync(BPJson.repository + '/blob/master/package.json')
  .catch(e => {
      console.error(`
        Failed to get github page: ${BPJson.repository + '/blob/master/package.json'}
      `);
  });
  
  // write to file to see what you get!
  // fs.writeFileSync('./test.html', html)

  // scrape package.json content and assemble it as a JSON object
  const $ = cheerio.load(html);
  let jsonString = '';
  $('.js-file-line').each((i, el) => {
    jsonString += $(el).text().trim();
  })
  
  return print(JSON.parse(jsonString));
}

// wrapper function for native node https module
// can be done more 'tidily' with 3rd party package like node-fetch. This was me trying stuff out.
function createHttpGetOfType (type) {
  return function (url) {
    return new Promise((resolve, reject) => {
      // copy + paste from: https://nodejs.org/api/http.html#http_http_get_options_callback
      https.get(url, (res) => {
        const { statusCode } = res;
        const contentType = res.headers['content-type'];
      
        let error;
        if (statusCode !== 200) {
          error = new Error('Request Failed.\n' +
                            `Status Code: ${statusCode}`);
        } else if (!type.test(contentType)) {
          error = new Error('Invalid content-type.\n' +
                            `Expected ${type} but received ${contentType}`);
        }
        if (error) {
          reject(error);
          // Consume response data to free up memory
          res.resume();
          return;
        }
      
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
          // success request complete
          resolve(rawData);
        });
      }).on('error', (e) => {
        reject(e);
      });    
    })
  }
}