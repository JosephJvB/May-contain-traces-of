const https = require('https');

const print = require('./print-util');

module.exports = async pkgName => {
  try {
    // get package github repository url from bundlephobia API
    const BPJson = await httpGetJsonAsync({
      url: 'https://bundlephobia.com/api/size?package=' + pkgName,
      expectedType: /^application\/json/
    })
    .catch(e => {
      console.error(e);
      throw new Error(`
        Failed to get from BundlePhobia API for package: ${pkgName}
      `);
    });
  
    if(!BPJson.repository) {
      throw new Error(`
        BundlePhobia result did not include github repository url field
        ${JSON.stringify(BPJson, null, 2)}
      `);
    }
  
    // get parsed-json content from rawgithub/package.json page
    const rawGithubUrl = BPJson.repository.replace('https://github.com', 'https://raw.githubusercontent.com');
    const parsedPackageJson = await httpGetJsonAsync({
      url: rawGithubUrl + '/master/package.json',
      expectedType: /text\/plain/
    })
    .catch(e => {
      console.error(e);
        throw new Error(`
          Failed to get github page: ${rawGithubUrl + '/master/package.json'}
        `);
    });
    
    return print(parsedPackageJson);
  } catch(e) {
    console.error(e.message);
  }
}

// wrapper function for native node https module
// can be done more 'tidily' with 3rd party package like node-fetch. This was me trying stuff out.
function httpGetJsonAsync ({url, expectedType}) {
  return new Promise((resolve, reject) => {
    // copy + paste from: https://nodejs.org/api/http.html#http_http_get_options_callback
    https.get(url, (res) => {
      const { statusCode } = res;
      const contentType = res.headers['content-type'];
    
      let error;
      if (statusCode !== 200) {
        error = new Error('Request Failed.\n' +
                          `Status Code: ${statusCode}`);
      } else if (!expectedType.test(contentType)) {
        error = new Error('Invalid content-type.\n' +
                          `Expected ${expectedType} but received ${contentType}`);
      }
      if (error) {
        // from docs: Consume response data to free up memory
        // from joe: what is this? Is it useful for me? There's another method called res.destroy()...
        // DOCS: However, if a 'response' event handler is added, then the data from the response object must be consumed, either by calling response.read() whenever there is a 'readable' event, or by adding a 'data' handler, or by calling the .resume() method. Until the data is consumed, the 'end' event will not fire. Also, until the data is read it will consume memory that can eventually lead to a 'process out of memory' error.
        // so would res.destroy do anything different? ionno
        res.resume();
        console.error(error);
        reject(error);
        return;
      }
    
      res.setEncoding('utf8');
      let rawData = '';
      res.on('data', (chunk) => { rawData += chunk; });
      res.on('end', () => {
        // success request complete
        // expect valid json every time
        // is this try catch overkill?
        try {
          const validJson = JSON.parse(rawData);
          resolve(validJson);
        } catch (e) {
          console.error(e);
          reject(`
            Failed to parse response as JSON
            ${rawData}
          `);
        }
      });
    }).on('error', (e) => {
      console.error(e);
      reject(e);
    });    
  })
}