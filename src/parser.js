import yaml from "js-yaml";

const parse = (fileContent, extension) => {
  switch (extension) {
    case "json":
      return JSON.parse(fileContent);
    case "yml":
      return yaml.load(fileContent);
    case "yaml":
      return yaml.load(fileContent);
    default:
      return "error";
  }
};

export default parse;
