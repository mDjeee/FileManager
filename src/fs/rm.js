import { unlink } from "fs";

import getSourceFilePath from "../utils/getSourceFilepath.js";

async function rm(currentDir, fileName) {
  const filePath = getSourceFilePath(currentDir, fileName);

  unlink(filePath, (err) => {
    if(err) {
      console.log('Operation failed!');
    }
  })
}

export default rm;