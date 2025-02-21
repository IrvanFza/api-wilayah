// scraper/regionalDataScraper.js

const axios = require('axios');
const https = require('https');
const fs = require('fs');
const path = require('path');

const baseURL = 'https://api-e-database.kemendagri.go.id/api/';
const token = '51F890E2DF';

// Endpoints
const endpoints = {
  provinsi: 'data_master_kode_provinsi',
  kabupatenKota: 'data_master_kode_kabupaten_kota',
  kecamatan: 'data_master_kode_kecamatan',
  desaKelurahan: 'data_master_kode_desa_kelurahan',
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
async function scrapeRegionalData() {
  console.log('Starting data scraping...');

  let provinsi = await fetchData(endpoints.provinsi);
  if (provinsi.length > 0) {
    provinsi = provinsi.map((province) => {
      const { nama_provinsi, kode_provinsi, ...rest } = province;
      return {
        nama_wilayah: nama_provinsi,
        kode_wilayah: kode_provinsi,
        level_wilayah: 'provinsi',
        ...rest,
      };
    });
    saveData('provinsi', provinsi);
    console.log('Provinsi data saved.');
  } else {
    console.error('Failed to fetch Provinsi data.');
  }

  let kabupatenKota = await fetchData(endpoints.kabupatenKota);
  if (kabupatenKota.length > 0) {
    kabupatenKota = kabupatenKota.map((kabkota) => {
      const { nama_kabkota, kode_kabkota, ...rest } = kabkota;
      return {
        nama_wilayah: nama_kabkota,
        kode_wilayah: kode_kabkota,
        level_wilayah: 'kabupaten_kota',
        ...rest,
      };
    });
    saveData('kabupaten_kota', kabupatenKota);
    console.log('Kabupaten/Kota data saved.');
  } else {
    console.error('Failed to fetch Kabupaten/Kota data.');
  }

  let kecamatan = await fetchData(endpoints.kecamatan);
  if (kecamatan.length > 0) {
    kecamatan = kecamatan.map((kec) => {
      const { nama_kecamatan, kode_kecamatan, kode_kabkota, ...rest } = kec;
      return {
        nama_wilayah: nama_kecamatan,
        kode_wilayah: kode_kecamatan,
        level_wilayah: 'kecamatan',
        kode_kabupaten_kota: kode_kabkota,
        ...rest,
      };
    });
    saveData('kecamatan', kecamatan);
    console.log('Kecamatan data saved.');
  } else {
    console.error('Failed to fetch Kecamatan data.');
  }

  let desaKelurahan = await fetchData(endpoints.desaKelurahan);
  if (desaKelurahan.length > 0) {
    desaKelurahan = desaKelurahan.map((kel) => {
      const { nama_desa_kelurahan, kode_desa_kelurahan, kode_kabkota, ...rest } = kel;
      return {
        nama_wilayah: nama_desa_kelurahan,
        kode_wilayah: kode_desa_kelurahan,
        level_wilayah: 'desa_kelurahan',
        kode_kabupaten_kota: kode_kabkota,
        ...rest,
      };
    });
    saveData('desa_kelurahan', desaKelurahan);
    console.log('Desa/Kelurahan data saved.');
  } else {
    console.error('Failed to fetch Desa/Kelurahan data.');
  }

  console.log('Data scraping completed.');
}

scrapeRegionalData();
