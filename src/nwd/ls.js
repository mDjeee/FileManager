import { readdir } from "fs";
import * as url from 'url';
function ls(dir) {
  try {
    const __dirname = url.fileURLToPath(new URL(dir, import.meta.url));
    console.log(dir);
  }
  catch {
    console.error('Operation failed');
  }
}

export default ls;