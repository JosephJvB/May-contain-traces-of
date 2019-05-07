module.exports = rawJson => {
  const deps = Object.keys(rawJson.dependencies || {});
  const devDeps = Object.keys(rawJson.devDependencies || {});

  const ingredients = `
    [source]: https://github.com/${rawJson.repository}

    [ingredients]: ${deps.join(', ') || 'none!'}

    [may contain traces of]: ${devDeps.join(', ') || 'nothing!'}
  `;

  console.log(ingredients);

  return rawJson;
}