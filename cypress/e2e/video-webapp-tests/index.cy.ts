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



  it('Desktop Navbar Displays Correctly', () => {

    cy.viewport(1536, 864) // Use Desktop screen size

    cy.get('#navbar #navbar-item')
    .should('be.visible')

    cy.get('#navbar #navbar-item')
    .should('exist')
    .should('have.length', howManyItemsInNavbar)

    cy.get('[id=desktop-menu]')
    .should('exist')

    // Mobile elements should not exists
    cy.get('[id=mobile-menu]')
    .should('not.exist')
  })

  it('Mobile Navbar Displays Correctly', () => {

    cy.viewport(750, 1334) // Use Mobile screen size

    cy.contains('Browse')
    .should('be.visible')
    .click()

    cy.get('[id=mobile-menu]')
    .should('be.visible')

    cy.get('#mobile-menu #navbar-item')
    .should('exist')
    .should('be.visible')
    .should('have.length', howManyItemsInNavbar)

    // Desktop elements should not exists
    cy.get('[id=desktop-menu]')
    .should('not.exist')

  })

  it('AccountMenu Displays Correctly', () => {

    // AccountMenu is hidden at first
    cy.get('[id=account-menu]')
    .should('not.exist')

    // Click to Open
    cy.get('[id=account-menu-button]')
    .should('be.visible')
    .click()

    // AccountMenu shows
    cy.get('[id=account-menu]')
    .should('exist')
    .should('be.visible')
    .within(() => {
      // There's user's name
      cy.contains(`${testAcc.name}`)
      .should('be.visible')

      // There's an img
      cy.get('img')
      .should('be.visible')
      .should('have.attr', 'src')

      // There's Sign Out button
      cy.contains('Sign Out')
      .should('exist')
      .should('be.visible')
    })

    // Click to Close
    cy.get('[id=account-menu-button]')
    .click()

    // AccountMenu is hidden in the end
    cy.get('[id=account-menu]')
    .should('not.exist')

  })

  it('Sign Out Button Works', () => {

    cy.get('[id=account-menu-button]')
    .should('exist')
    .click()

    cy.contains('Sign Out')
    .should('be.visible')
    .click()

    cy.url().should('include', '/auth')

  })

})
