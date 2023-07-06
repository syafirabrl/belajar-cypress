const csv = require('csv-parser');
const fs = require('fs');
const { describe } = require('mocha');
const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
console.log(genRanHex(16));

describe('Login dan add aplikasi', () => {
it('login', () => {
//login dulu sistur
cy.log(Cypress.env('URL'));
cy.visit(Cypress.env('URL'));
cy.log(Cypress.env('EMAIL'));
cy.get('form > .card-block > .form-group:nth-child(3) > .input-group > .form-control').type(Cypress.env('EMAIL'));
cy.log(Cypress.env('PASSWORD'));
cy.get('form > .card-block > .form-group:nth-child(4) > .input-group > .form-control').type(Cypress.env('PASSWORD'));
cy.get('form > .card-block > .form-group:nth-child(3) > .input-group > .form-control').click();
cy.get('form > .card-block > .row > .col-6 > .btn-success').click();
cy.get('.nav-item:nth-child(3) > .nav-link').click();
cy.get('.hidden-sm-down').click();
cy.get('#name').click();
cy.log(Cypress.env('APPLICATION_NAME'));
cy.get('#name').type(Cypress.env('APPLICATION_NAME'));
cy.get('#appId').click();
cy.log(Cypress.env('APPLICATION_ID'));
cy.get('#appId').type(Cypress.env('APPLICATION_ID'));
cy.get('.btn-primary').click();

describe('Add Device', () => {
    beforeEach(() => {
    const data = fs.readFileSync('csv/addDevice.csv');
    cy.task('csvToJson', data).then((data) => {
        const header = 'number,status,description';
        cy.writeFile('csv\logs.csv', header + '\n', { flag: 'w' });
        data.forEach((element, index) => {
          const number = index + 1;
          const isSuccess = true;
          const status = isSuccess ? 'success' : 'failed';
          const description = isSuccess ? `${element['nama']} berhasil add device.` : `${element['nama']} gagal add device.`;
          const dataRow = `${number},${status},${description}`;
      });
    it('Add Device Nomally', () => {
     console.log(data);
    if (element['nama'] != '') {
    cy.get('#name').dblclick();
    }
    cy.get('#name').type(element['nama']).should('have.value', element['nama']);
    cy.wait(1000);
    cy.get('.form-control:nth-child(1)').select(element['package']).should('have.value', element['package']);
    cy.wait(1000);
    cy.get('.pull-right').then(($btn) => {
              cy.wait(1000);
              if ($btn[0].disabled) {
                console.log('button disabled');
                const description = `;${element['nama']} sudah digunakan/salah format atau ${element['package']} tidak tersedia`;
                const status = ';failed';
                const dataReturn = `${dataReturn}${description}${status}`;
                console.log(`data return : ${dataReturn}`);
                cy.writeFile('.csv\logs.csv', dataReturn, { flag: 'a+', header: 'folder;specName;testName;description;status' });
              } else {
                cy.get($btn).click();
                cy.wait(1000);
                cy.get('.btn-outline-success > .hidden-sm-down').click();
                cy.get('div:nth-child(3) > .form-check-inline:nth-child(1)').click();
                cy.get('#classA').click();
                cy.get('.col-12:nth-child(2) .form-check-inline:nth-child(1) > div').click();
                cy.get('#otaa').click();
                cy.get('.col-12:nth-child(3) .form-check-inline:nth-child(2) > div').click();
                cy.get('#custom').click();
                cy.get('.form-inline > .form-control:nth-child(2)').click();
                cy.get('.form-inline > .form-control:nth-child(2)').type(genRanHex(16));
                cy.get('.form-control:nth-child(4)').click();
                cy.get('.form-control:nth-child(4)').type(element['deveui']).should('have.value', element['deveui']);
                cy.get('.form-control:nth-child(6)').click();
                cy.get('.form-control:nth-child(6)').type(genRanHex(32));
                cy.get('.input-group:nth-child(3) > .form-control').select(element['package2']).should('have.value', element['package2']);
                cy.wait(1000);
                cy.get('.btn-success:nth-child(2)').then(($btn2) => {
                  cy.wait(1000);
                  if ($btn2[0].disabled) {
                    console.log('button disabled');
                    const description = `;${element['nama']} berhasil add device, tidak berhasil set LoRa`;
                    const status = ';failed';
                    const dataReturn = `${dataReturn}${description}${status}`;
                    console.log(`data return : ${dataReturn}`);
                    cy.writeFile('csv\logs.csv', dataReturn, { flag: 'a+', header: 'folder;specName;testName;description;status' });
                  } else {
                    cy.wait(1000);
                    cy.get($btn2).click();
                    cy.get('.btn-outline-danger').click();
                    cy.wait(1000);
                    // .then(($btn3) => {
                    cy.get('.btn-danger > .fa').click();
                    const description = `;${element['nama']} berhasil add device, berhasil set LoRa, berhasil delete device`;
                    const status = ';success';
                    const dataReturn = `${dataReturn}${description}${status}`;
                    console.log(`data return : ${dataReturn}`);
                    cy.writeFile('csv\logs.csv', dataReturn, { flag: 'a+', header: 'folder;specName;testName;description;status' });
                    // }})
                  }

                });
              }
            });
          });
        });
      });
    });
  });
});
