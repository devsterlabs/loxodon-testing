describe("AUTH - Entra Login", () => {

  it("AUTH-001 Login and land on dashboard", () => {

    cy.logTestStep("AUTH-001", "Logging into application");

    cy.loginWithEntraId();

    cy.visit("/");

    cy.contains("Administrator cockpit", { timeout: 20000 })
      .should("be.visible");

  });

});