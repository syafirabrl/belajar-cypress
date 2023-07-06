const csvFilePath = 'adddevice.csv';
const csv = require('csvtojson');
let csvData;

describe('Login, add application, and add devices using CSV data', () => {

  before(() => {
    cy.visit('https://staging-console.antares.id/');
    cy.get('form > .card-block > .form-group:nth-child(3) > .input-group > .form-control').type('syafirabrl@gmail.com');
    cy.get('form > .card-block > .form-group:nth-child(4) > .input-group > .form-control').type('kawakibi');
    cy.get('form > .card-block > .form-group:nth-child(3) > .input-group > .form-control').click();
    cy.get('form > .card-block > .row > .col-6 > .btn-success').click();

    cy.intercept('POST', '**/auth/device').as('postDevice');
    cy.get('.nav-item:nth-child(3) > .nav-link').click();
    cy.get('.hidden-sm-down').click();
    cy.get('#name').click();
    cy.get('#name').type('teStInG1');
    cy.get('#appId').click();
    cy.get('#appId').type('2');
    cy.get('.btn-primary').click();
  });

  before(() => {
    csvData = csv({
      noheader: false,
      output: 'json'
    }).fromFile('adddevice.csv')
  });

  it('Adds devices using CSV data', () => {
    cy.wrap(csvData[1]).then(firstDevice => {
      let status;
      cy.contains('Add Device').click();
      cy.get('#name').click();
      cy.get('#name').type(firstDevice.device_name);
      cy.get('.form-control:nth-child(1)').click();
      cy.get('.form-control:nth-child(1)').type(firstDevice.package_id);
      cy.get('.form-control:nth-child(1)').click();
      cy.get('.pull-right').click().then(() => {
        status = 'test passed';
        const data = { ...firstDevice, status };
        cy.writeFile('logs.csv', data, { flag: 'a+' });

        if (csvData.length > 1) {
          for (let i = 1; i < csvData.length; i++) {
            cy.wrap(csvData[i]).then(currentDevice => {
              cy.contains('Add Device').click();
              cy.get('#name').click();
              cy.get('#name').type(currentDevice.device_name);
              cy.get('.form-control:nth-child(1)').click();
              cy.get('.form-control:nth-child(1)').type(currentDevice.package_id);
              cy.get('.form-control:nth-child(1)').click();
              cy.get('.pull-right').click().then(() => {
                status = 'test passed';
                cy.writeFile('logs.csv', `${JSON.stringify(currentDevice)}\n`, { flag: 'a+' });
              }).catch(() => {
                status = 'test failed';
                cy.writeFile('logs.csv', `${JSON.stringify(currentDevice)}\n`, { flag: 'a+' });
              });
            });
          }
        }
      }).catch(() => {
        status = 'test failed';
        cy.writeFile('logs.csv', `${JSON.stringify({...firstDevice, status})}\n`);
      });
    });
  });

});