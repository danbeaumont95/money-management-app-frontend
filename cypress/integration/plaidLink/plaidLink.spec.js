/// <reference types="Cypress" />

describe('tests plaid link page', () => {
  it('goes through plaid link', () => {
    cy.loginToApp('firstuser@hotmail.com', 'password123');
    cy.visit('http://localhost:3000/plaidLink');
    cy.get('.connectBankAccountContainer').should('exist');
    cy.get('.linkPlaidAccount').should('exist').click();
    cy.get('iframe#plaid-link-iframe-1', { timeout: 30000 }).then((iframe) => {
      cy.wrap(iframe) // from Cypress blog ref above
        .its('0.contentDocument.body')
        .should('not.be.empty') // ensure the iframe body is loaded
        .as('iframeBody') // save for further commands within iframe.body

        .find('#aut-button', { timeout: 10000 })
        .click();

      cy.get('@iframeBody')
        .contains('h1', 'Select your bank'); // confirm the result of the click()

      cy.get('@iframeBody')
        .contains('h2', 'HSBC (UK) - Personal');
    });
  });
});
