class UsersPage {

  waitForUsersLoad(){

    cy.log("Waiting for users API")

    cy.wait("@getUsers")
      .its("response.statusCode")
      .should("eq",200)

  }

  openAuditLogs(email:string){

    cy.log(`Opening audit logs for user: ${email}`)

    const username = email.split("@")[0]

    cy.contains("tbody tr",username)
      .should("be.visible")
      .as("userRow")

    cy.get("@userRow")
      .find('[class*="rowActions"]')
      .invoke("css","opacity","1")
      .invoke("css","pointer-events","auto")

    cy.get("@userRow")
      .find("button")
      .first()
      .click()

    cy.wait("@getAuditLogs")
      .its("response.statusCode")
      .should("eq",200)

  }

  exportAuditLogs(){

    cy.log("Exporting audit logs")

    cy.contains("button",/Export|Exporteren/i)
      .should("be.visible")
      .click()

  }

  updateUserRole(email:string){

    cy.log(`Updating role for user: ${email}`)

    // FUTURE selector
    // cy.get('[data-testid="user-email"]').contains(email)

    cy.contains("tbody tr",email)
      .should("be.visible")
      .as("userRow")

    cy.get("@userRow")
      .find('[class*="rowActions"] button')
      .last()
      .click({force:true})

  }

  verifyUsersTable(){

    cy.get("tbody")
      .should("be.visible")

  }

}

export default new UsersPage()