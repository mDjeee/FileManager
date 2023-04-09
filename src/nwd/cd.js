import { sep, join } from "path";
import { access } from "fs";

async function cd(currentDir, path) {
  let pathArr = path.startsWith('.') ? path.slice(1).split('/') : path.split('/');
  pathArr = pathArr.filter(el => el.length !== 0);
  const correctPath = pathArr.join(sep);
  let newDir = join(currentDir, correctPath);

  return new Promise((resolve) => {
    access(newDir, (err) => {
      if(!err) {
        resolve(newDir);
      }
      else {
        console.log('Operation failed!')
        console.log('Directory does not exist!')
        resolve(currentDir);
      }
    })
  })
}

export default cd;