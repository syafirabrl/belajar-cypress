// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// cypress/support/commands.js
Cypress.Commands.add('runMonitorScript', () => {
    cy.exec('node monitor.js', { cwd: 'path/to/script/folder', env: { PORT: '9002' }, failOnNonZeroExit: false });
    function transformCsvToJson(csvData) {
        const lines = csvData.split('\n');
        const headers = lines[0].split(';');
        const jsonData = [];
      
        for (let i = 1; i < lines.length; i++) {
          const currentLine = lines[i].split(';');
          if (currentLine.length === headers.length) {
            const obj = {};
            for (let j = 0; j < headers.length; j++) {
              obj[headers[j]] = currentLine[j];
            }
            jsonData.push(obj);
          }
        }
      
        return jsonData;
      }
      
});
