# May contain traces of...

Read package.json and then creates a list of dependencies & dev-dependencies.

### Install:
```sh
npm i -g may-contain-traces-of
```

### Usage:
```sh
list-ingredients [package-name]
# output is a the list of ingredients of the requested package

# eg:
list-ingredients cheerio

# output:
# [source]: https://github.com/cheeriojs/cheerio
# [ingredients]: css-select, dom-serializer, entities, htmlparser2, lodash
# [may contain traces of]: benchmark, coveralls, expect.js, istanbul, jquery, jsdom, jshint, mocha, xyz
```


### Changelog:
- Add package size in output.
- Making up an error handling/logging system as I go. Try it out, see if the shoe fits - kinda thing.
- Remove cheerio package, use `rawgithubusercontent` instead of scraping github DOM. Dependency free, all organic!!
- Add API.js to read package jsons from github
- Add KISS to read own package json
- init!

### TODO
- Read more package.jsons
  - Calling `list-ingredients` with -gh `username/repo` finds a package.json for that given repo..
  - Calling `list-ingredients` with a file path attempts to read a local package.json