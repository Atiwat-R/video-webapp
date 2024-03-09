/// <reference types="cypress" />


describe('Index/Home Page', () => {

  const testAcc = {
      name: "test",
      email: "test",
      password: "test"
  }
  const howManyItemsInNavbar = 5

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

      // Arrive at Index/Home page
      cy.url().should('include', '/')
  })

  afterEach(() => {
    // cy.viewport(1000, 660) // Reset screen size to default
  })



  it('Desktop Screen Displays Correctly', () => {
    cy.viewport(1536, 864)

    cy.get('#navbar #navbar-item')
    .should('be.visible')

    cy.get('#navbar #navbar-item')
    .should('exist')
    .should('have.length', howManyItemsInNavbar)
  })

  it('Mobile Screen Displays Correctly', () => {

    cy.viewport(750, 1334)

    cy.contains('Browse')
    .should('be.visible')
    .click()

    cy.get('[id=mobile-menu]')
    .should('be.visible')

    cy.get('#mobile-menu #navbar-item')
    .should('exist')
    .should('be.visible')
    .should('have.length', howManyItemsInNavbar)

  })





})
