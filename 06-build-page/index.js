const path = require('path');
const {mkdir, open, readFile, readdir} = require('fs/promises');
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

})();