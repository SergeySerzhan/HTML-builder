const path = require('path');
const {mkdir, open, readFile, readdir, copyFile} = require('fs/promises');
const {createInterface} = require('readline');

(async function () {
  // 1. Create index.html from template.html replace with components
  const pathToProjectDir = path.join(__dirname, 'project-dist');

  await mkdir(pathToProjectDir, {recursive: true});

  const template = (await open(path.join(__dirname, 'template.html'))).createReadStream();

  let index = (await open(path.join(pathToProjectDir, 'index.html'), 'w')).createWriteStream();

  const rl = createInterface(template);

  rl.on('line', async (line) => {
    if(/{{(.*?)}}/.test(line)) {
      const componentName = line.match(/{{(.*?)}}/)[1];
      const component = await readFile(path.join(__dirname, 'components', `${componentName}.html`), 'utf-8');

      index.write(`${line.replace(/{{(.*?)}}/, component)}\n`);
    } else index.write(`${line}\n`);
  });

  // 2. Create style.css from css in styles folder
  const pathToStylesDir = path.join(__dirname, 'styles');

  const style = (await open(path.join(__dirname, 'project-dist', 'style.css'), 'w')).createWriteStream();

  const files = await readdir(pathToStylesDir, {withFileTypes: true});

  for (const file of files) {
    if(file.isFile() && path.extname(path.join(pathToStylesDir, file.name)) === '.css') {
      const fd = await open(path.join(pathToStylesDir, file.name));
      fd.createReadStream().pipe(style, {end: false});
    }
  }

  // 3. Copy assets folder in project-dist folder
  const pathToAssetsDir = path.join(__dirname, 'assets');
  const pathToAssetsDirCopy = path.join(pathToProjectDir, 'assets');


  async function createFolder(pathToFolder, pathToCopyFolder) {
    await mkdir(pathToCopyFolder, {recursive: true});

    const files = await readdir(pathToFolder, {withFileTypes: true});

    for(const file of files) {
      if(file.isFile()) await copyFile(path.join(pathToFolder, file.name), path.join(pathToCopyFolder, file.name));
      else await createFolder(path.join(pathToFolder, file.name), path.join(pathToCopyFolder, file.name));
    }
  }

  await createFolder(pathToAssetsDir, pathToAssetsDirCopy);

})();