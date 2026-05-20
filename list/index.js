#!/usr/bin/env node

import * as fs from "node:fs";
import * as util from "node:util";
import chalk from "chalk";
import * as path from "node:path";

//Method #2
// const lstat = util.promisify(fs.lstat);

//Method #3
const { lstat } = fs.promises;

const targetDir = process.argv[2] || process.cwd();

fs.readdir(targetDir, async (err, filenames) => {
  if (err) {
    console.error(err);
    return;
  }

  const statPromises = filenames.map((filename) => {
    return lstat(path.join(targetDir, filename));
  });

  const allStats = await Promise.all(statPromises);

  for (let stats of allStats) {
    const index = allStats.indexOf(stats);

    if (stats.isFile()) {
      console.log(chalk.whiteBright(filenames[index]));
    } else {
      console.log(chalk.blue.bold(filenames[index]));
    }
  }
});

//Method #1
// const lstat = (filename) => {
//   return new Promise((resolve, reject) => {
//     fs.lstat(filename, (err, stats) => {
//       if (err) {
//         reject(err);
//       }

//       resolve(stats);
//     });
//   });
// };
