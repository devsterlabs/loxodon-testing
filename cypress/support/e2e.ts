import "./commands";

Cypress.on("uncaught:exception", () => false);

beforeEach(() => {
  cy.intercept(
    { url: "**/api/**", middleware: true },
    (req) => {
      req.headers["x-e2e-user"] = Cypress.env("ENTRA_USERNAME");
      req.continue();
    }
  );
});