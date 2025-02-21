const { fetchData, saveData } = require('./apiClient');

const endpoints = {
  demografiKabkot: 'dukcapil_demografi_kabkot',
  jenisKelaminProv: 'dukcapil_jenis_kelamin_prov',
};

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