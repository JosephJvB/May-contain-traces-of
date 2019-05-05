List-Ingredients

Just some idea I had sitting in the bath and looking at the bottle of body-wash I have. Ingredient lists are something we are all pretty familiar with. For me I had lots of allergies as a kid so I was browsing them often.

Cool so enough sharing. Im gonna make something that reads package.json's and then creates a list of "ingredients" aka dependencies & dev-deps.

### Basic
- [x] read package and print it to console

### Up-Nexts
- Use an API? I wonder if bundlephobia has something I can use
- Make an API? Give a package name/link then go to `github.com/package/package.json` parse contents and print them.
- Maybe use bundlephobia to find github page, then do some basic scrape. (if there even IS one haha)

ok BOOM here's the endpoint we need jah bless Bundlephobia, jah bless Bundlephobia-cli. There was no documentation but in the src there was this endpoint so we're in with a grin
- endpoint example: https://bundlephobia.com/api/size?package=pify

1. super basic argv parser. If given args - use the API, else try read package.json read from the current DIR.
2. get package repo https://bundlephobia.com/api/size?package=${args[0]} === getResult.repository (do error handling here - "no package found")
3. Scrape package contents from ${result.repository}/blob/master/package.json
4. Print and badabing, badaboom.