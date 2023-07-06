/// <reference types="cypress" />

context('Subscribe Device', () => {
    beforeEach(() => {
      cy.visit('https://staging-platform.antares.id:8443/~/antares-cse/antares-id/app-00001/dev-0001');
    });
  
    it('Subscribe Device with Subscriber Host', () => {
      const subscriberHost = 'https://4439-149-113-192-111.ngrok-free.app';
  
      // Klik tombol "Subscriber"
      cy.contains('subscriber').click();
  
      cy.get('input[name="subscriberHost"]').type(subscriberHost);
        cy.contains('Subscribe').click();
        cy.get('.success-message').should('contain', subscriberHost);
  
      // Tulis hasil ke log.csv
      const dataReturn = `device-0001;subscribe;subscriber;${subscriberHost};success`;
      cy.writeFile('log.csv', dataReturn, { flag: 'a+', header: 'device;action;field;value;status' });
  
      // Menjalankan script monitor
      cy.exec('node subscribe/monitor.js').then((result) => {
        // Cek apakah data masuk ke terminal monitor
        if (result.stdout.includes('Data received')) {
          // Tulis status berhasil ke log.csv
          const successDataReturn = `device-0001;subscribe;subscriber;${subscriberHost};success-data-received`;
          cy.writeFile('log.csv', successDataReturn, { flag: 'a+', header: 'device;action;field;value;status' });
        }
      });
    });
  });
  