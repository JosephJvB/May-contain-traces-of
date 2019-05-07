const ownUrl = 'https://github.com/JosephJvB/May-contain-traces-of';

module.exports = (rawJson, source = ownUrl) => {
  const deps = Object.keys(rawJson.dependencies || {});
  const devDeps = Object.keys(rawJson.devDependencies || {});

  const ingredients = `
    [source]: ${source}

    [ingredients]: ${deps.join(', ') || 'none!'}

    [may contain traces of]: ${devDeps.join(', ') || 'nothing!'}
  `;

  console.log(ingredients);

  return rawJson;
}