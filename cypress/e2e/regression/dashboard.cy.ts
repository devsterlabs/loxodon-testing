import { DashboardPage } from "../../pages/dashboard.page"
import { setupCommonIntercepts } from "../../support/intercepts"
import { dashboardSections } from "../../data/dashboard.data"

const dashboard = new DashboardPage()

describe("Dashboard Regression Suite", () => {

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

  it("DASH-002 Dashboard Sections", () => {

    cy.log("Validating dashboard sections")

    dashboardSections.forEach(section => {

      cy.log(`Checking section: ${section}`)

      // ===== FUTURE VERSION (TEST IDs) =====
      // cy.get(`[data-testid="dashboard-${section.toLowerCase()}"]`)
      //   .scrollIntoView()
      //   .should("be.visible")

      // ===== CURRENT DEPLOYED VERSION =====
      cy.contains("span", section)
        .scrollIntoView()
        .should("be.visible")

    })

  })


  it("DASH-003 Dashboard Metrics", () => {

    cy.log("Checking dashboard metric cards")

    const metrics = [
      "Active Customers",
      "Total Users",
      "Active Now",
      "New Users (7d)",
      "New Users (1m)",
      "New Users (1y)",
      "Deleted Users (7d)",
      "Deleted Users (1m)",
      "Deleted Users (1y)"
    ]

    metrics.forEach(metric => {

      cy.log(`Validating metric: ${metric}`)

      cy.contains(metric)
        .should("be.visible")

    })

  })


  it("DASH-004 Logout Flow", () => {

    cy.log("Opening profile dropdown")

    // ===== FUTURE VERSION =====
    // cy.get('[data-testid="profile-menu-button"]').click()
    // cy.get('[data-testid="dropdown-logout-button"]').click()


    // ===== CURRENT DEPLOYED VERSION =====
    cy.get("header button")
      .last()
      .click()

    cy.contains("Uitloggen")
      .should("be.visible")
      .click()

    
    cy.log("Session timeout modal should appear")

    cy.get('[data-testid="session-timeout-modal"]')
      .should("be.visible")

    cy.log("Clicking Sign Out from modal")

    cy.get('[data-testid="session-timeout-signout"]')
      .should("be.visible")
      .click()

   

  })

  it("DASH-004 Logout Flow", () => {

  dashboard.logout()

  cy.get('[data-testid="session-timeout-modal"]')
    .should("be.visible")

  dashboard.clickSessionSignOut()

})

})