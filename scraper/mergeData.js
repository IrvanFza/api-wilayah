// scraper/mergeData.js

const fs = require('fs');
const path = require('path');

function loadData(filename) {
  const filePath = path.join(__dirname, '..', 'data', `${filename}.json`);
  return JSON.parse(fs.readFileSync(filePath));
}

function saveData(filename, data) {
  const filePath = path.join(__dirname, '..', 'data', `${filename}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function mergeData() {
  // Load regional data
  const provinsi = loadData('provinsi');
  const kabupatenKota = loadData('kabupaten_kota');
  const kecamatan = loadData('kecamatan');
  const desaKelurahan = loadData('desa_kelurahan');

  // Load population data
  let demografiKabkot = loadData('demografi_kabkot');
  const jenisKelaminProv = loadData('jenis_kelamin_prov');

  // Merge population data into provinsi
  const mergedProvinsiData = provinsi.map((province) => {
    const populationData = jenisKelaminProv.find(
      (pop) => pop.prov.toUpperCase() === province.nama_provinsi.toUpperCase()
    );
    const { prov, ...rest } = populationData || {};
    return {
      ...province,
      population: rest || {},
    };
  });

  saveData('provinsi', mergedProvinsiData);
  console.log('Merged Provinsi data saved.');

  // Merge kabupaten/kota using demografiKabkot
  const mergedKabupatenKotaData = kabupatenKota.map((city) => {
    demografiKabkot = demografiKabkot.filter(demografi => demografi.kabkot);
    const demografiKabkotData = demografiKabkot.find(
      (demografi) => demografi.kabkot.toUpperCase() === city.nama_kabkota.toUpperCase()
    );
    const { prov, kabkot, ...rest } = demografiKabkotData || {};
    return {
      ...city,
      demografi: rest || {},
    };
  });

  saveData('kabupaten_kota', mergedKabupatenKotaData);
  console.log('Merged Kabupaten/Kota data saved.');
}

mergeData();
