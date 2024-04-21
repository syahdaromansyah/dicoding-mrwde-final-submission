import getFullUrl from './utils/getFullUrl';

/**
 * E2E Scenario (9 Test Scenarios)
 * ~ The Register Page Test
 *    ~ Before Login
 *      - should show the nav menu list
 *    - should show the register page body content
 *    - should show an error alert when register inputs are empty
 *    - should show an error alert when register inputs are invalid
 *    - should show an error alert when email is already used
 *    - should redirect to login page when register is valid
 *    - should show the success toast when register is valid
 *    - should redirect to index page,
 *      after login using with the new account
 *    ~ After Login
 *      - should show the nav menu list
 */

describe('The Register Page Test', () => {
  const nameInput = '[data-cy="name-input"]';
  const emailInput = '[data-cy="email-input"]';
  const passInput = '[data-cy="password-input"]';

  const loginBtn = '[data-cy="login-btn"]';
  const registerBtn = '[data-cy="register-btn"]';
  const navHeaderBtn = '[data-cy="app-nav-header-menu-btn"]';
  const alertXBtn = '[data-cy="alert-close-btn"]';

  describe('Before Login', () => {
    it('should show the nav menu list', () => {
      cy.visit('/register');

      cy.get(navHeaderBtn).click();

      cy.get('a').contains('Login');
      cy.get('a').contains('Register');
      cy.get('a').contains('Threads');
      cy.get('a').contains('Leaderboards');
    });
  });

  it('should show the register page body content', () => {
    cy.visit('/register');

    cy.get('h1').contains('Register Page');
    cy.get('p').contains('Have an account? Login');

    cy.get(nameInput).should('be.visible');
    cy.get(emailInput).should('be.visible');
    cy.get(passInput).should('be.visible');
    cy.get(registerBtn).should('be.visible').should('have.text', 'Register');
  });

  it('should show an error alert when register inputs are empty', () => {
    cy.visit('/register');

    cy.get(nameInput).as('nameInput');
    cy.get(emailInput).as('emailInput');
    cy.get(passInput).as('passInput');
    cy.get(registerBtn).as('registerBtn');

    // Showing error when,
    // all inputs are empty
    cy.get('@registerBtn').click();

    cy.get('h5').contains('Heads up!').as('alertTitle');

    cy.get('p').contains('Please input register form correctly').as('alertTxt');

    cy.get(alertXBtn).as('alertXBtn').click();

    // Name input has a value
    // Email and password inputs are empty
    cy.get('@nameInput').type('Vin Doe');
    cy.get('@registerBtn').click();

    cy.get('@alertTitle');
    cy.get('@alertTxt');
    cy.get('@alertXBtn').click();

    // Name and email inputs have a value
    // Password input is empty
    cy.get('@nameInput').clear();

    cy.get('@nameInput').type('Vin Doe');
    cy.get('@emailInput').type('vindoe@email.com');
    cy.get('@registerBtn').click();

    cy.get('@alertTitle');
    cy.get('@alertTxt');
    cy.get('@alertXBtn').click();

    // Email input has a value
    // Name and password are empty
    cy.get('@nameInput').clear();
    cy.get('@emailInput').clear();

    cy.get('@emailInput').type('vindoe@email.com');
    cy.get('@registerBtn').click();

    cy.get('@alertTitle');
    cy.get('@alertTxt');
    cy.get('@alertXBtn').click();

    // Email and password inputs have a value
    // Name input is empty
    cy.get('@emailInput').clear();

    cy.get('@emailInput').type('vindoe@email.com');
    cy.get('@passInput').type('123123');
    cy.get('@registerBtn').click();

    cy.get('@alertTitle');
    cy.get('@alertTxt');
    cy.get('@alertXBtn').click();

    // Password input has a value
    // Name and email are empty
    cy.get('@emailInput').clear();
    cy.get('@passInput').clear();

    cy.get('@passInput').type('123123');
    cy.get('@registerBtn').click();

    cy.get('@alertTitle');
    cy.get('@alertTxt');
  });

  it('should show an error alert when register inputs are invalid', () => {
    cy.visit('/register');

    cy.get(nameInput).as('nameInput');
    cy.get(emailInput).as('emailInput');
    cy.get(passInput).as('passInput');

    cy.get(registerBtn).as('registerBtn');

    cy.get('@nameInput').type('Foo Doe');

    // Validating email input is invalid
    cy.get('@emailInput').type('foodoe@email');
    cy.get('@passInput').type('123123');

    cy.get('@registerBtn').click();

    cy.get('h5').contains('Heads up!').as('alertTitle');

    cy.get('p').contains('Please input register form correctly').as('alertTxt');

    cy.get(alertXBtn).click();

    // Validating password input is invalid
    cy.get('@emailInput').clear();
    cy.get('@passInput').clear();

    cy.get('@emailInput').type('foodoe@email.com');
    cy.get('@passInput').type('123');

    cy.get('@registerBtn').click();

    cy.get('@alertTitle');
    cy.get('@alertTxt');
  });

  it('should show an error alert when email is already used', () => {
    cy.visit('/register');

    cy.get(nameInput).type('Foo Doe');
    cy.get(emailInput).type('foodoe@email.com');
    cy.get(passInput).type('123123');

    cy.get(registerBtn).click();

    cy.get('h5').contains('Heads up!');
    cy.get('p').contains('email is already taken');
  });

  it('should redirect to login page when register is valid', () => {
    cy.visit('/register');

    cy.get(nameInput).type('Vin Doe');
    cy.get(emailInput).type('vindoe@email.com');
    cy.get(passInput).type('123123');

    cy.get(registerBtn).click();

    cy.url().should('eq', getFullUrl('/login'));
  });

  it('should show the success toast when register is valid', () => {
    cy.visit('/register');

    cy.get(nameInput).type('Vin Doe');
    cy.get(emailInput).type('vindoe@email.com');
    cy.get(passInput).type('123123');

    cy.get(registerBtn).click();

    cy.contains('Register Account');
    cy.contains('New account is successfully registered');
  });

  it('should redirect to index page after login using with the new account', () => {
    cy.visit('/register');

    // Registering a new account
    cy.get(nameInput).type('Vin Doe');
    cy.get(emailInput).type('vindoe@email.com');
    cy.get(passInput).type('123123');

    cy.get(registerBtn).click();

    // Login with the new account
    cy.get(emailInput).type('vindoe@email.com');
    cy.get(passInput).type('123123');

    cy.get(loginBtn).click();

    // Validating the redirected page url
    cy.url().should('eq', getFullUrl('/'));

    cy.contains('Login Account');
    cy.contains('Login is success');
  });

  describe('After Login', () => {
    it('should show the nav menu list', () => {
      cy.visit('/register');

      // Registering a new account
      cy.get(nameInput).type('Vin Doe');
      cy.get(emailInput).type('vindoe@email.com');
      cy.get(passInput).type('123123');

      cy.get(registerBtn).click();

      // Login with the new account
      cy.get(emailInput).type('vindoe@email.com');
      cy.get(passInput).type('123123');

      cy.get(loginBtn).click();

      // Validating the nav menu list
      cy.get(navHeaderBtn).click();

      cy.get('p').contains('Hello! Vin Doe');
      cy.get('a').contains('Create Threads');
      cy.get('a').contains('Threads');
      cy.get('a').contains('Leaderboards');
      cy.get('button').contains('Log out');
    });
  });
});
