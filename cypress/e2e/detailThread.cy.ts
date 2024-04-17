import getFullUrl from './utils/getFullUrl';

/**
 * E2E Scenario (6 Test Scenarios)
 * ~ The Detail Thread Page Test
 *    - should show the nav header content
 *    ~ Before Login
 *      - should show the nav menu list
 *      - should show the detail thread page body content
 *    ~ After Login
 *      - should show the nav menu list
 *      - should show the detail thread page body content
 *      - should add a new comment
 */

describe('The Detail Thread Page Test', () => {
  const emailInput = '[data-cy="email-input"]';
  const passInput = '[data-cy="password-input"]';
  const commentInput = '[data-cy="comment-input"] textarea';

  const navHeaderBtn = '[data-cy="app-nav-header-menu-btn"]';
  const loginBtn = '[data-cy="login-btn"]';
  const sendCommentBtn = '[data-cy="send-comment-btn"]';

  it('should show the nav header content', () => {
    cy.visit('/threads/thread2');

    cy.get('a').contains('Forumy');
    cy.get(navHeaderBtn);
  });

  describe('Before Login', () => {
    it('should show the nav menu list', () => {
      cy.visit('/threads/thread2');

      cy.get(navHeaderBtn).click();

      cy.get('a').contains('Login');
      cy.get('a').contains('Register');
      cy.get('a').contains('Threads');
      cy.get('a').contains('Leaderboards');
    });

    it('should show the detail thread page body content', () => {
      cy.visit('/threads/thread2');

      cy.get('p').contains('#intro');
      cy.get('h2').contains('Hello and Welcome to My Thread!');

      cy.get('p').contains(
        'Hello there and welcome to my thread! Please introduce yourself in the comment below',
      );

      cy.get('p').contains('11 months ago');
      cy.get('p').contains('Created by');
      cy.get('p').contains('Bar Doe');

      cy.get('h3').contains('Give a Comment');
      cy.get('p').contains('Login first before commenting');

      cy.get('h3').contains('Commentary (1)');
      cy.get('h2').contains('Foo Doe');
      cy.get('p').contains('Hello there!My name is Foo Doe');
    });
  });

  describe('After Login', () => {
    it('should show the nav menu list', () => {
      cy.visit('/login');

      cy.get(emailInput).type('foodoe@email.com');
      cy.get(passInput).type('123123');

      cy.get(loginBtn).click();

      cy.url().should('eq', getFullUrl('/'));

      cy.get('a').contains('Hello and Welcome to My Thread!').click();

      cy.url().should('eq', getFullUrl('/threads/thread2'));

      cy.get(navHeaderBtn).click();

      cy.get('p').contains('Hello! Foo Doe');
      cy.get('a').contains('Create Threads');
      cy.get('a').contains('Threads');
      cy.get('a').contains('Leaderboards');
      cy.get('button').contains('Log out');
    });

    it('should show the detail thread page body content', () => {
      cy.visit('/login');

      cy.get(emailInput).type('foodoe@email.com');
      cy.get(passInput).type('123123');

      cy.get(loginBtn).click();

      cy.url().should('eq', getFullUrl('/'));

      cy.get('a').contains('Hello and Welcome to My Thread!').click();

      cy.url().should('eq', getFullUrl('/threads/thread2'));

      cy.get('p').contains('#intro');
      cy.get('h2').contains('Hello and Welcome to My Thread!');

      cy.get('p').contains(
        'Hello there and welcome to my thread! Please introduce yourself in the comment below',
      );

      cy.get('p').contains('11 months ago');
      cy.get('p').contains('Created by');
      cy.get('p').contains('Bar Doe');

      cy.get('h3').contains('Give a Comment');
      cy.get('p').contains('Login first before commenting').should('not.exist');

      cy.get(commentInput).should('be.visible');
      cy.get(sendCommentBtn).should('be.visible');

      cy.get('h3').contains('Commentary (1)');
      cy.get('h2').contains('Foo Doe');
      cy.get('p').contains('Hello there!My name is Foo Doe');
    });

    it('should add a new comment', () => {
      cy.visit('/login');

      cy.get(emailInput).type('bardoe@email.com');
      cy.get(passInput).type('123123');

      cy.get(loginBtn).click();

      cy.url().should('eq', getFullUrl('/'));

      cy.get('a').contains('Hello and Welcome to My Thread!').click();

      cy.url().should('eq', getFullUrl('/threads/thread2'));

      cy.get(commentInput).as('commentInput').should('be.visible');

      const newCommentTxt = 'Hello too Foo! Nice to meet you';

      cy.get('@commentInput').type(newCommentTxt);

      cy.get(sendCommentBtn).click();

      cy.get('h3').contains('Commentary (2)');

      cy.get('h2').contains('Bar Doe');
      cy.get('p').contains(newCommentTxt);

      cy.get('h2').contains('Foo Doe');
      cy.get('p').contains('Hello there!My name is Foo Doe');
    });
  });
});
