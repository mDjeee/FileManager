import { homedir } from 'os';
import { sep, join } from 'path';

function getSourceFilePath(currentDir, fileName) {
  const rootDisk = homedir().split(sep)[0];
  const source = fileName.startsWith(rootDisk) ? fileName.split('/').join(sep) : join(currentDir, fileName);

  return source;
}

export default getSourceFilePath;