class LoginPage {

  signInWithMicrosoft() {
    cy.contains("button", "Sign in with Microsoft", { timeout: 20000 })
      .should("be.visible")
      .click();
  }

  enterEmail(username: string) {
    cy.get('input[type="email"]', { timeout: 20000 })
      .should("be.visible")
      .clear()
      .type(username);

    cy.contains("Next").click();
  }

  enterPassword(password: string) {
    cy.contains("Use your password", { timeout: 20000 })
      .should("be.visible")
      .click({ force: true });

    cy.get('input[name="passwd"]')
      .should("be.visible")
      .type(password, { log: false });

    cy.contains(/Next|Sign in/i).click();
  }

  staySignedIn() {
    cy.contains("Yes").click();
  }

}

export default new LoginPage();