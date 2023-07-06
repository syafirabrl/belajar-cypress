/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('task', {
    csvToJson(data) {
      var lines=data.split("\n");
      var result = [];
      lines[0] = lines[0].substring(0, lines[0].length - 1)
      var headers=lines[0].split(";");
      for(var i=1;i<lines.length-1;i++){
          var obj = {};
          lines[i] = lines[i].substring(0, lines[i].length - 1)
          var currentline=lines[i].split(";");
          for(let j=0;j<headers.length;j++){
              obj[headers[j]] = currentline[j];
          }
          result.push(obj);
      }
      // console.log(result)
      return result
    },
    log(message) {
      cy.writeFile('./logs.csv', message, { flag: 'a+' })
      return null
    },
    failed: require('cypress-failed-log/src/failed')(),
  });

  const { initPlugin } = require('cypress-plugin-snapshots/plugin');
  initPlugin(on, config);

  // Tambahkan pengaturan Mocha
  require('cypress-mochawesome-reporter/plugin')(on);

  return config;
};
