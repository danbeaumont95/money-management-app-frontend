/// <reference types="Cypress" />
/* eslint-disable no-undef */
describe('tests login page', () => {
  it('has all the correct elements and fails login as expected with fake details', () => {
    // const db = Cypress.env('db');

    cy.visit('http://localhost:3000/');
    cy.get('.allLoginContent').should('exist');
    cy.get('.loginButton').should('exist');
    cy.get('.form').should('exist');
    cy.get('#loginEmailInput').should('exist').type('fakeEmail@hotmail.com');
    cy.get('#loginPasswordInput').should('exist').type('fakepassword');
    cy.get('#loginNowButton').should('exist').should('have.text', 'Log in').click();
    cy.get('.swal2-popup.swal2-modal.swal2-show').should('exist');
    cy.get('#swal2-title').should('exist').should('have.text', 'Error');
    cy.get('#swal2-html-container').should('exist').should('have.text', 'Invalid login details');
    cy.get('.swal2-confirm.swal2-styled').should('exist').click();
    // cy.get('.signUpButton').should('exist').click();
    // cy.get('.signUpForm').should('exist');
  });
  it('logs in sucessfully', () => {
    cy.visit('http://localhost:3000/');
    cy.get('#loginEmailInput').should('exist').type('thirduser@hotmail.com');
    cy.get('#loginPasswordInput').should('exist').type('password123');
    cy.get('#loginNowButton').should('exist').should('have.text', 'Log in').click();
    cy.get('.swal2-popup.swal2-modal.swal2-show').should('exist');
    cy.get('#swal2-title').should('exist').should('have.text', 'Success');
    cy.get('#swal2-html-container').should('exist').should('have.text', 'You are now logged in! You will be redirected to the homepage');
    cy.get('.swal2-confirm.swal2-styled').should('exist').click();
    cy.url().then((url) => {
      const endpoint = url.slice(url.lastIndexOf('/') + 1);
      expect(endpoint).to.equal('home');
    });
  });
});
