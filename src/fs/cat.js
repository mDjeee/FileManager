import { createReadStream } from "fs";
import { join } from "path";

async function cat(currentDir, fileName) {
  try {
    const filePath = join(currentDir, fileName);

    const readable = createReadStream(filePath);
    readable.on('data', (data) => {
      console.log(data.toString());
    })

    readable.on('error', () => {
      console.error('Operation failed!');
    });
  }
  catch {
    console.error('Operation failed!')
  }
}

export default cat;