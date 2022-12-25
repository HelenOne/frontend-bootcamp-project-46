import { Command } from 'commander';
import gendiff from '../src/index.js';

const program = new Command();

program
  .description(
    `Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.`
  )
  .version("1.0.0")
  .option("-f, --format <type>", "output format", "stylish")
  .argument("<filepath1>")
  .argument("<filepath2>")
  .action((filepath1, filepath2) => {
    console.log(gendiff(filepath1, filepath2, program.opts().format));
  });

program.parse();
