context('get access key', () => {
    it('access key', () => {
        cy.visit('https://staging-console.antares.id/');
        cy.get('.form-group:nth-child(3) .form-control').dblclick();
        cy.get('.form-group:nth-child(3) .form-control').type('caramellessice@gmail.com');
        cy.get('.form-group:nth-child(4) .form-control').click();
        cy.get('.form-group:nth-child(4) .form-control').type('juni212014');
        cy.get('form > .card-block > .row > .col-6 > .btn-success').click()
        // cy.get('form > .card-block > .form-group:nth-child(3) > .input-group > .form-control').click()
        cy.get('.nav-item:nth-child(6) > .nav-link').click();
        cy.get('p > .btn').click();
    })
})