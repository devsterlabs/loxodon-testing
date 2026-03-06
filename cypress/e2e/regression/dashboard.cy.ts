import { DashboardPage } from "../../pages/dashboard.page"
import { setupCommonIntercepts } from "../../support/intercepts"
import { dashboardSections } from "../../data/dashboard.data"
import { testUsers } from "../../data/testUsers"

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

     
      cy.get(`[data-testid="dashboard-${section.toLowerCase()}"]`)
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

  dashboard.logout()

  cy.get('[data-testid="session-timeout-modal"]')
    .should("be.visible")

  dashboard.clickSessionSignOut(testUsers.admin)
    cy.log("Selecting account to complete sign-out")



  cy.url().should('include', 'login')
 

})

})