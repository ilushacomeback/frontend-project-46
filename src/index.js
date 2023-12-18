import fs from "fs";
import process from "node:process";
import path from "path";
import parser from "../src/parser.js";
import _ from "lodash";

const getExtension = (file) => file.split(".").at(-1);
const getPath = (pathToFile) => path.resolve(process.cwd(), pathToFile);
const readFile = (path) => fs.readFileSync(getPath(path), "utf-8");

const genDiff = (filePath1, filePath2) => {
  const file1 = parser(readFile(filePath1), getExtension(filePath1));
  const file2 = parser(readFile(filePath2), getExtension(filePath2));
  const keys = _.sortBy(_.union(Object.keys(file1), Object.keys(file2)))
  .map((key) => {
    if (Object.hasOwn(file1, key) && Object.hasOwn(file2, key)) {
      if (file1[key] === file2[key]) {
        console.log(`    ${key}: ${file1[key]}`);
      } else {
        console.log(`  - ${key}: ${file1[key]}`);
        console.log(`  + ${key}: ${file2[key]}`);
      }
    }
    if (Object.hasOwn(file1, key) && !Object.hasOwn(file2, key)) {
        console.log(`  - ${key}: ${file1[key]}`)
    } 
    if (!Object.hasOwn(file1, key) && Object.hasOwn(file2, key)) {
        console.log(`  + ${key}: ${file2[key]}`)
    } 
  });
  return keys
};
export default genDiff;
