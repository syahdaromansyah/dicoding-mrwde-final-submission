import getFullUrl from './utils/getFullUrl';

/**
 * E2E Scenario (7 Test Scenarios)
 * ~ The Index Page Test
 *   ~ After Login
 *     - should show the nav menu list
 *   - should show the login page body content
 *   - should show an error alert when empty login inputs are empty
 *   - should show an error alert when login inputs are invalid
 *   - should show an error alert when login inputs are wrong
 *   - should redirect to index page when login is valid
 *   - should show an success toast when login is valid
 *   ~ Before Login
 *     - should show the nav menu list
 */

describe('The Login Page Test', () => {
  const emailInput = '[data-cy="email-input"]';
  const passInput = '[data-cy="password-input"]';
  const loginBtn = '[data-cy="login-btn"]';

  const navHeaderBtn = '[data-cy="app-nav-header-menu-btn"]';
  const alertXBtn = '[data-cy="alert-close-btn"]';

  describe('Before Login', () => {
    it('should show the nav menu list', () => {
      cy.visit('/login');

      cy.get(navHeaderBtn).click();

      cy.get('a').contains('Login');
      cy.get('a').contains('Register');
      cy.get('a').contains('Threads');
      cy.get('a').contains('Leaderboards');
    });
  });

  it('should show the login page body content', () => {
    cy.visit('/login');

    cy.get('h1').contains('Login Page');
    cy.get('p').contains("Don't have an account? Sign up");

    cy.get(emailInput).should('be.visible');
    cy.get(passInput).should('be.visible');
    cy.get(loginBtn).should('be.visible').should('have.text', 'Login');
  });

  it('should show an error alert when empty login inputs are empty', () => {
    cy.visit('/login');

    cy.get(emailInput).as('emailInput').should('be.visible');
    cy.get(passInput).as('passInput').should('be.visible');
    cy.get(loginBtn).as('loginBtn').should('be.visible');

    // Validating all inputs value are empty
    cy.get('@loginBtn').click();

    cy.get('h5').contains('Heads up!').as('alertTitle');

    cy.get('p').contains('Please input login form correctly').as('alertTxt');

    cy.get(alertXBtn).as('alertXBtn').should('be.visible').click();

    // Email input has a value
    // Password input is empty
    cy.get('@emailInput').type('foodoe@email.com');
    cy.get('@loginBtn').click();

    cy.get('@alertTitle');
    cy.get('@alertTxt');
    cy.get('@alertXBtn').click();

    // Password input has a value
    // Email input is empty
    cy.get('@emailInput').clear();

    cy.get('@passInput').type('123123');
    cy.get('@loginBtn').click();

    cy.get('@alertTitle');
    cy.get('@alertTxt');
  });

  it('should show an error alert when login inputs are invalid', () => {
    cy.visit('/login');

    cy.get(emailInput).as('emailInput').should('be.visible');
    cy.get(passInput).as('passInput').should('be.visible');
    cy.get(loginBtn).as('loginBtn').should('be.visible');

    // Validating the email input value is invalid
    cy.get('@emailInput').type('invalid@email');
    cy.get('@passInput').type('123123');

    cy.get('@loginBtn').click();

    cy.get('h5').contains('Heads up!').as('alertTitle');

    cy.get('p').contains('Please input login form correctly').as('alertTxt');

    cy.get(alertXBtn).should('be.visible').click();

    // Validating the password input is invalid
    cy.get('@emailInput').clear();
    cy.get('@passInput').clear();

    cy.get('@emailInput').type('valid@email.com');
    cy.get('@passInput').type('123');

    cy.get('@loginBtn').click();

    cy.get('@alertTitle');
    cy.get('@alertTxt');
  });

  it('should show an error alert when login inputs are wrong', () => {
    cy.visit('/login');

    cy.get(emailInput).as('emailInput').should('be.visible');
    cy.get(passInput).as('passInput').should('be.visible');
    cy.get(loginBtn).as('loginBtn').should('be.visible');

    // Validating email and password inputs value are wrong
    cy.get('@emailInput').type('wrong@email.com');
    cy.get('@passInput').type('wrongPass');
    cy.get('@loginBtn').click();

    cy.get('h5').contains('Heads up!').as('alertTitle');

    cy.get('p').contains('Error: email or password is wrong').as('alertTxt');

    cy.get(alertXBtn).as('alertXBtn').should('be.visible').click();

    // Validating password input value is wrong,
    // but email input value is valid
    cy.get('@emailInput').clear();
    cy.get('@passInput').clear();

    cy.get('@emailInput').type('foodoe@email.com');
    cy.get('@passInput').type('wrongPass');
    cy.get('@loginBtn').click();

    cy.get('@alertTitle');
    cy.get('@alertTxt');
    cy.get('@alertXBtn').click();

    // Validating email input value is wrong,
    // but password input value is valid
    cy.get('@emailInput').clear();
    cy.get('@passInput').clear();

    cy.get('@emailInput').type('wrong@email.com');
    cy.get('@passInput').type('123123');

    cy.get('@loginBtn').click();

    cy.get('@alertTitle');
    cy.get('@alertTxt');
  });

  it('should redirect to index page when login is valid', () => {
    cy.visit('/login');

    cy.get(emailInput).type('foodoe@email.com');
    cy.get(passInput).type('123123');

    cy.get(loginBtn).click();

    cy.url().should('eq', getFullUrl('/'));
    cy.url().should('not.eq', getFullUrl('/login'));
  });

  it('should show an success toast when login is valid', () => {
    cy.visit('/login');

    cy.get(emailInput).type('foodoe@email.com');
    cy.get(passInput).type('123123');

    cy.get(loginBtn).click();

    cy.contains('Login Account');
    cy.contains('Login is success');
  });

  describe('After Login', () => {
    it('should show the nav menu list', () => {
      cy.visit('/login');

      cy.get(emailInput).type('foodoe@email.com');
      cy.get(passInput).type('123123');

      cy.get(loginBtn).click();

      cy.get(navHeaderBtn).click();

      cy.get('p').contains('Hello! Foo Doe');
      cy.get('a').contains('Create Threads');
      cy.get('a').contains('Threads');
      cy.get('a').contains('Leaderboards');
      cy.get('button').contains('Log out');
    });
  });
});
