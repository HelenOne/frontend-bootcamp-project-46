import { test, expect } from "@jest/globals";
import genDiff from "../index.js";
import _ from 'lodash';

test("My first test", () => {
  expect(10).toBe(10);
});

test("Compare plain objects", () => {
  const expected = genDiff('./__fixtures__/file1.json', './__fixtures__/file2.json');
  const actual = {
  '- follow': false,
  '  host': 'hexlet.io',
  '- proxy': '123.234.53.22',
  '- timeout': 50,
  '+ timeout': 20,
  '+ verbose': true
};
  expect(_.isEqual(expected, actual)).toBe(true);
});