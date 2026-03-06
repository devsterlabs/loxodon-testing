import { LocationPage } from "../../pages/location.page"

const location = new LocationPage()

describe("Location Page - Smoke Suite", () => {

  beforeEach(() => {

    cy.loginWithEntraId()

  })


  it("LOC-SMOKE-001 Location route loads 404 page", () => {

    location.visit()

    cy.contains("404")
      .should("be.visible")

  })

})