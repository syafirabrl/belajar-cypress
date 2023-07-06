context('Application', () =>{
    const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
                                  console.log(genRanHex(16));
    it('register', () => {
      console.log(Cypress.env('NAME'));
      console.log(Cypress.env('EMAIL'));
      console.log(Cypress.env('PASSWORD'));
      console.log(Cypress.env('URL'));
      cy.visit(Cypress.env('URL'));
      cy.get('.btn-auth').click()
      cy.get('.card-block > .form-group:nth-child(3) > .input-group > .form-control').type(Cypress.env('NAME'));
      cy.get('.card-block > .form-group:nth-child(4) > .input-group > .form-control').type(Cypress.env('EMAIL'));
      cy.get('.card-block > .form-group:nth-child(5) > .input-group > .form-control').type(Cypress.env('PASSWORD'));
      cy.get('.card-block > .btn-success').click()
    })
    it('change photo', () => {
      console.log(Cypress.env('EMAIL'));
      console.log(Cypress.env('PASSWORD'));
      console.log(Cypress.env('URL'));
      cy.visit(Cypress.env('URL'));
      cy.get('form > .card-block > .form-group:nth-child(3) > .input-group > .form-control').type(Cypress.env('EMAIL'));
      cy.get('form > .card-block > .form-group:nth-child(4) > .input-group > .form-control').type(Cypress.env('PASSWORD'));
      cy.get('form > .card-block > .row > .col-6 > .btn-success').click()
      cy.get('.nav-item:nth-child(6) > .nav-link').click();
      cy.get('.card > .row > .btn-sm').click()
      cy.get('.card > .row > .btn-sm').contains('Change Photo').focus().click()                                  /*Change Photo*/

      /*
      cy.get('.col-sm-5 > .card > .card-block > .form-group > .input-group > .form-control.text-copy').click() /*Get Access Key*/
      /*cy.wait(6000)

      cy.get('.col-sm-7 > .card > .card-block > .btn-outline-success').click() /*Change Password*/
      /*cy.get('.modal-body > .form-group > .input-group > .form-control').type('engy')
      cy.wait(6000)*/

      

    })
})