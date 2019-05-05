const https = require('https');
const promisify = require('util').promisify;
const cheerio = require('cheerio');

const print = require('./print');

const endpoint = 'https://bundlephobia.com/api/size?package=';

const getJsonAsync = promisify(createHttpGetOfType(/^application\/json/));
const getHtmlAsync = promisify(createHttpGetOfType(/text\/html/));
(async () => {
  try {
    const json = await getJsonAsync(endpoint + 'pify').then(JSON.parse);
    const html = await getHtmlAsync(json.repository);
    console.log(html);
  } catch (e) {
    console.error(e);
  }
})();

// copy + paste from: https://nodejs.org/api/http.html#http_http_get_options_callback
function createHttpGetOfType (type) {
  return function (url, cb) {
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
        cb(error, null)
        // Consume response data to free up memory
        res.resume();
        return;
      }
    
      res.setEncoding('utf8');
      let rawData = '';
      res.on('data', (chunk) => { rawData += chunk; });
      res.on('end', () => {
        // success request complete
        cb(null, rawData);
      });
    }).on('error', (e) => {
      cb(e, null);
    });    
  }
}