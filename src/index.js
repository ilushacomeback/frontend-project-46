import fs from 'fs';
import process from 'node:process';
import path from 'path';
import _ from 'lodash';
import parser from './parser.js';

const getExtension = (file) => file.split('.').at(-1);
const getPath = (pathToFile) => path.resolve(process.cwd(), pathToFile);
const readFile = (pathToFile) => fs.readFileSync(getPath(pathToFile), 'utf-8');

const genDiff = (filePath1, filePath2) => {
  const file1 = parser(readFile(filePath1), getExtension(filePath1));
  const file2 = parser(readFile(filePath2), getExtension(filePath2));
  const keys = _.sortBy(_.union(Object.keys(file1), Object.keys(file2))).map(
    (key) => {
      if (Object.hasOwn(file1, key) && Object.hasOwn(file2, key)) {
        if (file1[key] === file2[key]) {
          return `\t  ${key}: ${file1[key]}`;
        }
        const one = `\t- ${key}: ${file1[key]}`;
        const two = `\t+ ${key}: ${file2[key]}`;
        return `${one}\n${two}`;
      }
      if (Object.hasOwn(file1, key) && !Object.hasOwn(file2, key)) {
        return `\t- ${key}: ${file1[key]}`;
      }
      if (!Object.hasOwn(file1, key) && Object.hasOwn(file2, key)) {
        return `\t+ ${key}: ${file2[key]}`;
      }
      return null;
    },
  );
  console.log(`{\n${keys.join('\n')}\n}`);
  return `{\n${keys.join('\n')}\n}`;
};
export default genDiff;
