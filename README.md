# Data Wilayah Indonesia API

[![Node.js](https://img.shields.io/badge/Node.js-v14%2B-brightgreen)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-4.x-blue)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

An API service providing detailed data about Indonesian administrative regions and demographic information.

## Table of Contents

- [Data Wilayah Indonesia API](#data-wilayah-indonesia-api)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
    - [Development Mode](#development-mode)
    - [Production Mode](#production-mode)
  - [API Endpoints](#api-endpoints)
    - [Provinces (Provinsi)](#provinces-provinsi)
    - [Regencies/Cities (Kabupaten/Kota)](#regenciescities-kabupatenkota)
    - [Districts (Kecamatan)](#districts-kecamatan)
    - [Villages/Sub-districts (Desa/Kelurahan)](#villagessub-districts-desakelurahan)
  - [Data Scraping](#data-scraping)
    - [Manual Data Update](#manual-data-update)
    - [Automated Data Update](#automated-data-update)
  - [Project Structure](#project-structure)
  - [Contributing](#contributing)
  - [License](#license)

## Introduction

This project provides a RESTful API that serves comprehensive data on Indonesian administrative regions, including provinces, regencies/cities, districts, and villages/sub-districts, along with demographic information such as population by age groups. The data is sourced from the Ministry of Home Affairs of Indonesia and is regularly updated.

## Features

- **Detailed Regional Data**: Access information on all levels of Indonesian administrative regions.
- **Demographic Information**: Get population data segmented by various age groups.
- **Regular Updates**: Automated data scraping ensures the data is current.
- **Easy Integration**: Simple RESTful endpoints for seamless integration into other applications.
- **CORS Enabled**: Cross-Origin Resource Sharing is enabled to allow API access from different domains.

## Prerequisites

- **Node.js**: Version 14 or higher.
- **npm**: Comes with Node.js.
- **Git**: For cloning the repository.

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/IrvanFza/api-wilayah.git
   cd api-wilayah
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

## Running the Project

### Development Mode

To run the project in development mode with live reloading using `nodemon`:

```bash
npm run dev
```

This will start the server on the default port **3000**. You can change the port by setting the `PORT` environment variable.

### Production Mode

To run the project in production mode:

```bash
npm start
```

## API Endpoints

The API provides the following endpoints:

### Provinces (Provinsi)

- **Get All Provinces**

  ```http
  GET /api/provinsi
  ```

- **Response**

  ```json
  {
    "status": "success",
    "total": 34,
    "data": [
      {
        "nama_wilayah": "ACEH",
        "kode_wilayah": "11",
        "level_wilayah": "provinsi",
        "population": {
          "usia_0_4_thn": "58655",
          "usia_5_9": "69725",
          // ... other age groups
          "tahun": "2021"
        }
      },
      // ... other provinces
    ]
  }
  ```

### Regencies/Cities (Kabupaten/Kota)

- **Get Regencies/Cities by Province Code**

  ```http
  GET /api/kabupaten-kota/:kode_provinsi
  ```

  **Parameter**

  - `kode_provinsi` (string): Province code (e.g., `11` for Aceh).

- **Response**

  ```json
  {
    "status": "success",
    "total": 23,
    "data": [
      {
        "nama_wilayah": "KAB. ACEH SELATAN",
        "kode_wilayah": "11.01",
        "level_wilayah": "kabupaten_kota",
        "kode_provinsi": "11",
        "demografi": {
          "usia_0_4_thn": "130813",
          "usia_5_9": "159457",
          // ... other age groups
          "tahun": "2021"
        }
      },
      // ... other regencies/cities
    ]
  }
  ```

### Districts (Kecamatan)

- **Get Districts by Regency/City Code**

  ```http
  GET /api/kecamatan/:kode_kabupaten_kota
  ```

  **Parameter**

  - `kode_kabupaten_kota` (string): Regency/City code (e.g., `11.01` for Kab. Aceh Selatan).

- **Response**

  ```json
  {
    "status": "success",
    "total": 10,
    "data": [
      {
        "nama_wilayah": "Bakongan",
        "kode_wilayah": "11.01.01",
        "level_wilayah": "kecamatan",
        "kode_kabupaten_kota": "11.01",
        "kode_provinsi": "11"
      },
      // ... other districts
    ]
  }
  ```

### Villages/Sub-districts (Desa/Kelurahan)

- **Get Villages/Sub-districts by District Code**

  ```http
  GET /api/desa-kelurahan/:kode_kecamatan
  ```

  **Parameter**

  - `kode_kecamatan` (string): District code (e.g., `11.01.01` for Bakongan).

- **Response**

  ```json
  {
    "status": "success",
    "total": 15,
    "data": [
      {
        "nama_wilayah": "Gampong A",
        "kode_wilayah": "11.01.01.01",
        "level_wilayah": "desa_kelurahan",
        "kode_kecamatan": "11.01.01",
        "kode_kabupaten_kota": "11.01",
        "kode_provinsi": "11"
      },
      // ... other villages/sub-districts
    ]
  }
  ```

## Data Scraping

The data for this project is scraped using custom scripts located in the `scraper/` directory. The scraping process collects regional and demographic data from the official API provided by the Ministry of Home Affairs (Kemendagri).

### Manual Data Update

To manually update the data, follow these steps:

1. **Run the Regional Data Scraper**

   ```bash
   node scraper/regionalDataScraper.js
   ```

   This script fetches the latest regional data and saves it to the `data/` directory.

2. **Run the Population Data Scraper**

   ```bash
   node scraper/populationDataScraper.js
   ```

   This script fetches the latest population demographic data.

3. **Merge the Data**

   ```bash
   node scraper/mergeData.js
   ```

   This script merges the regional and demographic data into comprehensive JSON files.

### Automated Data Update

Data updates are automated using GitHub Actions. The workflow is defined in `.github/workflows/scraper.yml` and is scheduled to run every Sunday at midnight. It performs the following steps:

- Checks out the repository.
- Installs dependencies.
- Runs the data scraping scripts.
- Commits and pushes any changes to the data files.

## Project Structure

```plaintext
api-wilayah/
├── .github/
│   └── workflows/
│       └── scraper.yml          # GitHub Actions workflow for automated data scraping
├── data/                        # Directory for JSON data files
│   ├── provinsi.json
│   ├── kabupaten_kota.json
│   ├── kecamatan.json
│   ├── desa_kelurahan.json
│   ├── demografi_kabkot.json
│   └── jenis_kelamin_prov.json
├── scraper/                     # Data scraping scripts
│   ├── mergeData.js
│   ├── populationDataScraper.js
│   └── regionalDataScraper.js
├── src/
│   ├── app.js                   # Express app setup
│   ├── server.js                # Server entry point
│   ├── routes/                  # API route handlers
│   │   ├── index.js
│   │   ├── provinsi.js
│   │   ├── kabupatenKota.js
│   │   ├── kecamatan.js
│   │   └── desaKelurahan.js
│   └── utils/
│       └── createFilteredRoute.js
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## Contributing

Contributions are welcome! To contribute to this project, please follow these steps:

1. **Fork the Repository**

   Click the **Fork** button at the top-right corner of this page to create a copy of the repository on your account.

2. **Clone Your Fork**

   ```bash
   git clone https://github.com/IrvanFza/api-wilayah.git
   cd api-wilayah
   ```

3. **Create a New Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make Your Changes**

   Implement your feature or bug fix.

5. **Commit Your Changes**

   ```bash
   git commit -m "Add your feature description"
   ```

6. **Push to Your Branch**

   ```bash
   git push origin feature/your-feature-name
   ```

7. **Submit a Pull Request**

   Go to the original repository and click on **Pull Requests**, then click on **New Pull Request**.

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more details.
