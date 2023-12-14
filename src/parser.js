import fs from "fs";
import process from "node:process";
import path from "path";
import YAML from "yaml";

const getExtension = (file) => {
  const normalizeFile = file.split(".");
  return normalizeFile[normalizeFile.length - 1];
};
const getPath = (pathToFile) => path.resolve(process.cwd(), pathToFile);

const pars = (file) => {
  const normalizePath1 = getPath(file);
  const readFile = fs.readFileSync(normalizePath1, {
    encoding: "utf8",
  });

  if (getExtension(file) === "json") {
    JSON.parse(readFile);
    console.log(JSON.parse(readFile));
  }
  if (getExtension(file) === "yaml") {
    YAML.parse(readFile);
    console.log(YAML.parse(readFile));
  }
};
export { pars };
// gendiff ./__fixtures__/file1.json ./__fixtures__/file2.json
// gendiff /mnt/c/Users/USER/Desktop/frontend-project-46/__fixtures__/file1.json /mnt/c/Users/USER/Desktop/frontend-project-46/__fixtures__/file2.json
