const {readdir, stat} = require('fs/promises');
const path = require('path');

const pathToFolder = path.join(__dirname, 'secret-folder');

(async function () {
  const files = await readdir(pathToFolder, {withFileTypes: true});
  for (const file of files) {
    if(file.isFile()) {
      const pathToFile = path.join(pathToFolder, file.name);
      const data = await stat(pathToFile);
      console.log(`${file.name.split('.')[0]} - ${path.extname(pathToFile).slice(1)} - ${data.size}b`);
    }
  }
})();




