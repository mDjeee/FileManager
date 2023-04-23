import { createReadStream, createWriteStream } from "fs";
import getSourceFilePath from "../utils/getSourceFilepath.js";
import getDestFilePath from "../utils/getDestFilePath.js";

async function cp(currentDir, fileName, destFolder) {
  try {
    const source = getSourceFilePath(currentDir, fileName);
    const dest = getDestFilePath(currentDir, destFolder, fileName, source);

    const readable = createReadStream(source);
    const writable = createWriteStream(dest);

    readable.on('error', () => {
      console.log('Operation failed!')
    })
    
    writable.on('error', () => {
      console.log('Operation failed!')
    })

    readable.pipe(writable);
  }
  catch {
    console.error('Operation failed!')
  }
}

export default cp;