const fs = require('fs');
const path = require('path');

function loadFile(fileDir, fileName, fileType = 'json') {
  const filePath = path.join(__dirname, '..', '..', 'data', fileType, fileDir, `${fileName}.${fileType}`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`File ${fileName} not found`);
  }

  return JSON.parse(fs.readFileSync(filePath));
}

function saveFile(fileDir, fileName, data, fileType = 'json') {
  const filePath = path.join(__dirname, '..', '..', 'data', fileType, fileDir);

  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath, { recursive: true });
  }

  const targetPath = path.join(filePath, `${fileName}.${fileType}`);
  fs.writeFileSync(targetPath, JSON.stringify(data, null, 2));

  console.log(`Successfully save ${fileName} as ${fileType.toUpperCase()}`);
}

module.exports = {
  loadFile,
  saveFile,
};