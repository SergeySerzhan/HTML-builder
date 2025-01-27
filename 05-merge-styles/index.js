const path = require('path');
const {readdir, open} = require('fs/promises');

(async  function () {
  const pathToDir = path.join(__dirname, 'styles');

  const bundle = (await open(path.join(__dirname, 'project-dist', 'bundle.css'), 'w')).createWriteStream();

  const files = await readdir(pathToDir, {withFileTypes: true});

  for (const file of files) {
    if(file.isFile() && path.extname(path.join(pathToDir, file.name)) === '.css') {
      const fd = await open(path.join(pathToDir, file.name));
      fd.createReadStream().pipe(bundle, {end: false});
    }
  }
})();
