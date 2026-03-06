import customersPage from "../../pages/customers.page"
import usersPage from "../../pages/users.page"
import { testUsers } from "../../data/testUsers"
import { setupCommonIntercepts } from "../../support/intercepts"

describe("Users Module", () => {

  beforeEach(() => {

    setupCommonIntercepts()

    cy.loginWithEntraId()

    customersPage.visit()

    customersPage.waitForCustomersLoad()

    customersPage.searchCustomer(testUsers.searchDomain)

    customersPage.openCustomer(testUsers.searchDomain)

    usersPage.waitForUsersLoad()

  })


  it("USER-001 Update User Role", () => {

    usersPage.updateUserRole(testUsers.admin.email)

  })

})