const { fetchData } = require('./utils/kemendagriAPIClient');
const { saveFile } = require('./utils/fileHelper');

const path = {
  provinsi: 'data_master_kode_provinsi',
  kabupatenKota: 'data_master_kode_kabupaten_kota',
  kecamatan: 'data_master_kode_kecamatan',
  desaKelurahan: 'data_master_kode_desa_kelurahan',
};

async function fetchDataByRegion(endpointPath, regionName, regionNameKey, regionCodeKey) {
  const regionData = await fetchData(endpointPath);
  if (regionData && regionData.length > 0) {
    const mappedData = regionData.map((region) => {
      const { [regionNameKey]: nameValue, [regionCodeKey]: codeValue, ...rest } = region;
      return {
        nama_wilayah: nameValue,
        kode_wilayah: codeValue,
        level_wilayah: regionName,
        ...rest,
      };
    });
    saveFile('region', regionName, mappedData);
  } else {
    console.error(`Skip scraping ${regionName}, data is empty...`);
  }
}

async function scrapeRegionalData() {
  console.log('Starting region data scraper...\n');

  await fetchDataByRegion(path.provinsi, 'provinsi', 'nama_provinsi', 'kode_provinsi');  
  await fetchDataByRegion(path.kabupatenKota, 'kabupaten_kota', 'nama_kabkota', 'kode_kabkota');
  await fetchDataByRegion(path.kecamatan, 'kecamatan', 'nama_kecamatan', 'kode_kecamatan');
  await fetchDataByRegion(path.desaKelurahan, 'desa_kelurahan', 'nama_desa_kelurahan', 'kode_desa_kelurahan');

  console.log('\nFinished scraping region data.');
}

scrapeRegionalData();