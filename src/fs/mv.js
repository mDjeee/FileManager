import { createReadStream, createWriteStream, unlink } from "fs";
import { join, sep } from "path";
import { homedir } from "os";
import getSourceFilePath from "../utils/getSourceFilepath.js";
import getDestFilePath from "../utils/getDestFilePath.js";

async function mv(currentDir, fileName, destFolder) {
  try {
    const source = getSourceFilePath(currentDir, fileName);
    const dest = getDestFilePath(currentDir, destFolder, fileName, source);

    const readable = createReadStream(source);
    const writable = createWriteStream(dest);

    readable.on('error', () => {
      console.log('Operation failed!');
      console.log(`You are currently in ${currentDir}`);
    })
    
    writable.on('error', () => {
      console.log('Operation failed!');
      console.log(`You are currently in ${currentDir}`);
    })

    readable.pipe(writable);

    writable.on('finish', () => {
      unlink(source, (err) => {
        if(err) {
          console.log('Operation failed!');
        }
        console.log(`You are currently in ${currentDir}`);
      })
    })
  }
  catch {
    console.error('Operation failed!')
  }
}

export default mv;