class UsersPage {

  waitForUsersLoad() {

    cy.log("Waiting for users API")

    cy.wait("@getUsers")
      .its("response.statusCode")
      .should("eq", 200)

  }

  openAuditLogs(email: string) {

    cy.log(`Opening audit logs for user: ${email}`)

    const username = email.split("@")[0]

    cy.contains("tbody tr", username)
      .should("be.visible")
      .as("userRow")

    cy.get("@userRow")
      .find('[class*="rowActions"]')
      .invoke("css", "opacity", "1")
      .invoke("css", "pointer-events", "auto")

    cy.get("@userRow")
      .find("button")
      .first()
      .click()

    cy.wait("@getAuditLogs")
      .its("response.statusCode")
      .should("eq", 200)

  }

  exportAuditLogs() {

    cy.log("Exporting audit logs")

    cy.contains("button", /Export|Exporteren/i)
      .should("be.visible")
      .click()

  }



  updateUserRole(userIndex: number = 0, roleIndex: number = 1) {
    cy.log(`Updating role for user at index: ${userIndex}`);

    cy.get("tbody tr")
      .eq(userIndex)
      .as("userRow");


    cy.get("@userRow")
      .find('[class*="rowActions"] button')
      .last()
      .click({ force: true });

    cy.contains("Gebruiker bijwerken").should("be.visible");

    cy.get("#update-user-role")
      .should("be.visible")
      .then(($select) => {
        const optionValue = $select.find('option').eq(roleIndex).val();
        cy.log(`Selecting role at index ${roleIndex} with value: ${optionValue}`);
        cy.get("#update-user-role").select(optionValue);
      });


    cy.intercept("PUT", "**/users/**").as("updateUser");

    cy.log("Clicking Update");
    cy.contains("button", "Update").click();


    cy.wait("@updateUser")
      .its("response.statusCode")
      .should("eq", 200);

    cy.contains("Gebruiker bijwerken").should("not.exist");
  }



  verifyUsersTable() {

    cy.get("tbody")
      .should("be.visible")

  }

}

export default new UsersPage()