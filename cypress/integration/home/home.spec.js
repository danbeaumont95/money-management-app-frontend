/// <reference types="Cypress" />
// import '../../support/commands';

describe('tests home page', () => {
  beforeEach(() => {
    cy.loginToApp('thirduser@hotmail.com', 'password123');
  });
});
