import customersPage from "../../pages/customers.page"
import usersPage from "../../pages/users.page"
import { testUsers } from "../../data/testUsers"
import { setupCommonIntercepts } from "../../support/intercepts"

describe("Audit Logs Module", () => {

  beforeEach(() => {

    setupCommonIntercepts()

    cy.loginWithEntraId()

    customersPage.visit()

    customersPage.waitForCustomersLoad()

    customersPage.searchCustomer(testUsers.searchDomain)

    customersPage.openCustomer(testUsers.searchDomain)

    usersPage.waitForUsersLoad()

  })


  it("AUDIT-001 Export Audit Logs", () => {

    cy.log("Opening audit logs for first user in table")

    usersPage.openAuditLogsByIndex()

    cy.log("Opening export modal")

    usersPage.exportAuditLogs()

    cy.contains("Export Audit Logs")
      .should("be.visible")

    cy.log("Setting export date range")

    cy.get("#start-date")
      .type("2025-01-01")

    cy.get("#end-date")
      .type("2026-12-31")

    cy.log("Tracking export API")

    cy.intercept("POST", "**/audit-logs/export**")
      .as("exportLogs")

    cy.log("Clicking Export button")
    cy.contains("Export Audit Logs")
      .parent()
      .parent()
      .find("button")
      .contains("Export")
      .click()

    cy.wait("@exportLogs")
      .its("response.statusCode")
      .should("eq", 200)

    cy.log("Verifying success message")

    cy.contains("Audit logs exported")
      .should("be.visible")

    cy.contains("Export Audit Logs")
      .should("not.exist")

  })

})
