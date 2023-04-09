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
      console.log(`You are currently in ${currentDir}`);
    }

    if(command === 'up') {
      currentDir = up(currentDir);
      console.log(`You are currently in ${currentDir}`);
    }

    if(command === 'ls') {
      await ls(currentDir);
      console.log(`You are currently in ${currentDir}`);
    }

    if(command === '.exit') {
      goodbye(username);
    }
  });

  process.on('SIGINT', () => {
    goodbye(username);
  })
}

fileManage();