#!/usr/bin/env node

const printLocalPackage = require('./KISS');
const printRemotePackage = require('./API');

const args = process.argv.slice(2);

if(args.length) {
  printRemotePackage(args[0]);
} else {
  printLocalPackage();
}

// dont know what Im doing but here's some stuff
// boilerplate node process error event listeners
// process.on('uncaughtException', e => {
//   console.error(`
//     Uncaught exception: ${e.message}
//   `)
//   process.exit(1);
// });
// process.on('unhandledRejection', e => {
//   console.error(`
//     Unhandled promise rejection: ${e.message}
//   `)
//   process.exit(1);
// });