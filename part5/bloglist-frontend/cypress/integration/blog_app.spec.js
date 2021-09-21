describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
          name: 'Damian Pokrywka',
          username: 'Pokrywens',
          password: '1234'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
      cy.contains('log in to application')
    })
    describe('Login', function(){
        it('succeeds with correct credentials', function(){
            cy.get('#username').type('Pokrywens')
            cy.get('#password').type('1234')
            cy.get('#login').click()
            cy.contains('logged-in')
            cy.get('#create').click()
            cy.get('#title').type('random title')
            cy.get('#author').type('Damian P')
            cy.get('#url').type('123456')
            cy.get('#createButton').click()
            cy.contains('random title')
        })

        it('fails with wrong credentials', function(){
            cy.get('#username').type('Pokrywens')
            cy.get('#password').type('wrong')
            cy.get('#login').click()
        })
    })
    })
