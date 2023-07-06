it('login', () => {
  cy.log(Cypress.env('EMAIL'));
  cy.log(Cypress.env('PASSWORD'));
  cy.log(Cypress.env('URL'));
  cy.log(Cypress.env('APPLICATION_NAME'));
  cy.log(Cypress.env('APPLICATION_ID'));
  cy.log(Cypress.env('DEVICE_NAME'));
  cy.visit(Cypress.env('URL'));
  cy.get('form > .card-block > .form-group:nth-child(3) > .input-group > .form-control').type(Cypress.env('EMAIL'), { force: true });
  cy.get('form > .card-block > .form-group:nth-child(4) > .input-group > .form-control').type(Cypress.env('PASSWORD'), { force: true });
  cy.get('form > .card-block > .row > .col-6 > .btn-success').click();
  cy.get('.nav-item:nth-child(3) > .nav-link').click();
  cy.get('.hidden-sm-down').click();
  cy.get('#name').click();
  cy.get('#name').type(Cypress.env('APPLICATION_NAME'));
  cy.get('#appId').click();
  cy.get('#appId').type(Cypress.env('APPLICATION_ID'));
  cy.get('.btn-primary').click();
  cy.contains('Add Device').click();
  cy.get('#name').type(Cypress.env('DEVICE_NAME'));
  cy.get('select').select(1);
  cy.get('.card-block > .btn-primary').click();
  cy.wait(2000);
  cy.get('.actions > button').contains('Package').click();
  cy.get('.form-group > .input-group > select').select(1);
  cy.get('.modal-footer > .btn-primary').contains('Set Package').click();
  cy.get('.actions > button').contains('Set LoRa').click();
  cy.get('.col-12 > div > label').contains('Class A').click();
  cy.get('.col-12 > div > label').contains('ABP').click();
  cy.get('.col-12 > div > label').contains('Inherit').click();
  cy.wait(2000);
  cy.get('.col-12 > div > .input-group > select').select(1);
  cy.get('.modal-footer > .btn-success').contains('Set LoRa').click();
  cy.wait(2000);
  cy.get('.btn:nth-child(4)').click();
  cy.get('#subscribeUrl').click();
  cy.get('#subscribeUrl').type(Cypress.env('SUBSCRIBE_URL'));
  cy.get('.modal-primary:nth-child(6) .btn-primary').click();
  cy.wait(2000);
  cy.request({
    method: 'POST',
    url: `${Cypress.env('URL')}:8443/antares-cse/antares-id/${Cypress.env('APPLICATION_NAME')}/${Cypress.env('DEVICE_NAME')}`,
    headers: {
      'X-M2M-Origin': Cypress.env('ACCESS_KEY'),
      'Content-Type': 'application/json;ty=4',
      'Accept': 'application/json',
    },
    body: {
      "m2m:cin": {
        "con": "{\"status\":\"0\"}"
      }
    }
  }).then((response) => {
    expect(response.status).equal(201);
  });
  // cy.get('.btn-outline-info').click();
  // cy.get('.btn-outline-danger > .fa').click();
  // cy.get('.in .btn-danger').click();
  // cy.get('.btn-outline-danger').click();
  // cy.get('.in .btn-danger').click();
})