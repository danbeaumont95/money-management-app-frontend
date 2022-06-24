/// <reference types="Cypress" />
// const UtilFunctions = require('../../../src/utils/utils');
import UtilFunctions from '../../../src/utils/utils';

const randomEmail = require('random-email');

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
  });
  it('logs in sucessfully', () => {
    cy.visit('http://localhost:3000/');
    cy.get('#loginEmailInput').should('exist').type('thirduser@hotmail.com'); // works using first user, need to change home to show something if no data
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
  it('signs up sucessfully', () => {
    const email = randomEmail({ domain: 'example.com' });

    cy.visit('http://localhost:3000/');
    cy.get('.signUpButton').should('exist').click();
    cy.get('.signUpForm').should('exist');
    cy.get('.firstNameSection').should('exist').type('First');
    cy.get('.lastNameSection').should('exist').type('Name');
    cy.get('.emailSection').should('exist').type(email);
    cy.get('.passwordSection').should('exist').type('password123');
    cy.get('.mobileNumberSection').should('exist').type(Math.floor(Math.random() * 9999999999));
    cy.get('.usernameSection').should('exist').type(UtilFunctions.generateRandomUserName(email));
    cy.get('.signInButton').should('exist').click();

    cy.get('.swal2-popup.swal2-modal.swal2-show').should('exist');
    cy.get('#swal2-title').should('exist').should('have.text', 'Success');
    cy.get('#swal2-html-container').should('exist').should('have.text', 'Account created! You will now be redirected to log in!');
    cy.get('.swal2-confirm.swal2-styled').should('exist').click();

    cy.get('.allLoginContent').should('exist');
  });
  it.only('signs up unsuccessfully, passing in already taken details', () => {
    const email = randomEmail({ domain: 'example.com' });
    cy.visit('http://localhost:3000/');
    cy.get('.signUpButton').should('exist').click();
    cy.get('.signUpForm').should('exist');
    cy.get('.firstNameSection').should('exist').type('First');
    cy.get('.lastNameSection').should('exist').type('Name');
    cy.get('.emailSection').should('exist').type('thirduser@hotmail.com');
    cy.get('.passwordSection').should('exist').type('password123');
    cy.get('.mobileNumberSection').should('exist').type(Math.floor(Math.random() * 9999999999));
    cy.get('.usernameSection').should('exist').type(UtilFunctions.generateRandomUserName('thirduser@hotmail.com'));
    cy.get('.signInButton').should('exist').click();

    cy.get('.swal2-popup.swal2-modal.swal2-show').should('exist');
    cy.get('#swal2-title').should('exist').should('have.text', 'Error');
    cy.get('#swal2-html-container').should('exist').should('have.text', 'Email Already exists');

    cy.get('.swal2-confirm.swal2-styled').should('exist').click();
    cy.get('.emailSection').should('exist').clear().type(email);

    cy.get('.usernameSection').should('exist').clear().type('thirduser');
    cy.get('.signInButton').should('exist').click();
    cy.get('.swal2-popup.swal2-modal.swal2-show').should('exist');
    cy.get('#swal2-title').should('exist').should('have.text', 'Error');
    cy.get('#swal2-html-container').should('exist').should('have.text', 'Username Already exists');

    cy.get('.swal2-confirm.swal2-styled').should('exist').click();
    cy.get('.usernameSection').should('exist').clear().type(UtilFunctions.generateRandomUserName('thirduser@hotmail.com'));
    cy.get('.mobileNumberSection').should('exist').clear().type('7777777777');
    cy.get('.signInButton').should('exist').click();
    cy.get('.swal2-popup.swal2-modal.swal2-show').should('exist');
    cy.get('#swal2-title').should('exist').should('have.text', 'Error');
    cy.get('#swal2-html-container').should('exist').should('have.text', 'Mobile Number Already exists');
  });
});
