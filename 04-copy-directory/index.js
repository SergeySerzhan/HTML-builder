const {mkdir, readdir, copyFile, rm} = require('fs/promises');
const path = require('path');

(async function () {
  const pathToDir = path.join(__dirname, 'files');
  const pathToDirCopy = path.join(__dirname, 'files-copy');

  await rm(pathToDirCopy, {recursive: true, force :true});

  await mkdir(pathToDirCopy, {recursive: true});

  const files = await readdir(pathToDir);

  for(const file of files) {
    await copyFile(path.join(pathToDir, file), path.join(pathToDirCopy, file));
  }
})();
