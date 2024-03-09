/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

Cypress.Commands.add("mockUseRouter", () => {
    cy.intercept("/watch/1234", (req) => {
      // Modify the intercepted request or response as needed
      req.reply({
        statusCode: 200,
        body: {
          // Mock data for the route
          // Add properties that match the shape of data returned by useRouter
          // For example:
          id: 123,
          title: "Mocked Title",
        },
      });
    });
  });

  Cypress.Commands.add("mockUseRouter", () => {
    cy.window().then((win) => {
        (win as any).useRouter = () => ({
        push: cy.stub().resolves(),
        replace: cy.stub().resolves(),
        prefetch: cy.stub().resolves(),
      });
    });
  });



//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }