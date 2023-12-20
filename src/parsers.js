import yaml from 'js-yaml'

const parser = (file, format) => {
  if (format === '.json') {
    return JSON.parse(file);
  }
  if (format === '.yaml' || format === '.yml') {
    return yaml.load(file);
  }
  return null;
};
export default parser;
