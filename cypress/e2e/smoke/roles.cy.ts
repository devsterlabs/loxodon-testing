import { RolesPage } from "../../pages/roles.page"

const roles = new RolesPage()

describe("Roles Module - Smoke Suite",() => {

  beforeEach(() => {

    cy.loginWithEntraId()

  })

  it("ROLE-SMOKE-001 Roles page loads",() => {

    roles.visit()

  })

})