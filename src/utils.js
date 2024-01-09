import fs from 'fs';
import process from 'node:process';
import path from 'path';
import _ from 'lodash';

const getPath = (pathToFile) => path.resolve(process.cwd(), pathToFile);
const readFile = (pathToFile) => fs.readFileSync(getPath(pathToFile), 'utf-8');

const getDiff = (data1, data2) => {
  const keysData = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)))
    .map((key) => {
      const oldValue = data1[key];
      const newValue = data2[key];
      if (!Object.hasOwn(data1, key)) {
        return {
          action: 'added',
          key,
          newValue,
        };
      }
      if (!Object.hasOwn(data2, key)) {
        return {
          action: 'deleted',
          key,
          oldValue,
        };
      }
      if (_.isObject(oldValue) && _.isObject(newValue)) {
        return {
          action: 'nested',
          key,
          children: getDiff(oldValue, newValue),
        };
      }
      if (oldValue !== newValue) {
        return {
          action: 'changed',
          key,
          oldValue,
          newValue,
        };
      }
      if (oldValue === newValue) {
        return {
          action: 'unchanged',
          key,
          oldValue,
        };
      }
      return null;
    });
  return keysData;
};
export { readFile, getDiff };
