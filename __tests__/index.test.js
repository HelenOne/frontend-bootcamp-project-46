import { test, expect } from "@jest/globals";
import genDiff from "../src/index.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) =>
  path.join(__dirname, "..", "__fixtures__", filename);
const readFile = (filename) =>
  fs.readFileSync(getFixturePath(filename), "utf-8").replace(/\r/g, "");

const file1 = getFixturePath("file1.json");
const file2 = getFixturePath("file2.json");

const yaml1 = getFixturePath("file1.yml");
const yaml2 = getFixturePath("file2.yml");

test("Check genDiff with json", () => {
  const expected = readFile("diff.txt");
  const actual = genDiff(file1, file2);
  expect(expected).toEqual(actual);
});

test("Check genDiff with yaml", () => {
  const expected = readFile("diff.txt");
  const actual = genDiff(yaml1, yaml2);
  expect(expected).toEqual(actual);
});

test("Check genDiff with -f plain", () => {
  const expected = readFile("diffPlain.txt");
  const actual = genDiff(yaml1, yaml2, "plain");
  expect(expected).toEqual(actual);
});

test("Check genDiff with -f json", () => {
  const expected = readFile("diff.json");
  const actual = genDiff(file1, file2, "json");
  expect(expected).toEqual(actual);
});
