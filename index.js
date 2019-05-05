#! /usr/env/bin node

const printLocalPackage = require('./KISS');
const printRemotePackage = require('./API');

const args = process.argv.slice(2);

if(args.length) {
  printRemotePackage(args[0]);
} else {
  printLocalPackage();
}