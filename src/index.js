import { EOL, homedir } from 'os';
import { cwd } from 'process';
import { readdir } from 'fs';
import path, { sep } from 'path';

import greeting from './utils/greeting.js';
import getUsername from './utils/getUsername.js';
import goodbye from './utils/goodbye.js';

import ls from './nwd/ls.js';
import cd from './nwd/cd.js';
import up from './nwd/up.js';
import cat from './fs/cat.js';
import add from './fs/add.js';
import rn from './fs/rn.js';
import cp from './fs/cp.js';
import mv from './fs/mv.js';
import rm from './fs/rm.js';

const input = process.argv;
const username = getUsername(input);
greeting(username);
let currentDir = homedir()
console.log(`You are currently in ${currentDir}`);

const fileManage = () => {
  process.stdin.on('data', async data => {
    const commandString = data.toString().slice(0, (data.length - EOL.length));
    const command = commandString.toString().split(' ')[0];

    if(command === 'cd') {
      const path = commandString.toString().split(' ')[1];
      currentDir = await cd(currentDir, path);
    }

    if(command === 'up') {
      currentDir = up(currentDir);
    }

    if(command === 'ls') {
      await ls(currentDir);
    }

    if(command === 'cat') {
      const fileName = commandString.toString().split(' ')[1];
      await cat(currentDir, fileName);
    }

    if(command === 'add') {
      const fileName = commandString.toString().split(' ')[1];
      await add(currentDir, fileName);
    }

    if(command === 'rn') {
      const oldFileName = commandString.toString().split(' ')[1];
      const newFileName = commandString.toString().split(' ')[2];
      await rn(currentDir, oldFileName, newFileName);
    }

    if(command === 'cp') {
      const fileName = commandString.toString().split(' ')[1];
      let destFolder = commandString.toString().split(' ')[2];
      if (destFolder === './') {
        destFolder = currentDir.split(sep).join('/');
      }
      await cp(currentDir, fileName, destFolder);
    }

    if(command === 'mv') {
      const fileName = commandString.toString().split(' ')[1];
      let destFolder = commandString.toString().split(' ')[2];
      if (destFolder === './') {
        destFolder = currentDir.split(sep).join('/');
      }
      await mv(currentDir, fileName, destFolder);
    }

    if(command === 'rm') {
      const fileName = commandString.toString().split(' ')[1];
      await rm(currentDir, fileName);
    }

    console.log(`You are currently in ${currentDir}`);

    if(command === '.exit') {
      goodbye(username);
    }
  });

  process.on('SIGINT', () => {
    goodbye(username);
  })
}

fileManage();