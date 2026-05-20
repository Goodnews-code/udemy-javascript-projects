#!/usr/bin/env node

import caporal from "caporal";
const prog = caporal;
import debounce from "just-debounce-it";
import chokidar from "chokidar";
import * as fs from "node:fs";
import { spawn } from "node:child_process";
import chalk from "chalk";

prog
  .version("0.0.1")
  .argument("filename", "Name of the file to be executed")
  .action(async ({ filename }) => {
    const name = filename || "index.js";

    try {
      await fs.promises.access(name);
    } catch (err) {
      throw new Error(`Could not find the file ${name}`);
    }

    let proc;

    const start = debounce(() => {
      if (proc) {
        proc.kill();
      }

      console.log(chalk.blue(">>>>  Starting Processes..."));
      proc = spawn("node", [name], { stdio: "inherit" });
    }, 100);

    chokidar
      .watch(".")
      .on("add", start)
      .on("change", start)
      .on("unlink", start);
    // console.log(name);
  });

prog.parse(process.argv);
