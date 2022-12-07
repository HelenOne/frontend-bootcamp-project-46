import fs from "fs";
import path from "path";
import _ from "lodash";

const gendiff = (filepath1, filepath2) => {
  const obj1 = JSON.parse(fs.readFileSync(filepath1));
  const obj2 = JSON.parse(fs.readFileSync(filepath2));

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allSortedKeys = _.sortBy(_.uniq([...keys1, ...keys2]));

  console.log(obj1);
  console.log(obj2);

  const diffObj = {};
  const statuses = {
    theSame: " ",
    onlyFirstHas: "-",
    onlySeconfHas: "+",
  };

  for (const i in allSortedKeys) {
    const key = allSortedKeys[i];
    let status = undefined;
    if (_.has(obj1, key) && _.has(obj2, key)) {
      if (obj1[key] === obj2[key]) {
        status = "theSame";
      } else status = "hasChanged";
    } else if (_.has(obj1, key) && !_.has(obj2, key)) {
      status = "onlyFirstHas";
    } else if (!_.has(obj1, key) && _.has(obj2, key)) {
      status = "onlySeconfHas";
    }
    if (status !== "hasChanged") {
      const newKey = `${statuses[status]} ${key}`;
      diffObj[newKey] = _.has(obj1, key) ? obj1[key] : obj2[key];
    } else {
      diffObj[`- ${key}`] = obj1[key];
      diffObj[`+ ${key}`] = obj2[key];
    }
  }

  return diffObj;
};

export default gendiff;
