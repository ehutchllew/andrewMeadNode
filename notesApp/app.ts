import chalk from "chalk";
import { getNotes } from "./notes";

console.log(getNotes());

const msg: string = chalk.inverse.green("Success!");
console.log(msg);
