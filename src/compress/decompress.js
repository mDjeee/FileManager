import { createGunzip } from 'zlib';
import { createReadStream, createWriteStream, mkdir } from 'fs';
import { pipeline } from 'stream';
import { parse } from 'path';

import getSourceFilePath from '../utils/getSourceFilepath.js';
import getDestFolderPath from '../utils/getDestFolderPath.js';
import { join } from 'path';

async function decompress(currentDir, fileName, destFolder) {
  
  try {
    const source = getSourceFilePath(currentDir, fileName);
    const dest = join(getDestFolderPath(currentDir, destFolder), parse(fileName).name);
    
    const readable = createReadStream(source);
    const writable = createWriteStream(dest);
    const unzip = createGunzip();

    mkdir(getDestFolderPath(currentDir, destFolder), { recursive: true }, (err) => {
      if(err) {
        console.log('Operation failed!');
      }
      readable.pipe(unzip).pipe(writable);
    });
  }
  catch {
    console.log('Operation failed!');
  }
}

export default decompress;