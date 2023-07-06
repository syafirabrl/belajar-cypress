context('Actions', () => {

    it('register testing', () => {
      const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
                                console.log(genRanHex(16));

      // @host = http://localhost:3000
      let host = 'https://staging-console.antares.id'
      // # @host = https://console.antares.id
      let appToken = '289b5db2381102ad71106cb88cc396672440608a6befb286cd364ed4f51fb848'
      var successCount = 0
      var failedCount = 0


      cy.readFile('listuserreg.csv')
      .then((data) => {
        cy.task('csvToJson', data).then((data) => {
          data.forEach(element => {
                let dataReturn = '\n1-antares;actions;register testing'
                let description = ''
                let status = ''
                cy.visit('https://staging-console.antares.id/register/')
                console.log(data)
                cy.intercept('POST', '**/auth/register').as('postRegister')

                if(element['email'] != '')
                cy.get('.form-group:nth-child(3) > .input-group > .form-control').type(element['name']).should('have.value', element['name'])
                cy.get('.form-group:nth-child(4) > .input-group > .form-control').type(element['email']).should('have.value', element['email'])
                cy.get('.form-group:nth-child(5) > .input-group > .form-control').type(element['passwor']).should('have.value', element['passwor'])
                cy.get('.btn-success').then(($btn) => {
                  if($btn[0].disabled){
                    console.log('button disabled')
                    description = `;${element['email']} invalid format or ${element['passwor']} too short`;
                    status = ';failed'
                    dataReturn = `${dataReturn}${description}${status}`;
                    console.log(`data return : ${dataReturn}`)
                    cy.writeFile('./logs.csv', dataReturn, { flag: 'a+',header: 'folder;specName;testName;description;status' })

                    successCount = successCount + 1
                    console.log(successCount)

                  } else{
                    cy.get($btn).click()
                    cy.wait('@postRegister').should(({ request, response }) => {

                      console.log(request)
                      if(response.body.status){


                        cy.request({
                          method: 'POST',
                          form: true,
                          url: 'https://staging-console.antares.id/backdoor-api/verifyEmail',
                          headers: {
                            'AppToken': appToken,
                            'Content-Type'    : 'application/json',
                          },
                          body: {
                            "email": element['email']
                          }
                        }).then(caramel => {
                        console.log(caramel.body.status)
                          if(caramel.body.status){
                            console.log('logpage')

                            description = `;${element['email']} & ${element['passwor']} successfully registered and verified`;
                            status = ';success'
                            dataReturn = `${dataReturn}${description}${status}`;
                            console.log(`data return : ${dataReturn}`)
                            cy.writeFile('./logs.csv', dataReturn, { flag: 'a+',header: 'folder;specName;testName;description;status' })
                            cy.clearCookies()

                            let dataReturn1 = '\n2-antares;actions;login testing'
                            let description1 = ''
                            let status1 = ''

                            cy.visit('https://staging-console.antares.id/')

                            cy.intercept('POST', '**/auth/login').as('postLogin')

                            if(element['email'] != '')
                            cy.get('form > .card-block > .form-group:nth-child(3) > .input-group > .form-control').type(element['email']).should('have.value', element['email'])

                            cy.get('form > .card-block > .form-group:nth-child(4) > .input-group > .form-control').type(element['passwor']).should('have.value', element['passwor'])

                            cy.get('form > .card-block > .row > .col-6 > .btn-success').then(($btn1) => {
                              if($btn1[0].disabled){
                                console.log('button disabled')

                                description1 = `;${element['email']} invalid format atau ${element['passwor']} too short`;
                                status1 = ';failed'
                                dataReturn1 = `${dataReturn1}${description1}${status1}`; 
                                console.log(`data return : ${dataReturn1}`)
                                cy.writeFile('./logs.csv', dataReturn1, { flag: 'a+',header: 'folder;specName;testName;description;status' })

                              } else{
                                cy.get($btn1).click()

                                // cy.wait('@postLogin').should(({ request1, response1 }) => {
                                  cy.wait(3000)
                                //   console.log(request1)
                                //   console.log('mau baca')
                                //   console.log(response1.body.status)
                                  if(response.body.status){
                                    cy.wait(5000)

                                    cy.get('.btn > span').click();
                                    cy.get('.nav-item:nth-child(6) > .nav-link').click()
                                    console.log('getacck')
                                    cy.wait(3000)
                                    cy.get('p > .btn').click()

                                    if(response.body.status){
                                      description1 = `;${element['email']} & ${element['passwor']} login & get accesskey success`;
                                      status1 = ';success'
                                      dataReturn1 = `${dataReturn1}${description1}${status}`;
                                      console.log(`data return : ${dataReturn1}`)
                                      cy.writeFile('./logs.csv', dataReturn1, { flag: 'a+',header: 'folder;specName;testName;description;status' })
                                      cy.clearCookies()

                                      // cy.readFile('adddevice.csv')
                                      // .then((data) => {
                                      //   cy.task('csvToJson', data).then((data) => {
                                      //     data.forEach(element => {
                                      //           let dataReturn2 = '\n3-antares;actions;add device'
                                      //           let description2 = ''
                                      //           let status2 = ''
                                      //         }) }) })

                                    } else{
                                      description1 = `;${element['email']} & ${element['passwor']} login success // failed get accesskey`;
                                      status1 = ';success'
                                      dataReturn1 = `${dataReturn1}${description1}${status}`;
                                      console.log(`data return : ${dataReturn1}`)
                                      cy.writeFile('./logs.csv', dataReturn1, { flag: 'a+',header: 'folder;specName;testName;description;status' })
                                      cy.clearCookies()
                                    }

                                  } else {
                                    description1 = `;${element['email']} atau ${element['passwor']} account not found`;
                                    status1 = ';failed'
                                    dataReturn1 = `${dataReturn1}${description1}${status1}`;
                                    console.log(`data return : ${dataReturn1}`)
                                    cy.writeFile('./logs.csv', dataReturn1, { flag: 'a+',header: 'folder;specName;testName;description;status' })

                                  }
                                // })
                              }
                            })
                        }
                                    else{
                                      console.log('verifyfailed')
                                      description = `;${element['email']} & ${element['passwor']} regist successful // verify failed`;
                                      status = ';failed'
                                      dataReturn = `${dataReturn}${description}${status}`;
                                      console.log(`data return : ${dataReturn}`)
                                      cy.writeFile('./logs.csv', dataReturn, { flag: 'a+',header: 'folder;specName;testName;description;status' })
                                      cy.clearCookies()
                                    }
                      })


                      } else {
                        description = `;${element['email']} already registered`;
                        status = ';failed'
                        dataReturn = `${dataReturn}${description}${status}`; 
                        console.log(`data return : ${dataReturn}`)
                        cy.writeFile('./logs.csv', dataReturn, { flag: 'a+',header: 'folder;specName;testName;description;status' })

                      }
                    })
                  }
                })

            });
          });
        })
    })

})

