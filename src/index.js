import path from 'path';
import parser from './parsers.js';
import { readFile, getDiff } from './utils.js';
import getStylish from './formatters/stylish.js';

const genDiff = (filePath1, filePath2) => {
  const file1 = parser(readFile(filePath1), path.extname(filePath1));
  const file2 = parser(readFile(filePath2), path.extname(filePath2));
  const diff = getDiff(file1, file2);
  const result = getStylish(diff);
  console.log(result);
  return result;
};
export default genDiff;
