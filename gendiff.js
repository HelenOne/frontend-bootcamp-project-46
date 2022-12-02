const { Command } = require("commander");
const program = new Command();

program
  .description("Usage: gendiff [options]")
  .version("1.0.0");


program.parse();
