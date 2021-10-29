const {mkdir, readdir, copyFile} = require('fs/promises');
const path = require('path');

(async function () {
  const pathToDir = path.join(__dirname, 'files');
  const pathToDirCopy = path.join(__dirname, 'files-copy');
  await mkdir(pathToDirCopy, {recursive: true});

  const files = await readdir(pathToDir);

  for(const file of files) {
    await copyFile(path.join(pathToDir, file), path.join(pathToDirCopy, file));
  }
})();
