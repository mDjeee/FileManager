import { createGzip } from 'zlib';
import { createReadStream, createWriteStream, mkdir } from 'fs';
import { pipeline } from 'stream';

import getSourceFilePath from '../utils/getSourceFilepath.js';
import getDestFilePath from '../utils/getDestFilePath.js';

async function compress(currentDir, fileName, destFolder) {
  
  try {
    const source = getSourceFilePath(currentDir, fileName);
    const dest = getDestFilePath(currentDir, destFolder, fileName, source) + '.gz';
    
    const readable = createReadStream(source);
    const writable = createWriteStream(dest);
  
    const gzip = createGzip();
  
    readable.pipe(gzip).pipe(writable);

    readable.on('error', (err) => {
      if(err) {
        console.log('Operation failed!');
      }
    })

    writable.on('error', (err) => {
      if(err) {
        console.log('Operation failed!');
      }
    })
  }
  catch {
    console.log('Operation failed!');
  }
}

export default compress;