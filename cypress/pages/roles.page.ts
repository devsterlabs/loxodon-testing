export class RolesPage {

  visit() {

    cy.log("Opening Roles page")

    cy.visit("/role")

    cy.url()
      .should("include","/role")

    cy.get("tbody",{timeout:15000})
      .should("exist")

  }

  openCreateRoleModal() {

    cy.log("Opening create role modal")

    // future selector
    // cy.get('[data-testid="new-role-button"]').click()

    cy.contains("button",/New|Nieuw/i)
      .should("be.visible")
      .click()

    cy.contains(/Add Role|Rol toevoegen/i)
      .should("be.visible")

  }

  fillRoleForm(roleName:string,roleId:string) {

    cy.log(`Typing role name: ${roleName}`)

    cy.get('input[type="text"]')
      .eq(0)
      .clear()
      .type(roleName)

    cy.log(`Typing role id: ${roleId}`)

    cy.get('input[type="text"]')
      .eq(1)
      .clear()
      .type(roleId)

  }

  selectPermissions(permissions:string[]) {

    permissions.forEach(permission => {

      cy.log(`Selecting permission: ${permission}`)

      cy.contains(permission)
        .scrollIntoView()
        .parents("div")
        .first()
        .within(() => {

          cy.get('input[type="checkbox"]')
            .check({force:true})

        })

    })

  }

  submitRole() {

    cy.log("Submitting role form")

    cy.contains("button",/Add|Toevoegen/i)
      .scrollIntoView()
      .click()

    cy.contains(/Add Role|Rol toevoegen/i)
      .should("not.exist")

  }

  searchRole(roleName:string) {

    cy.log(`Searching role: ${roleName}`)

    cy.get('input[placeholder*="Search"], input[placeholder*="Zoek"]')
      .first()
      .clear()
      .type(roleName)

  }

  verifyRoleCreated(roleName:string) {

    cy.log(`Verifying role created: ${roleName}`)

    cy.contains("tbody tr",roleName,{timeout:10000})
      .should("be.visible")

  }

}