const axios = require('axios');
const https = require('https');

const baseURL = 'https://api-e-database.kemendagri.go.id/api/';
const token = '51F890E2DF';

const axiosInstance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
  baseURL: baseURL,
});

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

module.exports = {
  fetchData
};