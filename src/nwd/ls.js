import { readdir } from "fs/promises";
import { stat } from "fs";
import { table } from "console";
import { join } from "path";
async function ls(currentDir) {
  try {
    const files = await readdir(currentDir);

    const pathTypesPromises = [];
    const pathTypes = [];

    files.forEach(file => {
      pathTypesPromises.push(new Promise(resolve => {
        stat(join(currentDir, file), (err, stats) => {
          stats.isDirectory() ? resolve('directory') : resolve('file')
        })
      }))
    })

    await Promise.all(pathTypesPromises).then(values => {
      pathTypes.push(...values);
    })

    const res = files.map((file, index) => {
      return {
        name: file,
        type: pathTypes[index]
      }
    })
    table(res)
  }
  catch {
    console.error('Operation failed');
  }
}

export default ls;