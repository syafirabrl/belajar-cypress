const login = () => {
    const URL = Cypress.env('URL');
    const EMAIL = Cypress.env('EMAIL');
    const PASSWORD = Cypress.env('PASSWORD');
  
    cy.session([EMAIL, PASSWORD], () => {
      cy.visit(URL)
      cy.get('form > .card-block > .form-group:nth-child(3) > .input-group > .form-control').type(EMAIL)
      cy.get('form > .card-block > .form-group:nth-child(4) > .input-group > .form-control').type(PASSWORD)
      cy.get('form > .card-block > .row > .col-6 > .btn-success').click()
    })
  }
  