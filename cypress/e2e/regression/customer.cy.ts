import customersPage from "../../pages/customers.page"
import { testUsers } from "../../data/testUsers"
import { setupCommonIntercepts } from "../../support/intercepts"

describe("Customers Module", () => {

  beforeEach(() => {

    cy.log("Setting up intercepts")

    setupCommonIntercepts()

    cy.log("Restoring login session")

    cy.loginWithEntraId()

    customersPage.visit()

    customersPage.waitForCustomersLoad()

  })


  it("CUST-001 Search Customer", () => {

    customersPage.searchCustomer(testUsers.searchDomain)

    customersPage.verifyCustomerVisible(testUsers.searchDomain)

  })


  it("CUST-002 Open Customer → Navigate to Users", () => {

    customersPage.searchCustomer(testUsers.searchDomain)

    customersPage.openCustomer(testUsers.searchDomain)

  })


  it("CUST-003 Pagination Test", () => {

    cy.log("Testing pagination")

    cy.get("body").then(($body)=>{

      if($body.find(".pagination").length > 0){

        cy.get(".pagination")
          .should("be.visible")
          .click()

        cy.wait("@getCustomers")

      } else {

        cy.log("Pagination not available")

      }

    })

  })


  it("CUST-004 Mobile View", () => {

    cy.log("Testing mobile view")

    cy.viewport("iphone-xr")

    cy.reload()

    cy.wait("@getCustomers")

    customersPage.verifyTableVisible()

  })

})