# May contain traces of...

Read package.json and then creates a list of dependencies & dev-dependencies.

### Usage:
```sh
list-ingredients [package-name]
# output is a the list of ingredients of the requested package

# eg:
list-ingredients cheerio

# output:
# [ingredients]: css-select, dom-serializer, entities, htmlparser2, lodash
# [may contain traces of]: benchmark, coveralls, expect.js, istanbul, jquery, jsdom, jshint, mocha, xyz

```

### TODO
- change package name back to `may-contain-traces-of`
  - Im new to npm publishing, I deleted a package and thought I could immediately publish the same package under the same name. I was wrong.
- Read more package.jsons
  - Calling `list-ingredients` with -gh `username/repo` finds a package.json for that given repo..
  - Calling `list-ingredients` with a file path attempts to read a local package.json

### Changelog:
- Remove cheerio package, use `rawgithubusercontent` instead of scraping github DOM. Dependency free, all organic!!
- Add API.js to read package jsons from github
- Add KISS to read own package json
- init!
