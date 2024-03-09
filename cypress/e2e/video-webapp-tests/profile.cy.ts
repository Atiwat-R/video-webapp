/// <reference types="cypress" />


describe('Profile Page', () => {

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

        // Arrive at correct page
        cy.url().should('include', '/profile')
    })

    it('User Profile Displays Correctly', () => {

        // Chack if the title text is displayed
        cy.contains('Who is watching?').should('be.visible')

        // Check if the user profile section is displayed
        cy.get('.w-44').should('be.visible')

        // Check if the image is displayed
        cy.get('.w-44 img').should('be.visible')
    
        // Check if the user profile name is displayed
        cy.contains(`${testAcc.name}`)
        .should('be.visible')
        .should((name) => {
            expect(name).to.contain(`${testAcc.name}`)
        })

      })

      it('User Profile Leads to Home Page', () => {

        // Click user profile
        cy.get('.w-44 img')
        .should('exist')
        .should('be.visible')
        .click()

        // Check if we arrives at correct page
        cy.url().should('include', '/')

      })
  


})
  