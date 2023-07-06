describe('DELETE DEVICE', () => {
    // beforeEach(() => {
    // cy.login()
    // });
    it('login', () => {
    cy.log(Cypress.env('PASSWORD'));
    cy.log(Cypress.env('URL'));
      cy.visit(Cypress.env('URL'));
      cy.get('form > .card-block > .form-group:nth-child(3) > .input-group > .form-control').type(Cypress.env('EMAIL'));
      cy.get('form > .card-block > .form-group:nth-child(4) > .input-group > .form-control').type(Cypress.env('PASSWORD'));
      cy.get('form > .card-block > .row > .col-6 > .btn-success').click();
    });
    it('add application', () => {

    });
    it('add device', () => {
        cy.wrap(null)
        .then(() => {
            cy.visit('https://staging-console.antares.id/dashboard/applications');
            cy.get('.nav-item:nth-child(3) > .nav-link').click();
            cy.get('.col-sm-6:nth-child(2) .h6').click();
            cy.get('.nav-link > span').eq(0).click();
            cy.get('#name').click();
            cy.get('#name').type(Cypress.env('DEVICE_NAME'));
            cy.get('.form-control:nth-child(1)').click();
            cy.get('.form-control:nth-child(1)').type(Cypress.env('PACKAGE_PLATFORM'));
            cy.get('.form-control:nth-child(1)').click();
            cy.get('.pull-right').click();
            cy.get('.h6.text-primary.mb-0.head-wrap').invoke('text').then((text) => {
                const myVariable = Cypress.env('DEVICE_NAME');
                expect(text.trim()).to.equal(myVariable)
        });
    });
    it('delete device', () => {
        cy.get('.btn-outline-danger').click();
        cy.get('.in .btn-danger').click();
    });
});
});
