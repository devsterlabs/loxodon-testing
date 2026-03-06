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

    // ===== FUTURE VERSION (when test IDs deployed) =====
    // cy.get('[data-testid="profile-menu-button"]')
    //   .should("be.visible")
    //   .click()

    // cy.get('[data-testid="profile-dropdown"]')
    //   .should("be.visible")


    // ===== CURRENT DEPLOYED VERSION =====
    cy.get("header button")
      .last()
      .should("be.visible")
      .click()

    cy.contains("Gebruiker")
      .should("be.visible")

  }


  verifySections(sections: string[]) {

    sections.forEach(section => {

      cy.log(`Checking dashboard section: ${section}`)

      // ===== FUTURE VERSION (test ids) =====
      // cy.get(`[data-testid="dashboard-${section.toLowerCase()}"]`)
      //   .scrollIntoView()
      //   .should("be.visible")


      // ===== CURRENT DEPLOYED VERSION =====
      cy.contains("span", section)
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

    // ===== FUTURE VERSION =====
    // cy.get('[data-testid="dropdown-logout-button"]')
    //   .click()


    // ===== CURRENT DEPLOYED VERSION =====
    cy.contains("Uitloggen")
      .should("be.visible")
      .click()

    

  }
   clickSessionSignOut() {

    cy.log("Clicking Sign Out in session timeout modal")

    cy.get('[data-testid="session-timeout-signout"]')
      .should("be.visible")
      .click()
   }

}