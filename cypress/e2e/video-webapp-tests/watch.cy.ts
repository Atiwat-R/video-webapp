/// <reference types="cypress" />


describe('Watch Page', () => {

    const testAcc = {
        name: "test",
        email: "test",
        password: "test"
    }

    beforeEach(() => {
        cy.visit('http://localhost:3000/')

        // Login
        cy.get('[id=email]').type(`${testAcc.email}`)
        cy.get('[id=password]').type(`${testAcc.password}`)
        cy.contains('Login').click()
  
        // Arrive at Profile page
        cy.url().should('include', '/profile')
        cy.get('.w-44 img')
          .should('exist')
          .click()

        // Play a Movie
        cy.wait(2000) // 2 sec
        cy.contains('Play').click()
  
        // Arrive at Index/Home page
        cy.url().should('include', '/watch')
    })

    it('Video Displays Properly', () => {

        // Billboard exists
        cy.get('#watch')
        .should('exist')
        .should('be.visible')

        // Video exists
        cy.get('#watch-video')
        .should('exist')
        .should('be.visible')

        cy.get('#watch-video')
        .should('have.attr', 'src')
        .should('not.be.empty');

        cy.get('#watch-video')
        .should('have.attr', 'controls')

        // Video is playing
        cy.get('#watch-video')
        .should('have.prop', 'paused', false)

    })

    it('Back Button Returns to Home Page', () => {

        // Button is visible
        cy.get('#home-page-button')
        .should('exist')
        .should('be.visible')

        // Click
        cy.get('#home-page-button')
        .click()

        // Back to Home Page
        cy.url().should('include', '/')

    })

  

})
  