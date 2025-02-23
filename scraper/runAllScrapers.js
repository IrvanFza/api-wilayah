const { execSync } = require('child_process');

function runScript(scriptPath) {
  console.log(`Running ${scriptPath} ...`);
  try {
    execSync(`node ${scriptPath}`, { stdio: 'inherit' });
    console.log(`${scriptPath} completed successfully.\n`);
  } catch (error) {
    console.error(`Error while running ${scriptPath}:`, error);
    process.exit(1);
  }
}

function runAllScrapers() {
  // Run scripts in the defined order
  runScript('scraper/regionDataScraper.js');
  runScript('scraper/populationDataScraper.js');
  runScript('scraper/utils/mergeData.js');
  runScript('scraper/utils/splitData.js');

  console.log('All scrapers executed successfully.');
}

runAllScrapers();