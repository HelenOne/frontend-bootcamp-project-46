import fs from "fs";
import _ from "lodash";
import parse from "./parser.js";
import path from "path";
import stylish from "./formatters/stylish.js";

const compareObjects = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allSortedKeys = _.sortBy(_.uniq([...keys1, ...keys2]));

  return allSortedKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { key, status: "nested", value: compareObjects(value1, value2) };
    }

    if (_.isEqual(value1, value2)) {
      return { key, status: "theSame", value: value1 }; // equal
    }

    if (!_.has(obj1, key)) {
      return { key, status: "added", value: value2 }; // add second
    }

    if (!_.has(obj2, key)) {
      return { key, status: "removed", value: value1 }; // add first
    }

    return {
      key,
      status: "addBoth",
      value1,
      value2,
    };
  });

  ////// OLD SOLUTION //////

  // const statuses = {
  //   theSame: " ",
  //   onlyFirstHas: "-",
  //   onlySeconfHas: "+",
  // };

  // const diffObj = {};

  // for (const i in allSortedKeys) {
  //   const key = allSortedKeys[i];
  //   let status = undefined;
  //   const value1 = obj1[key];
  //   const value2 = obj2[key];

  //   // set key status
  //   if (_.has(obj1, key) && _.has(obj2, key)) {
  //     if (_.isEqual(value1, value2)) {
  //       status = "theSame";
  //     } else status = "hasChanged";
  //   } else if (_.has(obj1, key) && !_.has(obj2, key)) {
  //     status = "onlyFirstHas";
  //   } else if (!_.has(obj1, key) && _.has(obj2, key)) {
  //     status = "onlySeconfHas";
  //   }

  //   // check value
  //   if (status !== "hasChanged") {
  //     if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
  //       diffObj[key] = "fuck";
  //     } else {
  //       const newKey = `${statuses[status]} ${key}`;
  //       diffObj[newKey] = _.has(obj1, key) ? value1 : value2;
  //     }
  //   } else {
  //     diffObj[`- ${key}`] = value1;
  //     diffObj[`+ ${key}`] = value2;
  //   }
  // }

  // return diffObj;
};

const getExtension = (filepath) => path.extname(filepath).slice(1);

const gendiff = (filepath1, filepath2, format = "stylish") => {
  const obj1 = parse(fs.readFileSync(filepath1), getExtension(filepath1));
  const obj2 = parse(fs.readFileSync(filepath2), getExtension(filepath2));

  switch (format) {
    case "stylish":
      return stylish(compareObjects(obj1, obj2));
    // case "plain":
    //   return plain(compareObjects(obj1, obj2));
    // case "json":
    //   return json(compareObjects(obj1, obj2));
    default:
      throw new Error("unknown formatName");
  }
};

export default gendiff;
