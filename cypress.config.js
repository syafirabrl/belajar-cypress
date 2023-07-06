const { defineConfig } = require('cypress');
const axios = require('axios');
const _ = require('lodash');

require('dotenv').config();

module.exports = defineConfig({
  defaultCommandTimeout: 500,
  e2e: {
    setupNodeEvents(on, config) {
      // https://github.com/bahmutov/cypress-failed-log
      require('cypress-failed-log/on')(on);

      on('task', {
        csvToJson(data) {
          // Implementasi untuk mengubah CSV menjadi JSON
          const jsonData = transformCsvToJson(data);
          return jsonData;
        }
      });
    },
  },
  env: {
    EMAIL: process.env.EMAIL,
    PASSWORD: process.env.PASSWORD,
    NAME: process.env.NAME,
    URL: process.env.URL,
    APPLICATION_NAME: process.env.APPLICATION_NAME,
    APPLICATION_ID: process.env.APPLICATION_ID,
    DEVICE_NAME: process.env.DEVICE_NAME,
    SUBSCRIBE_URL: process.env.SUBSCRIBE_URL,
    ACCESS_KEY: process.env.ACCESS_KEY,
    PACKAGE_PLATFORM: process.env.PACKAGE_PLATFORM,
    SUBSCRIBER_NAME: process.env.SUBSCRIBER_NAME,
    SERVER_HOST_NAME: process.env.SERVER_HOST_NAME
  },
});
