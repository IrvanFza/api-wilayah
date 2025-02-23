const fs = require('fs');
const path = require('path');

/**
 * Wraps the raw data array into an API response format.
 *
 * @param {Array} dataArray - Array of data items.
 * @returns {Object} API response object.
 */
function createAPIResponse(dataArray) {
  return {
    status: 'success',
    total: dataArray.length,
    data: dataArray
  };
}

/**
 * Splits a JSON file by grouping its records based on a specific field,
 * then writes each group into its own file using API response structure.
 *
 * @param {string} sourceFile - The JSON file name in the data folder.
 * @param {string} outFolder - The name of the target folder inside the api folder.
 * @param {string} groupByField - The field in each record to group by.
 */
function splitJSONData(sourceFile, outFolder, groupByField) {
  const inputPath = path.join(__dirname, '..', '..', 'data', 'json', 'region', sourceFile);
  let data;
  try {
    const fileContent = fs.readFileSync(inputPath, 'utf-8');
    data = JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error reading or parsing ${sourceFile}:`, error);
    return;
  }

  // Group data by the given field
  const groups = data.reduce((acc, item) => {
    const key = item[groupByField];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});

  // Ensure that the target directory exists
  const targetDir = path.join(__dirname, '..', '..', 'api', outFolder);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Write each group into its own file with the API response format
  Object.keys(groups).forEach((key) => {
    const apiResponse = createAPIResponse(groups[key]);
    const outputPath = path.join(targetDir, `${key}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(apiResponse, null, 2));
    console.log(`Created ${outputPath} with ${groups[key].length} record(s).`);
  });
}

/**
 * Copies a JSON file from the data folder to the api folder after wrapping its content 
 * with createAPIResponse() so that it behaves like the other API responses.
 *
 * @param {string} sourceFile - The JSON file name in the data folder.
 */
function copyAndFormatJSONFile(sourceFile) {
  const sourcePath = path.join(__dirname, '..', '..', 'data', 'json', 'region', sourceFile);
  let data;
  try {
    const fileContent = fs.readFileSync(sourcePath, 'utf-8');
    data = JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error reading or parsing ${sourceFile}:`, error);
    return;
  }

  // Wrap the raw data using the API response structure
  const apiResponse = createAPIResponse(data);

  // Ensure that the API folder exists
  const targetDir = path.join(__dirname, '..', '..', 'api');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const targetPath = path.join(targetDir, sourceFile);
  try {
    fs.writeFileSync(targetPath, JSON.stringify(apiResponse, null, 2));
    console.log(`Created ${targetPath} with ${data.length} record(s).`);
  } catch (error) {
    console.error(`Error wrapping and writing ${sourceFile}:`, error);
  }
}

/**
 * Splits all necessary JSON files:
 * - kabupaten_kota.json is split by "kode_provinsi"
 * - kecamatan.json is split by "kode_kabupaten_kota"
 * - desa_kelurahan.json is split by "kode_kecamatan"
 */
function splitAllData() {
  splitJSONData('kabupaten_kota.json', 'kabupaten_kota', 'kode_provinsi');
  splitJSONData('kecamatan.json', 'kecamatan', 'kode_kabupaten_kota');
  splitJSONData('desa_kelurahan.json', 'desa_kelurahan', 'kode_kecamatan');
}

// Process the splitting of JSON data
splitAllData();

// Copy provinsi.json into the api folder and format it using createAPIResponse()
copyAndFormatJSONFile('provinsi.json');