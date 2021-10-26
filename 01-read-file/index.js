const {createReadStream} = require('fs');
const path = require('path');
const {stdout} = require('process');

const stream = createReadStream(path.join(__dirname, 'text.txt'));

stream.pipe(stdout);