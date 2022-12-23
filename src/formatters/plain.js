import _ from "lodash";

const stringify = (value) => {
  if (_.isObject(value)) {
    return "[complex value]";
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const plain = (diff) => {
  const iter = (tree, path) =>
    tree.flatMap((elem) => {
      const property = path !== "" ? `${path}.${elem.key}` : `${elem.key}`;
      switch (elem.status) {
        case "removed":
          return `Property '${property}' was removed`;
        case "added":
          return `Property '${property}' was added with value: ${stringify(
            elem.value
          )}`;
        case "updated":
          return `Property '${property}' was updated. From ${stringify(
            elem.value1
          )} to ${stringify(elem.value2)}`;
        case "nested":
          return iter(elem.value, property);
        case "theSame":
          return null;
        default:
          throw new Error("Unknown type node");
      }
    });
  const lines = iter(diff, "");
  return lines.filter((line) => line).join("\n");
};

export default plain;