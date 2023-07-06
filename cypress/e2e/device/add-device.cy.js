function transformCsvToJson(csvData) {
  const lines = csvData.split('\n');
  const headers = lines[0].split(';');
  const jsonData = [];

  for (let i = 1; i < lines.length; i++) {
    const currentLine = lines[i].split(';');
    if (currentLine.length === headers.length) {
      const obj = {};
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentLine[j];
      }
      jsonData.push(obj);
    }
  }

  return jsonData;
}
context('Severity 4', () => {

    const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
                                  console.log(genRanHex(16));
  
      it('add device', () => {
          cy.visit('https://staging-console.antares.id/');
          cy.get('form > .card-block > .form-group:nth-child(3) > .input-group > .form-control').type('syafirabrl@gmail.com')
  
          cy.get('form > .card-block > .form-group:nth-child(4) > .input-group > .form-control').type('kawakibi')
  
          cy.get('form > .card-block > .form-group:nth-child(3) > .input-group > .form-control').click()
  
          cy.get('form > .card-block > .row > .col-6 > .btn-success').click()
              
          cy.readFile('adddevice.csv')
          .then((data) => {
            const jsonData = transformCsvToJson(data);
            jsonData.forEach(element => {
                    let dataReturn = '\n3-antares;actions;add device'
                    let description = ''
                    let status = ''
                          cy.intercept('POST', '**/auth/device').as('postDevice')
                          cy.visit('https://staging-console.antares.id/dashboard/applications');
                          cy.wait(2000);
                            cy.get('.nav-item:nth-child(3) > .nav-link').click();
                            cy.get('.hidden-sm-down').click();
                            cy.get('#name').click();
                            cy.get('#name').type('aplikasiiiiii');
                            cy.get('#appId').click();
                            cy.get('#appId').type('2');
                            cy.wait (2000);
                            cy.get('.btn-primary').click();
                            cy.wait(2000);
                            cy.get('.input-group > .btn-primary').click();
                            // cy.get('#name').click();
                            // cy.get('#name').type('device1');
                            // cy.get('.form-control:nth-child(1)').click();
                            // cy.get('.form-control:nth-child(1)').type('631577e3025e713a8ea36beb');
                            // cy.get('.fa-plus').click();
  
                          // cy.visit('https://staging-console.antares.id/dashboard/add-device/test2?appUri=%2Fantares-cse%2FCAEOqLFHrZuSzSpzE68')
                          console.log(data)
                          console.log('mau baca data')
  
                          if(element['nama'] != '')
                          cy.get('#name').dblclick();
                          cy.get('#name').type(element['nama']).should('have.value', element['nama'])
                          cy.wait(3000)
                          cy.get('.form-control:nth-child(1)').select(element['package']).should('have.value',element['package'])
                          cy.wait(3000)
                          cy.get('.pull-right').then(($btn) => {
                            cy.wait(3000)
                            if($btn[0].disabled){
                              console.log('button disabled')
                              //device already exists
                              description = `;${element['nama']} sudah digunakan/salah format atau ${element['package']} tidak tersedia`;
                              status = ';failed'
                              dataReturn = `${dataReturn}${description}${status}`; 
                              console.log(`data return : ${dataReturn}`)
                              cy.writeFile('./logs.csv', dataReturn, { flag: 'a+',header: 'folder;specName;testName;description;status' })
                            } else{
                              cy.get($btn).click()
                                  cy.wait(3000)
                                  cy.get('.btn-outline-success > .hidden-sm-down').click();
                                  cy.get('div:nth-child(3) > .form-check-inline:nth-child(1)').click();
                                  cy.get('#classA').click();
                                  cy.get('.col-12:nth-child(2) .form-check-inline:nth-child(1) > div').click();
                                  cy.get('#otaa').click();
                                  cy.get('.col-12:nth-child(3) .form-check-inline:nth-child(2) > div').click();
                                  cy.get('#custom').click();
                                  cy.get('.form-inline > .form-control:nth-child(2)').click();
                                  cy.get('.form-inline > .form-control:nth-child(2)').type(genRanHex(16))
                                  cy.get('.form-control:nth-child(4)').click();
                                  cy.get('.form-control:nth-child(4)').type(element['deveui']).should('have.value', element['deveui'])
                                  cy.get('.form-control:nth-child(6)').click();
                                  cy.get('.form-control:nth-child(6)').type(genRanHex(32));
                                  cy.get('.input-group:nth-child(3) > .form-control').select(element['package2']).should('have.value',element['package2'])
                                  cy.wait(3000)
                                  cy.get('.btn-success:nth-child(2)').then(($btn2) => {
                                    //button set lora
                                    cy.wait(3000)
                                    if($btn2[0].disabled){
                                    console.log('button disabled')
                                    description = `;${element['nama']} berhasil add device, tidak berhasil set LoRa`;
                                    status = ';failed'
                                    dataReturn = `${dataReturn}${description}${status}`; 
                                    console.log(`data return : ${dataReturn}`)
                                    cy.writeFile('./logs.csv', dataReturn, { flag: 'a+',header: 'folder;specName;testName;description;status' })
                                   
                                  } else{
                                    cy.wait(3000)
                                    cy.get($btn2).click()
                                    
                                    // cy.wait('@postDevice').should(({ request, response }) => {
                                      
                                    //   console.log(request)
                                      // if(response.body.status){
                                      //   description = `;${element['nama']} berhasil add device, ${element['deveui']} sudah digunakan, tidak berhasil set LoRa`
                                      //   status = ';failed'
                                      //   dataReturn = `${dataReturn}${description}${status}`; 
                                      //   console.log(`data return : ${dataReturn}`)
                                      //   cy.writeFile('./logs.csv', dataReturn, { flag: 'a+',header: 'folder;specName;testName;description;status' })
                                      //   cy.clearCookies()
                
                                      // } 
                                  // else{
                                  //   cy.get($btn2).click()
                                  //   cy.wait(3000)
                                  
                                    cy.get('.btn-outline-danger').click()
                                    cy.wait(3000)
                                    // .then(($btn3) => {
  
                                    cy.get('.btn-danger > .fa').click()
  
                                    description = `;${element['nama']} berhasil add device, berhasil set LoRa, berhasil delete device`;
                                    status = ';success'
                                    dataReturn = `${dataReturn}${description}${status}`; 
                                    console.log(`data return : ${dataReturn}`)
                                    cy.writeFile('./logs.csv', dataReturn, { flag: 'a+',header: 'folder;specName;testName;description;status' })
  
  
                            // }})
                                  
                        }
  
                          })
                     
                        }
                    })
                  })
              })       
          
          })
  })