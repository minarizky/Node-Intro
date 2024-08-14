const fs = require('fs');
const axios = require('axios');

const [command, outputFile, input] = process.argv.slice(2);

function handleOutput(data, outputPath) {
    if (outputPath) {
        fs.writeFile(outputPath, data, 'utf8', (err) => {
            if (err) {
                console.error(`Couldn't write to ${outputPath}:\n  ${err}`);
        process.exit(1);
        }
    });
    } else {
        console.log(data);
    }
}

function cat(filePath, outputPath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading ${filePath}:\n  ${err}`);
        process.exit(1);
      }
      handleOutput(data, outputPath);
    });
  }
  
  async function webCat(url, outputPath) {
    try {
      const response = await axios.get(url);
      handleOutput(response.data, outputPath);
    } catch (err) {
      console.error(`Error fetching ${url}:\n  ${err}`);
      process.exit(1);
    }
  }
  
  if (command === '--out') {
    if (input.startsWith('http')) {
      webCat(input, outputFile);
    } else {
      cat(input, outputFile);
    }
  } else {
    if (command.startsWith('http')) {
      webCat(command);
    } else {
      cat(command);
    }
  }
      