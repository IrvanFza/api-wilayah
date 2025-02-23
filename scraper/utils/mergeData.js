const { loadFile, saveFile } = require('./fileHelper');

function addProvinsiInfoToKabupatenKota() {
  const kabupatenKotaData = loadFile('region', 'kabupaten_kota');
  const provinsiData = loadFile('region', 'provinsi');

  const mergedKabupatenKotaData = kabupatenKotaData.map((city) => {
    const matchedProvinsi = provinsiData.find((prov) => prov.kode_wilayah === city.kode_provinsi);
    return {
      ...city,
      nama_provinsi: matchedProvinsi ? matchedProvinsi.nama_wilayah : null,
    };
  });

  saveFile('region', 'kabupaten_kota', mergedKabupatenKotaData);
}

function mergeProvinsiData(provinsiData, populationData, populationDataName) {
  const mergedProvinsiData = provinsiData.map((province) => {
    const filteredPopulationData = populationData.find(
      (population) => population.prov === province.nama_wilayah
    );

    const { prov, ...rest } = filteredPopulationData || {};

    return {
      ...province,
      populasi: {
        ...province.populasi,
        [populationDataName]: rest || {}
      },
    };
  });

  saveFile('region', 'provinsi', mergedProvinsiData);
  return mergedProvinsiData;
}

function mergeKabupatenKotaData(kabupatenKotaData, populationData, populationDataName) {
  const mergedKabupatenKotaData = kabupatenKotaData.map((city) => {
    const filteredPopulationData = populationData.find(
      (population) => population.kabkot === city.nama_wilayah && population.prov === city.nama_provinsi
    );

    const { prov, kabkot, ...rest } = filteredPopulationData || {};

    return {
      ...city,
      populasi: {
        ...city.populasi,
        [populationDataName]: rest || {}
      },
    };
  });

  saveFile('region', 'kabupaten_kota', mergedKabupatenKotaData);
  return mergedKabupatenKotaData;
}

function mergeData() {
  // Because there might be same kabupaten/kota name
  // We need to add provinsi info to kabupaten/kota data for matching data
  addProvinsiInfoToKabupatenKota();

  // Load region data
  let provinsiData = loadFile('region', 'provinsi');
  let kabupatenKotaData = loadFile('region', 'kabupaten_kota');

  // Load provinsi population data
  const jumlahPendudukProvData = loadFile('population', 'dukcapil_jumlah_penduduk_prov')
  const jenisKelaminProvData = loadFile('population', 'dukcapil_jenis_kelamin_prov')
  const demografiProvData = loadFile('population', 'dukcapil_demografi_prov')
  const usiaProduktifProvData = loadFile('population', 'dukcapil_usia_produktif_prov')

  // Merge population data into provinsi
  provinsiData = mergeProvinsiData(provinsiData, jumlahPendudukProvData, 'penduduk');
  provinsiData = mergeProvinsiData(provinsiData, jenisKelaminProvData, 'jenis_kelamin');
  provinsiData = mergeProvinsiData(provinsiData, demografiProvData, 'demografi');
  provinsiData = mergeProvinsiData(provinsiData, usiaProduktifProvData, 'usia_produktif');

  // Load provinsi population data
  const jumlahPendudukKabkotData = loadFile('population', 'dukcapil_jumlah_penduduk_kabkot')
  const jenisKelaminKabkotData = loadFile('population', 'dukcapil_jenis_kelamin_kabkot')
  const demografiKabkotData = loadFile('population', 'dukcapil_demografi_kabkot')
  const usiaProduktifKabkotData = loadFile('population', 'dukcapil_usia_produktif_kabkot')

  // Merge population data into provinsi
  kabupatenKotaData = mergeKabupatenKotaData(kabupatenKotaData, jumlahPendudukKabkotData, 'penduduk');
  kabupatenKotaData = mergeKabupatenKotaData(kabupatenKotaData, jenisKelaminKabkotData, 'jenis_kelamin');
  kabupatenKotaData = mergeKabupatenKotaData(kabupatenKotaData, demografiKabkotData, 'demografi');
  kabupatenKotaData = mergeKabupatenKotaData(kabupatenKotaData, usiaProduktifKabkotData, 'usia_produktif');
}

mergeData();
