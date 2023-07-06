context('Application', () => {
// beforeEach(() => {
//   cy.visit(Cypress.env('URL'));
// });
  it('add app-subscribe', () => {
    cy.visit(Cypress.env('URL'));
    cy.get('form > .card-block > .form-group:nth-child(3) > .input-group > .form-control').type(Cypress.env('EMAIL'));
    cy.get('form > .card-block > .form-group:nth-child(4) > .input-group > .form-control').type(Cypress.env('PASSWORD'));
    cy.wait(2000);
    cy.get('form > .card-block > .row > .col-6 > .btn-success').click()
    cy.wait(2000);
    cy.get('.nav-item:nth-child(3) > .nav-link').click();
    cy.wait(2000);
    cy.get('.btn-primary').click();
    cy.wait(2000);
    cy.get('#name').click().type(Cypress.env('APPLICATION_NAME'));
    cy.get('#appId').click().type(Cypress.env('APPLICATION_ID'));
    cy.get('.btn-primary').click();
    cy.runMonitorScript();
    cy.get('.btn-outline-primary > .hidden-sm-down').click();
    cy.get('#subscribeUrl').click();
    cy.get('#subscribeUrl').type(Cypress.env('subscriberHost'));
    cy.get('.in .btn-primary').click();
    // Cek apakah data masuk ke terminal monitor
    cy.exec('node moni1tor.js', { cwd: 'monitor.js' }).then((result) => {
      if (result.stdout.includes('Data received')) {
        // Tulis status berhasil ke log.csv
        const successDataReturn = `application;subscribe;subscriber;${subscriberHost};success-data-received`;
        cy.writeFile('log.csv', successDataReturn, { flag: 'a+', header: 'device;action;field;value;status' });
      }
    });
  it('delete app', () => {
    cy.wrap(null)
    .then(() => {
    cy.get('.btn-outline-danger').click();
    cy.get('.in .btn-danger').click();
    })
  })
})
})