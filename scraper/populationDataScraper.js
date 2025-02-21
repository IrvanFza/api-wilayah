const axios = require('axios');
const https = require('https');
const fs = require('fs');
const path = require('path');

const baseURL = 'https://api-e-database.kemendagri.go.id/api/';
const token = '51F890E2DF';

// Endpoints
const endpoints = {
  demografiKabkot: 'dukcapil_demografi_kabkot',
  jenisKelaminProv: 'dukcapil_jenis_kelamin_prov',
};

// Create an Axios instance with SSL verification disabled
const axiosInstance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
  baseURL: baseURL,
});

// Fetch data function
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

// Save data to JSON
function saveData(filename, data) {
  const filePath = path.join(__dirname, '..', 'data', `${filename}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Main function
async function scrapePopulationData() {
  console.log('Starting population data scraping...');

  const demografiKabkot = await fetchData(endpoints.demografiKabkot);
  saveData('demografi_kabkot', demografiKabkot);
  console.log('Demografi Kabupaten/Kota data saved.');

  const jenisKelaminProv = await fetchData(endpoints.jenisKelaminProv);
  saveData('jenis_kelamin_prov', jenisKelaminProv);
  console.log('Jenis Kelamin Provinsi data saved.');

  console.log('Population data scraping completed.');
}

scrapePopulationData();
