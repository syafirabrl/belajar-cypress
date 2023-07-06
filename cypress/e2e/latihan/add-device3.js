context('Severity 4', () => {
    const genRanHex = size =>
      [...Array(size)]
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join('');
    
    //generate hex buat set lora
    function login(email, password) {
        cy.visit('https://staging-console.antares.id/');
        cy.get('form > .card-block > .form-group:nth-child(3) > .input-group > .form-control').type(email);
        cy.get('form > .card-block > .form-group:nth-child(4) > .input-group > .form-control').type(password);
        cy.get('form > .card-block > .form-group:nth-child(3) > .input-group > .form-control').click();
        cy.get('form > .card-block > .row > .col-6 > .btn-success').click();
      }
      it('login', () => {
        login('syafirabrl@gmail.com', 'kawakibi');
      });
  
      cy.readFile('adddevice.csv').then((data) => {
        cy.task('csvToJson', data).then((data) => {
          data.forEach(element => {
            let dataReturn = 'add device';
            let description = '';
            let status = '';
  
            cy.intercept('POST', '**/auth/device').as('postDevice');
            cy.get('.nav-item:nth-child(3) > .nav-link').click();
            cy.get('.hidden-sm-down').click();
            cy.get('#name').click();
            cy.get('#name').type('testing-001111');
            cy.get('#appId').click();
            cy.get('#appId').type('2');
            cy.get('.btn-primary').click();
  
            describe('Add Device', () => {
              it('Add Device Normal', () => {
                if (element['nama'] !== '') {
                  cy.contains('Add Device').click();
                  cy.get('#name').dblclick();
                  cy.get('#name').type(element['nama']).should('have.value', element['nama']);
                  cy.get('.form-control:nth-child(1)').should('be.visible')
                  .select(element['package']).should('have.value', element['package']);
                  cy.get('.pull-right').then(($btn) => {
                //pull-right jadi $btn
                    if ($btn[0].disabled) {
                        cy.log('button disabled');
                        description = `;${element['nama']} sudah digunakan/salah format atau ${element['package']} tidak tersedia`;
                      status = ';failed';
                      dataReturn = `${dataReturn}${description}${status}`;
                      console.log(`data return : ${dataReturn}`);
                      cy.writeFile('./logs.csv', dataReturn, { flag: 'a+', header: 'folder;specName;testName;description;status' });
                    } else {
                      cy.get($btn).click();
                      //kalau button ga di disable, klik biar device added
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
                      cy.get('.btn-success:nth-child(2)').then(($btn2) => {
                    //mengubah btn-success menjadi $btn2
                        if ($btn2[0].disabled) {
                          console.log('button disabled');
                          description = `;${element['nama']} berhasil add device, tidak berhasil set LoRa`;
                          status = ';failed';
                          dataReturn = `${dataReturn}${description}${status}`;
                          console.log(`data return : ${dataReturn}`);
                          cy.writeFile('./logs.csv', dataReturn, { flag: 'a+', header: 'folder;specName;testName;description;status' });
                        } else {
                          cy.get($btn2).click();
                          cy.get('.btn-outline-danger').click();
                          cy.get('.btn-danger > .fa').click();
                          description = `;${element['nama']} berhasil add device, berhasil set LoRa, berhasil delete device`;
                          status = ';success';
                          dataReturn = `${dataReturn}${description}${status}`;
                          console.log(`data return : ${dataReturn}`);
                          cy.writeFile('./logs.csv', dataReturn, { flag: 'a+', header: 'folder;specName;testName;description;status' });
                        }
                      });
                    }
                  });
                }
              });
            });
          });
        });
      });
    });