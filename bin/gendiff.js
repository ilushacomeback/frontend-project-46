#!/usr/bin/env node
import { Command } from "commander";
import { pars } from "../src/parser.js"


const program = new Command();

program
  .name("gendiff")
  .description("Compares two configuration files and shows a difference.")
  .argument("<filepath1.json>", "первый файл")
  .argument("<filepath2.json>", "второй файл")
  .option("-v, --version", "output the version number")
  .helpOption('-h, --help', 'output usage information')
  .option("-f, --format <type>", "output format")
  .action((path1, path2) => {
    pars(path1, path2)
  }) 
program.parse();
