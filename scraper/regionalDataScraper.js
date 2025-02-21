const { fetchData, saveData } = require('./apiClient');

const endpoints = {
  provinsi: 'data_master_kode_provinsi',
  kabupatenKota: 'data_master_kode_kabupaten_kota',
  kecamatan: 'data_master_kode_kecamatan',
  desaKelurahan: 'data_master_kode_desa_kelurahan',
};

async function fetchDataByRegion(endpoint, regionName, regionNameKey, regionCodeKey) {
  const regionData = await fetchData(endpoint);
  if (regionData && regionData.length > 0) {
    const mappedData = regionData.map((region) => {
      // Dynamically extract and map the property names
      const { [regionNameKey]: nameValue, [regionCodeKey]: codeValue, ...rest } = region;
      return {
        nama_wilayah: nameValue,
        kode_wilayah: codeValue,
        level_wilayah: regionName,
        ...rest,
      };
    });
    saveData(regionName, mappedData);
    console.log(`${regionName} data saved.`);
  } else {
    console.error(`Failed to fetch ${regionName} data.`);
  }
}

// Main function for regional data scraping
async function scrapeRegionalData() {
  console.log('Starting data scraping...');

  await fetchDataByRegion(endpoints.provinsi, 'provinsi', 'nama_provinsi', 'kode_provinsi');  
  await fetchDataByRegion(endpoints.kabupatenKota, 'kabupaten_kota', 'nama_kabkota', 'kode_kabkota');
  await fetchDataByRegion(endpoints.kecamatan, 'kecamatan', 'nama_kecamatan', 'kode_kecamatan');
  await fetchDataByRegion(endpoints.desaKelurahan, 'desa_kelurahan', 'nama_desa_kelurahan', 'kode_desa_kelurahan');

  console.log('Data scraping completed.');
}

scrapeRegionalData();