const ownUrl = 'https://github.com/JosephJvB/May-contain-traces-of';
// added up bytes of each file.
const ownSize = 6811;

module.exports = (rawJson, source = ownUrl, size = ownSize) => {
  const deps = Object.keys(rawJson.dependencies || {});
  const devDeps = Object.keys(rawJson.devDependencies || {});

  const ingredients = `
    [source]: ${source}

    [size]: ${getSize(size)}

    [ingredients]: ${deps.join(', ') || 'none!'}

    [may contain traces of]: ${devDeps.join(', ') || 'nothing!'}
  `;

  console.log(ingredients);

  return rawJson;
}

function getSize(num) {
  const len = num.toString().length;
  if(len > 6) {
    return (num/1000000).toFixed(2) + 'mB';
  } else {
    return (num/1000).toFixed(2) + 'kB';
  }
}
