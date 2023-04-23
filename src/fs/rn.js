import { rename } from "fs";
import { join } from "path";

async function rn(currentDir, oldFileName, newFileName) {
  const oldDir = join(currentDir, oldFileName);
  const newDir = join(currentDir, newFileName);
  rename(oldDir, newDir, (err) => {
    if(err) {
      console.error('Operation failed!');
    }
  })
}

export default rn;