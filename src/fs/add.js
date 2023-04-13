import { writeFile } from "fs";
import { join } from "path";

async function add(currentDir, fileName) {
  writeFile(join(currentDir, fileName), '', (err) => {
    if(err) {
      console.error('Operation failed!');
    }
  })
}

export default add;