const readline = require('readline');
const {stdin, stdout} = require('process');
const {createWriteStream} = require('fs');
const path = require('path');

const url = path.join(__dirname, '/out.txt');

const file = createWriteStream(url);

const rl = readline.createInterface({input: stdin, output: stdout, prompt: 'Type something here > '});

rl.prompt();

rl.on('line', (line) => {
  if(line === 'exit') rl.close();
  file.write(`${line}\n`);
  rl.prompt();
});

rl.on('close', () => {
  rl.clearLine(stdout);
  console.log('Goodbye:)');
});