#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../src/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1.json>', 'первый файл')
  .argument('<filepath2.json>', 'второй файл')
  .option('-v, --version', 'output the version number')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format (default: "stylish")')
  .action((path1, path2, option) => {
    console.log(genDiff(path1, path2, option.format));
  });
program.parse();
