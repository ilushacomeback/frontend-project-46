const data = {
  added: 'was added with value:',
  deleted: 'was removed',
  changed: 'was updated. From',
};

const getString = (value) => {
  switch (typeof value) {
    case 'object':
      return value == null ? value : '[complex value]';
    case 'string':
      return `'${value}'`;
    default:
      return value;
  }
};

const getPlain = (tree) => {
  const iter = (object, path) => {
    const result = object.map((key) => {
      const fullPath = `${path}${key.key}`;
      switch (key.action) {
        case 'added':
          return `Property '${fullPath}' ${data.added} ${getString(
            key.newValue,
          )}`;
        case 'deleted':
          return `Property '${fullPath}' ${data.deleted}`;
        case 'nested':
          return iter(key.children, `${fullPath}.`);
        case 'changed':
          return `Property '${fullPath}' ${data.changed} ${getString(
            key.oldValue,
          )} to ${getString(key.newValue)}`;
        default:
          return null;
      }
    });
    return result.filter((el) => el != null).join('\n');
  };
  return iter(tree, '');
};

export default getPlain;
