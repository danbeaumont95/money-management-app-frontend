/// <reference types="Cypress" />

describe('tests plaid link page', () => {
  it('goes through plaid link successfully', () => {
    cy.loginToApp('firstuser@hotmail.com', 'password123');
    cy.visit('http://localhost:3000/plaidLink');
    cy.get('.connectBankAccountContainer').should('exist');
    cy.get('.linkPlaidAccount').should('exist').click();
    cy.wait(4000);
    cy.get('.iframes-container').should('exist');
  });
});
