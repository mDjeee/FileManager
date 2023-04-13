import { createReadStream, createWriteStream } from "fs";
import { join, sep } from "path";
import { homedir } from "os";

async function cp(currentDir, fileName, destFolder) {
  try {
    const rootDisk = homedir().split(sep)[0];
    const source = fileName.startsWith(rootDisk) ? fileName.split('/').join(sep) : join(currentDir, fileName);
    const dest = destFolder.startsWith(rootDisk) ? join(destFolder.split('/').join(sep), source.split(sep).pop()) : join(currentDir, destFolder, fileName);

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