/// <reference types="cypress" />


describe('Auth Page', () => {

    const testAcc = {
        email: "test",
        password: "test"
    }

    beforeEach(() => {
        cy.visit('http://localhost:3000/')
        cy.url().should('include', '/auth'); // Should start at Auth page
    })
  
    it('Sign In Page Showing Correct Displays', () => {
        // Assert displays
        cy.contains("Sign in").should('be.visible')
        cy.contains("Email").should('be.visible')
        cy.contains("Password").should('be.visible')
        cy.contains("Login").should('be.visible')
        cy.contains("First time?").should('be.visible')
        cy.contains("Create an account").should('be.visible')
    })

    it('Register Page Showing Correct Displays', () => {
        // Navigate to Register
        cy.contains("Create an account")
        .should('exist')
        .click()

        // Assert displays
        cy.contains("Register").should('be.visible')
        cy.contains("Username").should('be.visible')
        cy.contains("Email").should('be.visible')
        cy.contains("Password").should('be.visible')
        cy.contains("Sign up").should('be.visible')
        cy.contains("Already have an account?").should('be.visible')
        cy.contains("Sign in").should('be.visible')

        // Navigate back to Sign in
        cy.contains("Sign in")
        .should('exist')
        .click()
        cy.contains("Sign in").should('be.visible')
    })

    it('Test Text Input', () => {
        // Email
        cy.get('[id=email]')
        .type(`${testAcc.email}`)
        .should('have.value', `${testAcc.email}`)

        // Password
        cy.get('[id=password]')
        .type(`${testAcc.password}`)
        .should('have.value', `${testAcc.password}`)
    })

    it('Test Password Input', () => {
        // Contains correct value
        cy.get('[id=password]')
        .type(`${testAcc.password}`)
        .should('have.value', `${testAcc.password}`)

        // Should have type='password'
        cy.get('[id=password]')
        .invoke('prop', 'type')
        .should('eq', 'password');

        // Should blur out password in text input
        cy.get('[id=password]').blur()
        cy.get('[id=password]').should('not.be.focused')
    })

    it('Sign in with Test Account', () => {
        // Log into Test Account
        cy.get('[id=email]').type(`${testAcc.email}`)
        cy.get('[id=password]').type(`${testAcc.password}`)
    
        // Click on the Login button
        cy.contains('Login').click()
    
        // Check if redirected to the profile page after successful login
        cy.url().should('include', '/profiles')
    })

    it.only('Sign in with Github OAuth', () => {

        cy.get('[id=oauth-github]')
        .should('be.visible')
        .click()

        // cy.url().should('include', '/github'); 

    })

    it('Sign in with Google OAuth', () => {

        cy.get('[id=oauth-google]')
        .should('be.visible')
        .click()

        // TODO: google oauth
        // https://docs.cypress.io/guides/end-to-end-testing/google-authentication
    })


})


  




  