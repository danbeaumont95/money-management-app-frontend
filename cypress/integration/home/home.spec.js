/// <reference types="Cypress" />

describe('tests home page', () => {
  it('if user not linked plaid account, they get swal with link advising to link an account', () => {
    cy.loginToApp('thirduser@hotmail.com', 'password123');
    cy.get('.swal2-popup.swal2-modal.swal2-show').should('exist');
    cy.get('#swal2-title').should('exist').should('have.text', 'No linked accounts yet');
    cy.get('#swal2-html-container').should('exist').should('have.text', 'Please click OK to be redirected to link an account');
    cy.get('.swal2-confirm.swal2-styled').should('exist').click();
    cy.url().then((url) => {
      const endpoint = url.slice(url.lastIndexOf('/') + 1);
      expect(endpoint).to.equal('plaidLink');
    });
  });
  it('shows home page with data graphs if logging in with account that has linked plaid details', () => {
    cy.loginToApp('firstuser@hotmail.com', 'password123');
    cy.get('h1').invoke('text').then((text) => {
      cy.log(text, 'text');
      expect(text).to.eq('Home');
    });
    cy.get('.paymentChannelChartContainer').should('exist');
    cy.get('.amountOfTransactionsBySpendChartContainer').should('exist');
    cy.get('.transactionsByCategoryChartContainer').should('exist');
  });
});
