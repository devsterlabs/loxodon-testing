import { DashboardPage } from "../../pages/dashboard.page"
import { setupCommonIntercepts } from "../../support/intercepts"

const dashboard = new DashboardPage()

describe("Dashboard Smoke Suite", () => {

  beforeEach(() => {

    cy.log("Setting up intercepts")
    setupCommonIntercepts()

    cy.log("Restoring login session")
    cy.loginWithEntraId()

    dashboard.visit()

    cy.log("Waiting for stats API")
    cy.wait("@getStats")
      .its("response.statusCode")
      .should("eq", 200)

  })

  it("DASH-001 Profile Popover", () => {

    cy.log("Opening profile dropdown")

    // ===== FUTURE VERSION (WHEN TEST IDS DEPLOYED) =====
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

  })

})