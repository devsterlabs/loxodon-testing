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

    usersPage.openAuditLogs(testUsers.admin.email)

    usersPage.exportAuditLogs()

  })

})