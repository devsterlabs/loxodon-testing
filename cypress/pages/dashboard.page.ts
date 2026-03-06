
export class DashboardPage {

  visit() {

    cy.log("Opening dashboard page")

    cy.visit("/dashboard")

  }

  waitForStats() {

    cy.log("Waiting for stats API")

    cy.wait("@getStats")
      .its("response.statusCode")
      .should("eq", 200)

  }


  openProfile() {

    cy.log("Opening profile dropdown")

   
    cy.get('[data-testid="profile-menu-button"]')
      .should("be.visible")
      .click()

    cy.get('[data-testid="profile-dropdown"]')
      .should("be.visible")

  }


  verifySections(sections: string[]) {

    sections.forEach(section => {

      cy.log(`Checking dashboard section: ${section}`)
      cy.get(`[data-testid="dashboard-${section.toLowerCase()}"]`)
        .scrollIntoView()
        .should("be.visible")

    })

  }


  verifyMetrics(metrics: string[]) {

    metrics.forEach(metric => {

      cy.log(`Checking dashboard metric: ${metric}`)

      cy.contains(metric)
        .should("be.visible")

    })

  }

  logout() {

    cy.log("Logging out from profile menu")

    this.openProfile()
    cy.get('[data-testid="dropdown-logout-button"]')
      .click()

  }
   clickSessionSignOut(email: string) {

    cy.log("Clicking Sign Out in session timeout modal")

    cy.get('[data-testid="session-timeout-signout"]')
      .should("be.visible")
      .click()

    cy.origin("https://login.microsoftonline.com", { args: { email } }, ({ email }) => {
    cy.log(`Selecting account: ${email}`);
    
 
    cy.contains(email, { timeout: 10000 })
      .should('be.visible')
      .click();
    
  
    });
   }

}