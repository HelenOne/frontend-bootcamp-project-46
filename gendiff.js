const { Command } = require("commander");
const program = new Command();

program
  .description(
    `Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.`
  )
  .version("1.0.0")
  .option("-f, --format <type>", "output format")

program.parse();
