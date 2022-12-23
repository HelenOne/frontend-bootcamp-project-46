import _ from "lodash";

const spacesCount = 4;
const replacer = " ";
const statuses = {
  nested: " ",
  added: "+",
  removed: "-",
  theSame: " ",
};

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return `${data}`;
  }

  const indentSize = depth * spacesCount;
  const keyIndent = replacer.repeat(indentSize);
  const bracketIndent = replacer.repeat(indentSize - spacesCount);
  const lines = Object.entries(data).map(
    ([key, value]) => `${keyIndent}${key}: ${stringify(value, depth + 1)}`
  );

  return ["{", ...lines, `${bracketIndent}}`].join("\n");
};

const stylish = (diff) => {
  const iter = (tree, depth) =>
    tree.map((item) => {
      const indentSize = depth * spacesCount;
      const keyIndent = replacer.repeat(indentSize);
      const bracketIndent = replacer.repeat(indentSize - spacesCount);

      const buildObject = (value, status) =>
        `${keyIndent}${status} ${item.key}: ${stringify(value, depth)}`;

      switch (item.status) {
        case "removed":
          return buildObject(item.value, statuses.removed);
        case "added":
          return buildObject(item.value, statuses.added);
        case "theSame":
          return buildObject(item.value, statuses.theSame);
        case "updated":
          return [
            buildObject(item.value1, statuses.removed),
            buildObject(item.value2, statuses.added),
          ].join("\n");
        case "nested":
          return `${keyIndent}${item.key}: ${[
            "{",
            ...iter(item.value, depth + 1),
            `${bracketIndent}}`,
          ].join("\n")}`;
        default:
          throw new Error("Unknown type node");
      }
    });
  const result = iter(diff, 1);
  return ["{", ...result, "}"].join("\n");
};

export default stylish;
