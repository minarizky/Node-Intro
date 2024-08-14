const fs = require('fs');
const path = process.argv[2];

function cat(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading ${filePath}:\n  ${err}`);
      process.exit(1);
    }
    console.log(data);
  });
}

cat(path);
