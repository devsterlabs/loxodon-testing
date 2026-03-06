import { LocationPage } from "../../pages/location.page"
import { setupCommonIntercepts } from "../../support/intercepts"

const location = new LocationPage()

describe("Location Page - Regression Suite", () => {

  beforeEach(() => {

    cy.log("Setting viewport")
    cy.viewport(1920,1080)

    cy.log("Setting up intercepts")
    setupCommonIntercepts()

    cy.log("Restoring login session")
    cy.loginWithEntraId()

    cy.log("Opening dashboard")

    cy.visit("/dashboard")

    cy.contains("Platform Overview",{timeout:15000})
      .should("be.visible")

  })


  it("LOC-001 Navigate to Location and verify 404 page", () => {

    location.openFromSidebar()

    cy.url()
      .should("include","/location")

    location.verify404Page()

  })


  it("LOC-002 Go Back button returns to dashboard", () => {

    location.visit()

    location.clickGoBack()

    cy.log("Verifying user redirected away from 404")

    cy.url()
      .should("not.include","/location")

    cy.contains("Platform Overview",{timeout:10000})
      .should("be.visible")

  })

})