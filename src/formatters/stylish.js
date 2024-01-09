import _ from 'lodash';

const data = {
  added: '+',
  deleted: '-',
  space: ' ',
};

const getIndent = (depth, mark) => {
  const space = '    ';
  if (!mark) {
    return `${space.repeat(depth)}`;
  }
  if (depth === 0) {
    return `  ${mark} `;
  }
  return `${space.repeat(depth)}  ${mark} `;
};

const stringify = (value, level) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }
    const render = Object.entries(currentValue).map(([key, val]) => `${getIndent(depth + 1, data.space)}${key}: ${iter(val, depth + 1)}`);
    return ['{', ...render, `${getIndent(depth + 1)}}`].join('\n');
  };
  return iter(value, level);
};

const getStylish = (tree) => {
  const iter = (object, depth) => {
    const result = object.map((key) => {
      switch (key.action) {
        case 'added':
          return `${getIndent(depth, data.added)}${key.key}: ${stringify(key.newValue, depth)}`;
        case 'deleted':
          return `${getIndent(depth, data.deleted)}${key.key}: ${stringify(key.oldValue, depth)}`;
        case 'nested':
          return `${getIndent(depth, data.space)}${key.key}: ${iter(key.children, depth + 1)}`;
        case 'changed':
          return `${getIndent(depth, data.deleted)}${key.key}: ${stringify(key.oldValue, depth)}\n${getIndent(depth, data.added)}${key.key}: ${stringify(key.newValue, depth)}`;
        default:
          return `${getIndent(depth, data.space)}${key.key}: ${stringify(key.oldValue, depth)}`;
      }
    });
    return ['{', ...result, `${getIndent(depth)}}`].join('\n');
  };
  return iter(tree, 0);
};
export default getStylish;
