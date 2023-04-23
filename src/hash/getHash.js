import crypto from 'crypto';
import { readFileSync } from 'fs';
import getSourceFilePath from '../utils/getSourceFilepath.js';

async function getHash(currentDir, fileName) {
  try {
    const filePath = getSourceFilePath(currentDir, fileName);
    const fileBuffer = readFileSync(filePath);

    const hashSum = crypto.createHash('sha256');
    hashSum.update(fileBuffer);

    const hex = hashSum.digest('hex');

    console.log(hex);
  }
  catch {
    console.log('Operation failed');
  }
}

export default getHash;