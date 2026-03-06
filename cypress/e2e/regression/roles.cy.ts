import { RolesPage } from "../../pages/roles.page"
import { permissions } from "../../data/roles.data"
import { setupCommonIntercepts } from "../../support/intercepts"

const roles = new RolesPage()

describe("Roles Module - Regression Suite",() => {

  const roleName = `Cypress Role ${Date.now()}`

  beforeEach(() => {

    cy.log("Setting viewport")

    cy.viewport(1920,1080)

    cy.log("Setting intercepts")

    setupCommonIntercepts()

    cy.log("Restoring login session")

    cy.loginWithEntraId()

    roles.visit()

  })

  it("ROLE-001 Create role with permissions",() => {

    roles.getFirstRoleKlantId().then((roleId) => {

      roles.openCreateRoleModal()

      roles.fillRoleForm(roleName,roleId)

      roles.selectPermissions(permissions)

      roles.submitRole()

      roles.searchRole(roleName)

      roles.verifyRoleCreated(roleName)

    })

  })

})
