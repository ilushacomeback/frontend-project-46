/* eslint-env jest */
import genDiff from "../src/index.js";

const res = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

const res2 =
`{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

test("work", () => {
  expect(
    genDiff("./__fixtures__/file1.json", "./__fixtures__/file2.json")
  ).toEqual(res);
  expect(
    genDiff("./__fixtures__/file1.yaml", "./__fixtures__/file2.yaml")
  ).toEqual(res);
});

test("work2", () => {
  expect(
    genDiff("./__fixtures__/filepath1.json", "./__fixtures__/filepath2.json")
  ).toEqual(res2);
  expect(
    genDiff("./__fixtures__/filepath1.yml", "./__fixtures__/filepath2.yml")
  ).toEqual(res2);
});
