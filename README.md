# [API Wilayah Indonesia](https://api.datawilayah.com/)

[![Node.js](https://img.shields.io/badge/Node.js-v14%2B-brightgreen)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-4.x-blue)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Build Status](https://github.com/IrvanFza/api-wilayah/actions/workflows/scraper.yml/badge.svg)](https://github.com/IrvanFza/api-wilayah/actions/workflows/scraper.yml)
[![GitHub issues](https://img.shields.io/github/issues/IrvanFza/api-wilayah.svg)](https://github.com/IrvanFza/api-wilayah/issues)
[![GitHub contributors](https://img.shields.io/github/contributors/IrvanFza/api-wilayah.svg)](https://github.com/IrvanFza/api-wilayah/graphs/contributors)

[![GitHub forks](https://img.shields.io/github/forks/IrvanFza/api-wilayah.svg)](https://github.com/IrvanFza/api-wilayah/network/members)
[![GitHub stars](https://img.shields.io/github/stars/IrvanFza/api-wilayah.svg)](https://github.com/IrvanFza/api-wilayah/stargazers)

## Overview

Another API Wilayah in Indonesia! But what makes this API project different?

- **Regular Data Update**: This project utilize GitHub Actions to regularly scrape data (once in a week) from Kemendagri.
- **Data Availability**: This project is hosted on GitHub Pages so you don't have to worry about the availability (but you might worry about the scalability, see more in the [GitHub Pages Bandwidth Restrictions](#github-pages-bandwidth-restrictions) section)
- **Population and Demography**: This API includes population and demography data that you may want to use!
- **Open Source!**: This project is open source! Any contributions are welcome, and of course you may serve this API in your own server!

Here are some quick links to example endpoints for accessing the data:

- **Provinsi**: <a href="https://api.datawilayah.com/api/provinsi.json" target="_blank">https://api.datawilayah.com/api/provinsi.json</a>
- **Kabupaten/Kota**: <a href="https://api.datawilayah.com/api/kabupaten_kota/11.json" target="_blank">https://api.datawilayah.com/api/kabupaten_kota/11.json</a>
- **Kecamatan**: <a href="https://api.datawilayah.com/api/kecamatan/11.01.json" target="_blank">https://api.datawilayah.com/api/kecamatan/11.01.json</a>
- **Desa/Kelurahan**: <a href="https://api.datawilayah.com/api/desa_kelurahan/11.01.01.json" target="_blank">https://api.datawilayah.com/api/desa_kelurahan/11.01.01.json</a>

> **Data Source**: The data provided by this API is obtained from the official Indonesian government repository at <a href="https://katalog.satudata.go.id/organization/kementerian-dalam-negeri" target="_blank">https://katalog.satudata.go.id/organization/kementerian-dalam-negeri</a>. While every effort has been made to ensure the accuracy and reliability of the data, it is provided on an "AS IS" basis without any warranties—either express or implied—regarding its completeness or suitability for any particular purpose. By using this API, you agree to verify and adhere to the data usage terms of the original source.

## Table of Contents

- [API Wilayah Indonesia](#api-wilayah-indonesia)
  - [Overview](#overview)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
    - [Default: GitHub Pages API Access](#default-github-pages-api-access)
    - [Optional: Local Node \& Express.js Server](#optional-local-node--expressjs-server)
  - [API Endpoints](#api-endpoints)
    - [Provinces (Provinsi)](#provinces-provinsi)
    - [Regencies/Cities (Kabupaten/Kota)](#regenciescities-kabupatenkota)
    - [Districts (Kecamatan)](#districts-kecamatan)
    - [Villages/Sub-districts (Desa/Kelurahan)](#villagessub-districts-desakelurahan)
  - [Docker Deployment](#docker-deployment)
  - [GitHub Pages Bandwidth Restrictions](#github-pages-bandwidth-restrictions)
  - [Data Scraping](#data-scraping)
    - [Manual Data Update](#manual-data-update)
    - [Automated Data Update](#automated-data-update)
  - [Project Structure](#project-structure)
  - [Contributing](#contributing)
  - [TODO](#todo)
  - [License](#license)
  - [Sponsorship](#sponsorship)

## Introduction

This project provides a RESTful API that serves detailed data on Indonesian administrative regions (provinces, regencies/cities, districts, and villages/sub-districts) along with demographic details such as population segmented by various age groups. The data is maintained and updated automatically via scraping scripts.

## Features

- **Default GitHub Pages API Access**: By default, API access is provided via GitHub Pages. Endpoints are served as static JSON files (with a `.json` extension).
- **Optional Local API Access**: You can also run a Node.js/Express server locally or in your own server if you prefer dynamic API routing.
- **Detailed Regional Data**: Access comprehensive data on all administrative levels.
- **Demographic Information**: Population data segmented by age groups.
- **Automated Data Updates**: Regular scraping ensures the data remains current.
- **Docker Deployment**: Easily deploy the application using Docker.

## Prerequisites

- **Node.js**: Version 14 or higher.
- **npm**: Comes with Node.js.
- **Git**: For cloning the repository.
- **Docker** (optional): For containerized deployment.

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

### Default: GitHub Pages API Access

In the default setup, the API is generated as static JSON files and hosted via GitHub Pages. The endpoints follow the pattern below:

- **Provinces**:  
  `https://api.datawilayah.com/api/provinsi.json`

- **Regencies/Cities**:  
  `https://api.datawilayah.com/api/kabupaten_kota/<kode_provinsi>.json`

- **Districts**:  
  `https://api.datawilayah.com/api/kecamatan/<kode_kabupaten_kota>.json`

- **Villages/Sub-districts**:  
  `https://api.datawilayah.com/api/desa_kelurahan/<kode_kecamatan>.json`

### Optional: Local Node & Express.js Server

If you prefer to serve the API locally using Node.js and Express, you can run the server as follows:

- **Development Mode with Live Reloading**

```bash
npm run dev
```

This starts the server on `http://localhost:3000` with endpoints such as `/api/provinsi` (without the `.json` suffix).

```bash
npm start
```

## API Endpoints

The API provides the following endpoints (access format depends on your deployment):

### Provinces (Provinsi)

- **Get All Provinces**

  ```http
  GET /api/provinsi (.json for GitHub Pages)
  ```

  **Response**

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
      }
      // ... additional provinces
    ]
  }
  ```

### Regencies/Cities (Kabupaten/Kota)

- **Get Regencies/Cities by Province Code**

  ```http
  GET /api/kabupaten_kota/:kode_provinsi (.json for GitHub Pages)
  ```

  **Parameter**

  - `kode_provinsi` (string): Province code (e.g., `11` for Aceh).

  **Response**

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
      }
      // ... additional regencies/cities
    ]
  }
  ```

### Districts (Kecamatan)

- **Get Districts by Regency/City Code**

  ```http
  GET /api/kecamatan/:kode_kabupaten_kota (.json for GitHub Pages)
  ```

  **Parameter**

  - `kode_kabupaten_kota` (string): Regency/City code (e.g., `11.01` for Kab. Aceh Selatan).

  **Response**

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
      }
      // ... additional districts
    ]
  }
  ```

### Villages/Sub-districts (Desa/Kelurahan)

- **Get Villages/Sub-districts by District Code**

  ```http
  GET /api/desa_kelurahan/:kode_kecamatan (.json for GitHub Pages)
  ```

  **Parameter**

  - `kode_kecamatan` (string): District code (e.g., `11.01.01` for Bakongan).

  **Response**

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
      }
      // ... additional villages/sub-districts
    ]
  }
  ```

## Docker Deployment

You can deploy the API using Docker. Follow these steps:

1. **Build the Docker Image**

```bash
docker build -t api-wilayah .
```

2. **Run the Docker Container**

```bash
docker run -p 3000:3000 api-wilayah
```

Alternatively, use Docker Compose:

```bash
docker-compose up -d
```

The container will expose the API on port 3000.

## GitHub Pages Bandwidth Restrictions

By default, this project is served through GitHub Pages for easier deployment, but it has some limitations.

GitHub Pages is primarily designed for hosting static content and may not be optimal for very high-volume API traffic. Although GitHub does not officially publish a fixed bandwidth quota for GitHub Pages, practical estimates and community experience can provide some guidance:

- **Estimated Bandwidth Capacity**:  
  If an average API response (served as a static JSON file) is roughly 10 KB in size, and assuming a conservative monthly bandwidth allocation of about 100 GB, we can estimate the number of requests as follows:
  
  ```plaintext
  Estimated requests per month = (100 GB * 1,000,000,000 bytes/GB) / (10 KB * 1,000 bytes/KB)
                               ≈ 10,000,000 requests
  ```
  
  This rough calculation suggests that under ideal conditions, the service might handle up to 10 million requests per month.

- **Factors Affecting Bandwidth**:
  - **Response Size**: Larger JSON payloads will naturally consume more bandwidth per request.
  - **CDN Caching**: GitHub Pages benefits from a Content Delivery Network (CDN) that caches static files. Effective caching can greatly reduce the bandwidth consumed by repetitive requests.
  - **Traffic Patterns**: Burst or spiky traffic may temporarily exceed the cache's ability to offload requests, potentially leading to throttled responses even when the overall monthly consumption remains moderate.
  
- **Usage Considerations**:
  - GitHub Pages is optimized for static sites rather than dynamic, high-frequency API calls. Heavy, sustained traffic might trigger rate limits or result in slower response times.
  - If you want higher traffic volumes, you should consider deploying the API on a dedicated server manually or using provided Docker configuration to ensure better performance and reliability.

**Note**: These estimations are based on simplified calculations and current user experiences. Actual capacity can vary depending on file sizes, real-world traffic patterns, caching efficiency, and GitHub’s internal policies. It is advised to monitor your API’s traffic and performance regularly.

## Data Scraping

Data is scraped with custom scripts located in the `scraper/` directory. These scripts fetch regional and demographic data from the official Ministry of Home Affairs (Kemendagri) API.

### Manual Data Update

1. **Run the Regional Data Scraper**

```bash
node scraper/regionalDataScraper.js
```

2. **Run the Population Data Scraper**

```bash
node scraper/populationDataScraper.js
```

3. **Merge the Data**

```bash
node scraper/mergeData.js
```

### Automated Data Update

Automated updates are set up using GitHub Actions. The workflow defined in `.github/workflows/scraper.yml` performs the following steps:

- Checks out the repository.
- Installs dependencies.
- Runs the scraping scripts.
- Commits and pushes updates to the data files.

## Project Structure

```plaintext
api-wilayah/
├── .github/
│   └── workflows/
│       └── scraper.yml          # GitHub Actions workflow for automated data scraping
├── api/                         # Generated JSON API for GitHub Pages
├── data/
│   └── json/                    # JSON data files scraped by the scripts
├── scraper/                     # Data scraping scripts
│   ├── mergeData.js
│   ├── populationDataScraper.js
│   ├── regionalDataScraper.js
│   └── splitData.js
├── src/                         # Node.js/Express server code (optional for local API access)
│   ├── app.js
│   ├── server.js
│   └── routes/
│       ├── index.js
│       ├── provinsi.js
│       ├── kabupatenKota.js
│       ├── kecamatan.js
│       └── desaKelurahan.js
├── Dockerfile                   # Dockerfile for containerized deployment
├── docker-compose.yml           # Docker Compose configuration
├── package.json
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

## TODO

- [ ] Add postal code (kode pos) to the Desa/Kecamatan data
- [ ] Add more population data scraper
- [ ] Reformat the population data response to be cleaner
- [ ] Add unit test and integration test

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more details.

## Sponsorship

If you find this project useful and would like to support its ongoing development, please consider donating or sponsoring through the following platforms:

- [Support via Trakteer](https://trakteer.id/irvanfza/tip?quantity=5)
- [Support via GitHub Sponsors](https://github.com/sponsors/IrvanFza?frequency=one-time&sponsor=IrvanFza)
