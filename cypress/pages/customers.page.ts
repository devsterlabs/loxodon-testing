class CustomersPage {

  visit() {

    cy.log("Opening Customers page")

    cy.visit("/customers")

    cy.url()
      .should("include","/customers")

  }

  waitForCustomersLoad() {

    cy.log("Waiting for customers API")

    cy.wait("@getCustomers")
      .its("response.statusCode")
      .should("eq",200)

  }

  searchCustomer(domain:string) {

    cy.log(`Searching customer: ${domain}`)

    // FUTURE (when test ids exist)
    // cy.get('[data-testid="customer-search"]')

    cy.get('input[placeholder*="Zoek"], input[type="search"]')
      .should("be.visible")
      .clear()
      .type(domain)

  }

  verifyCustomerVisible(domain:string){

    cy.log(`Verifying customer visible: ${domain}`)

    cy.contains("tbody span",domain)
      .should("be.visible")

  }

  openCustomer(domain:string){

    cy.log(`Opening customer: ${domain}`)

    // FUTURE selector
    // cy.get('[data-testid="customer-domain"]').contains(domain).click()
    //cy.get(`[data-testid="customer-domain-${tenantId}"]`).click()
    // cy.get('span[data-testid^="customer-domain-"]').contains(domain).click()

    cy.contains("tbody span",domain)
      .should("be.visible")
      .click()

    cy.url()
      .should("include","/users")

  }

  verifyTableVisible(){

    cy.get("tbody")
      .should("be.visible")

  }

}

export default new CustomersPage()