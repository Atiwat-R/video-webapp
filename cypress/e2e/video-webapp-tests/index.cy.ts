/// <reference types="cypress" />


describe('Index/Home Page', () => {

  const testAcc = {
      name: "test",
      email: "test",
      password: "test"
  }

  beforeEach(() => {
      cy.visit('https://video-webapp-5emfb3zok-atiwat-rs-projects.vercel.app/')

      // Login
      cy.get('[id=email]').type(`${testAcc.email}`)
      cy.get('[id=password]').type(`${testAcc.password}`)
      cy.contains('Login').click()

      // Arrive at Profile page
      cy.url().should('include', '/profile')
      cy.get('.w-44 img')
        .should('exist')
        .click()

      // Arrive at Index/Home page
      cy.url().should('include', '/profile')
  })

  it('Displays Correctly', () => {

    cy.contains('Browse').should('be.visible')

    cy.get('#navbar').should('be.visible')
    cy.viewport(320, 480)

  })





})
