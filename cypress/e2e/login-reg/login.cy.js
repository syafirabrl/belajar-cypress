context('Login Antares', () => {
  const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
  console.log(genRanHex(16));

  it('login', () => {
    console.log(Cypress.env('EMAIL'));
    console.log(Cypress.env('PASSWORD'));
    console.log(Cypress.env('URL'));
    cy.visit(Cypress.env('URL'));
    cy.get('form > .card-block > .form-group:nth-child(3) > .input-group > .form-control').type(Cypress.env('EMAIL'));
    cy.get('form > .card-block > .form-group:nth-child(4) > .input-group > .form-control').type(Cypress.env('PASSWORD'));
    cy.get('form > .card-block > .row > .col-6 > .btn-success').click();
  });
});
