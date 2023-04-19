import { join, sep } from "path";
import { homedir } from "os";

function getDestFolderPath(currentDir, destFolder) {
  const rootDisk = homedir().split(sep)[0];
  const dest = destFolder.startsWith(rootDisk) ? join(destFolder.split('/').join(sep)) : join(currentDir, destFolder);

  return dest;
}

export default getDestFolderPath;