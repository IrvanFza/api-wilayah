const axios = require('axios');
const https = require('https');
const fs = require('fs');
const path = require('path');

const baseURL = 'https://api-e-database.kemendagri.go.id/api/';
const token = '51F890E2DF';

// Create an Axios instance with SSL verification disabled
const axiosInstance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
  baseURL: baseURL,
});

// Common fetch function to get data from an endpoint
async function fetchData(endpoint) {
  const url = `${baseURL}${endpoint}?token=${token}`;
  try {
    const response = await axiosInstance.get(url);
    if (response.data.status) {
      return response.data.data;
    } else {
      console.error(`Failed to fetch ${endpoint}:`, response.data.message);
      return [];
    }
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return [];
  }
}

// Common function to save data to a JSON file
function saveData(filename, data) {
  // Ensure that the target directory exists
  const targetDir = path.join(__dirname, '..', 'data', 'json');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  const filePath = path.join(targetDir, `${filename}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = {
  fetchData,
  saveData,
};