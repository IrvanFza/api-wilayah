const { fetchData } = require('./utils/kemendagriAPIClient');
const { saveFile } = require('./utils/fileHelper');

const path = {
  pendudukKabkot: 'dukcapil_jumlah_penduduk_kabkot',
  jenisKelaminKabkot: 'dukcapil_jenis_kelamin_kabkot',
  usiaProduktifKabkot: 'dukcapil_usia_produktif_kabkot',
  demografiKabkot: 'dukcapil_demografi_kabkot',
  pendudukProv: 'dukcapil_jumlah_penduduk_prov',
  jenisKelaminProv: 'dukcapil_jenis_kelamin_prov',
  usiaProduktifProv: 'dukcapil_usia_produktif_prov',
  demografiProv: 'dukcapil_demografi_prov',
};

function filterByLatestSemesterAndYear(populationData) {
  const groupedData = populationData.reduce((acc, item) => {
    const groupKey = ('kabkot' in item && item.kabkot)
      ? `${item.prov}_${item.kabkot}`
      : item.prov;
      
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(item);
    return acc;
  }, {});

  const latestData = [];

  Object.values(groupedData).forEach(group => {
    const validYearItems = group.filter(
      (item) => item.tahun != null && !isNaN(parseInt(item.tahun, 10))
    );

    const maxYear =
      validYearItems.length > 0
        ? Math.max(...validYearItems.map((item) => parseInt(item.tahun, 10)))
        : null;

    let groupWithMaxYear;
    if (maxYear !== null) {
      groupWithMaxYear = group.filter(
        (item) => parseInt(item.tahun, 10) === maxYear
      );
    } else {
      groupWithMaxYear = group.filter((item) => item.tahun == null);
    }

    const validSemesterItems = groupWithMaxYear.filter(
      (item) => item.semester != null && !isNaN(parseInt(item.semester, 10))
    );

    const maxSemester =
      validSemesterItems.length > 0
        ? Math.max(
            ...validSemesterItems.map((item) => parseInt(item.semester, 10))
          )
        : null;

    let latestRecords;
    if (maxSemester !== null) {
      latestRecords = groupWithMaxYear.filter(
        (item) => parseInt(item.semester, 10) === maxSemester
      );
    } else {
      latestRecords = groupWithMaxYear.filter((item) => item.semester == null);
    }

    latestData.push(...latestRecords);
  });

  return latestData;
}

async function scrapePopulationData() {
  console.log('Starting population data scraper...\n');

  const pendudukKabkotData = await fetchData(path.pendudukKabkot);
  const latestPendudukKabkotData = filterByLatestSemesterAndYear(pendudukKabkotData)
  saveFile('population', path.pendudukKabkot, latestPendudukKabkotData);

  const jenisKelaminKabkotData = await fetchData(path.jenisKelaminKabkot);
  const latestJenisKelaminKabkotData = filterByLatestSemesterAndYear(jenisKelaminKabkotData);
  saveFile('population', path.jenisKelaminKabkot, latestJenisKelaminKabkotData);

  const usiaProduktifKabkotData = await fetchData(path.usiaProduktifKabkot);
  const latestUsiaProduktifKabkotData = filterByLatestSemesterAndYear(usiaProduktifKabkotData);
  saveFile('population', path.usiaProduktifKabkot, latestUsiaProduktifKabkotData);

  const demografiKabkotData = await fetchData(path.demografiKabkot);
  const latestDemografiKabkotData = filterByLatestSemesterAndYear(demografiKabkotData);
  saveFile('population', path.demografiKabkot, latestDemografiKabkotData);

  const pendudukProvData = await fetchData(path.pendudukProv);
  const latestPendudukProvData = filterByLatestSemesterAndYear(pendudukProvData);
  saveFile('population', path.pendudukProv, latestPendudukProvData);

  const jenisKelaminProvData = await fetchData(path.jenisKelaminProv);
  const latestJenisKelaminProvData = filterByLatestSemesterAndYear(jenisKelaminProvData);
  saveFile('population', path.jenisKelaminProv, latestJenisKelaminProvData);

  const usiaProduktifProvData = await fetchData(path.usiaProduktifProv);
  const latestUsiaProduktifProvData = filterByLatestSemesterAndYear(usiaProduktifProvData);
  saveFile('population', path.usiaProduktifProv, latestUsiaProduktifProvData);

  const demografiProvData = await fetchData(path.demografiProv);
  const latestDemografiProvData = filterByLatestSemesterAndYear(demografiProvData);
  saveFile('population', path.demografiProv, latestDemografiProvData);

  console.log('\nFinished scraping population data.');
}

scrapePopulationData();