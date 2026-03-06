export function setupCommonIntercepts() {

  cy.intercept('GET', '**/users**').as('getUsers');
  cy.intercept("**/users**", (req) => {
  console.log("USERS API CALLED:", req.url)
}).as("getUsers")

  cy.intercept('GET', '**/stats/overview**').as('getStats');

  cy.intercept("GET", "**/roles").as("getRoles");

  cy.intercept('PUT', '**/users/**').as('updatePermissions');

  cy.intercept('GET', '**/audit-logs*').as('getAuditLogs');

  cy.intercept('GET', '**/audit-logs/export*').as('exportLogs');

  cy.intercept('GET', '**/customers*').as('getCustomers');
  

}
