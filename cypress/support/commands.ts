/// <reference types="cypress" />
declare global {
  namespace Cypress {
    interface Chainable {
      loginProgrammatically(): Cypress.Chainable<void>;
      logTestStep(testId: string, message: string): Cypress.Chainable<void>;
      loginWithEntraId(): Cypress.Chainable<void>;
    }
  }
}

// Structured logging
Cypress.Commands.add("logTestStep", (testId: string, message: string) => {
  cy.log(`[${testId}] ${message}`);
});



Cypress.on("uncaught:exception", (err) => {
  return false;
});


Cypress.Commands.add("loginWithEntraId", () => {
  cy.task("getAADCredentials").then(


    ({ username, password }: { username: string; password: string }) => {

      if (!password) {
        throw new Error(
          "Missing: ENTRA_PASSWORD environment variable. Please set it in your .env file."
        );
      }

      const sessionVersion = Cypress.env("SESSION_VERSION") || "v1";

      const sessionId = [
        `entra-login-${sessionVersion}`,
        Cypress.config("baseUrl"),
        username,
      ];

      cy.session(
        sessionId,
        () => {

          cy.visit("/");

          // Click Microsoft login
          cy.contains("button", "Sign in with Microsoft", { timeout: 20000 })
            .should("be.visible")
            .click();

          // Enter email

          cy.origin(
            "https://login.microsoftonline.com",
            { args: { username } },
            ({ username }) => {

              cy.on("uncaught:exception", () => false);

              cy.get('input[type="email"]', { timeout: 20000 })
                .should("be.visible")
                .clear()
                .type(username);

              cy.get('input[type="submit"], button:contains("Next")')
                .click();

            }
          );

          // Handle Microsoft account login
          cy.origin(
            "https://login.live.com",
            { args: { password } },
            ({ password }) => {

              cy.on("uncaught:exception", () => false);

              // Click "Use your password" if verification screen appears
              cy.contains("Use your password", { timeout: 20000 })
                .should("be.visible")
                .click({ force: true });

              // Enter password
              cy.get('input[name="passwd"]', { timeout: 20000 })
                .should("be.visible")
                .type(password, { log: false });

              // Submit login
              cy.contains("button, input", /Next|Sign in/i, { timeout: 20000 })
                .click({ force: true });


              // Stay signed in
              cy.contains("button, input", "Yes", { timeout: 20000 })
                .click({ force: true });

              // wait until Microsoft redirects away
              cy.location("hostname", { timeout: 120000 })
                .should("include", "loxodon-dev.work.gd");

            }
          );


          // Wait for redirect back to app
          cy.url({ timeout: 120000 })
            .should("include", "loxodon-dev.work.gd");

        },

        {
          cacheAcrossSpecs: true,

          validate() {

            cy.visit("/");

            // Validate login using dashboard element
            cy.contains("Administrator cockpit", { timeout: 20000 })
              .should("be.visible");

          },

        }
      );
    }
  );
});
export { };



