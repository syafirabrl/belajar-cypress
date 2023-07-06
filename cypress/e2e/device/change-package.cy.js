/// <reference types="cypress" />

context('Actions', () => {
    beforeEach(() => {
      cy.visit(Cypress.env('URL'));
    });
  
    it('change package', () => {
      cy.log(Cypress.env('EMAIL'));
      cy.get('form > .card-block > .form-group:nth-child(3) > .input-group > .form-control').type(Cypress.env('EMAIL'));
      cy.log(Cypress.env('PASSWORD'));
      cy.get('form > .card-block > .form-group:nth-child(4) > .input-group > .form-control').type(Cypress.env('PASSWORD'));
      cy.get('form > .card-block > .form-group:nth-child(3) > .input-group > .form-control').click();
      cy.get('form > .card-block > .row > .col-6 > .btn-success').click();
      cy.visit('https://staging-console.antares.id/dashboard/device/app-00001/dev-0001?appUri=%2Fantares-cse%2FCAEhmss2oGJ9k04YJ0M&devUri=%2Fantares-cse%2Fcnt-uXnfSEQT82xa3byV')
      cy.wait(5000);
      cy.get('.btn:nth-child(1) > .hidden-sm-down').click();
      cy.wait(5000);
      cy.get('.input-group:nth-child(2) > .form-control:nth-child(1)').type('648c8a0b65e19517abb56673');
      cy.get('.input-group:nth-child(2) > .form-control:nth-child(1)').click();
      cy.get('.in .btn-primary').click();      
      cy.get('span[data-v-532d272b].font-weight-bold.font-xs.text-muted')
        .should('contain.text', '648c8a0b65e19517abb56673')
        .then(($package) => {
          const packageText = $package.text();
          if (packageText !== '648c8a0b65e19517abb56673') {
            console.log('change package failed');
            const element = {};
            let dataReturn = '\n3-antares;actions;change package';
            let status = ';failed';
            dataReturn = `${dataReturn}${status}`;
            console.log(`data return : ${dataReturn}`);
            cy.writeFile('./logs.csv', dataReturn, { flag: 'a+', header: 'folder;specName;testName;status' });
          } else {
            console.log('change package passed');
            const element = {};
            let dataReturn = '\n3-antares;actions;change package';
            let status = ';passed';
            dataReturn = `${dataReturn}${status}`;
            console.log(`data return : ${dataReturn}`);
            cy.writeFile('./logs.csv', dataReturn, { flag: 'a+', header: 'folder;specName;testName;status' });
          }
        });
    });
  });