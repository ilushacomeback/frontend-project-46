/* eslint-env jest */
import genDiff from '../src/index.js';

const res = `{
\t- follow: false
\t  host: hexlet.io
\t- proxy: 123.234.53.22
\t- timeout: 50
\t+ timeout: 20
\t+ verbose: true
}`;

test('work', () => {
  expect(
    genDiff('./__fixtures__/file1.json', './__fixtures__/file2.json'),
  ).toEqual(res);
  expect(
    genDiff('./__fixtures__/file1.yaml', './__fixtures__/file2.yaml'),
  ).toEqual(res);
});
