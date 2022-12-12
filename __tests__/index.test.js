import { test, expect } from "@jest/globals";
import genDiff from "../index.js";
import _ from "lodash";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) =>
  path.join(__dirname, "..", "__fixtures__", filename);
const readFile = (filename) =>
  fs.readFileSync(getFixturePath(filename), "utf-8");

const file1 = getFixturePath("file1.json");
const file2 = getFixturePath("file2.json");

test("Compare plain objects", () => {
  const expected = genDiff(file1, file2);
  const actual = readFile("diff.json");
  expect(expected).toEqual(JSON.parse(actual));
});
