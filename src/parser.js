import YAML from "yaml";

const parser = (file, format) => {
  if (format === "json") {
    const jsonParse = JSON.parse(file);
    return jsonParse;
  }
  if (format === "yaml") {
    const yamlParse = YAML.parse(file);
    return yamlParse;
  }
};
export default parser ;