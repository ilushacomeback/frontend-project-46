import fs from "fs";

const getExtension = (file) => {
  const normalizeFile = file.split(".");
  return normalizeFile[normalizeFile.length - 1];
};

const pars = (path1, path2) => {
  const file1 = fs.readFileSync(path1, { encoding: "utf8", flag: "r" });
  const file2 = fs.readFileSync(path2, { encoding: "utf8", flag: "r" });
 
  if (getExtension(path1) === 'json') {
       console.log(JSON.parse(file1));
  }

};
export { pars };
// gendiff ./fixtures/file1.json ./fixtures/file2.json
