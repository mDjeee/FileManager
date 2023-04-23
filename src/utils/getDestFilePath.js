import { join, sep } from "path";
import { homedir } from "os";

function getDestFilePath(currentDir, destFolder, fileName, source) {
  const rootDisk = homedir().split(sep)[0];
  const dest = destFolder.startsWith(rootDisk) ? join(destFolder.split('/').join(sep), source.split(sep).pop()) : join(currentDir, destFolder, fileName);

  return dest;
}

export default getDestFilePath;