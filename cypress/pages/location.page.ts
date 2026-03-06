export class LocationPage {

  visit() {
    cy.log("Navigating to Location page")
    cy.visit("/location")
  }
openFromSidebar() {

  cy.log("Opening sidebar")

  cy.get('button')
    .first()
    .click()

  cy.log("Clicking GeoMap")

  cy.get('a[href="/location"]')
    .should('be.visible')
    .click()

}
  verify404Page() {

    cy.log("Verifying 404 page elements")

    cy.contains('404').should("be.visible")

    cy.contains('Sorry!')
      .should("be.visible")

    cy.contains('Pagina niet gevonden')
      .should("be.visible")

    cy.contains('Ga terug')
      .should("be.visible")

  }

  clickGoBack() {

    cy.log("Clicking Go Back button")

    // FUTURE selector
    cy.get('[data-testid="go-back-button"]').click()

    // cy.contains('Ga terug')
    //   .should("be.visible")
    //   .click()

  }

}