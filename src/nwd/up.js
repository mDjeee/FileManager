import { sep } from "path";

function up(currentDir) {
  const pathArr = currentDir.split(sep);
  if(pathArr.length > 1) {
    pathArr.pop();
  }
  return pathArr.join(sep);
}

export default up;