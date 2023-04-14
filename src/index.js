import { EOL, homedir, cpus, arch, userInfo } from 'os';
import { sep } from 'path';

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
import getHash from './hash/getHash.js';

const input = process.argv;
const username = getUsername(input);
greeting(username);
let currentDir = homedir()
console.log(`You are currently in ${currentDir}`);

const commands = {
  up: 'up',
  cd: 'cd',
  ls: 'ls',
  add: 'add',
  cat: 'cat',
  cp: 'cp',
  mv: 'mv',
  rm: 'rm',
  rn: 'rn',
  os: 'os',
  hash: 'hash',
}

const fileManage = () => {
  process.stdin.on('data', async data => {
    const commandString = data.toString().slice(0, (data.length - EOL.length));
    const command = commandString.toString().split(' ')[0];

    if(command === commands.cd) {
      const path = commandString.toString().split(' ')[1];
      currentDir = await cd(currentDir, path);
    }
    else if(command === commands.up) {
      currentDir = up(currentDir);
    }
    else if(command === commands.ls) {
      await ls(currentDir);
    }
    else if(command === commands.cat) {
      const fileName = commandString.toString().split(' ')[1];
      await cat(currentDir, fileName);
    }
    else if(command === commands.add) {
      const fileName = commandString.toString().split(' ')[1];
      await add(currentDir, fileName);
    }
    else if(command === commands.rn) {
      const oldFileName = commandString.toString().split(' ')[1];
      const newFileName = commandString.toString().split(' ')[2];
      await rn(currentDir, oldFileName, newFileName);
    }
    else if(command === commands.cp) {
      const fileName = commandString.toString().split(' ')[1];
      let destFolder = commandString.toString().split(' ')[2];
      if (destFolder === './') {
        destFolder = currentDir.split(sep).join('/');
      }
      await cp(currentDir, fileName, destFolder);
    }
    else if(command === commands.mv) {
      const fileName = commandString.toString().split(' ')[1];
      let destFolder = commandString.toString().split(' ')[2];
      if (destFolder === './') {
        destFolder = currentDir.split(sep).join('/');
      }
      await mv(currentDir, fileName, destFolder);
    }
    else if(command === commands.rm) {
      const fileName = commandString.toString().split(' ')[1];
      await rm(currentDir, fileName);
    }
    else if(command === commands.os) {
      const param = commandString.toString().split(' ')[1];

      if(param === '--EOL') {
        console.log(JSON.stringify(EOL));
      }
      else if(param === '--cpus') {
        console.log(cpus());
      }
      else if(param === '--homedir') {
        console.log(homedir());
      }
      else if(param === '--username') {
        console.log(userInfo().username);
      }
      else if(param === '--architecture') {
        console.log(arch());
      } else {
        console.log('Wrong param, try again')
      }
    }
    else if (command === commands.hash) {
      const fileName = commandString.toString().split(' ')[1];
      await getHash(currentDir, fileName);
    }
    else {
      console.log('Wrong command, try again!')
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